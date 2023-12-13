import { PackageOpen, User } from "lucide-react";
import { SidebarItem } from "./SidebarItem";

const routesList = [
  {
    icon: PackageOpen,
    label: "Item",
    href: "/",
  },
  {
    icon: User,
    label: "Profile",
    href: "/profile",
  },
  {
    icon: User,
    label: "Logout",
    href: "/logout",
    onClick: () => {
      localStorage.removeItem("token");
      window.location.href = "/login";
    },
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
            onClick={route.onClick}
          />
        );
      })}
    </div>
  );
};
export default SidebarRoutes;
