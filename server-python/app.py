from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
# from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash, generate_password_hash
import firebase_admin
from firebase_admin import credentials, auth
from werkzeug.utils import secure_filename

import os

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app = Flask(__name__)
CORS(app)

# MySQL Configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '0325',
    'database': 'arhub'
}

# Initialize Firebase Admin SDK
cred = credentials.Certificate("./firebase-adminsdk.json")
firebase_admin.initialize_app(cred)

def get_db_connection():
    return mysql.connector.connect(**db_config)


ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/user-profile/<email>', methods=['GET'])
def get_user_profile(email):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Check if user exists in users table
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()

        if user:
            # Fetch profile from user_profiles table
            cursor.execute("SELECT * FROM user_profiles WHERE email = %s", (email,))
            profile = cursor.fetchone()

            if not profile:
                # If profile doesn't exist, create one with default values
                insert_query = """
                INSERT INTO user_profiles (username, email, first_name, last_name, address)
                VALUES (%s, %s, %s, %s, %s)
                """
                cursor.execute(insert_query, (user['username'], email, user['first_name'], user['last_name'], user['address']))
                conn.commit()
                
                cursor.execute("SELECT * FROM user_profiles WHERE email = %s", (email,))
                profile = cursor.fetchone()

            return jsonify(profile), 200
        else:
            # Check if user exists in google_users table
            cursor.execute("SELECT * FROM google_users WHERE email = %s", (email,))
            google_user = cursor.fetchone()

            if google_user:
                # Fetch profile from user_profiles table
                cursor.execute("SELECT * FROM user_profiles WHERE email = %s", (email,))
                profile = cursor.fetchone()

                if not profile:
                    # If profile doesn't exist, create one with default values
                    insert_query = """
                    INSERT INTO user_profiles (email, first_name, image_url)
                    VALUES (%s, %s, %s)
                    """
                    cursor.execute(insert_query, (email, google_user['display_name'], google_user['photo_url']))
                    conn.commit()
                    
                    cursor.execute("SELECT * FROM user_profiles WHERE email = %s", (email,))
                    profile = cursor.fetchone()

                return jsonify(profile), 200
            else:
                return jsonify({"error": "User not found"}), 404

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "An error occurred while fetching the user profile"}), 500

    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/update-profile', methods=['POST'])
def update_profile():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        email = request.form.get('email')
        username = request.form.get('username')
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        address = request.form.get('address')
        linkedin_url = request.form.get('linkedin_url')
        github_url = request.form.get('github_url')

        # Handle file upload
        if 'image' in request.files:
            file = request.files['image']
            if file and allowed_file(file.filename):
                filename = secure_filename(str(uuid.uuid4()) + os.path.splitext(file.filename)[1])
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(file_path)
                image_url = f"/uploads/{filename}"
            else:
                image_url = request.form.get('image_url')
        else:
            image_url = request.form.get('image_url')

        # Update the user_profiles table
        update_query = """
        UPDATE user_profiles
        SET username = %s,
            first_name = %s,
            last_name = %s,
            address = %s,
            linkedin_url = %s,
            github_url = %s,
            image_url = %s
        WHERE email = %s
        """
        cursor.execute(update_query, (username, first_name, last_name, address, linkedin_url, github_url, image_url, email))
        conn.commit()

        # Fetch the updated profile
        cursor.execute("SELECT * FROM user_profiles WHERE email = %s", (email,))
        updated_profile = cursor.fetchone()

        return jsonify({"message": "Profile updated successfully", "profile": updated_profile}), 200

    except mysql.connector.Error as err:
        print(f"Database error: {err}")
        return jsonify({"error": "An error occurred while updating the profile"}), 500
    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()



