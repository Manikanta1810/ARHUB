import React, { useState } from 'react';
import { Globe } from 'lucide-react';

const TopLanguageBar = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese (Simplified)' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'nl', name: 'Dutch' },
    { code: 'pl', name: 'Polish' },
    { code: 'tr', name: 'Turkish' },
    { code: 'vi', name: 'Vietnamese' },
    { code: 'th', name: 'Thai' },
    { code: 'sv', name: 'Swedish' },
    { code: 'da', name: 'Danish' },
    { code: 'fi', name: 'Finnish' },
    { code: 'el', name: 'Greek' },
    { code: 'cs', name: 'Czech' },
    { code: 'ro', name: 'Romanian' },
    { code: 'hu', name: 'Hungarian' }
  ];

  const handleLanguageChange = async (languageCode) => {
    setSelectedLanguage(languageCode);
    try {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('languageChange', { 
          detail: { language: languageCode } 
        }));
      }
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <div className="w-full bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end h-8 items-center">
          <div className="relative inline-block text-left">
            <div className="group">
              <button
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
                aria-expanded="true"
                aria-haspopup="true"
              >
                <Globe className="w-4 h-4 mr-1" />
                <span className="mr-1">
                  {languages.find(lang => lang.code === selectedLanguage)?.name || 'Select Language'}
                </span>
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute right-0 z-50 mt-1 hidden group-hover:block">
                <div className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1 max-h-96 overflow-y-auto w-48">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={`block px-4 py-1.5 text-sm w-full text-left ${
                          selectedLanguage === language.code
                            ? 'bg-slate-50 text-gray-900'
                            : 'text-gray-700 hover:bg-slate-50'
                        }`}
                      >
                        {language.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopLanguageBar;