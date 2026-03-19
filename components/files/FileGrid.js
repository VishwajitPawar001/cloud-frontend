"use client";

import { useEffect, useState } from "react";
import { getFiles } from "../../services/files";
import FileCard from "./FileCard";
import { useRouter } from "next/navigation";

export default function FileGrid({ searchQuery }) {

  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterFiles();
  }, [searchQuery, files]);

  const loadData = async () => {
    try {

      const fileData = await getFiles();

      const folderRes = await fetch("https://cloud-backend-ahwr.onrender.com//api/folders");
      const folderData = await folderRes.json();

      const safeFiles = Array.isArray(fileData) ? fileData : [];

      // ✅ ONLY ROOT FILES
      const rootFiles = safeFiles.filter(
        (file) => !file.folder_id || file.folder_id == 1
      );

      setFiles(rootFiles);
      setFilteredFiles(rootFiles);
      setFolders(folderData?.folders || []);

    } catch (err) {
      console.error(err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const filterFiles = () => {

    if (!searchQuery) {
      setFilteredFiles(files);
      return;
    }

    const filtered = files.filter(file =>
      file.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredFiles(filtered);
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
      {folders.map(folder => (
        <div
          key={folder.id}
          onClick={() => router.push(`/dashboard/folder/${folder.id}`)}
          className="card cursor-pointer flex flex-col items-center justify-center h-36 hover:shadow-lg transition"
        >
          <div className="text-5xl">📁</div>
          <p className="text-sm mt-2">{folder.name}</p>
        </div>
      ))}
        
      {/* 📄 Files */}
      {filteredFiles.map(file => (
        <FileCard key={file.id} file={file} reload={loadData} />
      ))}

    </div>
  );
}