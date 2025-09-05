import { Link } from "react-router-dom";
type M={ imdbID:string; Title:string; Year:string; Poster:string; Type:string };
export default function PosterCard({m}:{m:M}){
  const src = m.Poster && m.Poster!=="N/A" ? m.Poster : "https://placehold.co/300x450?text=No+Poster";
  return (
    <Link to={`/movie/${m.imdbID}`} style={{textDecoration:"none",color:"inherit"}}>
      <div style={{width:180,display:"grid",gap:8,transform:"translateZ(0)",transition:"transform .2s",borderRadius:16,overflow:"hidden",background:"#0f131a",border:"1px solid #18202b"}}
           onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.03)")}
           onMouseLeave={e=>(e.currentTarget.style.transform="scale(1.00)")}>
        <img src={src} alt={m.Title} style={{width:"100%",height:270,objectFit:"cover"}}/>
        <div style={{padding:"8px 10px"}}>
          <div style={{fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{m.Title}</div>
          <div style={{fontSize:12,opacity:.7}}>{m.Year}</div>
        </div>
      </div>
    </Link>
  );
}
