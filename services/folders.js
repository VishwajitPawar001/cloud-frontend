import api from "./api";

export const getFolders = async () => {
  const res = await api.get("/api/folders");
  return res.data.folders;
};

export const createFolder = async (name) => {
  const res = await api.post("/api/folders/create", {
    name,
    owner_id: null
  });
  return res.data;
};