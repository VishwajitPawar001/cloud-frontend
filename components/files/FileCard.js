"use client";

export default function FileCard({ file, reload }) {

  const isImage = file.name?.match(/\.(jpg|jpeg|png|gif)$/i);

  const handleDelete = async () => {
    try {
      await fetch(`https://cloud-backend-ahwr.onrender.com/api/files/${file.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (reload) reload();

    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete file");
    }
  };

  return (
    <div className="card hover:shadow-lg transition flex flex-col gap-3">

      {/* Preview */}
      <div className="w-full h-28 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
        {isImage ? (
          <img
            src={file.url}
            alt={file.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-4xl">📄</div>
        )}
      </div>

      {/* File Name */}
      <p className="text-sm font-medium truncate">
        {file.name}
      </p>

      {/* Actions */}
      <div className="flex justify-between items-center text-xs mt-1">

        {/* Download from Supabase */}
        <a
          href={file.url}
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          Download
        </a>

        {/* Delete */}
        <button
          onClick={handleDelete}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>

      </div>

    </div>
  );
}