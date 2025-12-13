import axios from 'axios';

// Create an instance of axios with the base URL
const api = axios.create({
  // baseURL: "http://localhost:8000"
  baseURL: "https://repealable-janetta-endless.ngrok-free.dev/",
  headers: {
    "ngrok-skip-browser-warning": "true"
  }
});

export const transcribeAudio = async (audioBlob, lang = "yoruba") => {
  const formData = new FormData();
  formData.append("file", audioBlob, "audio.wav");

  return api.post(`/stt?lang=${lang}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Export the Axios instance
export default api;
