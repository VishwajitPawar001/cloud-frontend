import api from "./api";

export const getFolders = async () => {
  try {
    const res = await api.get("/api/folders");
    return res.data.folders;
  } catch (err) {
    console.log("Retrying folders request...");

    // Retry once after 2 seconds (Render cold start fix)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const res = await api.get("/api/folders");
      return res.data.folders;
    } catch (err) {
      console.error("Failed to load folders:", err.message);
      return [];
    }
  }
};