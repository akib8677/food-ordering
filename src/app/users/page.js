"use client";
import UserTabs from "@/components/UserTabs";
import useProfile from "@/components/customHook/use-profile";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const { isLoading, data } = useProfile();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users").then((res) => {
      res.json().then((data) => {
        setUsers(data);
      });
    });
  }, []);

  if (isLoading) {
    return "Loading user info...";
  }
  if (!data.admin) {
    return "Not an admin.";
  }

  return (
    <section className="flex flex-col max-w-2xl justify-center mx-auto mt-8">
      <UserTabs isAdmin={data.admin} />
      <div className="grid grid-cols-1 mt-4 gap-2">
        {users &&
          users.map((user) => {
            return (
              <div
                key={user._id}
                className="flex bg-gray-100 p-2 rounded-md justify-between px-4 items-center"
              >
                <div className="text-gray-700 font-medium">
                  {user.name || "No name"}
                </div>
                <div className="text-gray-400 font-medium">{user.email}</div>
                <Link
                  href={`/users/${user._id}`}
                  className="text-gray-700 font-medium border cursor-pointer rounded-lg px-4 py-2"
                >
                  Edit
                </Link>
              </div>
            );
          })}
      </div>
    </section>
  );
}
