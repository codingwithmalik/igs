import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const data = await req.formData();
    const file = data.get("file");
    console.log("file found");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    console.log("Buffer is created");

    // upload stream to cloudinary wrapped in a promise
    const result = await new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder: "IGS/Products/covers" },
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
      upload.end(buffer);
    });
    console.log("saved");

    return NextResponse.json({ url: result.secure_url, });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
