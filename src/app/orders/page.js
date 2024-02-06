"use client";
import useProfile from "@/components/customHook/use-profile";
import UserTabs from "@/components/UserTabs";

const OrderPage = () => {
  const { isLoading, data } = useProfile();

  if (isLoading) {
    return "Loading user info...";
  }
  if (!data.admin) {
    return "Not an admin.";
  }
  return (
    <div className="flex flex-col max-w-2xl justify-center mx-auto mt-8">
      <UserTabs isAdmin={data.admin} />
      users
    </div>
  );
};

export default OrderPage;
