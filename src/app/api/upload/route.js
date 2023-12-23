// import formidable from "formidable";
import mongoose from "mongoose";
import { Upload } from "@/app/models/Upload";

import uniqid from "uniqid";
import path from "path";
import { writeFile, fs } from "fs/promises";

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");

  if (!file) {
    return Response.json({ message: 500 });
  }

  mongoose.connect(process.env.MONGO_URL);

  const fileName = file.name.split(".")[0];
  const ext = file.name.split(".").slice(-1)[0];
  const newFileName = uniqid() + "-" + fileName + "." + ext;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = `./public/img/${newFileName}`;
  await writeFile(path, buffer);

  console.log(file);

  await Upload.create({ image: newFileName });

  return Response.json({ message: 200 });
}

// Get all categories
export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  return Response.json(await Upload.find());
}
