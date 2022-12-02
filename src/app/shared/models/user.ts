export interface User {
    email?: string;
    password?: string;
    firstName?: string;
    userId?: string;
    token?: string;
    isAdmin?:boolean;
  }

export interface TokenPayload {
  exp: number;
  iat:number;
  id: string;
  username: string;
  role: string[];
}