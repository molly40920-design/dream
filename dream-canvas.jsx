import { useState, useEffect, useRef, useCallback } from "react";

const GEMINI_MODELS = [
  { id: "gemini-2.5-flash", label: "Gemini 2.5 Flash", desc: "最快速" },
  { id: "gemini-2.0-flash", label: "Gemini 2.0 Flash", desc: "穩定版" },
  { id: "gemini-2.5-pro", label: "Gemini 2.5 Pro", desc: "最精確" },
  { id: "gemini-1.5-pro", label: "Gemini 1.5 Pro", desc: "經典版" },
];

const VISUAL_STYLES = [
  { id: "surrealism", label: "超現實主義", en: "Surrealism, Salvador Dalí-inspired melting dreamscape", icon: "🌀", color: "#c084fc", desc: "達利式融化時鐘、扭曲空間，將不合邏輯的元素拼貼成奇異畫面，最適合表現荒誕離奇的夢境" },
  { id: "cyberpunk", label: "賽博龐克", en: "Cyberpunk neon noir, rain-soaked dystopian cityscape", icon: "🌃", color: "#22d3ee", desc: "霓虹燈光、雨中暗巷、未來都市廢墟，充滿科技感的反烏托邦風格，適合都市或科技相關的夢境" },
  { id: "ghibli", label: "吉卜力風", en: "Studio Ghibli anime watercolor, soft pastoral fantasy", icon: "🍃", color: "#86efac", desc: "宮崎駿動畫般的溫暖水彩畫風，綠意盎然的田園、柔和光線，適合溫馨、自然或童年回憶的夢境" },
  { id: "impressionism", label: "莫內印象派", en: "Monet Impressionism, dappled light and water reflections", icon: "🎨", color: "#fbbf24", desc: "莫內式的斑駁光影與水面倒影，筆觸鬆散但色彩豐富，適合有水、花園或光影變化的夢境" },
  { id: "darkfantasy", label: "暗黑奇幻", en: "Dark fantasy gothic, Beksinski-inspired organic horror", icon: "🖤", color: "#a1a1aa", desc: "哥德式的陰暗氛圍、有機體般的恐怖造型，充滿壓迫感的異世界，適合惡夢或恐懼類的夢境" },
  { id: "ethereal", label: "空靈夢幻", en: "Ethereal dreamcore pastel, floating celestial softness", icon: "✨", color: "#e9d5ff", desc: "粉彩柔光、飄浮在雲端的天體感，如置身夢中之夢，適合平靜、飛翔或神聖感的夢境" },
  { id: "ukiyoe", label: "浮世繪", en: "Japanese Ukiyo-e woodblock print, Hokusai wave style", icon: "🌊", color: "#6ee7b7", desc: "日本傳統木版畫風格，平面構圖、鮮明線條、浪花與山景，適合有海洋、自然力量的夢境" },
  { id: "artnouveau", label: "新藝術風格", en: "Art Nouveau, Alphonse Mucha ornamental flowing lines", icon: "🌺", color: "#f9a8d4", desc: "慕夏式的裝飾性曲線、花卉藤蔓環繞的優雅人物，適合浪漫、神秘或女性意象的夢境" },
  { id: "vaporwave", label: "蒸氣波", en: "Vaporwave aesthetic, pink-purple retro digital glitch", icon: "🌴", color: "#f472b6", desc: "粉紫色調、復古電腦故障效果、棕櫚樹與希臘雕像，帶有懷舊感的數位美學，適合超現實或迷離的夢境" },
  { id: "oilpainting", label: "古典油畫", en: "Classical oil painting, Caravaggio dramatic chiaroscuro", icon: "🖼️", color: "#d97706", desc: "文藝復興到巴洛克時期的經典油畫，強烈明暗對比、厚重質感，適合戲劇性強或莊嚴的夢境" },
  { id: "watercolor", label: "水彩畫", en: "Delicate watercolor wash, wet-on-wet bleeding pigments", icon: "💧", color: "#67e8f9", desc: "水與顏料自然暈染、邊界模糊柔和，帶有透明感與流動性，適合情緒細膩或朦朧不清的夢境" },
  { id: "pixelart", label: "像素藝術", en: "Retro pixel art, 16-bit SNES style fantasy scene", icon: "👾", color: "#a78bfa", desc: "復古遊戲機般的方塊像素風格，色彩鮮豔、充滿懷舊遊戲感，適合冒險或童趣類的夢境" },
  { id: "inkwash", label: "水墨風", en: "Chinese ink wash painting, misty mountain shanshui landscape", icon: "🏔️", color: "#94a3b8", desc: "中國傳統水墨山水畫，留白意境、墨色濃淡層次，適合帶有禪意、孤寂或自然意象的夢境" },
  { id: "psychedelic", label: "迷幻藝術", en: "60s psychedelic art, kaleidoscopic fractal patterns", icon: "🍄", color: "#fb923c", desc: "60年代迷幻搖滾風格，萬花筒般的碎形圖案、飽和螢光色彩，適合混亂、變形或意識流的夢境" },
  { id: "steampunk", label: "蒸汽龐克", en: "Steampunk Victorian, brass gears and airships", icon: "⚙️", color: "#b45309", desc: "維多利亞時代與蒸汽機械的結合，黃銅齒輪、飛艇與護目鏡，適合機械、冒險或時空穿越的夢境" },
  { id: "minimalist", label: "極簡主義", en: "Minimalist abstract, geometric shapes and negative space", icon: "◻️", color: "#e2e8f0", desc: "大量留白、純淨幾何形狀，以最少元素表達核心意象，適合抽象、寧靜或概念性的夢境" },
];

