import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '../data/locales/en.json';
import thTranslations from '../data/locales/th.json';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        // Get saved language from localStorage or default to 'en'
        const saved = localStorage.getItem('colestia-language');
        return saved || 'en';
    });

    useEffect(() => {
        localStorage.setItem('colestia-language', language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'th' ? 'en' : 'th');
    };

    const t = (key) => {
        const translations = language === 'th' ? thTranslations : enTranslations;
        return translations[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;