@app.route('/register', methods=['POST'])
def register():
    data = request.json
    first_name = data['firstName']
    last_name = data['lastName']
    email = data['email']
    address = data['address']
    username = data['username']
    password = data['password']

    hashed_password = generate_password_hash(password)

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Check if username or email already exists
        cursor.execute("SELECT * FROM users WHERE username = %s OR email = %s", (username, email))
        if cursor.fetchone():
            return jsonify({"error": "Username or email already exists"}), 400

        # Insert new user
        insert_query = """
        INSERT INTO users (first_name, last_name, email, address, username, password)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, (first_name, last_name, email, address, username, hashed_password))
        conn.commit()

        return jsonify({"message": "User registered successfully"}), 201

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "An error occurred while registering the user"}), 500

    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/register-google', methods=['POST'])
def register_google():
    id_token = request.json.get('idToken')
    
    try:
        # Verify the ID token
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        
        # Get user info from Firebase
        user = auth.get_user(uid)
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Check if user already exists in google_users table
        cursor.execute("SELECT * FROM google_users WHERE firebase_uid = %s", (uid,))
        existing_user = cursor.fetchone()
        
        if not existing_user:
            # Insert new user into google_users table
            insert_query = """
            INSERT INTO google_users (firebase_uid, email, display_name, photo_url)
            VALUES (%s, %s, %s, %s)
            """
            cursor.execute(insert_query, (uid, user.email, user.display_name, user.photo_url))
            conn.commit()
        
        return jsonify({"message": "Google user registered successfully"}), 201
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "An error occurred while registering the Google user"}), 500
    
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()



@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Check if user exists
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()

        if user and check_password_hash(user['password'], password):
            isAdmin = user['email'] == 'admin@arhub.com'
            return jsonify({"message": "Login successful", "isAdmin": isAdmin}), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "An error occurred during login"}), 500

    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/login-google', methods=['POST'])
def login_google():
    id_token = request.json.get('idToken')
    
    try:
        # Verify the ID token
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        
        # Get user info from Firebase
        user = auth.get_user(uid)
        
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        # Check if user exists in google_users table
        cursor.execute("SELECT * FROM google_users WHERE firebase_uid = %s", (uid,))
        existing_user = cursor.fetchone()
        
        if not existing_user:
            # Insert new user into google_users table
            insert_query = """
            INSERT INTO google_users (firebase_uid, email, display_name, photo_url)
            VALUES (%s, %s, %s, %s)
            """
            cursor.execute(insert_query, (uid, user.email, user.display_name, user.photo_url))
            conn.commit()
        
        return jsonify({"message": "Google login successful", "isAdmin": False}), 200
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "An error occurred during Google login"}), 500
    
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/feedback', methods=['POST'])
def submit_feedback():
    data = request.json
    email = data['email']
    rating = data['rating']
    feedback = data['feedback']

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Check if the email exists in the users table
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()

        if not user:
            # Check if the email exists in the google_users table
            cursor.execute("SELECT * FROM google_users WHERE email = %s", (email,))
            google_user = cursor.fetchone()

            if not google_user:
                return jsonify({"error": "User not found"}), 404

        # Insert feedback into the database
        insert_query = """
        INSERT INTO feedback (email, rating, feedback)
        VALUES (%s, %s, %s)
        """
        cursor.execute(insert_query, (email, rating, feedback))
        conn.commit()

        return jsonify({"message": "Feedback submitted successfully"}), 201

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "An error occurred while submitting feedback"}), 500

    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()


@app.route('/admin/feedback', methods=['GET'])
def get_feedback():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Fetch all feedback from the database
        cursor.execute("""
            SELECT f.id, COALESCE(u.username, gu.display_name) AS username, f.feedback, f.rating
            FROM feedback f
            LEFT JOIN users u ON f.email = u.email
            LEFT JOIN google_users gu ON f.email = gu.email
        """)
        feedbacks = cursor.fetchall()

        return jsonify({"data": feedbacks}), 200

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "An error occurred while fetching feedback"}), 500

    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

if __name__ == '__main__':
    app.run(debug=True)