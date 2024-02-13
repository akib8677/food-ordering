"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Input from "@/components/sheared/input";
import Button from "@/components/sheared/button";
import useProfile from "@/components/customHook/use-profile";
import FileUpload from "../FileUpload";

const UserProfileFrom = ({ users, onSave }) => {

  const session = useSession();
  const [image, setImage] = useState(session?.data?.user?.image);
  const [userName, setUserName] = useState(users?.name || "");
  const [phone, setPhone] = useState(users?.phone || "");
  const [streatAdress, setStreatAdress] = useState(users?.streatAdress || "");
  const [postalCode, setPostalCode] = useState(users?.postalCode || "");
  const [city, setCity] = useState(users?.city || "");
  const [country, setCountry] = useState(users?.country || "");
  const [isAdmin, setIsAdmin] = useState(users?.admin || false);
  const { data: loginUserData } = useProfile();

  const handleFileChange = (image) => {
    setImage(image);
  };

  return (
    <div className="flex flex-row max-w-2xl justify-center mx-auto mt-8  gap-4">
      <FileUpload image={image} onFileChange={handleFileChange} />
      <form
        onSubmit={(e) =>
          onSave(e, {
            name: userName,
            phone,
            streatAdress,
            postalCode,
            city,
            country,
            isAdmin,
            image
          })
        }
      >
        {users && (
          <>
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
            <label className="font-medium text-gray-600 mb-2">Email</label>
            <Input
              name="email"
              className="border mb-1 text-gray-400 p-2 w-full rounded-lg bg-gray-200"
              type="email"
              value={users?.email}
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
                <label className="font-medium text-gray-600 mb-2">City</label>
                <Input
                  className="border mb-1 text-gray-400 p-2 w-full rounded-lg bg-gray-100"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                />
              </div>
            </div>
            <label className="font-medium text-gray-600 mb-2">Country</label>
            <Input
              className="border mb-1 text-gray-400 p-2 w-full rounded-lg bg-gray-100"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            />
          </>
        )}
        {loginUserData?.admin && (
          <div>
            <label
              className="p-2 inline-flex items-center gap-2 mb-2"
              htmlFor="adminCb"
            >
              <input
                id="adminCb"
                type="checkbox"
                className=""
                value={"1"}
                defaultChecked={isAdmin}
                onClick={(e) => setIsAdmin(e.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}

        <Button
          type="submit"
          styleName="text-center bg-primary text-white w-full p-2 rounded-md"
          label="Update"
        />
      </form>
    </div>
  );
};

export default UserProfileFrom;
