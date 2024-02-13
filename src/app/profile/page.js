"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import UserTabs from "@/components/UserTabs";
import UserProfileFrom from "@/components/sheared/Form/UserProfileFrom";
import Loader from "@/components/sheared/Loader";
import useProfile from "@/components/customHook/use-profile";

const ProfilePage = () => {
  const session = useSession();
  const { isLoading, data:users } = useProfile();

  const updateUserName = async (e, data) => {
    e.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error",
    });
  };

  if (isLoading) {
    return <Loader />;
  } else if (session.status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <div className="">
      <UserTabs isAdmin={users.admin} />
      <UserProfileFrom users={users} onSave={updateUserName} />
    </div>
  );
};

export default ProfilePage;
