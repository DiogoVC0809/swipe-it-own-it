import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // <== importado

interface ThankYouProps {
  onReset: () => void;
}

const ThankYou: React.FC<ThankYouProps> = ({ onReset }) => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // <== usado

  const handleReset = () => {
    onReset();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-blue-50">
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-blue-500 mb-4">
            {t('thankTitle')}
          </h1>
          <p className="text-gray-600 mb-6">
            {t('thankBody')}
          </p>
          <div className="text-sm text-gray-500">
            {t('thankExtra')}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={handleReset}
              className="bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 mx-auto shadow-lg"
            >
              <RotateCcw size={20} />
              <span>{t('backToResults')}</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThankYou;
