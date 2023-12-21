import uniqid from "uniqid";

export async function POST(req) {
  const data = await req.formData();

  if (data.get("file")) {
    const file = data.get("file");

    const s3client = new S3Client({
      region: "eu-central-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });

    const fileName = file.name.split(".")[0];
    const ext = file.name.split(".").slice(-1)[0];
    const newFileName = uniqid() + "-" + fileName + "." + ext;
    // const newFileName =uniqid() + '.' + ext

    // Kreiranje  chunk i buffer u kome se nalazi fajl
    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    // Upload u AWS
    s3client.send(
      new PutObjectCommand({
        Bucket: "perfect-pizza",
        Key: newFileName,
        ACL: "public-read",
        ContentType: file.type,
        Body: buffer,
      })
    );

    return Response.json(
      "https://perfect-pizza.s3.amazonaws.com/" + newFileName
    );
  }

  return Response.json(true);
}
