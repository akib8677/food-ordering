"use client";
import UserTabs from "@/components/UserTabs";
import useProfile from "@/components/customHook/use-profile";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FcRight } from "react-icons/fc";
import Image from "next/image";

export default function MenuItemsPage() {
  const { isLoading, data } = useProfile();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    getMenuItems();
  }, []);

  const getMenuItems = () => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((data) => {
        setMenuItems(data);
      });
    });
  };

  if (isLoading) {
    return "Loading user info...";
  }
  if (!data.admin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8 max-w-2xl justify-center mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8 flex justify-center">
        <Link
          className="shadow-md text-sm font-medium px-2 p-2 flex justify-center gap-2 items-center w-full rounded-lg"
          href={"/menu-items/new"}
        >
          Crete new menu item
          <span>
            <FcRight size={25} />
          </span>
        </Link>
      </div>
      <div>
        <h1 className="mt-8 text-sm text-gray-500">Edit menu items</h1>
        <div className="grid gap-4 grid-cols-3 text-center">
          {menuItems?.length > 0 &&
            menuItems.map((c) => {
              return (
                <Link
                  href={`/menu-items/edit/${c._id}`}
                  key={c._id}
                  className="w-full shadow-md gap-1 rounded-lg cursor-pointer mb-1 p-2 px-4"
                >
                  <Image
                    src="/pizza2.jpg"
                    className="mx-auto block"
                    alt="Pizza"
                    width={150}
                    height={50}
                  />
                  <span>{c.name}</span>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
}
