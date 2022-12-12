export interface Question {
  questionTitle: string;
  questionNumber: number;
  testId: number;
  allowsMultipleAnswers: boolean;
  answers: Answer[];
}
export interface Answer {
  title: string;
  score: number;
}
