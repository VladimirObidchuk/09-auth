export type User = {
  id: string;
  email: string;
  password: string;
  username?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export interface LoginResponse {
  userName: string;
  email: string;
  avatar?: string;
  accessToken: string;
  refreshToken: string;
}
