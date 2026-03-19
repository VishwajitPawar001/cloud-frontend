"use client";

import { useState } from "react";

export default function Navbar({ onSearch }) {

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (

    <div className="bg-white border-b px-4 md:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

      {/* Left Section */}
      <h2 className="text-lg font-semibold">
        My Drive
      </h2>

      {/* Right Section */}
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

        {/* Search */}
        <input
          type="text"
          placeholder="Search files..."
          value={search}
          onChange={handleSearch}
          className="w-full sm:w-64 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* New Folder Button */}
        <button
          onClick={async () => {
            const name = prompt("Enter folder name");
            if (!name) return;

            await fetch("http://localhost:5000/api/folders/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                name,
                owner_id: 1
              })
            });

            window.location.reload();
          }}
          className="btn-primary text-sm"
        >
          + Folder
        </button>

      </div>

    </div>

  );

}