import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingBlock, { SkeletonLines } from "../components/LoadingBlock";
import "./Detail.css";

type DetailData = {
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
  Genre: string;
  Runtime: string;
  Rated: string;
  Director: string;
  Actors: string;
  imdbRating: string;
  imdbID: string;
  Response: "True" | "False";
  Error?: string;
};

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [d, setD] = useState<DetailData | null>(null);

  const key = useMemo(() => (import.meta as any).env?.VITE_OMDB_KEY || "3be48169", []);
  const ytKey = useMemo(() => (import.meta as any).env?.VITE_YT_KEY || "", []);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!id) return;

    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    const run = async () => {
      setLoading(true);
      setErr(null);
      setD(null);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?i=${encodeURIComponent(id)}&plot=full&apikey=${key}`,
          { signal: ctrl.signal }
        );
        const data: DetailData = await res.json();
        if (data.Response === "False") {
          setErr(data.Error || "Not found");
          setD(null);
        } else {
          setD(data);
        }
      } catch (e: any) {
        if (e?.name !== "AbortError") {
          setErr("Network error");
          setD(null);
        }
      } finally {
        setLoading(false);
      }
    };

    run();
    return () => ctrl.abort();
  }, [id, key]);

  async function openTrailer() {
    if (!d?.Title) return;
    const q = `${d.Title} official trailer ${d.Year || ""}`.trim();
    if (ytKey) {
      try {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(q)}&key=${ytKey}`;
        const r = await fetch(url);
        const j = await r.json();
        const v = j?.items?.[0]?.id?.videoId;
        if (v) {
          window.open(`https://www.youtube.com/watch?v=${v}`, "_blank", "noopener,noreferrer");
          return;
        }
      } catch {}
    }
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="detail-root">
      <div className="detail-wrap">
        <div className="detail-header">
          <Link to="/" className="back-link">← Back</Link>
          <div className="brand">
            <span aria-hidden="true" style={{ fontSize: "clamp(28px,4.5vw,56px)" }}>🍿</span>
            <span>Movie Time</span>
          </div>
          <div className="actions">
            <button onClick={openTrailer} className="btn btn--ghost">Watch Trailer</button>
            {d?.imdbID ? (
              <a
                href={`https://www.imdb.com/title/${d.imdbID}/`}
                target="_blank"
                rel="noreferrer"
                className="btn btn--ghost"
              >
                Open on IMDb ↗
              </a>
            ) : (
              <span />
            )}
          </div>
        </div>

        {loading ? (
          <div className="detail-grid">
            <LoadingBlock w="100%" h={390} radius={12} />
            <div className="meta-col">
              <LoadingBlock w="60%" h={30} />
              <LoadingBlock w="40%" h={18} />
              <SkeletonLines rows={3} widths={["100%", "90%", "75%"]} />
              <LoadingBlock w="35%" h={16} />
              <LoadingBlock w="50%" h={16} />
              <SkeletonLines rows={5} widths={["100%", "100%", "95%", "85%", "60%"]} />
            </div>
          </div>
        ) : err ? (
          <div className="error">{err}</div>
        ) : d ? (
          <div className="detail-grid">
            <div className="poster-wrap">
              {d.Poster && d.Poster !== "N/A" ? (
                <img src={d.Poster} alt={d.Title} className="poster" />
              ) : (
                <div className="nodata">No Image</div>
              )}
            </div>

            <div className="meta-col">
              <h1 className="title">{d.Title}</h1>
              <div className="meta-row">
                {d.Year} • {d.Rated} • {d.Runtime} • {d.Genre}
              </div>
              <div className="meta-row">
                <strong>Director:</strong> {d.Director}
              </div>
              <div className="meta-row">
                <strong>Cast:</strong> {d.Actors}
              </div>
              <p className="plot">{d.Plot}</p>
              <div className="imdb-score">
                IMDb: <strong>{d.imdbRating || "N/A"}</strong>
              </div>
            </div>
          </div>
        ) : (
          <div className="nodata">No data</div>
        )}
      </div>
    </div>
  );
}
