import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { MessageSquare, Send, Trash2, Plus, Heart, MoreHorizontal } from 'lucide-react';
import { useAuth } from '../../utils/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import UserHeader from '../../components/UserComponents/UserHeader';

const DiscussionForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [replyContents, setReplyContents] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const postsRef = collection(firestore, 'forum_posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createPost = async () => {
    if (newPost.trim() && user) {
      try {
        const postsRef = collection(firestore, 'forum_posts');
        await addDoc(postsRef, {
          author: user.displayName || 'Anonymous',
          authorId: user.uid,
          avatar: user.photoURL || '/placeholder.svg?height=40&width=40',
          content: newPost,
          likes: 0,
          likedBy: [],
          replies: [],
          createdAt: new Date().toISOString()
        });
        setNewPost('');
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };

  const createReply = async (postId) => {
    const replyContent = replyContents[postId];
    if (replyContent?.trim() && user) {
      try {
        const postRef = doc(firestore, 'forum_posts', postId);
        const targetPost = posts.find(post => post.id === postId);
        if (targetPost) {
          const newReply = {
            id: Date.now(),
            author: user.displayName || 'Anonymous',
            authorId: user.uid,
            avatar: user.photoURL || '/placeholder.svg?height=32&width=32',
            content: replyContent,
            likes: 0,
            likedBy: [],
            createdAt: new Date().toISOString()
          };
          
          await updateDoc(postRef, {
            replies: [...targetPost.replies, newReply]
          });
          
          setReplyContents({ ...replyContents, [postId]: '' });
        }
      } catch (error) {
        console.error('Error creating reply:', error);
      }
    }
  };

  const deletePost = async (postId) => {
    if (!user) return;
    try {
      const postRef = doc(firestore, 'forum_posts', postId);
      await deleteDoc(postRef);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const deleteReply = async (postId, replyId) => {
    if (!user) return;
    try {
      const postRef = doc(firestore, 'forum_posts', postId);
      const targetPost = posts.find(post => post.id === postId);
      if (targetPost) {
        const updatedReplies = targetPost.replies.filter(reply => reply.id !== replyId);
        await updateDoc(postRef, { replies: updatedReplies });
      }
    } catch (error) {
      console.error('Error deleting reply:', error);
    }
  };

  const likePost = async (postId) => {
    if (!user) return;
    try {
      const postRef = doc(firestore, 'forum_posts', postId);
      const targetPost = posts.find(post => post.id === postId);
      if (targetPost) {
        const hasLiked = targetPost.likedBy?.includes(user.uid);
        const newLikedBy = hasLiked 
          ? targetPost.likedBy.filter(id => id !== user.uid)
          : [...(targetPost.likedBy || []), user.uid];
        
        await updateDoc(postRef, {
          likes: newLikedBy.length,
          likedBy: newLikedBy
        });
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const likeReply = async (postId, replyId) => {
    if (!user) return;
    try {
      const postRef = doc(firestore, 'forum_posts', postId);
      const targetPost = posts.find(post => post.id === postId);
      if (targetPost) {
        const updatedReplies = targetPost.replies.map(reply => {
          if (reply.id === replyId) {
            const hasLiked = reply.likedBy?.includes(user.uid);
            const newLikedBy = hasLiked
              ? reply.likedBy.filter(id => id !== user.uid)
              : [...(reply.likedBy || []), user.uid];
            
            return {
              ...reply,
              likes: newLikedBy.length,
              likedBy: newLikedBy
            };
          }
          return reply;
        });
        
        await updateDoc(postRef, { replies: updatedReplies });
      }
    } catch (error) {
      console.error('Error liking reply:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div>
      <UserHeader />
    <div className="max-w-2xl mx-auto p-4 space-y-6 bg-gray-50 min-h-screen mt-10 ">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Discussions</h1>
      
      {user && (
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
          <div className="flex items-center space-x-4">
            <img 
              src="download.png" 
              alt="Your avatar" 
              className="w-12 h-12 rounded-full"
            />
            <input
              type="text"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Start a discussion..."
              className="flex-grow p-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={createPost}
              className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2 transition duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Post</span>
            </button>
          </div>
        </div>
      )}

      {posts.map(post => (
        <div key={post.id} className="bg-white rounded-xl shadow-sm p-4 space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex space-x-3">
              <img src="download.png" alt={post.author} className="w-10 h-10 rounded-full" />
              <div>
                <h3 className="font-semibold text-gray-800">{post.author}</h3>
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </p>
                <p className="text-gray-600 mt-1">{post.content}</p>
              </div>
            </div>
            {user?.uid === post.authorId && (
              <button 
                onClick={() => deletePost(post.id)}
                className="text-gray-400 hover:text-red-500 focus:outline-none"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="flex items-center space-x-4 text-gray-500">
            <button 
              onClick={() => likePost(post.id)} 
              className={`flex items-center space-x-1 transition duration-200 ${
                post.likedBy?.includes(user?.uid) ? 'text-red-500' : 'hover:text-red-500'
              }`}
            >
              <Heart className="w-5 h-5" fill={post.likedBy?.includes(user?.uid) ? 'currentColor' : 'none'} />
              <span>{post.likes}</span>
            </button>
            <div className="flex items-center space-x-1">
              <MessageSquare className="w-5 h-5" />
              <span>{post.replies?.length || 0}</span>
            </div>
          </div>

          {/* Replies */}
          <div className="pl-12 space-y-4">
            {post.replies?.map(reply => (
              <div key={reply.id} className="flex space-x-3">
                <img src="download.png" alt={reply.author} className="w-8 h-8 rounded-full" />
                <div className="flex-grow">
                  <div className="bg-gray-100 rounded-2xl p-3">
                    <h4 className="font-semibold text-gray-800">{reply.author}</h4>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                    </p>
                    <p className="text-gray-600 mt-1">{reply.content}</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <button 
                      onClick={() => likeReply(post.id, reply.id)}
                      className={`flex items-center space-x-1 transition duration-200 ${
                        reply.likedBy?.includes(user?.uid) ? 'text-red-500' : 'hover:text-red-500'
                      }`}
                    >
                      <Heart className="w-4 h-4" fill={reply.likedBy?.includes(user?.uid) ? 'currentColor' : 'none'} />
                      <span>{reply.likes}</span>
                    </button>
                    {user?.uid === reply.authorId && (
                      <button
                        onClick={() => deleteReply(post.id, reply.id)}
                        className="flex items-center space-x-1 hover:text-red-500 transition duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Create new reply */}
          {user && (
            <div className="flex items-center space-x-3 pl-12">
              <img 
                src="download.png" 
                alt="Your avatar" 
                className="w-8 h-8 rounded-full"
              />
              <input
                type="text"
                value={replyContents[post.id] || ''}
                onChange={(e) => setReplyContents({ ...replyContents, [post.id]: e.target.value })}
                placeholder="Write a reply..."
                className="flex-grow p-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
              <button
                onClick={() => createReply(post.id)}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      ))}

      {posts.length === 0 && (
        <div className="text-center text-gray-500 mt-12">
          <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-xl font-semibold">No discussions yet</p>
          <p className="mt-2">Be the first to start a conversation!</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default DiscussionForumPage;