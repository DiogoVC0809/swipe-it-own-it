import React, { useState } from 'react';
import { ShoppingBag, Home, RotateCcw, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // <== importado

interface Decision {
  objectName: string;
  choice: 'Buy' | 'Rent';
  timestamp: string;
}

interface SummaryProps {
  decisions: Decision[];
  onReset: () => void;
}

const Summary: React.FC<SummaryProps> = ({ decisions, onReset }) => {
  const { t } = useTranslation(); // <== usado
  const [isSubmitted, setIsSubmitted] = useState(false);

  const buyDecisions = decisions.filter(d => d.choice === 'Buy');
  const rentDecisions = decisions.filter(d => d.choice === 'Rent');

  const buyPercentage = Math.round((buyDecisions.length / decisions.length) * 100);
  const rentPercentage = Math.round((rentDecisions.length / decisions.length) * 100);

  const navigate = useNavigate();

  const handleSubmit = () => {
    setIsSubmitted(true);
    navigate('/feedback-form', { state: { decisions } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {t('summaryTitle')} 🎉
          </h1>
          <p className="text-white/80 text-lg">
            {t('summarySubtitle', { count: decisions.length })}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <ShoppingBag size={24} className="text-white" />
              </div>

            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{buyDecisions.length}</h3>
            <p className="text-white/80">{t('itemsToBuy')}</p>
            <p className="text-white/60 text-sm">{buyPercentage}%</p>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Home size={24} className="text-white" />
              </div>

            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{rentDecisions.length}</h3>
            <p className="text-white/80">{t('itemsToRent')}</p>
            <p className="text-white/60 text-sm">{rentPercentage}%</p>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <TrendingUp className="mr-2" size={20} />
            {t('detailedBreakdown')}
          </h3>

          <div className="space-y-3">
            {decisions.map((decision, index) => (
              <div key={index} className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                <span className="text-white font-medium">{decision.objectName}</span>
                <div className="flex items-center space-x-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold text-white ${decision.choice === 'Buy' ? 'bg-red-500' : 'bg-green-500'}`}>
                    {decision.choice}
                  </div>

                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${decision.choice === 'Buy' ? 'bg-red-500' : 'bg-green-500'}`}>
                    {decision.choice === 'Buy' ? <ShoppingBag size={12} className="text-white" /> : <Home size={12} className="text-white" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mb-8">
          <button
            onClick={handleSubmit}
            disabled={isSubmitted}
            className="w-full bg-white text-purple-600 px-6 py-3 rounded-xl font-bold hover:bg-white/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitted ? t('redirectingFeedback') : t('proceedToFeedback')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
