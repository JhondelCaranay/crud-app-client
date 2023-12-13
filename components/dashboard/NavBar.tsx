import { MobileSidebar } from "./MobileSidebar";

export const Navbar = () => {
  return (
    <div className="p-4 border-none border-0 h-full flex items-center bg-transparent dark:bg-[#020817] dark:text-white">
      <MobileSidebar />
    </div>
  );
};
