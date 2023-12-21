import Image from "next/image";
import Upload from "./components/Upload";
import ImagesList from "./components/ImagesList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-10">
      <Upload />
      <ImagesList />
    </main>
  );
}
