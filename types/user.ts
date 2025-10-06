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
