import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export async function POST(request) {
  const data = await request.formData();
  const file = data.get("file");
  
  if (data.get("file")) {
    const s3Client = new S3Client({
      region: "ap-northeast-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY || "",
        secretAccessKey: process.env.AWS_SECRET_KEY || "",
      },
    });

    const ext = file.name.split(".").slice(-1)[0];
    const newFikeName = uniqid() + "." + ext;

    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    await s3Client.send(
      new PutObjectCommand({
        Bucket: "akib-food-ordering",
        Key: newFikeName,
        ACL: "public-read",
        ContentType: file.type,
        Body: buffer,
      })
    );
    const link = `https://akib-food-ordering.s3.amazonaws.com/${newFikeName}`;
    return Response.json(link);
  }

  return Response.json(true);
}
