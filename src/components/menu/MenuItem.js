import Image from "next/image";
import Button from "../sheared/button";

const MenuItem = ({item}) => {
  return (
    <div className="bg-white shadow-md shadow-black/25 transition-all text-center rounded-lg p-4 hover:drop-shadow-2xl">
      <div className="text-center">
        <Image
          src={item.imageUrl}
          className="mx-auto block"
          alt="Pizza"
          width={155}
          height={50}
        />
      </div>
      <div>
        <h4 className="font-bold my-3">{item.name}</h4>
        <p className="mb-4 text-sm text-gray-500">{item.description}</p>
        <Button
          styleName="bg-primary text-white border py-2 px-8 rounded-full"
          label={`Add to cart ${item.basePrice}`}
        />
      </div>
    </div>
  );
};

export default MenuItem;
