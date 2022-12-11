export interface TestListItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  testType: {
    id: number;
    title: string;
  };
}
