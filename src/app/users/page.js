import UserTabs from "@/components/UserTabs";

const Users = () => {
  return (
    <>
      <UserTabs isAdmin={true} />
      <div className="mt-8 flex flex-row w-2/4 mx-auto gap-4">Users</div>
    </>
  );
};

export default Users;
