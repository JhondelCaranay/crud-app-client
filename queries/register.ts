import api from "@/lib/api";

type User = {
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

export const createUser = (data: CreateUser): Promise<User> =>
  api.post("auth/register", data).then((res) => res.data);
