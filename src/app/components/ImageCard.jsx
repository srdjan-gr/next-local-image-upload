import Image from "next/image";

const ImageCard = ({ image }) => {
  return (
    <div className="border-[1px] w-[240px] h-[240px] flex items-center border-neutral-800 p-3 rounded-xl">
      <Image
        width={200}
        height={200}
        src={image}
        alt="image"
        className="rounded-lg cursor-pointer object-contain hover:opacity-80 w-full h-full"
      />
    </div>
  );
};

export default ImageCard;
