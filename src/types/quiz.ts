export type Question = {
  id: number;
  question: string;
  options: string[];
  answer: string;
  userAnswer?: string | null;
};

export interface QuizContextType {
  questions: Question[];
  currentIndex: number;
  score: number;
  selectAnswer: (selected: string) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
}
