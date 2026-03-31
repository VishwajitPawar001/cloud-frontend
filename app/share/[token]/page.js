"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PublicShare() {
  const { token } = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchFile = async () => {
      try {
        const res = await fetch(
          `https://cloud-backend-ahwr.onrender.com/api/files/public/${token}`
        );

        const data = await res.json();

        // Delay prevents cascading render warning
        setTimeout(() => {
          setFile(data.file);
          setLoading(false);
        }, 0);

      } catch (error) {
        console.error("Public file error:", error);
        setLoading(false);
      }
    };

    fetchFile();
  }, [token]);

  if (loading) {
    return (
      <div className="p-10 text-center">
        <p>Loading file...</p>
      </div>
    );
  }

  if (!file) {
    return (
      <div className="p-10 text-center">
        <p>File not found</p>
      </div>
    );
  }

  return (
    <div className="p-10 text-center">
      <h1 className="text-xl font-semibold mb-4">
        {file.name}
      </h1>

      <a
        href={file.url}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        download
      >
        Download File
      </a>
    </div>
  );
}