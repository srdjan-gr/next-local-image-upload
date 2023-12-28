"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import Spinner from "./Spinner";
import Message from "./Message";
import ImagePreview from "./ImagePreview";

const Upload = ({ isUploading, setIsUploading }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageName, setSelectedImageName] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [messageContainer, setMessageContainer] = useState(false);
  const [messageText, setMessageText] = useState({
    label: "",
    messageInfo: "",
  });

  useEffect(() => {
    displayMessage();
  }, [messageContainer]);

  //   Drag and drop function
  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
    setSelectedImage(URL.createObjectURL(acceptedFiles[0]));
    setSelectedImageName(acceptedFiles[0].name);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  //   Form submit function
  const formSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      if (!selectedFile) {
        setIsUploading(false);
        setMessageContainer(true);
        setMessageText({ label: "danger", messageInfo: "File not selected!" });
        return;
      }
      const formData = new FormData();
      formData.append("file", selectedFile);

      const data = await axios.post("/api/upload", formData);
    } catch (error) {
      setMessageText({ label: "danger", messageInfo: error.response?.data });
    }
    setMessageContainer(true);
    setMessageText({
      label: "success",
      messageInfo: "File uploaded successfuly.",
    });
    setIsUploading(false);
    setSelectedImage("");
    setSelectedFile("");
  };

  // Message for success upload and No selected file
  const displayMessage = () => {
    setTimeout(() => {
      setMessageContainer(false);
    }, 3000);
    clearTimeout();
  };

  return (
    <section className="flex w-full flex-col items-center justify-start py-10">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Uploaad image to your local folder
        </p>

        {messageContainer && <Message messageText={messageText} />}
      </div>

      <div className="relative flex items-start before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div>

      <form className="w-full justify-center">
        <div className="pt-10 flex flex-col justify-center items-center w-full relative">
          <label
            className={`${
              isDragActive && "dark:border-blue-700/50"
            } border-dotted border-[2px] dark:border-neutral-800 w-full md:w-80 rounded-xl flex flex-col-reverse items-center justify-center cursor-pointer mb-4 hover:bg-blue-700/5 py-10 text-sm text-zinc-600 text-center`}
            place
            {...getRootProps()}
          >
            Click to search image <br /> or <br /> Drag 'n' drop image here
            <input
              type="file"
              name="file"
              className="hidden"
              {...getInputProps()}
              onChange={({ target }) => {
                if (target.files) {
                  const file = target.files[0];
                  setSelectedImage(URL.createObjectURL(file));
                  setSelectedFile(file);
                }
              }}
            />
            <IoCloudUploadOutline className="w-12 h-12 mb-2" />
          </label>

          {/* Preview image component */}
          {selectedImage && (
            <ImagePreview
              selectedImage={selectedImage}
              selectedFile={selectedFile}
              setSelectedImage={setSelectedImage}
              setSelectedFile={setSelectedFile}
              selectedImageName={selectedImageName}
              setIsUploading={setIsUploading}
            />
          )}

          <button
            onClick={(e) => formSubmit(e)}
            disabled={isUploading}
            className="w-full md:w-80 p-3 border-[1px] dark:border-neutral-800 rounded-xl cursor-pointer bg-zinc-800/30 hover:bg-zinc-800/20"
          >
            {!isUploading ? "Upload" : <Spinner />}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Upload;
