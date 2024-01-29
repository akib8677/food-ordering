import UserTabs from "@/components/UserTabs";

const MenuItems = () => {
  return (
    <>
      <UserTabs isAdmin={true} />
      <div className="mt-8 flex flex-row w-2/4 mx-auto gap-4">MenuItems</div>
    </>
  );
};

export default MenuItems;
