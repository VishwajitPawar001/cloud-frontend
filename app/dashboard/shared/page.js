"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../../components/layout/Sidebar";
import Navbar from "../../../components/layout/Navbar";
import FileCard from "../../../components/files/FileCard";

export default function Shared() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSharedFiles = async () => {
    try {
      const res = await fetch(
        "https://cloud-backend-ahwr.onrender.com/api/files/shared",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();
      console.log("Shared files:", data);

      setFiles(data.files || []);

    } catch (error) {
      console.error("Shared load error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSharedFiles();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6 max-w-7xl mx-auto w-full">
          <h2 className="text-xl font-semibold mb-6">
            Shared Files
          </h2>

          {loading ? (
            <p>Loading...</p>
          ) : files.length === 0 ? (
            <p>No shared files yet</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {files.map(file => (
                <FileCard key={file.id} file={file} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}