import React from "react";
import ImageCard from "./ImageCard";

const ImagesList = () => {
  return (
    <section className="my-8">
      <h2 className="text-zinc-600">Uploaded Images</h2>
      <div className="grid grid-cols-2 gap-5 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-lefts mt-4">
        <ImageCard />
        <ImageCard />
      </div>
    </section>
  );
};

export default ImagesList;
