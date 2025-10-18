import React, { createContext, useContext, useState } from 'react';
import { Question, QuizContextType } from '../types/quiz';
import data from '../data/question.json';
const QuizContext = createContext<QuizContextType | null>(null);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [questions, setQuestions] = useState<Question[]>(data);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const selectAnswer = (selected: string) => {
    const updated = [...questions];
    if (!updated[currentIndex].userAnswer) {
      updated[currentIndex].userAnswer = selected;
      setQuestions(updated);
    }
    if (selected === updated[currentIndex].answer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentIndex,
        score,
        selectAnswer,
        nextQuestion,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext)!;
