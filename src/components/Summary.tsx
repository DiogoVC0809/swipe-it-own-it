
import React, { useState } from 'react';
import { ShoppingBag, Home, RotateCcw, TrendingUp, User } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface Decision {
  objectName: string;
  choice: 'Buy' | 'Rent';
  timestamp: string;
}

interface SummaryProps {
  decisions: Decision[];
  onReset: () => void;
}

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

const Summary: React.FC<SummaryProps> = ({ decisions, onReset }) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const buyDecisions = decisions.filter(d => d.choice === 'Buy');
  const rentDecisions = decisions.filter(d => d.choice === 'Rent');
  
  const buyPercentage = Math.round((buyDecisions.length / decisions.length) * 100);
  const rentPercentage = Math.round((rentDecisions.length / decisions.length) * 100);

  const handleInputChange = (field: keyof ContactInfo, value: string) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    const surveyData = {
      timestamp: new Date().toISOString(),
      decisions,
      contactInfo,
      summary: {
        totalDecisions: decisions.length,
        buyDecisions: buyDecisions.length,
        rentDecisions: rentDecisions.length,
        buyPercentage,
        rentPercentage
      }
    };

    // Convert to JSON and trigger download
    const jsonString = JSON.stringify(surveyData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `buy-rent-survey-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setIsSubmitted(true);
    console.log('Survey data saved:', surveyData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Your Results! 🎉
          </h1>
          <p className="text-white/80 text-lg">
            Here's how you decided on {decisions.length} items
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <ShoppingBag size={24} className="text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{buyDecisions.length}</h3>
            <p className="text-white/80">Items to Buy</p>
            <p className="text-white/60 text-sm">{buyPercentage}%</p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <Home size={24} className="text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{rentDecisions.length}</h3>
            <p className="text-white/80">Items to Rent</p>
            <p className="text-white/60 text-sm">{rentPercentage}%</p>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <TrendingUp className="mr-2" size={20} />
            Detailed Breakdown
          </h3>
          
          <div className="space-y-3">
            {decisions.map((decision, index) => (
              <div key={index} className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                <span className="text-white font-medium">{decision.objectName}</span>
                <div className="flex items-center space-x-2">
                  <div className={`
                    px-3 py-1 rounded-full text-xs font-bold text-white
                    ${decision.choice === 'Buy' ? 'bg-green-500' : 'bg-red-500'}
                  `}>
                    {decision.choice}
                  </div>
                  <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center
                    ${decision.choice === 'Buy' ? 'bg-green-500' : 'bg-red-500'}
                  `}>
                    {decision.choice === 'Buy' ? 
                      <ShoppingBag size={12} className="text-white" /> : 
                      <Home size={12} className="text-white" />
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">💡 Your Shopping Style</h3>
          {buyPercentage > 70 && (
            <p className="text-white/90">
              You're a <strong>Buyer</strong>! You prefer to own things and have them readily available. 
              You value long-term ownership and convenience.
            </p>
          )}
          {rentPercentage > 70 && (
            <p className="text-white/90">
              You're a <strong>Renter</strong>! You prefer flexibility and trying things before committing. 
              You value experiences over ownership.
            </p>
          )}
          {buyPercentage >= 30 && buyPercentage <= 70 && (
            <p className="text-white/90">
              You're <strong>Balanced</strong>! You carefully consider whether to buy or rent based on 
              the specific item and your needs. Smart approach!
            </p>
          )}
        </div>

        {/* Contact Form */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <User className="mr-2" size={20} />
            Contact Information
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-white/90">Name</Label>
              <Input
                id="name"
                type="text"
                value={contactInfo.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="Your full name"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-white/90">Email</Label>
              <Input
                id="email"
                type="email"
                value={contactInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-white/90">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={contactInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="(+351) 912 345 678"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!contactInfo.name || !contactInfo.email || isSubmitted}
              className="w-full bg-white text-purple-600 px-6 py-3 rounded-xl font-bold
                       hover:bg-white/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitted ? 'Data Saved! ✓' : 'Thank You! We Hope To See You Again!'}
            </button>
          </div>
        </div>

        {/* Reset Button */}
        <div className="text-center">
          <button
            onClick={onReset}
            className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg
                     hover:bg-white/90 transition-all duration-200 transform hover:scale-105
                     flex items-center space-x-2 mx-auto shadow-lg"
          >
            <RotateCcw size={20} />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
