"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import Input from "@/components/sheared/input";
import Button from "@/components/sheared/button";
import toast from "react-hot-toast";
import { useNotificationContext } from "@/components/sheared/Notificition";
const profileImage = "./profileImage.png";
import UserTabs from "@/components/UserTabs";

const ProfilePage = () => {
  const session = useSession();
  const imageUrl = session?.data?.user?.image;
  const email = session?.data?.user?.email;
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [streatAdress, setStreatAdress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const notifier = useNotificationContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFeched, setProfileFeched] = useState(false);

  useEffect(() => {
    setUserName(session?.data?.user?.name);
    fetch("/api/profile").then(res => {
      res.json().then(data => {
        setPhone(data.phone)
        setStreatAdress(data.streatAdress)
        setPostalCode(data.postalCode)
        setCity(data.city)
        setCountry(data.country)
        setIsAdmin(data.admin)
        setProfileFeched(true)
      });
    });
  }, [session]);

  const updateUserName = async (e) => {
    e.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        body: JSON.stringify({
          name: userName,
          streatAdress,
          phone,
          postalCode,
          city,
          country,
        }),
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

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const data = new FormData();
      data.set("file", files[0]);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
        // headers: { "Content-Type": "multipart/form-data" },
      });
    }
  };

  if (session.status === "loading" || !profileFeched) {
    return <span className="text-center">Loading...</span>;
  }

  if (session.status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <div className="">
      <UserTabs isAdmin={isAdmin} />
      <div className="flex flex-row w-2/4 mx-auto mt-8  gap-4">
        <div>
          <Image
            src={imageUrl || profileImage}
            className="rounded-lg mb-1"
            width={100}
            height={100}
            alt="User Profile"
          />
          <label className="text-center block cursor-pointer font-semibold border w-full p-2 rounded-lg">
            <input type="file" className="hidden" onChange={handleFileChange} />
            <span>Edit</span>
          </label>
        </div>
        <form onSubmit={updateUserName}>
          <label className="font-medium text-gray-600 mb-2">
            First Name and Last Name
          </label>
          <Input
            name="userName"
            className="border p-2 mb-1 w-full rounded-lg bg-gray-100"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="First name and Last name"
          />
          <label className="font-medium text-gray-600 mb-2">
            Email
          </label>
          <Input
            name="email"
            className="border mb-1 text-gray-400 p-2 w-full rounded-lg bg-gray-200"
            type="email"
            value={email}
            disabled={true}
            placeholder="Email"
          />
          <label className="font-medium text-gray-600 mb-2">
            Phone Number
          </label>
          <Input
            className="border mb-1 text-gray-400 p-2 w-full rounded-lg bg-gray-100"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
          />
          <label className="font-medium text-gray-600 mb-2">
            Streat Adress
          </label>
          <Input
            className="border mb-1 text-gray-400 p-2 w-full rounded-lg bg-gray-100"
            type="text"
            value={streatAdress}
            onChange={(e) => setStreatAdress(e.target.value)}
            placeholder="Streat Adress"
          />
          <div className="flex gap-2 items-center justify-center">
            <div>
              <label className="font-medium text-gray-600 mb-2">
                Postal Code
              </label>
              <Input
                className="border mb-1 text-gray-400 p-2 w-full rounded-lg bg-gray-100"
                type="number"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Postal Code"
              />
            </div>
            <div className="">
              <label className="font-medium text-gray-600 mb-2">
                City
              </label>
              <Input
                className="border mb-1 text-gray-400 p-2 w-full rounded-lg bg-gray-100"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>
          </div>
          <label className="font-medium text-gray-600 mb-2">
            Country
          </label>
          <Input
            className="border mb-1 text-gray-400 p-2 w-full rounded-lg bg-gray-100"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
          />
          <Button
            type="submit"
            styleName="text-center bg-primary text-white w-full p-2 rounded-md"
            label="Update"
          />
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
