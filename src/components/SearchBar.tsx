import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const nav = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    nav(`/results?query=${encodeURIComponent(query)}`);
  };

  return (
    <form className="searchbar" onSubmit={submit}>
      <input
        className="searchbar__input"
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search By Title"
        autoFocus
        autoComplete="off"
      />
      <button className="searchbar__button" type="submit">Search</button>
    </form>
  );
}
