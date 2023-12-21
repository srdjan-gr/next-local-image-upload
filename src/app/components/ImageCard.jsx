import Image from "next/image";
import test from "../../../public/no-image.png";

const ImageCard = () => {
  return (
    <div className="border-[1px] border-neutral-800 p-4 rounded-xl">
      <Image
        width={200}
        height={200}
        src={test}
        alt="image"
        className="rounded-lg bg-cover bg-center cursor-pointer"
      />
    </div>
  );
};

export default ImageCard;
