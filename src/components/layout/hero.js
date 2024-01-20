import { FaRegArrowAltCircleRight } from "react-icons/fa";
import Image from "next/image";
import Button from "../sheared/button";

const Hero = () => {
  return (
    <section className="flex mt-5">
      <div className="mt-10">
        <div>
          <h1 className="text-5xl font-semibold">
            Everything<br/> is better<br/> with a&nbsp;
            <span className="text-primary">pizza</span>
          </h1>
          <p className="my-6 text-gray-500 text-sm">
            Pizza is the missing piece that makes every day complete, a simple
            yet delicious joy in life
          </p>
        </div>
        <div className="flex">
          <Button
            styleName="flex items-center bg-primary text-white border py-2 px-8 rounded-full"
            label="ORDER NOW"
            icon={<FaRegArrowAltCircleRight className="ml-2" />}
          />
          <Button
            styleName="flex items-center text-gray-500 py-2 px-8 rounded-full"
            label="Learn more"
            icon= {<FaRegArrowAltCircleRight className="ml-2" />}
          />
        </div>
      </div>
      <div>
        <Image
          src="/pizza.jpg"
          alt="Picture of the author"
          width={600}
          height={600}
        />
      </div>
    </section>
  );
};

export default Hero;
