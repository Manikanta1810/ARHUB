import React, { useEffect } from 'react';

const TranslateHeader = () => {
  useEffect(() => {
    const addScript = () => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
          includedLanguages: '', // Leave empty for all languages
        },
        'google_translate_element'
      );
    };

    addScript();

    return () => {
      const script = document.querySelector('script[src*="translate.google.com"]');
      if (script) {
        document.body.removeChild(script);
      }
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-end py-2">
          <div id="google_translate_element" />
        </div>
      </div>

      <style jsx global>{`
        .goog-te-gadget {
          color: transparent !important;
          font-size: 0 !important;
        }

        .goog-te-gadget .goog-te-combo {
          color: #374151;
          border: 1px solid #D1D5DB;
          border-radius: 0.375rem;
          padding: 0.25rem 2rem 0.25rem 0.75rem;
          font-size: 0.875rem;
          line-height: 1.25rem;
          background-color: white;
          cursor: pointer;
          outline: none;
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.5rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
        }

        .goog-te-gadget .goog-te-combo:focus {
          border-color: #3B82F6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
        }

        .goog-te-banner-frame {
          display: none !important;
        }

        body {
          top: 0 !important;
        }

        .VIpgJd-ZVi9od-l4eHX-hSRGPd, 
        .VIpgJd-ZVi9od-l4eHX-hSRGPd:link, 
        .VIpgJd-ZVi9od-l4eHX-hSRGPd:visited, 
        .VIpgJd-ZVi9od-l4eHX-hSRGPd:hover, 
        .VIpgJd-ZVi9od-l4eHX-hSRGPd:active {
          display: none !important;
        }

        .goog-logo-link {
          display: none !important;
        }

        .goog-te-gadget img {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default TranslateHeader;