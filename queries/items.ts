import api from "@/lib/api";

export type Item = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
};

export type CreateItem = {
  name: string;
  description: string;
};

export const getItems = (): Promise<Item[]> =>
  api.get("items").then((res) => res.data);

export const createItem = (item: CreateItem): Promise<Item> =>
  api.post("items", item).then((res) => res.data);
