import Image from "next/image";
import Button from "../sheared/button";

const MenuItem = () => {
  return (
    <div className="bg-white shadow-md shadow-black/25 transition-all text-center rounded-lg p-4 hover:drop-shadow-2xl">
      <div className="text-center">
        <Image
          src="/pizza2.jpg"
          className="mx-auto block"
          alt="Pizza"
          width={155}
          height={50}
        />
      </div>
      <div>
        <h4 className="font-bold my-3">Pepperoni Pizza</h4>
        <p className="mb-4 text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
        <Button
          styleName="bg-primary text-white border py-2 px-8 rounded-full"
          label="Add to cart $12"
        />
      </div>
    </div>
  );
};

export default MenuItem;
