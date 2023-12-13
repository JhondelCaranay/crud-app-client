"use client";

import { Loader } from "@/components/Loader";
import { Navbar } from "@/components/dashboard/NavBar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import useCurrentUser from "@/components/hooks/useCurrentUser";
import { isAxiosError } from "axios";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};
const MainLayout = ({ children }: Props) => {
  const { data: user, error, isPending } = useCurrentUser();

  if (isAxiosError(error)) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      redirect("/login");
    }
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="h-screen w-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[60px] h-full">{children}</main>
    </div>
  );
};
export default MainLayout;
