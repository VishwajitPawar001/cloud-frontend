"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../../components/layout/Sidebar";
import Navbar from "../../../components/layout/Navbar";
import FileCard from "../../../components/files/FileCard";
import { getFiles } from "../../../services/files";

export default function Trash() {

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const data = await getFiles();

      const trashFiles = Array.isArray(data)
        ? data.filter(file => file.is_deleted === true)
        : [];

      setFiles(trashFiles);

    } catch (error) {
      console.error("Trash load error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Restore file
  const handleRestore = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/files/restore/${id}`, {
        method: "PUT"
      });

      loadFiles();

    } catch (error) {
      console.error("Restore error:", error);
      alert("Failed to restore file");
    }
  };

  // ✅ Permanent delete
  const handlePermanentDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/files/permanent/${id}`, {
        method: "DELETE"
      });

      loadFiles();

    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete permanently");
    }
  };

  return (

    <div className="flex min-h-screen bg-gray-50">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">

          <h1 className="text-2xl font-semibold mb-6">
            Trash
          </h1>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : files.length === 0 ? (
            <div className="text-gray-400 text-center mt-20">
              <p className="text-lg font-medium">Trash is empty</p>
              <p className="text-sm mt-2">Deleted files will appear here</p>
            </div>
          ) : (

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

              {files.map(file => (

                <div key={file.id} className="card flex flex-col gap-3">

                  <FileCard file={file} />

                  {/* Actions */}
                  <div className="flex justify-between text-xs">

                    <button
                      onClick={() => handleRestore(file.id)}
                      className="text-green-600 hover:underline"
                    >
                      Restore
                    </button>

                    <button
                      onClick={() => handlePermanentDelete(file.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete Forever
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}