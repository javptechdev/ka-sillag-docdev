import React from 'react';
import { getGreeting } from '@/data/dummy-data';

export const Greetings: React.FC = () => {
  const greeting = getGreeting();

  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-primary mb-2">
        {greeting}
      </h2>
      <p className="text-lg text-muted-foreground">
        Maglog-in Para Magpatuloy
      </p>
    </div>
  );
};