const MOODS = [
  { id: "peaceful", label: "平靜", icon: "😌" }, { id: "anxious", label: "焦慮", icon: "😰" },
  { id: "excited", label: "興奮", icon: "🤩" }, { id: "scared", label: "恐懼", icon: "😨" },
  { id: "confused", label: "困惑", icon: "😵‍💫" }, { id: "sad", label: "悲傷", icon: "😢" },
  { id: "happy", label: "快樂", icon: "😊" }, { id: "nostalgic", label: "懷舊", icon: "🥹" },
  { id: "angry", label: "憤怒", icon: "😤" }, { id: "lonely", label: "孤獨", icon: "🥀" },
  { id: "awe", label: "敬畏", icon: "😲" }, { id: "guilty", label: "愧疚", icon: "😔" },
];

const DREAM_TYPES = [
  { id: "none", label: "不確定", icon: "❓" }, { id: "lucid", label: "清醒夢", icon: "🔆" },
  { id: "recurring", label: "反覆夢", icon: "🔁" }, { id: "nightmare", label: "惡夢", icon: "👹" },
  { id: "prophetic", label: "預知夢", icon: "🔮" }, { id: "flying", label: "飛行夢", icon: "🕊️" },
  { id: "falling", label: "墜落夢", icon: "🌀" }, { id: "chasing", label: "追逐夢", icon: "🏃" },
];

