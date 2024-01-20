"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import Input from "@/components/sheared/input";
import Button from "@/components/sheared/button";
const profileImage = "./profileImage.png";

const ProfilePage = () => {
  const session = useSession();
  console.log(session);
  const imageUrl = session?.data?.user?.image;
  const email = session?.data?.user?.email;
  const [userName, setUserName] = useState("");
  const [saved, setSaved] = useState(false);
  const [saveing, setSaveing] = useState(false);

  useEffect(() => {
    setUserName(session?.data?.user?.name);
  }, [session]);

  const updateUserName = async (e) => {
    setSaveing(true);
    e.preventDefault();
    setSaved(false);
    const response = await fetch("/api/profile", {
      method: "PUT",
      body: JSON.stringify({ name: userName }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setSaved(true);
    }
    setSaveing(false);
  };

  const handleFileChange = async(e) => {
    const files = e.target.files;
    if(files.length > 0) {
      const data = new FormData;
      data.set('file', files[0])
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
        // headers: { "Content-Type": "multipart/form-data" },
      });
    }
  }

  if (session.status === "loading") {
    return <span className="text-center">Loading...</span>;
  }

  if (session.status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <div className="mt-10">
      <h1 className="text-primary text-center text-2xl font-medium">Profile</h1>
      {saved && (
        <div className="p-4 bg-green-100 w-2/4 mx-auto mt-4 rounded-lg border-2 border-green-300">
          <h1 className="text-center">Profile Saved!</h1>
        </div>
      )}
      {saveing && (
        <div className="p-4 bg-blue-100 w-2/4 mx-auto mt-4 rounded-lg border-2 border-blue-300">
          <h1 className="text-center">Saveing...</h1>
        </div>
      )}

      <div className="flex flex-row w-2/4 mx-auto mt-4  gap-4">
        <div>
          <Image
            src={imageUrl || profileImage}
            className="rounded-lg mb-1"
            width={100}
            height={100}
            alt="User Profile"
          />
          <label className="text-center block cursor-pointer font-semibold border w-full p-2 rounded-lg">
            <input type="file" className="hidden" onChange={handleFileChange}/>
            <span>Edit</span>
          </label>
        </div>
        <div>
          <Input
            name="userName"
            className="border p-2 mb-1 w-full rounded-lg bg-gray-100"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="First name and Last name"
          />
          <Input
            name="email"
            className="border mb-1 text-gray-400 p-2 w-full rounded-lg bg-gray-200"
            type="email"
            value={email}
            disabled={true}
            placeholder="Email"
          />
          <Button
            styleName="text-center bg-primary text-white w-full p-2 rounded-md"
            label="Update"
            onClick={updateUserName}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
