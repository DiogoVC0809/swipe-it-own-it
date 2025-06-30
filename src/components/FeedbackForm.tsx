import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTranslation } from 'react-i18next';

interface FeedbackData {
  mostWantedRental: string;
  appRating: string;
  name: string;
  contact: string;
  decisions: { objectName: string; choice: 'Buy' | 'Rent'; }[];
}

interface FeedbackFormProps {
  onSubmit: (feedback: FeedbackData) => void;
  decisions: { objectName: string; choice: 'Buy' | 'Rent'; timestamp: string }[];
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit, decisions }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState<FeedbackData>({
    mostWantedRental: '',
    appRating: '',
    name: '',
    contact: '',
    decisions: decisions.map(({ objectName, choice }) => ({ objectName, choice }))
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedSwipes = feedback.decisions.reduce((acc, decision, index) => {
      acc[`swipeQ${index + 1}`] = `${decision.objectName}: ${decision.choice}`;
      return acc;
    }, {} as Record<string, string>);

    try {
      await fetch('https://script.google.com/macros/s/AKfycbyVxrWRTOn4zGUDBqNWELjz-KiMixDnD5PO4Y1ovGJfRkTYHa-t0esYKF2g0cRBbPLIOg/exec', {
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
          timestamp: new Date().toISOString(),
          ...formattedSwipes
        })
      });

      onSubmit(feedback);
      navigate('/thank-you');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert(t('feedback.error'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-blue-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t('feedback.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="rental">{t('feedback.rentalLabel')}</Label>
              <Textarea
                id="rental"
                placeholder={t('feedback.rentalPlaceholder')}
                value={feedback.mostWantedRental}
                onChange={(e) => setFeedback(prev => ({ ...prev, mostWantedRental: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label>{t('feedback.ratingLabel')}</Label>
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
                <span>{t('feedback.ratingMin')}</span>
                <span>{t('feedback.ratingMax')}</span>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold text-purple-700">{t('feedback.joinTitle')}</h3>

              <div>
                <Label htmlFor="name">{t('feedback.nameLabel')}</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t('feedback.namePlaceholder')}
                  value={feedback.name}
                  onChange={(e) => setFeedback(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="contact">{t('feedback.contactLabel')}</Label>
                <Input
                  id="contact"
                  type="text"
                  placeholder={t('feedback.contactPlaceholder')}
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
              {t('feedback.submit')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackForm;
