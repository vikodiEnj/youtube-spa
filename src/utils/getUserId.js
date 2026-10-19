export function getUserId() {
  const token = localStorage.getItem("access_token");
  if (!token) return null;
  try {
    const tokenData = JSON.parse(atob(token.split(".")[1]));
    return tokenData.sub;
  } catch {
    return null;
  }
}
