"use client";
import UserTabs from "@/components/UserTabs";
import useProfile from "@/components/customHook/use-profile";
import { FcLeft } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MenuItemForm from "@/components/sheared/Form/MenuItem";
import toast from "react-hot-toast";
import { useNotificationContext } from "@/components/sheared/Notificition";

export default function NewMenuItemsPage() {
  const { isLoading, data } = useProfile();
  const notifier = useNotificationContext();
  const router = useRouter()

  if (isLoading) {
    return "Loading user info...";
  }
  if (!data.admin) {
    return "Not an admin.";
  }

  const handleMenuItems = async (e, data) => {
    e.preventDefault();
    const creatingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(creatingPromise, {
      loading: "Saving menu item...",
      success: "Created!",
      error: "Error",
    });
    router.push("/menu-items")
  };

  const handleFileChange = async (e) => {
    notifier.notify({ title: "inprogress..." });
  };


  return (
    <div className="">
      <UserTabs isAdmin={true} />
      <div className="mt-8 max-w-2xl justify-center mx-auto flex">
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
      <MenuItemForm onSubmit={handleMenuItems} onChange={handleFileChange} menuItem={null}/>
    </div>
  );
}
