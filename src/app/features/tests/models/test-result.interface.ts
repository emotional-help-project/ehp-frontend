export interface TestResult {
      adviceDescription: string;
      scoreFrom: number;
      scoreTo: number;
      userScore: number;
      links: {
              id: number;
              title: string;
              link: string;
          }[];
  }