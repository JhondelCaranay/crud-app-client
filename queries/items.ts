import api from "@/lib/api";

export type Item = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
};

export const getItems = (): Promise<Item[]> =>
  api.get("items").then((res) => res.data);
