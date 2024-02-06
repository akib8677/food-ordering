"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useNotificationContext } from "@/components/sheared/Notificition";
import UserTabs from "@/components/UserTabs";
import UserProfileFrom from "@/components/sheared/Form/UserProfileFrom";
import UploadImage from "@/components/sheared/UploadImage";

const ProfilePage = () => {
  const session = useSession();
  const imageUrl = session?.data?.user?.image;
  const email = session?.data?.user?.email;
  const [users, setUsers] = useState(null);
  const notifier = useNotificationContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFeched, setProfileFeched] = useState(false);

  useEffect(() => {
    fetch("/api/profile").then((res) => {
      res.json().then((data) => {
        setUsers(data);
        setIsAdmin(data.admin);
        setProfileFeched(true);
      });
    });
  }, [session]);

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

  // const handleFileChange = async (e) => {
  //   const files = e.target.files;
  //   if (files.length > 0) {
  //     const data = new FormData();
  //     data.set("file", files[0]);
  //     // const data = await req.formData()
  //     const response = await data.get("file");
  //     const imageurl = await UploadImage(response)
  //     //   const response = await fetch("/api/upload", {
  //     //     method: "POST",
  //     //     body: data,
  //     //     // headers: { "Content-Type": "multipart/form-data" },
  //     //   });
  //   }
  // };

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
        onChange={null}
      />
    </div>
  );
};

export default ProfilePage;
