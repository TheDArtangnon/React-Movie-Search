import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { searchMovies } from "../api/omdb";
import "./Results.css";

type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type?: string;
};

export default function Results() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const q = params.get("query") || "";

  useEffect(() => {
    let alive = true;
    async function run() {
      try {
        setLoading(true);
        setErr(null);
        const data = await searchMovies(q);
        if (!alive) return;
        const list = Array.isArray((data as any)?.Search) ? (data as any).Search : [];
        const unique: Movie[] = [];
        const seen = new Set<string>();
        for (const m of list) {
          if (m?.imdbID && !seen.has(m.imdbID)) {
            seen.add(m.imdbID);
            unique.push(m);
          }
        }
        setMovies(unique.slice(0, 6));
      } catch {
        if (!alive) return;
        setErr("Search failed.");
        setMovies([]);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }
    if (q.trim()) run();
    else { setMovies([]); setErr(null); }
    return () => { alive = false; };
  }, [q]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.querySelector("input[name='q']") as HTMLInputElement | null;
    const next = (input?.value || "").trim();
    if (!next) return;
    navigate(`/results?query=${encodeURIComponent(next)}`);
  }

  const showEmpty = !loading && (!movies || movies.length === 0);

  return (
    <div className="results-root">
      <header className="results-header">
        <Link to="/" className="back-link">← Back</Link>

        <div className="brand">
          <span aria-hidden="true" style={{ fontSize: "clamp(28px, 4.5vw, 56px)" }}>🍿</span>
          <span>Movie Time</span>
        </div>

        <form onSubmit={onSubmit} className="search-wrap">
          <div className="search-box" style={{ maxWidth: "300px" }}>
            <input
              name="q"
              defaultValue={q}
              placeholder="SEARCH BY TITLE"
              className="search-input"
              style={{ width: "70%" }}
            />
            <button
              type="submit"
              className="search-button"
              style={{
                width: "30%",
                fontSize: "0.8rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              Search
            </button>
          </div>
        </form>
      </header>

      <main className="results-main">
        {loading ? (
          <div className="skel-grid">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skel" />)}
          </div>
        ) : showEmpty ? (
          <div className="empty-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="empty-card"><span>No results</span></div>
            ))}
          </div>
        ) : (
          <div className="grid">
            {movies.map((m) => (
              <Link
                key={m.imdbID}
                to={`/detail/${m.imdbID}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="cell">
                  <div className="card">
                    <img
                      src={m.Poster !== "N/A" ? m.Poster : "/assets/landingEntrance.png"}
                      alt={m.Title}
                      className="poster"
                    />
                  </div>
                  <div className="meta">
                    <div className="title">{m.Title}</div>
                    <div className="year">{m.Year}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
