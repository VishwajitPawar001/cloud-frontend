"use client";

import { useEffect, useState } from "react";
import { getFiles } from "../../services/files";
import { getFolders } from "../../services/folders";
import FileCard from "./FileCard";
import { useRouter } from "next/navigation";

export default function FileGrid({ searchQuery }) {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [filteredFolders, setFilteredFolders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchQuery, files, folders]);

  const loadData = async () => {
    try {
      setLoading(true);

      // Wake backend (Render cold start)
      await fetch("https://cloud-backend-ahwr.onrender.com/");
      await new Promise((res) => setTimeout(res, 1500));

      const fileData = await getFiles();
      const folderData = await getFolders();

      const safeFiles = Array.isArray(fileData) ? fileData : [];
      const safeFolders = Array.isArray(folderData) ? folderData : [];

      // Only root files
      const rootFiles = safeFiles.filter(
        (file) => !file.folder_id || file.folder_id == 1
      );

      setFiles(rootFiles);
      setFolders(safeFolders);
      setFilteredFiles(rootFiles);
      setFilteredFolders(safeFolders);

    } catch (err) {
      console.error("Load error:", err);

      if (err?.response?.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
      }

      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const filterData = () => {
    if (!searchQuery) {
      setFilteredFiles(files);
      setFilteredFolders(folders);
      return;
    }

    const query = searchQuery.toLowerCase();

    const filteredF = files.filter(file =>
      file.name?.toLowerCase().includes(query)
    );

    const filteredFo = folders.filter(folder =>
      folder.name?.toLowerCase().includes(query)
    );

    setFilteredFiles(filteredF);
    setFilteredFolders(filteredFo);
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

      {/* 📁 Folders */}
      {filteredFolders.map(folder => (
        <div
          key={folder.id}
          onClick={() => router.push(`/dashboard/folder/${folder.id}`)}
          className="card cursor-pointer flex flex-col items-center justify-center h-36 hover:shadow-lg transition"
        >
          <div className="text-5xl">📁</div>
          <p className="text-sm mt-2 text-center truncate w-full px-2">
            {folder.name}
          </p>
        </div>
      ))}

      {/* 📄 Files */}
      {filteredFiles.map(file => (
        <FileCard key={file.id} file={file} reload={loadData} />
      ))}

    </div>
  );
}