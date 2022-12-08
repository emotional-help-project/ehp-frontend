export interface testResult {
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