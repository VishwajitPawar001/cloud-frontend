"use client";

import Sidebar from "../../../components/layout/Sidebar";
import Navbar from "../../../components/layout/Navbar";

export default function Shared() {

  return (
    <div className="flex min-h-screen bg-gray-50">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <div className="p-6 text-gray-600">
          <h2 className="text-xl font-semibold mb-4">Shared Files</h2>
          <p>No shared files yet</p>
        </div>

      </div>

    </div>
  );
}