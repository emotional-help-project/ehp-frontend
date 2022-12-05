export interface Test {
  totalNumberOfTestQuestions: number;
  items: {
      questionId: number;
      allowsMultipleAnswers: boolean;
      questionText: string;
      answers:
        {
          answerId: number;
          answerText: string;
          checked: boolean;
        }[];
    }[];
}
