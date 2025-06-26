
import React, { useState, useEffect } from 'react';
import SwipeCard from '../components/SwipeCard';
import Summary from '../components/Summary';
import { ShoppingBag, Home } from 'lucide-react';

interface Decision {
  objectName: string;
  choice: 'Buy' | 'Rent';
  timestamp: string;
}

const objects = [
  { id: 1, name: 'Camping Tent', emoji: '⛺', description: 'Perfect for outdoor adventures' },
  { id: 2, name: 'GoPro Camera', emoji: '📹', description: 'Capture life in stunning detail' },
  { id: 3, name: 'Projector', emoji: '📽️', description: 'Big screen entertainment anywhere' },
  { id: 4, name: 'Electric Scooter', emoji: '🛴', description: 'Eco-friendly urban transport' },
  { id: 5, name: 'Coffee Machine', emoji: '☕', description: 'Barista-quality coffee at home' },
  { id: 6, name: 'Yoga Mat', emoji: '🧘‍♀️', description: 'Find your inner peace' },
  { id: 7, name: 'Gaming Chair', emoji: '🎮', description: 'Ultimate comfort for long sessions' },
  { id: 8, name: 'Bluetooth Speaker', emoji: '🔊', description: 'Premium sound on the go' }
];

const Index = () => {
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

    // Store in localStorage
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

  // Load decisions from localStorage on mount
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
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Buy or Rent? 🤔
        </h1>
        <p className="text-white/80 text-lg">
          Swipe right to buy, left to rent
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md mb-6">
        <div className="bg-white/20 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-white h-full transition-all duration-300 ease-out"
            style={{ width: `${((currentCardIndex) / objects.length) * 100}%` }}
          />
        </div>
        <p className="text-white/80 text-sm mt-2 text-center">
          {currentCardIndex + 1} of {objects.length}
        </p>
      </div>

      {/* Cards Stack */}
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

      {/* Instructions */}
      <div className="flex justify-center space-x-8 text-white/80">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <Home size={16} />
          </div>
          <span>Swipe left to rent</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <ShoppingBag size={16} />
          </div>
          <span>Swipe right to buy</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
