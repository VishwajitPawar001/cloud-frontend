const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getFiles = async () => {
  const res = await fetch(`${API_URL}/files`);
  const data = await res.json();
  return data.files;
};

export const uploadFile = async (formData) => {
  const res = await fetch(`${API_URL}/files/upload`, {
    method: "POST",
    body: formData,
  });

  return res.json();
};

export const deleteFile = async (id) => {
  await fetch(`${API_URL}/files/${id}`, {
    method: "DELETE",
  });
};

export const restoreFile = async (id) => {
  await fetch(`${API_URL}/files/restore/${id}`, {
    method: "PUT",
  });
};

export const permanentDeleteFile = async (id) => {
  await fetch(`${API_URL}/files/permanent/${id}`, {
    method: "DELETE",
  });
};