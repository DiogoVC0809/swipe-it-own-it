
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface FeedbackData {
  mostWantedRental: string;
  appRating: string;
  name: string;
  contact: string;
}

interface FeedbackFormProps {
  onSubmit: (feedback: FeedbackData) => void;
}

const FeedbackForm = ({ onSubmit }: FeedbackFormProps) => {
  const [feedback, setFeedback] = useState<FeedbackData>({
    mostWantedRental: '',
    appRating: '',
    name: '',
    contact: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Submit to Google Sheets using the new endpoint
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxYXs6tHWb3ve3Dpt3nYKuWEThcJRb4MnD065DgGvy6UgAoVFwXw1-za4OKXz6l1_tIIg/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: feedback.name,
          contact: feedback.contact,
          mostWantedRental: feedback.mostWantedRental,
          appRating: feedback.appRating,
          timestamp: new Date().toISOString()
        })
      });

      console.log('Feedback submitted successfully');
      alert('Thank you for your feedback!');
      onSubmit(feedback);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Thank you for your feedback! We are currently experiencing issues with the submission. Please try again later.');
      onSubmit(feedback);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Quick Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="rental">What would you like to rent the most?</Label>
              <Textarea
                id="rental"
                placeholder="e.g., GoPro for weekend adventures..."
                value={feedback.mostWantedRental}
                onChange={(e) => setFeedback(prev => ({ ...prev, mostWantedRental: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label>Would you use a rental app like this?</Label>
              <RadioGroup
                value={feedback.appRating}
                onValueChange={(value) => setFeedback(prev => ({ ...prev, appRating: value }))}
                className="flex flex-row justify-between mt-2"
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <div key={rating} className="flex flex-col items-center space-y-1">
                    <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                    <Label htmlFor={`rating-${rating}`} className="text-sm">{rating}</Label>
                  </div>
                ))}
              </RadioGroup>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Not at all</span>
                <span>Definitely</span>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold text-purple-700">Join our waiting list!</h3>
              
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={feedback.name}
                  onChange={(e) => setFeedback(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="contact">Email or Phone</Label>
                <Input
                  id="contact"
                  type="text"
                  placeholder="Email or Phone"
                  value={feedback.contact}
                  onChange={(e) => setFeedback(prev => ({ ...prev, contact: e.target.value }))}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackForm;
