"use client";
import UserTabs from "@/components/UserTabs";
import useProfile from "@/components/customHook/use-profile";
import MenuItemForm from "@/components/sheared/Form/MenuItem";
import ConfirmationDeleteButton from "@/components/sheared/ConfirmationDeleteButton";
import toast from "react-hot-toast";
import { useNotificationContext } from "@/components/sheared/Notificition";
import { useState, useEffect } from "react";
import { FcLeft } from "react-icons/fc";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function UpdateMenuItemsPage() {
  const { id } = useParams();
  const { isLoading, data } = useProfile();
  const notifier = useNotificationContext();
  const [menuItem, setMenuItems] = useState({});
  const router = useRouter();

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setMenuItems(item);
      });
    });
  }, [id]);

  if (isLoading) {
    return "Loading user info...";
  }
  if (!data.admin) {
    return "Not an admin.";
  }

  const handleFileChange = async (e) => {
    notifier.notify({ title: "inprogress..." });
  };

  const handleMenuItems = async (e, data) => {
    e.preventDefault();
    const allData = {
      ...data,
      _id: id,
    };
    const creatingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
        body: JSON.stringify(allData),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(creatingPromise, {
      loading: "Updating menu item...",
      success: "Updated!",
      error: "Error",
    });
    router.push("/menu-items")
  };

  const handleDeleteCategory = async (_id) => {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items/?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted!",
      error: "Error",
    });

    router.push("/menu-items");
  };

  return (
    <div className="">
      <UserTabs isAdmin={true} />
      <div className="mt-8 max-w-2xl mx-auto flex justify-center">
        <Link
          className="shadow-md text-sm font-medium px-2 p-2 flex justify-center gap-2 items-center w-full rounded-lg"
          href={"/menu-items/"}
        >
          <span>
            <FcLeft size={25} />
          </span>
          Go Back
        </Link>
      </div>
      <MenuItemForm
        onSubmit={handleMenuItems}
        onChange={handleFileChange}
        menuItem={menuItem}
      />
      <div className="mt-2 w-[432px] mx-auto flex justify-end items-end">
        <ConfirmationDeleteButton
          onDelete={() => handleDeleteCategory(menuItem._id)}
          className="text-center border w-[312px] p-2 rounded-md"
          label="Delete"
        />
      </div>
    </div>
  );
}
