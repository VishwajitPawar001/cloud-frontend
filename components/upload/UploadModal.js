"use client";

import { useState } from "react";
import api from "../../services/api";

export default function UploadModal({ onUploadSuccess, folderId = "1" }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);           // must match upload.single("file")
      formData.append("folder_id", folderId);  // folder where file will be stored
      formData.append("owner_id", "1");        // temp user id

      await api.post("/api/files/upload", formData);

      alert("File uploaded successfully");

      setFile(null);

      // Refresh file list
      if (onUploadSuccess) {
        onUploadSuccess();
      }

    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full sm:w-auto">

      {/* File Input */}
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="input text-sm flex-1"
      />

      {/* Selected File Name */}
      {file && (
        <p className="text-xs text-gray-500 truncate max-w-[150px]">
          {file.name}
        </p>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className={`btn-primary text-sm ${
          loading || !file ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

    </div>
  );
}