"use client";

import { Loader } from "@/components/Loader";
import useCurrentUser from "@/components/hooks/useCurrentUser";
import { isAxiosError } from "axios";
import { redirect } from "next/navigation";

const Home = () => {
  const { data: user, error, isFetching } = useCurrentUser();

  if (isAxiosError(error) && error.response?.status === 401) {
    redirect("/login");
  }

  if (isFetching) {
    return <Loader />;
  }

  return <div>Home</div>;
};
export default Home;
