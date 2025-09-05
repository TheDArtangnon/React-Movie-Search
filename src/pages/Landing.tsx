import "./Landing.css";
import { useEffect } from "react";
import SearchBar from "../components/SearchBar";

export default function Landing() {
  useEffect(() => {
    document.body.classList.add("landing-body");
    return () => document.body.classList.remove("landing-body");
  }, []);

  return (
    <div className="landing">
      <div className="landing__bg" />
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 20,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          width: "max-content",
        }}
      >
        <div
          style={{
            margin: 0,
            fontFamily: "'Rock Salt', system-ui, Avenir, Helvetica, Arial, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(28px, 4.5vw, 56px)",
            color: "#ff3b1f",
            WebkitTextStroke: "0.6px rgba(0,0,0,0.7)",
            lineHeight: 1,
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span aria-hidden="true" style={{ fontSize: "clamp(28px, 4.5vw, 56px)" }}>🍿</span>
          <span>Movie Time</span>
        </div>
      </div>
      <div className="landing__overlay">
        <div className="landing__search">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
