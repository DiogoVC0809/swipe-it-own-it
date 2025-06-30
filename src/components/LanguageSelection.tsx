import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const LanguageSelection = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const selectLanguage = (lang: 'pt' | 'en') => {
    i18n.changeLanguage(lang);
    localStorage.setItem('selectedLanguage', lang);
    navigate('/'); // ir para a página principal
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 to-pink-400 text-white">

      <img
        src="public/images/logo.png"
        alt="Logo"
        className="w-64 h-auto mb-2"
      />

      <h2 className="text-2xl mb-8 text-center"><b>Escolha a sua língua</b></h2>
      <h2 className="text-2xl mb-8 text-center"><b>Choose your language</b></h2>

      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center">
          <span className="mb-2 text-lg"><b>Português</b></span>
          <img
            src="/flags/pt.png"
            alt="Português"
            onClick={() => selectLanguage('pt')}
            className="w-28 h-20 cursor-pointer rounded-full border-2 border-white hover:scale-110 transition"
          />
        </div>

        <div className="flex flex-col items-center">
          <span className="mb-2 text-lg"><b>English</b></span>
          <img
            src="/flags/en.png"
            alt="English"
            onClick={() => selectLanguage('en')}
            className="w-28 h-20 cursor-pointer rounded-full border-2 border-white hover:scale-110 transition"
          />
        </div>
      </div>
    </div>

  );
};

export default LanguageSelection;
