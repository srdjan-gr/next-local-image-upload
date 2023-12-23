"use client";
import Upload from "./components/Upload";
import ImagesList from "./components/ImagesList";
import { useState } from "react";

export default function Home() {
  const [isUploading, setIsUploading] = useState(false);
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-10">
      <Upload isUploading={isUploading} setIsUploading={setIsUploading} />
      <ImagesList isUploading={isUploading} />
    </main>
  );
}
