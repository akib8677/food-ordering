"use client";
import UserTabs from "@/components/UserTabs";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import useProfile from "@/components/customHook/use-profile";
import Input from "@/components/sheared/input";
import Button from "@/components/sheared/button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConfirmationDeleteButton from "@/components/sheared/ConfirmationDeleteButton";
import Loader from "@/components/sheared/Loader";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { isLoading: profileLoading, data: profileData } = useProfile();
  const [categoryName, setCategoryName] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    fetch("/api/categories").then((res) => {
      res.json().then((data) => {
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

  const handleDeleteCategory = async (_id) => {
    const deletingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories/?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(deletingPromise, {
      loading: "Deleting...",
      success: "Deleted!",
      error: "Error",
    });
    getCategories();
  };

  if (profileLoading) {
    return <Loader />;
  }

  if (!profileData.admin) {
    return "Not a admin";
  }
  return (
    <>
      <UserTabs isAdmin={profileData.admin} />
      <div className="flex flex-col max-w-2xl justify-center mx-auto mt-8">
        <div>
          <form
            className="flex gap-2 items-center"
            onSubmit={handleCategoryForm}
          >
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
            <div className="mt-5 flex gap-2">
              <Button
                type="submit"
                styleName="text-center bg-primary text-white w-full p-2 rounded-md"
                label={updatedCategory ? "Update" : "Create"}
              />
              <Button
                onClick={() => {
                  setUpdatedCategory(null);
                  setCategoryName("");
                }}
                type="button"
                styleName="text-center border w-full p-2 rounded-md"
                label="Cancel"
              />
            </div>
          </form>
        </div>
        <div>
          <h1 className="mt-8 text-sm text-gray-500">Edit category</h1>
          {categories?.length > 0 &&
            categories.map((c) => {
              return (
                <div
                  key={c._id}
                  className="w-full bg-gray-200 gap-2 justify-between rounded-lg cursor-pointer mb-1 p-2 px-4 flex items-center"
                >
                  {c.name}
                  <div className="flex gap-2">
                    <div
                      onClick={() => {
                        setUpdatedCategory(c);
                        setCategoryName(c.name);
                      }}
                      className="text-blue-500 cursor-pointer"
                    >
                      <FiEdit />{" "}
                    </div>
                    <ConfirmationDeleteButton
                      onDelete={() => handleDeleteCategory(c._id)}
                      className="text-red-500 cursor-pointer"
                      label={<FiTrash2 />}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
