"use client";

import { useState } from "react";

export default function UploadFile() {

  const [file, setFile] = useState(null);

  const upload = async () => {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("folderId", folderId);
    formData.append("owner_id", 1);

    await fetch("http://localhost:5000/api/files/upload", {
      method: "POST",
      body: formData
    });

    alert("File uploaded");

  };

  return (
    <div>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={upload}>
        Upload
      </button>

    </div>
  );
}