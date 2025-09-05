const BASE = "https://www.omdbapi.com/";

export async function searchMovies(q: string) {
  const key = import.meta.env.VITE_OMDB_KEY as string | undefined;
  if (!key) throw new Error("OMDb key missing");
  const url = `${BASE}?apikey=${key}&s=${encodeURIComponent(q)}`;
  const res = await fetch(url);
  return await res.json();
}

export async function getMovie(id: string) {
  const key = import.meta.env.VITE_OMDB_KEY as string | undefined;
  if (!key) throw new Error("OMDb key missing");
  const url = `${BASE}?apikey=${key}&i=${encodeURIComponent(id)}&plot=full`;
  const res = await fetch(url);
  return await res.json();
}
