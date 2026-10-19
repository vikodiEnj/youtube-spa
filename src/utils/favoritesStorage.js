import { getUserId } from "./getUserId";

export function getFavorites() {
  const userId = getUserId();
  const key = `favorites_${userId}`;
  const favorites = localStorage.getItem(key);
  if (favorites === null) return [];
  return JSON.parse(favorites);
}

export function saveFavorites(list) {
  const userId = getUserId();
  const key = `favorites_${userId}`;
  localStorage.setItem(key, JSON.stringify(list));
}
