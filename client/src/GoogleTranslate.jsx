/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import { Globe, RotateCcw } from 'lucide-react';

const GoogleTranslate = () => {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.NONE,
        },
        'google_translate_element'
      );

      setTimeout(() => {
        const langSelect = document.querySelector('.goog-te-combo');
        if (langSelect) {
          const langs = Array.from(langSelect.options).map(option => ({
            code: option.value,
            name: option.text
          }));
          setLanguages(langs.filter(lang => lang.code !== ''));
        }
      }, 1000);
    };

    const addScript = () => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = googleTranslateElementInit;
    addScript();
  }, []);

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    const langSelect = document.querySelector('.goog-te-combo');
    if (langSelect) {
      langSelect.value = e.target.value;
      langSelect.dispatchEvent(new Event('change'));
    }
  };

  

  return (
    <div className="fixed top-0 right-0 m-4 z-50 flex items-center">
      <Globe className="mr-2 text-gray-600" size={20} />
      <select
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      >
        <option value="">Select Language</option>
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      <div id="google_translate_element" className="hidden"></div>
    </div>
  );
};

export default GoogleTranslate;