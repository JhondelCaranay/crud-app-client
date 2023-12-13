"use client";

import useCurrentUser from "@/components/hooks/useCurrentUser";
import { isAxiosError } from "axios";
import { redirect } from "next/navigation";

const Home = () => {
  const { data, error } = useCurrentUser();

  if (isAxiosError(error) && error.response?.status === 401) {
    redirect("/login");
  }

  console.log("🚀 ~ file: page.tsx:5 ~ Home ~ user:", data);
  return <div>Home</div>;
};
export default Home;
