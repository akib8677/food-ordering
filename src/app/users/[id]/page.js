"use client";
import UserProfileFrom from "@/components/sheared/Form/UserProfileFrom";
import UserTabs from "@/components/UserTabs";
import useProfile from "@/components/customHook/use-profile";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const UsersEditPage = () => {
  const { id } = useParams();
  const { isLoading, data } = useProfile();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/profile?_id=" + id).then((res) => {
      res.json().then((user) => {
        setUsers(user);
      });
    });
  }, [id]);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });
      if (res.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: "Saving user...",
      success: "User saved",
      error: "An error has occurred while saving the user",
    });
  }

  if (isLoading) {
    return "Loading user info...";
  }
  if (!data.admin) {
    return "Not an admin.";
  }
  return (
    <section className="flex flex-col max-w-2xl justify-center mx-auto mt-8">
      <UserTabs isAdmin={data.admin} />
      <>
        <UserProfileFrom users={users} onSave={handleSaveButtonClick} onChange={null} />
      </>
    </section>
  );
};

export default UsersEditPage;