function StarField() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let id, stars = [];
    const resize = () => { c.width = c.offsetWidth*2; c.height = c.offsetHeight*2; stars = Array.from({length:140},()=>({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*1.6+.2,sp:Math.random()*.4+.05,ph:Math.random()*Math.PI*2})); };
    resize(); window.addEventListener("resize",resize);
    const draw = t => { ctx.clearRect(0,0,c.width,c.height); for(const s of stars){ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(200,195,255,${(.4+.6*Math.sin(t*.0008*s.sp*3+s.ph))*.55})`;ctx.fill();} id=requestAnimationFrame(draw); };
    id=requestAnimationFrame(draw); return()=>{cancelAnimationFrame(id);window.removeEventListener("resize",resize);};
  }, []);
  return <canvas ref={ref} style={{position:"fixed",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0}} />;
}

function renderInline(t) { return t.split(/(\*\*[^*]+\*\*)/g).map((p,i)=>p.startsWith("**")&&p.endsWith("**")?<strong key={i} style={{color:"#e0d4ff",fontWeight:600}}>{p.slice(2,-2)}</strong>:<span key={i}>{p}</span>); }

function Md({ text }) {
  if (!text) return null;
  const el = []; let k = 0;
  for (const ln of text.split("\n")) {
    if (ln.startsWith("### ")) el.push(<h3 key={k++} style={{fontSize:"1.15rem",fontWeight:700,marginTop:30,marginBottom:12,color:"#c4b5fd",fontFamily:"'Noto Serif TC',serif",letterSpacing:1,paddingBottom:8,borderBottom:"1px solid rgba(139,92,246,.12)"}}>{ln.slice(4)}</h3>);
    else if (ln.startsWith("#### ")) el.push(<h4 key={k++} style={{fontSize:"1rem",fontWeight:600,marginTop:20,marginBottom:8,color:"#a5b4fc"}}>{ln.slice(5)}</h4>);
    else if (/^\d+\.\s/.test(ln)){const c=ln.replace(/^\d+\.\s*/,""),n=ln.match(/^(\d+)/)?.[1];el.push(<div key={k++} style={{display:"flex",gap:10,marginBottom:8,paddingLeft:4}}><span style={{color:"#7c3aed",fontWeight:700,fontSize:13,minWidth:22,height:22,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(124,58,237,.12)",borderRadius:6,flexShrink:0}}>{n}</span><span style={{lineHeight:1.75}}>{renderInline(c)}</span></div>);}
    else if (ln.startsWith("- ")||ln.startsWith("* ")) el.push(<div key={k++} style={{display:"flex",gap:8,marginBottom:6,paddingLeft:8}}><span style={{color:"#7c3aed",flexShrink:0,fontSize:8,marginTop:8}}>◆</span><span style={{lineHeight:1.75}}>{renderInline(ln.replace(/^[-*]\s*/,""))}</span></div>);
    else if (ln.startsWith("> ")) el.push(<blockquote key={k++} style={{borderLeft:"3px solid rgba(139,92,246,.4)",paddingLeft:16,marginLeft:4,marginBottom:8,color:"#b4aed0",fontStyle:"italic"}}>{renderInline(ln.slice(2))}</blockquote>);
    else if (ln.trim()==="---"||ln.trim()==="***") el.push(<hr key={k++} style={{border:"none",borderTop:"1px solid rgba(139,92,246,.1)",margin:"16px 0"}} />);
    else if (!ln.trim()) el.push(<div key={k++} style={{height:6}} />);
    else el.push(<p key={k++} style={{marginBottom:8,lineHeight:1.85}}>{renderInline(ln)}</p>);
  }
  return <>{el}</>;
}

function Stream({ text, speed=5 }) {
  const [n,setN]=useState(0);const [done,setD]=useState(false);
  useEffect(()=>{setN(0);setD(false);let i=0;const id=setInterval(()=>{i+=4;if(i>=text.length){setN(text.length);setD(true);clearInterval(id);}else setN(i);},speed);return()=>clearInterval(id);},[text,speed]);
  return <div><Md text={text.slice(0,n)} />{!done&&<span style={{color:"#7c3aed",animation:"cursorBlink .8s ease-in-out infinite"}}>|</span>}</div>;
}

export default function App() {
  const [pg,setPg]=useState("input");
  const [key,setKey]=useState("");const [showK,setShowK]=useState(false);
  const [mdl,setMdl]=useState(GEMINI_MODELS[0].id);
  const [dream,setDream]=useState("");
  const [moods,setMoods]=useState([]);
  const [dtype,setDtype]=useState("none");
  const [vstyle,setVstyle]=useState("surrealism");
  const [loading,setLoading]=useState(false);
  const [result,setResult]=useState(null);
  const [err,setErr]=useState(null);
  const [tab,setTab]=useState("analysis");
  const [lp,setLp]=useState(0);
  const [hist,setHist]=useState([]);
  const [copied,setCopied]=useState(false);
  const [sSrch,setSSrch]=useState("");
  const [showAll,setShowAll]=useState(false);

  const LM=["🌙 潛入夢境的深海...","🔮 辨識潛意識的象徵符號...","🧠 對照榮格原型資料庫...","🌊 梳理夢境敘事結構...","✨ 凝聚你的專屬解析報告...","🎨 調配夢境的視覺色彩..."];
  useEffect(()=>{if(!loading)return;const id=setInterval(()=>setLp(p=>(p+1)%LM.length),2400);return()=>clearInterval(id);},[loading]);

  const togMood=id=>setMoods(p=>p.includes(id)?p.filter(m=>m!==id):p.length<4?[...p,id]:p);
  const sObj=VISUAL_STYLES.find(s=>s.id===vstyle);
  const mLbl=moods.map(id=>MOODS.find(m=>m.id===id)?.label).filter(Boolean).join("、");
  const dtLbl=DREAM_TYPES.find(t=>t.id===dtype)?.label||"";
  const fStyles=VISUAL_STYLES.filter(s=>s.label.includes(sSrch)||s.en.toLowerCase().includes(sSrch.toLowerCase())||s.desc.includes(sSrch));
  const dStyles=showAll?fStyles:fStyles.slice(0,8);

  const prompt=()=>`你是一位世界頂級的心理學家與夢境分析師，同時也是一位擅長文學表達的作家。你精通榮格分析心理學、佛洛伊德精神分析、現代認知神經科學與完形治療夢工作技術。語調溫柔、深刻、富有詩意。

═══ 夢境資料 ═══
【夢境內容】「${dream}」
${dtype!=="none"?`【夢境類型】${dtLbl}`:""}
${mLbl?`【夢中情緒】${mLbl}`:""}
【視覺風格】${sObj?.label||"超現實主義"}

═══ 輸出格式（繁體中文 Markdown） ═══

### 📌 夢境大綱
用 3-4 句話概括這個夢境的核心主題、關鍵訊息與潛意識提示。讓做夢者一看就能掌握「這個夢到底在說什麼」。語氣明確、直指核心。（60-100 字）

---

### 🌊 情緒共鳴與接納
精準描述做夢者在夢中可能經歷的情緒旅程，具體描繪情緒的質地。（100-150 字）

### 🔮 夢境符號深度解碼
挑出 3-5 個關鍵符號，每個分析：榮格原型對應、跨文化象徵、個人潛意識映射。（每個 80-120 字）

### 🧩 夢境敘事結構解析
分析起始情境、關鍵轉折、高潮與張力、結局暗示。（150-200 字）

${dtype!=="none"?`### 🔄 ${dtLbl}特殊分析\n針對此類型夢境的特有心理學意義。（80-120 字）`:""}

### 🪞 陰影與自我對話
從榮格「陰影」角度分析被壓抑的自我面向。（80-120 字）

### 💡 現實映照與成長行動
3 條具體建議：心理層面、行動層面、關係層面。（每條 50-80 字）

### 🎨 夢境視覺化指令 (Image Prompt)
英文 60-100 字，風格：${sObj?.en||"Surrealism"}，具體描述構圖、光影、色彩、氛圍。直接輸出，不加引號。

確保文字優美、有深度、有洞見。`;

  const analyze=async()=>{
    if(!key.trim()||!dream.trim())return;
    setLoading(true);setErr(null);setResult(null);setLp(0);
    try{
      const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${mdl}:generateContent?key=${key}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:prompt()}]}],generationConfig:{temperature:.82,topP:.92,topK:40,maxOutputTokens:8192}})});
      if(!r.ok){const e=await r.json().catch(()=>({}));throw new Error(e?.error?.message||`API 錯誤 (${r.status})`);}
      const d=await r.json(),t=d?.candidates?.[0]?.content?.parts?.[0]?.text;
      if(!t)throw new Error("未收到有效回應。");
      setResult(t);setTab("analysis");setPg("result");
      setHist(p=>[{id:Date.now(),date:new Date().toLocaleDateString("zh-TW",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"}),sn:dream.slice(0,60)+(dream.length>60?"...":""),moods:[...moods],style:vstyle,type:dtype,result:t},...p].slice(0,20));
    }catch(e){setErr(e.message);}finally{setLoading(false);}
  };

  const getPrompt=useCallback(()=>{if(!result)return"";const m=result.match(/Image Prompt\)?[:\s]*\n([\s\S]*?)(?=\n###|$)/i);if(m)return m[1].trim().replace(/^[`"'\s]+|[`"'\s]+$/g,"").replace(/```/g,"");const m2=result.match(/🎨[^]*?\n([\s\S]*?)(?=\n###|$)/);if(m2)return m2[1].trim().split("\n").filter(l=>l.trim()&&!l.startsWith("#")).join(" ").replace(/^[`"'\s]+|[`"'\s]+$/g,"");return"";},[result]);
  const getSyn=useCallback(()=>{if(!result)return"";const m=result.match(/###\s*📌\s*夢境大綱\s*\n([\s\S]*?)(?=\n---|\n###)/);return m?m[1].trim():"";},[result]);
  const cp=t=>{navigator.clipboard?.writeText(t);setCopied(true);setTimeout(()=>setCopied(false),2000);};
  const ok=key.trim()&&dream.trim()&&!loading;

  // Shared styles
  const G="gp",I="inp",C="chip",S="sc",BP="bp",BG="bg",NB="nb";

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(165deg,#06060f 0%,#0c0826 25%,#110a30 50%,#0d0820 75%,#06060f 100%)",color:"#cdc8e4",fontFamily:"'Noto Sans TC',-apple-system,sans-serif",position:"relative"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;600;700&family=Noto+Serif+TC:wght@400;600;700;900&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
        @keyframes floatOrb{0%{transform:translate(-50%,-50%) scale(1)}100%{transform:translate(-50%,-50%) scale(1.25) translateY(-20px)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes breathe{0%,100%{box-shadow:0 0 20px rgba(124,58,237,.1)}50%{box-shadow:0 0 50px rgba(124,58,237,.2)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes spinSlow{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes cursorBlink{0%,100%{opacity:1}50%{opacity:0}}
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:rgba(139,92,246,.2);border-radius:3px}
        .gp{background:rgba(12,8,35,.55);backdrop-filter:blur(24px);border:1px solid rgba(120,100,200,.08);border-radius:20px;transition:border-color .3s}.gp:hover{border-color:rgba(120,100,200,.15)}
        .inp{width:100%;background:rgba(8,6,24,.7);border:1px solid rgba(120,100,200,.1);border-radius:12px;color:#cdc8e4;font-size:14.5px;padding:14px 16px;outline:none;font-family:'Noto Sans TC',sans-serif;transition:border-color .3s,box-shadow .3s}.inp:focus{border-color:rgba(139,92,246,.45);box-shadow:0 0 24px rgba(139,92,246,.08)}.inp::placeholder{color:rgba(150,140,180,.35)}
        textarea.inp{min-height:150px;resize:vertical;line-height:1.85}
        .chip{display:inline-flex;align-items:center;gap:5px;padding:7px 13px;border-radius:28px;font-size:13px;cursor:pointer;transition:all .2s;border:1px solid rgba(120,100,200,.1);background:rgba(8,6,24,.5);color:#908ca8;user-select:none}.chip:hover{border-color:rgba(139,92,246,.3);color:#b8b4d0}.chip.on{border-color:rgba(139,92,246,.5);background:rgba(139,92,246,.12);color:#c4b5fd}
        .sc{padding:12px 10px;border-radius:12px;cursor:pointer;transition:all .2s;border:1px solid rgba(120,100,200,.06);background:rgba(8,6,24,.4);text-align:center;user-select:none;position:relative;overflow:hidden}.sc:hover{border-color:rgba(139,92,246,.25);transform:translateY(-1px)}.sc.on{border-color:rgba(139,92,246,.45);background:rgba(139,92,246,.1)}.sc.on::after{content:'✓';position:absolute;top:6px;right:8px;font-size:11px;color:#a78bfa}
        .bp{width:100%;padding:17px 32px;border:none;border-radius:14px;font-size:16px;font-weight:600;cursor:pointer;font-family:'Noto Sans TC',sans-serif;transition:all .3s;color:#fff;letter-spacing:1.5px;background:linear-gradient(135deg,#5b21b6,#7c3aed,#8b5cf6);box-shadow:0 4px 30px rgba(91,33,182,.3)}.bp:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 40px rgba(91,33,182,.45)}.bp:disabled{opacity:.35;cursor:not-allowed}
        .bg{padding:9px 18px;border:1px solid rgba(120,100,200,.12);border-radius:10px;background:transparent;color:#8a85a8;font-size:13.5px;cursor:pointer;font-family:'Noto Sans TC',sans-serif;transition:all .2s}.bg:hover{color:#c4b5fd;border-color:rgba(139,92,246,.3)}.bg.on{background:rgba(139,92,246,.12);border-color:rgba(139,92,246,.35);color:#c4b5fd}
        .nb{padding:8px 16px;border:none;border-radius:8px;background:transparent;color:#706c8a;font-size:13px;cursor:pointer;font-family:'Noto Sans TC',sans-serif;transition:all .2s;position:relative}.nb:hover{color:#b8b4d0}.nb.on{color:#c4b5fd}.nb.on::after{content:'';position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:16px;height:2px;background:#7c3aed;border-radius:1px}
        select.sel{background:rgba(8,6,24,.7);border:1px solid rgba(120,100,200,.1);border-radius:10px;color:#cdc8e4;font-size:13.5px;padding:10px 14px;outline:none;font-family:'Noto Sans TC',sans-serif;cursor:pointer}select.sel option{background:#110a30;color:#cdc8e4}
      `}</style>

      <StarField />
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>{[0,1,2,3].map(i=><div key={i} style={{position:"absolute",width:`${220+i*100}px`,height:`${220+i*100}px`,borderRadius:"50%",background:`radial-gradient(circle,${["rgba(90,50,170,.08)","rgba(40,70,160,.06)","rgba(130,40,110,.05)","rgba(50,110,170,.06)"][i]} 0%,transparent 70%)`,left:`${[15,65,35,75][i]}%`,top:`${[25,55,75,15][i]}%`,transform:"translate(-50%,-50%)",animation:`floatOrb ${14+i*5}s ease-in-out infinite alternate`}} />)}</div>

      <div style={{position:"relative",zIndex:1,maxWidth:860,margin:"0 auto",padding:"0 18px 60px"}}>
        <nav style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 0",borderBottom:"1px solid rgba(120,100,200,.06)",position:"sticky",top:0,zIndex:10,background:"rgba(6,6,15,.85)",backdropFilter:"blur(12px)",marginBottom:8}}>
          <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}} onClick={()=>{setPg("input");setResult(null);setErr(null);}}>
            <span style={{fontSize:22}}>🌌</span><span style={{fontFamily:"'Noto Serif TC',serif",fontSize:16,fontWeight:700,color:"#c4b5fd",letterSpacing:2}}>潛意識畫布</span>
          </div>
          <div style={{display:"flex",gap:4}}>
            <button className={`nb ${pg==="input"?"on":""}`} onClick={()=>setPg("input")}>✏️ 輸入</button>
            {result&&<button className={`nb ${pg==="result"?"on":""}`} onClick={()=>setPg("result")}>📜 報告</button>}
            <button className={`nb ${pg==="history"?"on":""}`} onClick={()=>setPg("history")}>📚 紀錄{hist.length>0&&<span style={{fontSize:11,color:"#7c3aed",marginLeft:2}}>({hist.length})</span>}</button>
          </div>
        </nav>

        {/* ═══ INPUT ═══ */}
        {pg==="input"&&<div style={{animation:"fadeIn .4s"}}>
          <div style={{textAlign:"center",padding:"36px 0 32px",animation:"slideUp .7s ease-out"}}>
            <div style={{fontSize:44,marginBottom:8,filter:"drop-shadow(0 0 20px rgba(139,92,246,.3))"}}>🌌</div>
            <h1 style={{fontFamily:"'Playfair Display','Noto Serif TC',serif",fontSize:"clamp(1.6rem,4.5vw,2.2rem)",fontWeight:700,background:"linear-gradient(135deg,#ddd6fe,#a78bfa 40%,#c4b5fd 70%,#e9d5ff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:12,letterSpacing:3,lineHeight:1.3}}>專屬夢境深度解析</h1>
            <p style={{color:"#5a5480",fontSize:14,fontWeight:300,letterSpacing:.5,lineHeight:1.6,maxWidth:460,margin:"0 auto"}}>寫下你的夢境，AI 將結合榮格心理學、佛洛伊德理論<br/>與認知神經科學，為你解讀潛意識的密語</p>
          </div>

          <div className={G} style={{padding:"20px 22px",marginBottom:16,animation:"slideUp .7s ease-out .05s both"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,flexWrap:"wrap",gap:8}}>
              <span style={{fontSize:13,color:"#706c8a"}}>🔑 Gemini API Key</span>
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{fontSize:12,color:"#7c3aed",textDecoration:"none",opacity:.7}}>免費取得 →</a>
            </div>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <div style={{flex:1,minWidth:200,position:"relative"}}>
                <input className={I} type={showK?"text":"password"} placeholder="貼上你的 Gemini API Key..." value={key} onChange={e=>setKey(e.target.value)} style={{paddingRight:42}} />
                <button onClick={()=>setShowK(!showK)} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#706c8a",cursor:"pointer",fontSize:15}}>{showK?"🙈":"👁️"}</button>
              </div>
              <select className="sel" value={mdl} onChange={e=>setMdl(e.target.value)} style={{minWidth:168}}>{GEMINI_MODELS.map(m=><option key={m.id} value={m.id}>{m.label} ({m.desc})</option>)}</select>
            </div>
          </div>

          <div className={G} style={{padding:"24px 22px",marginBottom:16,animation:"slideUp .7s ease-out .1s both"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <span style={{fontSize:14,fontWeight:600,color:"#b8b4d0"}}>💭 描述你的夢境</span>
              <span style={{fontSize:11,color:"#4a4660"}}>{dream.length} 字</span>
            </div>
            <textarea className={I} value={dream} onChange={e=>setDream(e.target.value)} placeholder={"閉上眼睛，回想昨晚的夢境...\n\n場景是什麼樣的？出現了哪些人物？發生了什麼事件？\n你在夢中有什麼感受？越詳細，解析越深入。"} />
          </div>

          <div className={G} style={{padding:"24px 22px",marginBottom:16,animation:"slideUp .7s ease-out .15s both"}}>
            <div style={{fontSize:13,color:"#706c8a",marginBottom:8}}>🏷️ 夢境類型 <span style={{fontSize:11,color:"#4a4660"}}>（可選）</span></div>
            <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:20}}>{DREAM_TYPES.map(t=><div key={t.id} className={`${C} ${dtype===t.id?"on":""}`} onClick={()=>setDtype(t.id)}><span>{t.icon}</span><span>{t.label}</span></div>)}</div>
            <div style={{fontSize:13,color:"#706c8a",marginBottom:8}}>😶‍🌫️ 夢中的情緒 <span style={{fontSize:11,color:"#4a4660"}}>（最多 4 個）</span></div>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>{MOODS.map(m=><div key={m.id} className={`${C} ${moods.includes(m.id)?"on":""}`} onClick={()=>togMood(m.id)}><span>{m.icon}</span><span>{m.label}</span></div>)}</div>
          </div>

          <div className={G} style={{padding:"24px 22px",marginBottom:20,animation:"slideUp .7s ease-out .2s both"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,flexWrap:"wrap",gap:8}}>
              <span style={{fontSize:13,color:"#706c8a"}}>🎨 夢境視覺風格 <span style={{fontSize:11,color:"#4a4660"}}>（影響繪圖指令）</span></span>
              <input className={I} type="text" placeholder="搜尋風格..." value={sSrch} onChange={e=>setSSrch(e.target.value)} style={{width:140,padding:"7px 12px",fontSize:12.5}} />
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(115px, 1fr))",gap:8}}>
              {dStyles.map(s=><div key={s.id} className={`${S} ${vstyle===s.id?"on":""}`} onClick={()=>setVstyle(s.id)} title={s.desc}><div style={{fontSize:20,marginBottom:3}}>{s.icon}</div><div style={{fontSize:12.5,color:vstyle===s.id?s.color:"#706c8a",fontWeight:vstyle===s.id?600:400,transition:"color .2s"}}>{s.label}</div></div>)}
            </div>
            {sObj&&<div style={{marginTop:14,padding:"14px 16px",borderRadius:14,background:"rgba(8,6,24,.5)",border:"1px solid rgba(120,100,200,.1)"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
                <div style={{fontSize:28,flexShrink:0,marginTop:2}}>{sObj.icon}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontWeight:600,color:sObj.color,marginBottom:4}}>{sObj.label}</div>
                  <div style={{fontSize:12.5,color:"#908ca8",lineHeight:1.7,marginBottom:6}}>{sObj.desc}</div>
                  <div style={{fontSize:11,color:"#4a4660",fontFamily:"'SF Mono',monospace",wordBreak:"break-word"}}>EN: {sObj.en}</div>
                </div>
              </div>
            </div>}
            {!showAll&&fStyles.length>8&&<button onClick={()=>setShowAll(true)} style={{display:"block",margin:"12px auto 0",background:"none",border:"none",color:"#7c3aed",fontSize:12.5,cursor:"pointer",opacity:.7}}>展開全部 {fStyles.length} 種風格 ▾</button>}
            {showAll&&<button onClick={()=>setShowAll(false)} style={{display:"block",margin:"12px auto 0",background:"none",border:"none",color:"#7c3aed",fontSize:12.5,cursor:"pointer",opacity:.7}}>收合 ▴</button>}
          </div>

          <div style={{animation:"slideUp .7s ease-out .25s both"}}>
            <button className={BP} disabled={!ok} onClick={analyze}>{loading?LM[lp]:"✨ 開始深度解析夢境"}</button>
            {!key.trim()&&dream.trim().length>0&&<p style={{textAlign:"center",marginTop:10,fontSize:12,color:"#7c3aed",opacity:.7}}>請先輸入 Gemini API Key 才能解析</p>}
          </div>
          {err&&<div className={G} style={{padding:"16px 20px",marginTop:16,borderColor:"rgba(239,68,68,.2)",background:"rgba(35,10,15,.5)"}}><div style={{fontSize:14,color:"#fca5a5",marginBottom:4}}>❌ {err}</div><div style={{fontSize:12,color:"#6b5050"}}>常見原因：API Key 無效、額度用盡、所選模型不可用。</div></div>}
          {loading&&<div className={G} style={{padding:"44px 24px",marginTop:16,textAlign:"center",animation:"breathe 3s ease-in-out infinite"}}><div style={{fontSize:44,marginBottom:14}}><span style={{display:"inline-block",animation:"spinSlow 8s linear infinite"}}>🔮</span></div><div style={{fontSize:14.5,color:"#a5b4fc",fontWeight:500,marginBottom:6}}>{LM[lp]}</div><div style={{width:160,height:2,margin:"14px auto 0",borderRadius:1,overflow:"hidden",background:"rgba(60,40,120,.15)"}}><div style={{width:"100%",height:"100%",background:"linear-gradient(90deg,transparent,#7c3aed,transparent)",backgroundSize:"200% 100%",animation:"shimmer 1.5s linear infinite"}} /></div></div>}
        </div>}

        {/* ═══ RESULT ═══ */}
        {pg==="result"&&result&&<div style={{animation:"fadeIn .5s",paddingTop:16}}>
          <div className={G} style={{padding:"26px 24px",marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:10}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:22}}>📜</span><span style={{fontFamily:"'Noto Serif TC',serif",fontSize:17,fontWeight:700,color:"#c4b5fd",letterSpacing:1}}>夢境解析報告</span></div>
              <div style={{display:"flex",gap:4,alignItems:"center"}}><span style={{fontSize:11,color:"#4a4660",marginRight:6}}>{sObj?.icon} {sObj?.label}</span>{moods.map(id=>{const m=MOODS.find(x=>x.id===id);return m?<span key={id} style={{fontSize:14}} title={m.label}>{m.icon}</span>:null;})}</div>
            </div>

            {getSyn()&&<div style={{marginBottom:20,padding:"18px 20px",borderRadius:14,background:"rgba(124,58,237,.06)",border:"1px solid rgba(139,92,246,.15)"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:16}}>📌</span><span style={{fontSize:14,fontWeight:600,color:"#c4b5fd",fontFamily:"'Noto Serif TC',serif",letterSpacing:1}}>夢境大綱</span></div>
              <div style={{fontSize:14.5,color:"#d4d0e8",lineHeight:1.85}}><Md text={getSyn()} /></div>
            </div>}

            <div style={{display:"flex",gap:6,marginBottom:22,flexWrap:"wrap"}}>
              <button className={`${BG} ${tab==="analysis"?"on":""}`} onClick={()=>setTab("analysis")}>🧠 完整解析</button>
              <button className={`${BG} ${tab==="prompt"?"on":""}`} onClick={()=>setTab("prompt")}>🎨 繪圖指令</button>
              <button className={`${BG} ${tab==="raw"?"on":""}`} onClick={()=>setTab("raw")}>📝 原始文字</button>
            </div>

            {tab==="analysis"&&<div style={{lineHeight:1.85,fontSize:14.5,animation:"fadeIn .3s"}}><Stream text={result} /></div>}
            {tab==="prompt"&&<div style={{animation:"fadeIn .3s"}}><p style={{fontSize:13,color:"#706c8a",marginBottom:14,lineHeight:1.6}}>根據「{sObj?.label}」風格生成的繪圖指令：</p><div style={{background:"rgba(8,6,24,.7)",border:"1px solid rgba(120,100,200,.12)",borderRadius:14,padding:20,fontFamily:"monospace",fontSize:13.5,lineHeight:1.85,color:"#c4b5fd",wordBreak:"break-word"}}>{getPrompt()||"（請查看完整解析）"}</div><div style={{marginTop:14}}><button className={BG} onClick={()=>cp(getPrompt())} style={{fontSize:13}}>{copied?"✅ 已複製！":"📋 複製指令"}</button></div></div>}
            {tab==="raw"&&<div style={{animation:"fadeIn .3s"}}><div style={{background:"rgba(8,6,24,.7)",border:"1px solid rgba(120,100,200,.08)",borderRadius:14,padding:20,fontSize:13,lineHeight:1.8,color:"#908ca8",whiteSpace:"pre-wrap",wordBreak:"break-word",maxHeight:500,overflowY:"auto"}}>{result}</div><div style={{marginTop:14}}><button className={BG} onClick={()=>cp(result)} style={{fontSize:13}}>{copied?"✅ 已複製！":"📋 複製全文"}</button></div></div>}
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>
            <button className={BG} onClick={()=>setPg("input")} style={{flex:1,textAlign:"center"}}>✏️ 解析新夢境</button>
            <button className={BG} onClick={()=>cp(result)} style={{flex:1,textAlign:"center"}}>📋 複製報告</button>
          </div>
          <div className={G} style={{padding:"16px 20px",opacity:.6}}><div style={{fontSize:12,color:"#5a5480",lineHeight:1.7}}>💡 夢境解析是心理探索工具，非醫療診斷。如持續受夢境困擾，建議尋求專業心理諮商師協助。</div></div>
        </div>}

        {/* ═══ HISTORY ═══ */}
        {pg==="history"&&<div style={{animation:"fadeIn .4s",paddingTop:16}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
            <h2 style={{fontFamily:"'Noto Serif TC',serif",fontSize:18,fontWeight:700,color:"#c4b5fd"}}>📚 夢境紀錄</h2>
            {hist.length>0&&<button className={BG} onClick={()=>{if(confirm("確定清除？"))setHist([]);}} style={{fontSize:12}}>🗑️ 清除全部</button>}
          </div>
          {hist.length===0?<div className={G} style={{padding:"50px 24px",textAlign:"center"}}><div style={{fontSize:40,marginBottom:12,opacity:.4}}>🌙</div><div style={{fontSize:14,color:"#5a5480"}}>尚未有夢境紀錄</div></div>
          :<div style={{display:"flex",flexDirection:"column",gap:10}}>{hist.map(e=><div key={e.id} style={{padding:"16px 18px",borderRadius:14,cursor:"pointer",border:"1px solid rgba(120,100,200,.06)",background:"rgba(8,6,24,.4)",transition:"all .2s"}} onClick={()=>{setResult(e.result);setVstyle(e.style);setMoods(e.moods);setTab("analysis");setPg("result");}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,alignItems:"center"}}><span style={{fontSize:12,color:"#5a5480"}}>{e.date}</span><div style={{display:"flex",gap:3}}><span style={{fontSize:12}}>{VISUAL_STYLES.find(s=>s.id===e.style)?.icon}</span>{e.moods.map(id=>{const m=MOODS.find(x=>x.id===id);return m?<span key={id} style={{fontSize:12}}>{m.icon}</span>:null;})}</div></div>
            <div style={{fontSize:14,color:"#b8b4d0",lineHeight:1.6}}>{e.sn}</div>
          </div>)}</div>}
        </div>}

        <div style={{textAlign:"center",marginTop:48,fontSize:11.5,color:"#2a2550",letterSpacing:.5,lineHeight:1.8}}>潛意識畫布 Subconscious Canvas<br/>Powered by Gemini AI · 基於榮格分析心理學</div>
      </div>
    </div>
  );
}
