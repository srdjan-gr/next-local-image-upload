"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoCloudUploadOutline, IoCloseOutline } from "react-icons/io5";
import Spinner from "./Spinner";
import Message from "./Message";

const Upload = ({ isUploading, setIsUploading }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  //   const [isUploading, setIsUploading] = useState(false);
  const [messageDiv, setMessageDiv] = useState(false);
  const [messageText, setMessageText] = useState({
    label: "",
    messageInfo: "",
  });

  useEffect(() => {
    displayMessage();
  }, [messageDiv]);

  //   console.log(selectedFile);
  //   console.log(selectedImage);

  const formSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      if (!selectedFile) {
        setIsUploading(false);
        setMessageDiv(true);
        setMessageText({ label: "danger", messageInfo: "File not selected!" });
        return;
      }
      const formData = new FormData();
      formData.append("file", selectedFile);

      const data = await axios.post("/api/upload", formData);
    } catch (error) {
      setMessageText({ label: "danger", messageInfo: error.response?.data });
    }
    setMessageDiv(true);
    setMessageText({
      label: "success",
      messageInfo: "File uploaded successfuly.",
    });
    setIsUploading(false);
    setSelectedImage("");
    setSelectedFile("");
  };

  const closeImagePreview = () => {
    setSelectedImage("");
    setSelectedFile("");
    setIsUploading(false);
  };

  const displayMessage = () => {
    setTimeout(() => {
      setMessageDiv(false);
    }, 3000);
    clearTimeout();
  };

  return (
    <section className="flex w-full flex-col items-center justify-start p-10">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Uploaad image to your local folder
        </p>

        {messageDiv && <Message messageText={messageText} />}
      </div>

      <div className="relative flex items-start before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div>

      <form>
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
            <div className="mb-10 p-5 border-[1px] dark:border-neutral-800 rounded-xl relative">
              <label htmlFor="" className="text-zinc-700 text-xs">
                Image preview
              </label>

              <Image
                src={selectedImage}
                width={140}
                height={140}
                alt="image"
                className="my-5  border-dashed dark:border-neutral-900 p-3 dark:bg-zinc-800/50 rounded-lg"
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
          )}

          <button
            onClick={(e) => formSubmit(e)}
            disabled={isUploading}
            className="w-64 p-3 border-[1px] dark:border-neutral-800 rounded-xl cursor-pointer bg-zinc-800/30 hover:bg-zinc-800/20"
          >
            {!isUploading ? "Upload" : <Spinner />}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Upload;
