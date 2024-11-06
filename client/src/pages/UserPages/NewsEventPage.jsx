import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { Loader2 } from 'lucide-react';
import UserHeader from '../../components/UserComponents/UserHeader';

const NewsEventPage = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsRef = collection(firestore, 'news_articles');
        const q = query(newsRef, orderBy('uploadDate', 'desc'));
        const querySnapshot = await getDocs(q);
        const articles = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNewsArticles(articles);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news articles');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div>
        <UserHeader />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">News & Events</h1>
      
      <div className="grid grid-cols-12 gap-4 auto-rows-[200px]">
        {newsArticles.map((article, index) => {
          // Define different layouts based on index
          let gridClass = "";
          
          switch (index % 6) {
            case 0: // Item 1
              gridClass = "col-span-12 row-span-1";
              break;
            case 1: // Item 2
              gridClass = "col-span-6 row-span-2";
              break;
            case 2: // Item 3
              gridClass = "col-span-6 row-span-1";
              break;
            case 3: // Item 4
              gridClass = "col-span-4 row-span-1";
              break;
            case 4: // Item 5
              gridClass = "col-span-2 row-span-1";
              break;
            case 5: // Item 6
              gridClass = "col-span-6 row-span-1";
              break;
            default:
              gridClass = "col-span-12 row-span-1";
          }

          return (
            <div
              key={article.id}
              className={`${gridClass} group relative overflow-hidden rounded-lg`}
            >
              <img
                src={article.coverImageUrl}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = '/api/placeholder/400/320';
                  e.target.alt = 'Image not available';
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 transition-opacity group-hover:opacity-100">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-200 text-sm mb-2 line-clamp-2 hidden group-hover:block">
                    {article.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">
                      {new Date(article.uploadDate).toLocaleDateString()}
                    </span>
                    
                    <a
                      href={article.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                    >
                      {article.linkText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
};

export default NewsEventPage;