export interface TestListItem {
  id?: number;
  title: string;
  description: string;
  imageUrl: string;
  testType: {
    id: number;
    title: string;
  };
}
export interface TestList {
  id?: number;
  title: string;
  description: string;
  imageUrl: string;
  testType: TestType[];
}
export interface TestType {
  id:number;
  title: string;
}