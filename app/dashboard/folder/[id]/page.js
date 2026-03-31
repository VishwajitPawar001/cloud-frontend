"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "../../../../components/layout/Sidebar";
import Navbar from "../../../../components/layout/Navbar";
import UploadModal from "../../../../components/upload/UploadModal";
import FileCard from "../../../../components/files/FileCard";
import api from "../../../../services/api";

export default function FolderPage() {
  const { id } = useParams();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadFiles();
    }
  }, [id]);

  const loadFiles = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/api/files/folder/${id}`);
      setFiles(res.data.files || []);

    } catch (error) {
      console.error("Error loading folder files:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <div className="p-6 max-w-7xl mx-auto w-full space-y-6">

          <h2 className="text-xl font-semibold">
            Folder {id}
          </h2>

          {/* Upload inside folder */}
          <UploadModal
            folderId={id}
            onUploadSuccess={loadFiles}
          />

          {/* Loading */}
          {loading && (
            <p className="text-gray-500">Loading files...</p>
          )}

          {/* Empty State */}
          {!loading && files.length === 0 && (
            <div className="text-gray-400 text-center mt-10">
              <p>No files in this folder</p>
            </div>
          )}

          {/* Files */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">

            {files.map(file => (
              <FileCard key={file.id} file={file} reload={loadFiles} />
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}