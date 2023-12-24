"use client";
import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import Spinner from "./Spinner";

const ImagesList = ({ isUploading }) => {
  const [images, setImages] = useState([]);
  const [isFetching, setIsFetched] = useState(true);

  useEffect(() => {
    fetchImages();
  }, [isUploading]);

  const fetchImages = () => {
    setIsFetched(true);
    fetch("/api/upload").then((res) => {
      res.json().then((imgs) => {
        setImages(imgs);
        setIsFetched(false);
      });
    });
  };

  if (isFetching) {
    return (
      <section className="my-16 flex items-center justify-center gap-3">
        <Spinner />
        <h2 className="text-zinc-600 ">Loading images...</h2>
      </section>
    );
  }

  if (images.length === 0) {
    return (
      <section className="my-16">
        <div className="flex gap-1 w-full">
          <h2 className="text-zinc-600 ">No images to show.</h2>
        </div>
      </section>
    );
  }

  if (images.length > 0) {
    return (
      <section className="my-16">
        <h2 className="text-zinc-600">Uploaded Images</h2>
        <div className="grid grid-cols-2 gap-5 lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-lefts mt-4">
          {images?.map((item) => {
            return <ImageCard key={item._id} image={`/img/${item.image}`} />;
          })}
        </div>
      </section>
    );
  }
};

export default ImagesList;
