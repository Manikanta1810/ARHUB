import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import UserHeader from '../../components/UserComponents/UserHeader';
import { useTheme } from '../../contexts/ThemeContext';

const AboutusPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isDarkTheme } = useTheme();

  const teamMembers = [
    { name: 'Hasini Priya Perepogu', role: 'Full Stack Developer', image: 'https://wallpapersok.com/images/high/cute-girl-vector-art-profile-picture-jhbu3wt713zj2bti.jpg' },
    { name: 'Sushmitha Bungatavula', role: 'Full Stack Developer', image: 'https://wallpapersok.com/images/high/cute-girl-vector-art-profile-picture-jhbu3wt713zj2bti.jpg' },
    { name: 'Manikanta Nadendla', role: 'Full Stack Developer', image: 'https://i.pinimg.com/564x/55/8c/2a/558c2a5e3a5cc81b1961cbe40369e419.jpg' },
    { name: 'Karan Patel', role: 'Full Stack Developer', image: 'https://i.pinimg.com/564x/55/8c/2a/558c2a5e3a5cc81b1961cbe40369e419.jpg' },
  ];

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <UserHeader />
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.idfreshfood.com/wp-content/uploads/2017/09/contact_us_2.jpg"
            alt="Accessibility technology background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4"
          >
            About AR HUB
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-200 mb-8"
          >
            Making Technology Accessible for Everyone
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown
            className="w-12 h-12 text-white animate-bounce cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          />
        </motion.div>
      </section>

      {/* Mission Statement */}
      <section className={`py-20 px-4 md:px-0 ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto max-w-4xl">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            Our Mission
          </h2>
          <p className={`text-lg md:text-xl text-center mb-12 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
            At AR HUB, we're dedicated to breaking down barriers in digital accessibility. 
            Our platform connects users with assistive technologies, fostering an inclusive digital environment 
            where everyone can access and benefit from modern technology.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-6 rounded-lg shadow-lg text-center ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="text-xl font-semibold mb-4">Accessibility</h3>
              <p>Making digital resources available to everyone, regardless of abilities.</p>
            </div>
            <div className={`p-6 rounded-lg shadow-lg text-center ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="text-xl font-semibold mb-4">Resources</h3>
              <p>Providing comprehensive tools and information for assistive technologies.</p>
            </div>
            <div className={`p-6 rounded-lg shadow-lg text-center ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="text-xl font-semibold mb-4">Community</h3>
              <p>Building a supportive network for sharing experiences and knowledge.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`py-20 ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 ${
                  isDarkTheme ? 'bg-gray-700' : 'bg-white'
                }`}
              >
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className={`text-xl font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                    {member.name}
                  </h3>
                  <p className={isDarkTheme ? 'text-gray-300' : 'text-gray-600'}>
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className={`py-20 px-4 md:px-0 ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto max-w-4xl">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            Our Story
          </h2>
          <div className={`rounded-lg shadow-lg p-6 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
            <p className="text-lg mb-4">
              AR HUB was born from the vision of making assistive technologies more accessible and understandable for everyone. 
              We recognized the need for a centralized platform that connects users with the right tools and resources.
            </p>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-lg mb-4">
                  Our platform has evolved to become a comprehensive resource hub, featuring curated assistive technologies,
                  educational resources, and a vibrant community forum where users can share experiences and insights.
                </p>
                <p className="text-lg">
                  Looking ahead, we're committed to expanding our resources, enhancing user experience, and continuing to make
                  digital accessibility a reality for everyone.
                </p>
              </motion.div>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`mt-4 font-semibold flex items-center ${
                isDarkTheme ? 'text-blue-400' : 'text-blue-600'
              }`}
            >
              {isExpanded ? 'Read Less' : 'Read More'}
              <ChevronDown className={`ml-2 w-5 h-5 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutusPage;