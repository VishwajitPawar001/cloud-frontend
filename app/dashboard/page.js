"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../../lib/auth";

import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import UploadModal from "../../components/upload/UploadModal";
import FileGrid from "../../components/files/FileGrid";

export default function Dashboard() {

  const router = useRouter();
  const [search, setSearch] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  // ✅ Trigger re-render instead of reload
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (

    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <Navbar onSearch={setSearch} />

        {/* Page Content */}
        <div className="p-4 md:p-8 w-full max-w-7xl mx-auto space-y-8">

          {/* Page Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              My Drive
            </h1>
          </div>

          {/* Upload Section */}
          <div className="card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>
              <h2 className="text-lg font-semibold">
                Upload Files
              </h2>
              <p className="text-sm text-gray-500">
                Add files to your drive
              </p>
            </div>

            <UploadModal onUploadSuccess={handleRefresh} />

          </div>

          {/* Files Section */}
          <div>

            <h2 className="text-lg font-semibold mb-4">
              Files & Folders
            </h2>

            {/* ✅ Key forces re-render */}
            <FileGrid key={refreshKey} searchQuery={search} />

          </div>

        </div>

      </div>

    </div>

  );

}