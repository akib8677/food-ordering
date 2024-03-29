"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const UserTabs = ({ isAdmin }) => {
  const path = usePathname();
  return (
    <div className="flex gap-2 max-w-2xl mx-auto justify-center mt-2">
      <Link
        className={`rounded-full px-4 py-2 ${
          path === "/profile" ? "bg-primary text-white" : "bg-gray-300 text-gray-700"
        }`}
        href={"/profile"}
      >
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            
            className={`rounded-full px-4 py-2 ${
              path === "/categories" ? "bg-primary text-white" : "bg-gray-300 text-gray-700"
            }`}
            href={"/categories"}
          >
            Categories
          </Link>
          <Link
            className={`rounded-full px-4 py-2 ${
              path.includes("/menu-items") ? "bg-primary text-white" : "bg-gray-300 text-gray-700"
            }`}
            href={"/menu-items"}
          >
            Menu Items
          </Link>
          <Link
            className={`rounded-full px-4 py-2 ${
              path.includes("/users" ) ? "bg-primary text-white" : "bg-gray-300 text-gray-700"
            }`}
            href={"/users"}
          >
            Users
          </Link>
          <Link
            className={`rounded-full px-4 py-2 ${
              path === "/orders" ? "bg-primary text-white" : "bg-gray-300 text-gray-700"
            }`}
            href={"/orders"}
          >
            Orders
          </Link>
        </>
      )}
    </div>
  );
};

export default UserTabs;
