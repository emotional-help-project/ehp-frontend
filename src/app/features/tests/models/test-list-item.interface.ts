export interface TestListItem {
  id?: number;
  title: string;
  description: string;
  imgUrl: string;
  testType: TestType;
}
export interface TestType {
  id:number;
  title: string;
}