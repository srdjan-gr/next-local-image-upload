"use client";
import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";

const ImagesList = ({ isUploading }) => {
  const [images, setImages] = useState([]);
  const [isFetching, setIsFetched] = useState(false);
  const [path, setPath] = useState("");

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

  const getStaticProps = async () => {
    // Fetch image paths from the "public/images" folder
    const imagePaths = await fetchImagePaths();

    return {
      props: {
        imagePaths,
      },
    };
  };

  // Function to fetch image paths
  const fetchImagePaths = async () => {
    const imageDirectory = "public/img";
    const imageFiles = await require.context(
      "../../" + imageDirectory,
      false,
      /\.(png|jpg|jpeg|gif)$/
    );
    const paths = imageFiles
      .keys()
      .map((key) => "/images/" + key.replace("./", ""));
    // return paths;
    setPath(paths);
  };

  return (
    <section className="my-8">
      {isFetching ? (
        <p className="text-zinc-600">Loading images...</p>
      ) : (
        <>
          <h2 className="text-zinc-600">Uploaded Images</h2>
          <div className="grid  grid-cols-2 gap-5 lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-lefts mt-4">
            {images?.map((item) => {
              return <ImageCard key={item._id} image={`/img/${item.image}`} />;
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default ImagesList;
