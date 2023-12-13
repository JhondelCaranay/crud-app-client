"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";

type Props = {
  children: React.ReactNode;
};
const MainLayout = ({ children }: Props) => {
  return (
    <div className="h-screen w-full bg-gradient-to-tr from-sky-700 to-blue-500 text-white">
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">{children}</main>
    </div>
  );
};
export default MainLayout;
