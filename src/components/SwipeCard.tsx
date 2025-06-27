import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Home } from 'lucide-react';

interface Object {
  id: number;
  name: string;
  emoji: string;
  description: string;
}

interface SwipeCardProps {
  object: Object;
  index: number;
  onSwipe?: (direction: 'left' | 'right') => void;
  isAnimating?: boolean;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ object, index, onSwipe, isAnimating }) => {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const handleStart = (clientX: number, clientY: number) => {
    if (index !== 0 || !onSwipe) return;
    setIsDragging(true);
    startPos.current = { x: clientX, y: clientY };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || index !== 0) return;

    const deltaX = clientX - startPos.current.x;
    const deltaY = clientY - startPos.current.y;

    setDragOffset({ x: deltaX, y: deltaY });

    // Determine swipe direction
    if (Math.abs(deltaX) > 50) {
      setSwipeDirection(deltaX > 0 ? 'right' : 'left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleEnd = () => {
    if (!isDragging || index !== 0 || !onSwipe) return;

    setIsDragging(false);

    const threshold = 120;
    if (Math.abs(dragOffset.x) > threshold) {
      const direction = dragOffset.x > 0 ? 'right' : 'left';
      onSwipe(direction);
    } else {
      // Snap back to center
      setDragOffset({ x: 0, y: 0 });
      setSwipeDirection(null);
    }
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX, e.clientY);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleEnd();
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragOffset.x]);

  const rotation = dragOffset.x * 0.1;
  const opacity = Math.max(0.3, 1 - index * 0.2);
  const scale = Math.max(0.85, 1 - index * 0.05);
  const translateY = index * 8;

  const cardStyle = {
    transform: `
      translateX(${index === 0 ? dragOffset.x : 0}px) 
      translateY(${index === 0 ? dragOffset.y + translateY : translateY}px) 
      rotate(${index === 0 ? rotation : 0}deg) 
      scale(${scale})
      ${isAnimating && index === 0 ? `translateX(${swipeDirection === 'right' ? '400px' : '-400px'})` : ''}
    `,
    opacity,
    zIndex: 10 - index,
    transition: isDragging ? 'none' : isAnimating ? 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'transform 0.3s ease-out, opacity 0.3s ease-out'
  };

  return (
    
    <div className="inset-0 flex items-center justify-top-center">
      
      <div
        ref={cardRef}
        className={`
          w-full h-full bg-white rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing
          ${index === 0 ? 'touch-none' : 'pointer-events-none'}
        `}
        style={cardStyle}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >


        {/* Swipe Indicators */}
        {index === 0 && swipeDirection && (
          <>
            <div className={`absolute inset-0 rounded-2xl transition-opacity duration-200 ${swipeDirection === 'left' ? 'bg-red-500/20' : 'bg-green-500/20'}`} />
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center ${swipeDirection === 'left' ? 'bg-red-500' : 'bg-green-500'} text-white text-2xl transition-all duration-200`}>
              {swipeDirection === 'left' ? <Home size={32} /> : <ShoppingBag size={32} />}
            </div>
            <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-white font-bold text-lg ${swipeDirection === 'left' ? 'bg-red-500' : 'bg-green-500'}`}>
              {swipeDirection === 'left' ? 'RENT' : 'BUY'}
            </div>
          </>
        )}

        {/* Card Content */}
        <div className="p-8 h-full flex flex-col items-center justify-center text-center">
          <div className="text-8xl mb-6">{object.emoji}</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{object.name}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">{object.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SwipeCard;
