import api from "./api";

export const getFolders = async () => {
  const res = await api.get("/folders");
  return res.data.folders;
};

export const createFolder = async (name) => {
  const res = await api.post("/folders/create", {
    name,
    owner_id: 1
  });
  return res.data;
};