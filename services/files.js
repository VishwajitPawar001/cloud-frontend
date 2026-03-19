import api from "./api";

export const getFiles = async () => {
  const res = await api.get("/files");
  return res.data.files;
};

export const uploadFile = async (formData) => {
  const res = await api.post("/files/upload", formData);
  return res.data;
};