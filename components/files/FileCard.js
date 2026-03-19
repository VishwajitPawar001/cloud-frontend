"use client";

export default function FileCard({ file, reload }) {

  const isImage = file.name?.match(/\.(jpg|jpeg|png|gif)$/i);

  const handleDelete = async () => {
    try {

      await fetch(`http://localhost:5000/api/files/${file.id}`, {
        method: "DELETE"
      });

      if (reload) reload();

    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete file");
    }
  };

  // 📄 File Type Icon
  const getIcon = () => {

    const name = file.name?.toLowerCase();

    if (name?.endsWith(".pdf")) return "📕";
    if (name?.endsWith(".mp4")) return "🎬";

    return "📄";
  };

  return (

    <div className="card hover:shadow-lg transition flex flex-col gap-3">

      {/* Preview / Icon */}
      <div className="w-full h-28 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">

        {isImage ? (
          <img
            src={`http://localhost:5000/uploads/${file.name}`}
            alt={file.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-4xl">
            {getIcon()}
          </div>
        )}

      </div>

      {/* File Name */}
      <p className="text-sm font-medium truncate">
        {file.name}
      </p>

      {/* Actions */}
      <div className="flex justify-between items-center text-xs mt-1">

        <a
          href={`http://localhost:5000/api/files/download/${file.name}`}
          className="text-blue-600 hover:underline"
        >
          Download
        </a>

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