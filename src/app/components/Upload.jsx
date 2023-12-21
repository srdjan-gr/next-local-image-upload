"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  console.log(selectedFile);
  console.log(selectedImage);

  const formSubmit = async () => {
    setIsUploading(true);
    if (!selectedFile) return;
    const formData = new FormData();
    formData.set("file", selectedFile);
    const response = fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    setIsUploading(false);
  };
  return (
    <section className="flex w-full flex-col items-center justify-start p-10">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Uploaad image to your local folder
        </p>
      </div>

      <div className="relative flex items-start before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div>

      <form onSubmit={formSubmit}>
        <div className="pt-10">
          <label
            className="border-[1px] dark:border-neutral-800 w-64 rounded-xl flex flex-col-reverse items-center justify-center cursor-pointer mb-4 hover:bg-blue-700/5 py-10 text-sm text-zinc-600"
            place
          >
            Click to search image
            <input
              type="file"
              name="file"
              className="hidden"
              //   onChange={(e) => uploadImage(e)}
              onChange={({ target }) => {
                if (target.files) {
                  const file = target.files[0];
                  setSelectedImage(URL.createObjectURL(file));
                  setSelectedFile(file);
                }
              }}
            />
            <IoCloudUploadOutline className="w-12 h-12" />
          </label>

          {selectedImage && (
            <div className="mb-10 p-5 border-[1px] dark:border-neutral-800 rounded-xl">
              <label htmlFor="" className="text-zinc-700 text-xs">
                Image preview
              </label>

              <Image
                src={selectedImage}
                width={140}
                height={140}
                alt="image"
                className="my-5 border-[1px] dark:border-neutral-900 p-3 dark:bg-zinc-800/50 rounded-lg"
              />

              <p className="text-center p-3 bg-zinc-800/40 rounded-xl text-zinc-400">
                {selectedFile.name}
              </p>
            </div>
          )}

          <button className="w-64 border-[1px] dark:border-neutral-800 p-3 rounded-xl cursor-pointer bg-zinc-800/30 hover:bg-zinc-800/20 ">
            {!isUploading ? "Upload" : "Uploading..."}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Upload;
