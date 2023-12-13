import api from "@/lib/api";

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

type CreateUser = {
  name: string;
  email: string;
  password: string;
};

type LoginUser = {
  email: string;
  password: string;
};

export const createUser = (data: CreateUser): Promise<User> =>
  api.post("auth/register", data).then((res) => res.data);

export const loginUser = (data: LoginUser): Promise<{ accessToken: string }> =>
  api.post("auth/login", data).then((res) => res.data);
