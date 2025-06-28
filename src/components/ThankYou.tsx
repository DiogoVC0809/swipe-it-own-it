import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom'; // Importando o useNavigate

interface ThankYouProps {
  onReset: () => void;  // Passar a função onReset (agora vamos redirecionar a navegação também)
}

const ThankYou: React.FC<ThankYouProps> = ({ onReset }) => {
  const navigate = useNavigate();  // Usar o hook useNavigate para navegação

  // Função para redirecionar para a página inicial
  const handleReset = () => {
    onReset();  // Chama o reset que você já tem, se necessário
    navigate('/');  // Redireciona para a página inicial
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-blue-50">
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-blue-500 mb-4">
            Thank You for Joining Our Waiting List!
          </h1>
          <p className="text-gray-600 mb-6">
            We'll keep you updated on our rental app progress and let you know when we launch!
          </p>
          <div className="text-sm text-gray-500">
            Feel free to share this with friends who might be interested in renting instead of buying!
          </div>

          {/* Botão "Try Again" */}
          <div className="text-center mt-8">
            <button
              onClick={handleReset}  // Agora chama a função handleReset
              className="bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 mx-auto shadow-lg"
            >
              <RotateCcw size={20} />
              <span>Try Again</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThankYou;
