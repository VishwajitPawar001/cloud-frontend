"use client";

import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 📱 Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-slate-900 text-white p-4">

        <h1 className="text-lg font-bold">CloudDrive</h1>

        <button onClick={() => setOpen(!open)}>
          ☰
        </button>

      </div>

      {/* 📱 Mobile Drawer */}
      {open && (
        <div className="md:hidden bg-slate-900 text-white p-6 space-y-4">

          <Link href="/dashboard" onClick={() => setOpen(false)}>
            📁 My Drive
          </Link>

          <Link href="/dashboard/shared" onClick={() => setOpen(false)}>
            🤝 Shared
          </Link>

          <Link href="/dashboard/trash" onClick={() => setOpen(false)}>
            🗑 Trash
          </Link>

        </div>
      )}

      {/* 💻 Desktop Sidebar */}
      <div className="hidden md:flex w-64 bg-slate-900 text-white h-screen p-6 flex-col">

        <h1 className="text-xl font-bold mb-10">
          CloudDrive
        </h1>

        <nav className="flex flex-col gap-4 text-sm">

          <Link href="/dashboard" className="hover:text-blue-400">
            📁 My Drive
          </Link>

          <Link href="/dashboard/shared" className="hover:text-blue-400">
            🤝 Shared
          </Link>

          <Link href="/dashboard/trash" className="hover:text-blue-400">
            🗑 Trash
          </Link>

        </nav>

      </div>
    </>
  );
}