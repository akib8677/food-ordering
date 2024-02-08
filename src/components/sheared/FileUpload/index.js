"use client";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

const FileUpload = ({ image, onFileChange }) => {
  const [selectedLink, setSelectedLink] = useState(image || '');
  const [error, setError] = useState("");

  const handleFileChange = async (event) => {
    const files = event.target.files;

    if (files.length > 0) {
      const data = new FormData();
      data.set("file", files[0]);
      const promise = new Promise(async (resolve, reject) => {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });
        if (response.ok) resolve();
        else reject();

        const link = await response.json();
        setSelectedLink(link);
        onFileChange(link);
        setError("");
      });
      await toast.promise(promise, {
        loading: "Uploading...",
        success: "Uploded!",
        error: "Error",
      });
    } else {
      setSelectedLink("");
      setError("Please select a file.");
    }
  };

  return (
    <>
      <div className="">
        <Image
          src={selectedLink || ''}
          className="rounded-lg mb-1 text-center border bg-gray-200"
          width={100}
          height={100}
          alt="Upload"
        />
        <label className="text-center block cursor-pointer font-semibold border w-full p-2 rounded-lg">
          <input
            type="file"
            className="hidden"
            onChange={(e) => handleFileChange(e)}
          />
          <span>Edit</span>
        </label>
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </>
  );
};

export default FileUpload;
