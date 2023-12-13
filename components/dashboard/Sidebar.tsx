import SidebarRoutes from "./SidebarRoutes";

export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm dark:bg-[#020817] dark:text-white">
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};
