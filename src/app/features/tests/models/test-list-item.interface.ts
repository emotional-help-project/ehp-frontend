export interface TestListItem {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
  testType: {
    id: number;
    title: string;
  };
}
