import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";

const ImagePreview = ({
  selectedImage,
  selectedFile,
  setSelectedImage,
  setSelectedFile,
  setIsUploading,
}) => {
  const closeImagePreview = () => {
    setSelectedImage("");
    setSelectedFile("");
    setIsUploading(false);
  };
  return (
    <div className="mb-10 p-5 border-[1px] dark:border-neutral-800 rounded-xl absolute top-10 left-72 max-h-80 min-w-56 flex flex-col">
      <label htmlFor="" className="text-zinc-700 text-xs">
        Image preview
      </label>

      <Image
        src={selectedImage}
        width={160}
        height={160}
        alt="image"
        className="mb-5 mt-1 border-dashed dark:border-neutral-900 p-3 dark:bg-zinc-800/50 rounded-lg w-full h-full"
      />

      <p className="text-center p-3 bg-zinc-800/40 rounded-xl text-zinc-400">
        {selectedFile.name}
      </p>

      <div
        className="bg-red-400/60 rounded-full absolute -top-2 -right-2 hover:bg-red-400/80"
        onClick={closeImagePreview}
      >
        <IoCloseOutline className="w-6 h-6 p-1 cursor-pointer" />
      </div>
    </div>
  );
};

export default ImagePreview;
