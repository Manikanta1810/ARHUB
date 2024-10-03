# ARHUB: Accessibility Resource Hub

Welcome to **ARHUB**, your one-stop solution for accessibility resources. This repository is structured into two primary sections:

- **Client**: The frontend of ARHUB, built using **React.js** and styled with **Tailwind CSS** for a sleek and responsive user experience.
- **Server**: The backend, which integrates the power of **Java Spring Boot** and **Python Flask**, providing a robust foundation for handling requests and delivering data.

## Frontend Design

Our frontend leverages **Tailwind CSS** for fast and customizable UI development. The design is crafted to ensure both accessibility and aesthetic appeal, following modern web standards.

For a deeper look into our design inspiration and wireframes, check out the user interface on [Figma](https://www.figma.com/design/MEuFI1EUrLbJ8Ias6FFAyG/SDE?node-id=0-1&t=T43URCWJG97YH7mQ-1).

## Key Features

- Seamless integration between **React.js** and **Spring Boot/Flask** backend.
- Clean, maintainable, and modular code architecture.
- Fully responsive and accessible design built with **Tailwind CSS**.

## Folder Structure

- `/client`: Contains the UI code, built with React.js and styled with Tailwind CSS.
- `/server`: Houses the backend code, combining Java Spring Boot and Python Flask.

## How to Run

### 1. Clone the repository

```bash
git clone https://github.com/your-repo/arhub.git
```

### 2. Run the Client (React.js with Tailwind CSS)

Navigate to the client directory and install the dependencies:

```bash
cd client
npm install
```

Start the React development server:

```bash
npm start
```

The client should now be running at `http://localhost:3000`.

### 3. Run the Server (Java Spring Boot)

Navigate to the server/java-spring-boot directory:

```bash
cd server/java-spring-boot
```

Ensure Maven is installed, then build the project:

```bash
mvn clean install
```

Run the Spring Boot server:

```bash
mvn spring-boot:run
```

The server should now be running at `http://localhost:8080`.

### 4. Run the Server (Python Flask)

Navigate to the server/python-flask directory:

```bash
cd server/python-flask
```

Install the required Python dependencies:

```bash
pip install -r requirements.txt
```

Start the Flask server:

```bash
python app.py
```

The Flask server should now be running at `http://localhost:5000`.

---

Now, both the React client and the backend servers (Spring Boot and Flask) should be running and ready for use!
