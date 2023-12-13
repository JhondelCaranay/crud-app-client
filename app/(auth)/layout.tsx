"use client";

import { Loader } from "@/components/Loader";
import useCurrentUser from "@/components/hooks/useCurrentUser";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};
const AuthLayout = ({ children }: Props) => {
  const { data, isFetching } = useCurrentUser();

  if (isFetching) {
    return <Loader />;
  }

  if (data) {
    return redirect("/");
  }

  return (
    <div className="h-screen w-full flex justify-center items-center   bg-gradient-to-tr from-blue-500 to-purple-500">
      {children}
    </div>
  );
};
export default AuthLayout;
