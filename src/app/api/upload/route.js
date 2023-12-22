import formidable from "formidable";
import uniqid from "uniqid";
import path, { join } from "path";
import { writeFile, fs } from "fs/promises";

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");

  if (!file) {
    return Response.json({ message: 500 });
  }

  const fileName = file.name.split(".")[0];
  const ext = file.name.split(".").slice(-1)[0];
  const newFileName = uniqid() + "-" + fileName + "." + ext;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = `./public/img/${newFileName}`;
  await writeFile(path, buffer);

  console.log(file);

  return Response.json({ message: 200 });
}
