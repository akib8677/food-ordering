"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useNotificationContext } from "@/components/sheared/Notificition";
import UserTabs from "@/components/UserTabs";
import UserProfileFrom from "@/components/sheared/Form/UserProfileFrom";

const ProfilePage = () => {
  const session = useSession();
  const [users, setUsers] = useState(null);
  const notifier = useNotificationContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFeched, setProfileFeched] = useState(false);

  useEffect(() => {
    getUserProfileData()
  },[])

  const getUserProfileData = async () => {
    const response = await fetch('api/profile')
    const data = await response.json()
    setUsers(data)
    setIsAdmin(data.admin)
  }

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

    // if (response.ok) {
    //   notifier.success({title:'Profile Saved!'})
    // }
  };

  if (session.status === "loading") {
    return <span className="text-center">Loading...</span>;
  }

  if (session.status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <div className="">
      <UserTabs isAdmin={isAdmin} />
      <UserProfileFrom
        users={users}
        onSave={updateUserName}
      />
    </div>
  );
};

export default ProfilePage;
