import React from 'react';
import Navigator from './navigation';
import { QuizProvider } from './context/QuizContext';

export type RootStackParamList = {
  Quiz: undefined;
  Result: { total: number; score: number };
};

export default function App() {
  return (
    <QuizProvider>
      <Navigator />
    </QuizProvider>
  );
}
