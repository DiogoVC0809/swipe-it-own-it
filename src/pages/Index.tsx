import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SwipeCard from '../components/SwipeCard';
import Summary from '../components/Summary';
import { ShoppingBag, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Decision {
  objectName: string;
  choice: 'Buy' | 'Rent';
  timestamp: string;
}

const Index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Verifica se há idioma selecionado
  useEffect(() => {
    const storedLang = localStorage.getItem('selectedLanguage');
    if (!storedLang) {
      navigate('/select-language');
    }
  }, [navigate]);

  const objects = [
    { id: 1, name: t('object.cementMixer.name'), emoji: '🔨', description: t('object.cementMixer.description') },
    { id: 2, name: t('object.scaffolding.name'), emoji: '🏗️', description: t('object.scaffolding.description') },
    { id: 3, name: t('object.paddleboard.name'), emoji: '🏄‍♀️', description: t('object.paddleboard.description') },
    { id: 4, name: t('object.camperVan.name'), emoji: '🚐', description: t('object.camperVan.description') },
    { id: 5, name: t('object.vacuum.name'), emoji: '🧹', description: t('object.vacuum.description') },
    { id: 6, name: t('object.thermomix.name'), emoji: '🍲', description: t('object.thermomix.description') },
    { id: 7, name: t('object.boat.name'), emoji: '⛵', description: t('object.boat.description') }
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (animating) return;

    setAnimating(true);
    const choice = direction === 'right' ? 'Buy' : 'Rent';
    const newDecision: Decision = {
      objectName: objects[currentCardIndex].name,
      choice,
      timestamp: new Date().toISOString()
    };

    const updatedDecisions = [...decisions, newDecision];
    setDecisions(updatedDecisions);
    localStorage.setItem('swipeDecisions', JSON.stringify(updatedDecisions));

    setTimeout(() => {
      if (currentCardIndex < objects.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
      } else {
        setShowSummary(true);
      }
      setAnimating(false);
    }, 600);
  };

  const resetGame = () => {
    setCurrentCardIndex(0);
    setDecisions([]);
    setShowSummary(false);
    localStorage.removeItem('swipeDecisions');
  };

  useEffect(() => {
    const saved = localStorage.getItem('swipeDecisions');
    if (saved) {
      const parsedDecisions = JSON.parse(saved);
      setDecisions(parsedDecisions);
      if (parsedDecisions.length >= objects.length) {
        setShowSummary(true);
      } else {
        setCurrentCardIndex(parsedDecisions.length);
      }
    }
  }, []);

  if (showSummary) {
    return <Summary decisions={decisions} onReset={resetGame} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          {t('title')} 🤔
        </h1>
        <p className="text-white/80 text-lg">
          {t('instruction')}
        </p>
      </div>

      <div className="w-full max-w-md mb-6">
        <div className="bg-white/20 rounded-full h-2 overflow-hidden">
          <div
            className="bg-white h-full transition-all duration-300 ease-out"
            style={{ width: `${((currentCardIndex) / objects.length) * 100}%` }}
          />
        </div>
        <p className="text-white/80 text-sm mt-2 text-center">
          {currentCardIndex + 1} {t('of')} {objects.length}
        </p>
      </div>

      <div className="relative w-full max-w-sm h-96 mb-8">
        {objects.slice(currentCardIndex, currentCardIndex + 3).map((object, index) => (
          <SwipeCard
            key={object.id}
            object={object}
            index={index}
            onSwipe={index === 0 ? handleSwipe : undefined}
            isAnimating={animating && index === 0}
          />
        ))}
      </div>

      <div className="flex justify-center space-x-8 text-white/80">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <Home size={16} />
          </div>
          <span>{t('swipeLeft')}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <ShoppingBag size={16} />
          </div>
          <span>{t('swipeRight')}</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
