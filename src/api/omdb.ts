const BASE = "https://www.omdbapi.com/";
const KEY = (import.meta as any).env?.VITE_OMDB_KEY || "3be48169";

export async function searchMovies(q: string) {
  const qq = (q || "").trim();
  if (!qq) return { Search: [] };
  const url = `${BASE}?apikey=${KEY}&s=${encodeURIComponent(qq)}&type=movie`;
  const res = await fetch(url);
  return res.json();
}

export async function getMovie(id: string) {
  const iid = (id || "").trim();
  if (!iid) return { Response: "False", Error: "Missing id" };
  const url = `${BASE}?apikey=${KEY}&i=${encodeURIComponent(iid)}&plot=full`;
  const res = await fetch(url);
  return res.json();
}

