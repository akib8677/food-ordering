"use client";
import UserTabs from "@/components/UserTabs";
import useProfile from "@/components/customHook/use-profile";
import Input from "@/components/sheared/input";
import Button from "@/components/sheared/button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [categoryName, setCategoryName] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    fetch("/api/categories").then((res) => {
      res.json().then((data) => {
        console.log(data);
        setCategories(data);
      });
    });
  };

  const handleCategoryForm = async (e) => {
    e.preventDefault();
    const creatingPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (updatedCategory) {
        data._id = updatedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: updatedCategory ? "PUT" : "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      setUpdatedCategory(null);
      setCategoryName("");
      getCategories();
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(creatingPromise, {
      loading: updatedCategory
        ? "Updating your category..."
        : "Creating your category...",
      success: updatedCategory ? "Category Updated!" : "Category Created!",
      error: "Error, sorry",
    });
  };

  if (profileLoading) {
    return "Loading User Info....";
  }

  if (!profileData.admin) {
    return "Not a admin";
  }
  return (
    <>
      <UserTabs isAdmin={profileData.admin} />
      <div className="mt-8 w-2/4 mx-auto">
        <form className="flex gap-2 items-center" onSubmit={handleCategoryForm}>
          <div className="grow">
            <label className="font-medium text-gray-600 mb-2">
              {updatedCategory
                ? "Update category name:"
                : "Create category name"}
              {updatedCategory && <b>{updatedCategory?.name}</b>}
            </label>
            <Input
              name="newCategoryName"
              className="border p-2 mb-1 w-full rounded-lg bg-gray-100"
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="category name"
            />
          </div>
          <div className="mt-5">
            <Button
              type="submit"
              styleName="text-center bg-primary text-white w-full p-2 rounded-md"
              label={updatedCategory ? "Update" : "Create"}
            />
          </div>
        </form>
        <div>
          <h1 className="mt-8 text-sm text-gray-500">Edit category</h1>
          {categories?.length > 0 &&
            categories.map((c) => {
              return (
                <button
                  key={c._id}
                  onClick={() => {
                    setUpdatedCategory(c);
                    setCategoryName(c.name);
                  }}
                  className="w-full bg-gray-200 gap-1 rounded-lg cursor-pointer mb-1 p-2 px-4 flex"
                >
                  <span>{c.name}</span>
                </button>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
