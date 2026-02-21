import axios from "axios";

const resolveLanguage = () => {
  if (typeof navigator === "undefined") {
    return "pt-BR";
  }

  const language = navigator.language || "pt-BR";
  if (language === "pt") return "pt-BR";
  if (language === "en") return "en-US";
  return language;
};

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "35dff10e3f2d8b07ed926313e0ef06b0",
    language: resolveLanguage(),
  },
});

export default axiosInstance;
