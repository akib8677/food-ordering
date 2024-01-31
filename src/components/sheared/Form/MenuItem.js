import MenuItemPriceProps from "../MenuItemPriceProps";
import Button from "../button";
import Input from "../input";
import Image from "next/image";
import { useState, useEffect } from "react";

const MenuItemForm = ({ onSubmit, onChange, menuItem }) => {
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [category, setCatgory] = useState(menuItem?.category || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    menuItem?.extraIngredientPrices || []
  );
  const [categories, setCategories] = useState([]);

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
  return (
    <div className="flex flex-row max-w-2xl justify-center mx-auto mt-8  gap-4">
      <div className="mt-2">
        <Image
          src={""}
          className="rounded-lg bg-gray-200 mb-1"
          width={100}
          height={100}
          alt="Item Image"
        />
        <label className="text-center block cursor-pointer font-semibold border w-full p-2 rounded-lg">
          <input type="file" className="hidden" onChange={onChange} />
          <span>Edit</span>
        </label>
      </div>
      <form
        className="w-full"
        onSubmit={(e) =>
          onSubmit(e, {
            name,
            description,
            basePrice,
            sizes,
            extraIngredientPrices,
          })
        }
      >
        <label className="font-medium text-gray-600 mb-2">Item name</label>
        <Input
          className="border p-2 mb-1 w-full rounded-lg bg-gray-100"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
        />
        <label className="font-medium text-gray-600 mb-2 ">Description</label>
        <Input
          className="border mb-1 p-2 w-full rounded-lg bg-gray-100"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <label className="font-medium text-gray-600 mb-2 ">Category</label>
        <select
          value={category}
          onChange={(e) => setCatgory(e.target.value)}
          className="border w-full mb-1 bg-gray-100 rounded-lg p-2"
        >
          {categories &&
            categories.map((c) => (
              <option key={c._id} value={c._id} className="text-gray-800">
                {c.name}
              </option>
            ))}
        </select>

        <label className="font-medium text-gray-600 mb-2">Base price</label>
        <Input
          className="border mb-1 p-2 w-full rounded-lg bg-gray-100"
          type="text"
          value={basePrice}
          onChange={(e) => setBasePrice(e.target.value)}
          placeholder="Base price"
        />
        <MenuItemPriceProps
          name={"Size"}
          addLebel={"Add item size"}
          props={sizes}
          setProps={setSizes}
        />
        <MenuItemPriceProps
          name={"Extra ingredients"}
          addLebel={"Add Extra ingredients prices"}
          props={extraIngredientPrices}
          setProps={setExtraIngredientPrices}
        />
        <Button
          type="submit"
          styleName="text-center bg-primary text-white w-full p-2 rounded-md"
          label="Save"
        />
      </form>
    </div>
  );
};

export default MenuItemForm;