import mockResponse from "../mocks/searchResponse.json";

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";

export const searchVideos = async ({
  query,
  order = "relevance",
  maxResults = 12,
}) => {
  if (USE_MOCKS) {
    return mockResponse.items;
  }
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const params = new URLSearchParams({
    part: "snippet",
    type: "video",
    order: order,
    maxResults: maxResults,
    q: query,
    key: apiKey,
  });
  const url = `${import.meta.env.VITE_YOUTUBE_API_URL}?${params}`;
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || "Что-то пошло не так");
  }
  return data.items;
};
