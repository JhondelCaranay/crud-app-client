import { PackageOpen } from "lucide-react";
import { SidebarItem } from "./SidebarItem";

const routesList = [
  {
    icon: PackageOpen,
    label: "Item",
    href: "/",
  },
];

const SidebarRoutes = () => {
  return (
    <div className="flex flex-col w-full ">
      {routesList.map((route) => {
        return (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        );
      })}
    </div>
  );
};
export default SidebarRoutes;
