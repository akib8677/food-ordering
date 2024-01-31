"use client";
import UserTabs from "@/components/UserTabs";
import useProfile from "@/components/customHook/use-profile";

export default function UsersPage() {
  const { isLoading, data } = useProfile();

  if (isLoading) {
    return "Loading user info...";
  }
  if (!data.admin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
    </section>
  );
}
