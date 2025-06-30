import { useTranslation } from 'react-i18next';
import './LanguageSelection.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const selectLanguage = (lang: 'pt' | 'en') => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="language-selection">
      <div className="flags">
        <img
          src="/flags/pt.png"
          alt="Português"
          onClick={() => selectLanguage('pt')}
        />
        <img
          src="/flags/en.png"
          alt="English"
          onClick={() => selectLanguage('en')}
        />
      </div>
    </div>
  );
};

export default LanguageSwitcher;
