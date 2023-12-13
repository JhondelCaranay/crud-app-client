"use client";

import { Loader } from "@/components/Loader";
import { Sidebar } from "@/components/dashboard/Sidebar";
import useCurrentUser from "@/components/hooks/useCurrentUser";
import { isAxiosError } from "axios";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};
const MainLayout = ({ children }: Props) => {
  const { data: user, error, isPending } = useCurrentUser();

  if (isAxiosError(error) && error.response?.status === 401) {
    redirect("/login");
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="h-screen w-full">
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 h-full">{children}</main>
    </div>
  );
};
export default MainLayout;
