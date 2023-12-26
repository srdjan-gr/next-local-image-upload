import Image from "next/image";
import { IoTrashBinOutline } from "react-icons/io5";

const ImageCard = ({ image }) => {
  const deleteImage = () => {};
  return (
    <div className="border-[1px] w-[240px] h-[240px] flex items-center border-neutral-800 p-3 rounded-xl relative">
      <Image
        width={200}
        height={200}
        src={image}
        alt="image"
        className="rounded-lg cursor-pointer object-contain hover:opacity-80 w-full h-full"
      />

      <div
        className="bg-red-400/60 rounded-full absolute -top-3 -right-3 hover:bg-red-400/80 p-[2px]"
        onClick={deleteImage}
      >
        <IoTrashBinOutline className="w-6 h-6 p-1 cursor-pointer" />
      </div>
    </div>
  );
};

export default ImageCard;
