import api from "./api";

export const getFolders = async () => {
  try {
    const res = await api.get("/api/folders");
    return res.data.folders;
  } catch (err) {
    console.error("GET FOLDERS ERROR:", err.response?.data || err.message);
    return [];
  }
};

export const createFolder = async (name) => {
  const res = await api.post("/api/folders/create", {
    name,
    owner_id: null
  });
  return res.data;
};