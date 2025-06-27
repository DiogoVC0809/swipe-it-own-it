
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-blue-50">
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-green-700 mb-4">
            Thank You for Joining Our Waiting List!
          </h1>
          <p className="text-gray-600 mb-6">
            We'll keep you updated on our rental app progress and let you know when we launch!
          </p>
          <div className="text-sm text-gray-500">
            Feel free to share this with friends who might be interested in renting instead of buying!
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThankYou;
