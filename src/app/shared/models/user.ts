export interface User {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  age?: number;
  userId?: string;
  token?: string;
  isAdmin?: boolean;
  role?: string;
  id?: number;
}

export interface TokenPayload {
  exp: number;
  iat: number;
  id: string;
  username: string;
  role: string[];
}
