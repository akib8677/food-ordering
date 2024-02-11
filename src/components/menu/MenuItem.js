import Image from "next/image";
import Button from "../sheared/button";
import { MdClose } from "react-icons/md";
import { CartContext } from "../AppContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useState } from "react";

const MenuItem = ({ item }) => {
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState(item?.sizes[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);

  const handleAddToCart = () => {
    const hasOptions = item.sizes.length > 0 || item.extraIngredientPrices.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }
    addToCart(item, selectedSize, selectedExtras);
    setShowPopup(false);
    toast.success("Added to cart!");
  };

  const handleExtraThings = (e, extraThing) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedExtras((preSelect) => [...preSelect, extraThing]);
    } else {
      setSelectedExtras((preSelect) => {
        return preSelect.filter((e) => e.name !== extraThing.name);
      });
    }
  };

  let selectedPrice = item.basePrice;
  if (selectedPrice) {
    selectedPrice += selectedSize?.price;
  }

  if (selectedExtras.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra?.price;
    }
  }

  return (
    <>
      <div className="bg-white shadow-md shadow-black/25 transition-all text-center rounded-lg p-4 hover:drop-shadow-2xl">
        <div className="text-center">
          <Image
            src={item?.imageUrl}
            className="mx-auto block"
            alt="Pizza"
            width={155}
            height={50}
          />
        </div>
        <div>
          <h4 className="font-bold my-3">{item?.name}</h4>
          <p className="mb-4 text-sm text-gray-500 line-clamp-3">
            {item?.description}
          </p>
          <Button
            onClick={handleAddToCart}
            styleName="bg-primary text-white border py-2 px-8 rounded-full"
            label={`Add to cart $${item?.basePrice}`}
          />
        </div>
      </div>
      {showPopup && (
        <div className="fixed max-w-lg mx-auto my-4 inset-0 overflow-y-auto">
          <div className=" flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative bg-white p-2 text-center rounded-lg">
              <div className="flex justify-end">
                <button
                  className="p-1 text-gray-900"
                  onClick={() => setShowPopup(false)}
                >
                  <MdClose size={25} />
                </button>
              </div>
              <Image
                src={item?.imageUrl}
                className="mx-auto block"
                alt="Pizza"
                width={250}
                height={100}
              />
              <h2 className="text-2xl font-bold mb-4">{item?.name}</h2>
              <p className="mb-4 text-sm text-gray-500 line-clamp-3">
                {item?.description}
              </p>
              <div className="">
                {item?.sizes?.length > 0 && (
                  <div className="py-2">
                    <h3 className="text-gray-800 font-medium">
                      Pick your size
                    </h3>
                    {item.sizes.map((size) => (
                      <label
                        key={size._id}
                        className="flex items-center gap-2 p-4 border rounded-md mb-1"
                      >
                        <input
                          onClick={() => setSelectedSize(size)}
                          checked={selectedSize?.name === size.name}
                          type="radio"
                          name={size.name}
                        />
                        {size.name} +${size.price}
                      </label>
                    ))}
                  </div>
                )}
                {item?.extraIngredientPrices?.length > 0 && (
                  <div className="py-2">
                    <h3 className="font-medium  text-gray-700">
                      Pick your size
                    </h3>
                    {item.extraIngredientPrices.map((extraThing) => (
                      <label
                        key={extraThing._id}
                        className="flex items-center gap-2 p-4 border rounded-md mb-1"
                      >
                        <input
                          onClick={(e) => handleExtraThings(e, extraThing)}
                          type="checkbox"
                          name={extraThing.name}
                        />
                        {extraThing.name} +${extraThing.price}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={handleAddToCart}
                className="px-4 py-2 bg-primary rounded w-full text-white sticky bottom-2"
              >
                Add to cart ${selectedPrice}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItem;
