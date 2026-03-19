"use client";

import { useState } from "react";
import { createFolder } from "../services/api";

export default function CreateFolder() {

  const [name, setName] = useState("");

  const handleCreate = async () => {

    await createFolder(name, 1);

    alert("Folder created");

  };

  return (
    <div>

      <input
        placeholder="Folder name"
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleCreate}>
        Create Folder
      </button>

    </div>
  );
}