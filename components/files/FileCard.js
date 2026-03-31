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

  // ✅ FORCE DOWNLOAD
  const handleDownload = async () => {
    try {
      const response = await fetch(file.url);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(blobUrl);

    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download file");
    }
  };

  // ✅ SHARE FILE
const handleShare = async () => {
  try {
    const res = await fetch(
      `https://cloud-backend-ahwr.onrender.com/api/files/share-link/${file.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await res.json();

    navigator.clipboard.writeText(data.link);

    alert("Share link copied to clipboard!");

  } catch (error) {
    console.error(error);
    alert("Failed to generate share link");
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

        {/* Download */}
        <button
          onClick={handleDownload}
          className="text-blue-600 hover:underline"
        >
          Download
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="text-green-600 hover:underline"
        >
          Share
        </button>

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