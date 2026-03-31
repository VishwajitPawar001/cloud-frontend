import api from "./api";

// Upload file
export const uploadFile = async (formData) => {
  const res = await api.post("/api/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// Get root files
export const getFiles = async () => {
  const res = await api.get("/api/files");
  return res.data.files;
};

// Get trash files
export const getTrashFiles = async () => {
  const res = await api.get("/api/files/trash");
  return res.data.files;
};

// Soft delete (move to trash)
export const deleteFile = async (id) => {
  const res = await api.delete(`/api/files/${id}`);
  return res.data;
};

// Restore file
export const restoreFile = async (id) => {
  const res = await api.put(`/api/files/restore/${id}`);
  return res.data;
};

// Permanent delete
export const permanentDeleteFile = async (id) => {
  const res = await api.delete(`/api/files/permanent/${id}`);
  return res.data;
};