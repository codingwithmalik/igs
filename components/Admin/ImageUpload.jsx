"use client";
import { useState } from "react";

export default function UploadImage({ onUpload , setUploading , uploading}) {
  const [file, setFile] = useState(null);
  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setUploading(false);

    if (data.url) {
      onUpload(data.url);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        className="w-full px-4 py-2 border border-[#1f2a2d] bg-[#0b0f10] text-gray-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        className="flex items-center justify-center space-x-2 bg-emerald-700 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-shadow w-full mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
