import { FaPlus } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Button from "../button";
import Input from "../input";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useState } from "react";

const MenuItemPriceProps = ({ name, addLebel, props, setProps }) => {
  const [toggle, seToggle] = useState(false);

  const handeleDeleteSize = (index) => {
    const updatedProps = props.filter((_, i) => i !== index);
    setProps(updatedProps);
  };

  const handleAddSize = (e) => {
    e.preventDefault();
    setProps((prevProps) => {
      return [...prevProps, { name: "", price: "0" }];
    });
  };

  const handleChangeSize = (e, index, prop) => {
    const newValue = e.target.value;
    setProps((prevProps) => {
      const newProps = [...prevProps];
      newProps[index][prop] = newValue;
      return newProps;
    });
  };

  const handleToggle = () => {
    seToggle(!toggle);
  };

  return (
    <div className="bg-gray-200 p-2 rounded-lg my-2">
      <div>
        <button
          type="button"
          className="font-large flex items-center gap-2 text-gray-400 mb-2"
        >
          <span onClick={handleToggle}>
            {toggle ? <FaAngleUp size={25} /> : <FaAngleDown size={25} />}
          </span>
          {name}
          <span>({props?.length})</span>
        </button>
      </div>
      <div className={toggle ? "block" : "hidden"}>
        {props.length > 0 &&
          props.map((s, index) => {
            return (
              <div key={index} className="flex gap-2 items-center">
                <div>
                  <label className="font-medium text-gray-400 mb-2">Name</label>
                  <Input
                    className="border p-2 w-full rounded-lg bg-gray-100"
                    type="text"
                    name="sizeName"
                    value={s.name}
                    onChange={(e) => handleChangeSize(e, index, "name")}
                    placeholder="Size name"
                  />
                </div>
                <div>
                  <label className="font-medium text-gray-400 mb-2">
                    Extra price
                  </label>
                  <Input
                    name="extraPrice"
                    className="border p-2 w-full rounded-lg bg-gray-100"
                    type="text"
                    value={s.price}
                    onChange={(e) => handleChangeSize(e, index, "price")}
                    placeholder="Extra price"
                  />
                </div>
                <div
                  onClick={() => handeleDeleteSize(index)}
                  className="mt-5 p-2 bg-gray-100 rounded-lg"
                >
                  <RiDeleteBinLine size={25} color="red" />
                </div>
              </div>
            );
          })}
        <Button
          onClick={(e) => handleAddSize(e)}
          type="button"
          styleName="flex item-center gap-2 justify-center text-gray-400 bg-gray-100 w-full p-2 rounded-lg mt-2"
          label={addLebel}
          iconLeft={<FaPlus className="mt-1" />}
        />
      </div>
    </div>
  );
};

export default MenuItemPriceProps;
