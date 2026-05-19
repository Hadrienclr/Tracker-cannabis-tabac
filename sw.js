<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"/>
  <meta name="theme-color" content="#0a0a0f"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
  <meta name="apple-mobile-web-app-title" content="Habit Tracker"/>
  <link rel="manifest" href="manifest.json"/>
  <link rel="apple-touch-icon" href="icon-192.png"/>
  <title>Habit Tracker</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet"/>
  <style>
    :root{--bg:#0a0a0f;--s:rgba(255,255,255,0.035);--b:rgba(255,255,255,0.07);--t:#e8e8f0;--m:#6b7280;}
    *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
    html,body{height:100%;background:var(--bg);color:var(--t);font-family:'DM Sans',system-ui,sans-serif;overflow:hidden;}
    #root{height:100%;display:flex;flex-direction:column;}
    .shell{display:flex;flex-direction:column;height:100%;padding-top:env(safe-area-inset-top,0px);}
    .hdr{padding:12px 16px 0;flex-shrink:0;}
    .content{flex:1;overflow-y:auto;padding:10px 16px calc(72px + max(env(safe-area-inset-bottom,0px),10px));-webkit-overflow-scrolling:touch;}
    .tabs{position:fixed;bottom:0;left:0;right:0;padding:6px 8px 0;padding-bottom:max(env(safe-area-inset-bottom,0px),10px);background:rgba(10,10,15,0.97);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-top:1px solid var(--b);display:flex;gap:2px;z-index:50;}
    .tb{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:5px 2px;border-radius:10px;border:none;background:transparent;cursor:pointer;font-family:inherit;font-size:9px;font-weight:600;color:var(--m);transition:all .22s cubic-bezier(.34,1.56,.64,1);}
    .tb.on{background:rgba(168,85,247,0.13);color:#d8b4fe;}
    .tb.on svg{transform:scale(1.12);}
    .tb svg{transition:transform .25s cubic-bezier(.34,1.56,.64,1);}
    .tc{animation:tIn .2s ease;}
    @keyframes tIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
    .vpill{display:flex;background:rgba(255,255,255,0.05);border-radius:8px;padding:2px;gap:2px;}
    .vbtn{padding:4px 9px;border-radius:6px;border:none;font-size:11px;font-weight:600;font-family:inherit;cursor:pointer;background:transparent;color:var(--m);transition:all .18s;display:flex;align-items:center;gap:3px;}
    .vbtn.on{background:rgba(168,85,247,0.2);color:#d8b4fe;}
    .cal-hdr{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:5px;}
    .cdl{text-align:center;font-size:10px;font-weight:600;color:var(--m);letter-spacing:.05em;padding:3px 0;}
    .cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;}
    .day{aspect-ratio:1;border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;position:relative;border:1.5px solid transparent;font-size:11px;font-weight:500;user-select:none;opacity:0;animation:cPop forwards;transition:transform .14s ease,background .2s,border-color .2s;}
    .day:active{transform:scale(0.87)!important;}
    .day.td{border-color:rgba(168,85,247,0.55)!important;}
    .day.bop{animation:cBop .36s cubic-bezier(.34,1.56,.64,1) forwards!important;}
    .dot{position:absolute;top:3px;right:3px;width:4px;height:4px;border-radius:50%;background:#a855f7;}
    @keyframes cPop{0%{opacity:0;transform:scale(0.5)}100%{opacity:1;transform:scale(1)}}
    @keyframes cBop{0%{transform:scale(1)}35%{transform:scale(1.26)}65%{transform:scale(0.93)}100%{transform:scale(1)}}
    .week-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:5px;}
    .wday{border-radius:12px;display:flex;flex-direction:column;align-items:center;padding:8px 3px;cursor:pointer;border:1.5px solid transparent;user-select:none;transition:transform .14s,background .2s;animation:tIn .25s ease;}
    .wday:active{transform:scale(0.92);}
    .wday.td{border-color:rgba(168,85,247,0.55)!important;}
    .nav{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}
    .nbtn{background:rgba(255,255,255,0.07);border:1px solid var(--b);color:var(--t);border-radius:10px;width:34px;height:34px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:17px;transition:background .14s,transform .14s;}
    .nbtn:active{background:rgba(255,255,255,0.13);transform:scale(0.88);}
    .card{background:var(--s);border:1px solid var(--b);border-radius:14px;padding:14px;margin-bottom:10px;}
    .clbl{font-size:10px;color:var(--m);font-weight:600;letter-spacing:.12em;text-transform:uppercase;margin-bottom:10px;}
    .sg{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;}
    .sm{background:var(--s);border:1px solid var(--b);border-radius:14px;padding:12px;text-align:center;}
    .sm .v{font-size:22px;font-weight:700;font-family:'DM Serif Display',serif;}
    .sm .l{font-size:10px;color:var(--m);margin-top:2px;}
    .ss{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:12px;}
    .ss .m{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:9px 5px;text-align:center;}
    .ss .m .v{font-size:16px;font-weight:700;}
    .ss .m .l{font-size:9px;color:var(--m);margin-top:1px;}
    .pb{height:6px;border-radius:3px;background:rgba(255,255,255,0.08);overflow:hidden;margin-top:6px;}
    .pf{height:100%;border-radius:3px;width:0;transition:width .85s cubic-bezier(.4,0,.2,1);}
    .pb.t{height:10px;}
    .br{margin-bottom:9px;}.br:last-child{margin-bottom:0;}
    .bl{display:flex;justify-content:space-between;margin-bottom:3px;font-size:12px;}
    .bl span:first-child{color:#9ca3af;}
    .pulse{animation:sp .5s cubic-bezier(.34,1.56,.64,1);}
    @keyframes sp{0%{transform:scale(1)}50%{transform:scale(1.35)}100%{transform:scale(1)}}
    .exp-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.92);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);z-index:300;display:flex;flex-direction:column;animation:fadeIn .2s ease;padding:env(safe-area-inset-top,20px) 16px calc(env(safe-area-inset-bottom,0px)+16px);}
    .exp-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;padding-top:4px;}
    .exp-title{font-size:17px;font-family:'DM Serif Display',serif;color:#f0f0f8;}
    .exp-close{background:rgba(255,255,255,0.08);border:1px solid var(--b);border-radius:10px;color:var(--t);width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;}
    .exp-body{flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:12px;}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    .xcard{background:var(--s);border:1px solid var(--b);border-radius:14px;padding:14px;margin-bottom:10px;position:relative;}
    .xbtn{position:absolute;top:12px;right:12px;background:rgba(255,255,255,0.06);border:1px solid var(--b);border-radius:7px;width:26px;height:26px;display:flex;align-items:center;justify-content:center;cursor:pointer;}
    .leg{display:flex;flex-wrap:wrap;gap:6px 12px;margin-top:10px;}
    .li{display:flex;align-items:center;gap:5px;font-size:10px;color:#9ca3af;}
    .ld{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
    .mo{position:fixed;inset:0;background:rgba(0,0,0,0.75);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);z-index:200;display:flex;align-items:flex-end;animation:fadeIn .18s ease;}
    .mb{background:#13131d;border:1px solid rgba(255,255,255,0.1);border-radius:24px 24px 0 0;padding:20px 16px calc(18px + max(env(safe-area-inset-bottom,0px),8px));width:100%;animation:sUp .28s cubic-bezier(.22,1,.36,1);max-height:94vh;overflow-y:auto;}
    @keyframes sUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
    .mh{width:38px;height:4px;border-radius:2px;background:rgba(255,255,255,0.14);margin:0 auto 16px;}
    .ctr-row{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-radius:12px;border:1.5px solid transparent;margin-bottom:7px;transition:border-color .15s,background .15s;}
    .ctr-row.active{border-color:currentColor;}
    .ctr-left{display:flex;align-items:center;gap:9px;}
    .ctr-emoji{font-size:17px;width:24px;text-align:center;}
    .ctr-lbl{font-size:13px;font-weight:500;}
    .ctr-sub{font-size:10px;color:var(--m);margin-top:1px;}
    .ctr-right{display:flex;align-items:center;}
    .ctr-btn{width:34px;height:34px;border-radius:9px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.06);color:var(--t);font-size:19px;font-weight:300;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .14s,transform .14s;font-family:inherit;line-height:1;}
    .ctr-btn:active{transform:scale(0.88);}
    .ctr-val{min-width:34px;text-align:center;font-size:17px;font-weight:700;font-family:'DM Serif Display',serif;}
    .slbl{font-size:10px;color:var(--m);font-weight:600;letter-spacing:.1em;text-transform:uppercase;margin-bottom:7px;margin-top:3px;}
    .tag-row{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;}
    .tag{padding:6px 11px;border-radius:20px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);font-size:12px;font-weight:500;cursor:pointer;transition:all .15s;color:#9ca3af;}
    .tag.on{background:rgba(168,85,247,0.15);border-color:rgba(168,85,247,0.4);color:#d8b4fe;}
    .mood-row{display:flex;gap:6px;margin-bottom:12px;}
    .mood-btn{flex:1;padding:9px 3px;border-radius:11px;border:1.5px solid transparent;background:rgba(255,255,255,0.04);cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px;transition:all .18s;}
    .mood-btn.on{border-color:currentColor;}
    .mood-btn span:first-child{font-size:19px;}
    .mood-btn span:last-child{font-size:9px;font-weight:600;}
    textarea{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:11px;color:var(--t);font-family:inherit;font-size:13px;padding:10px;width:100%;outline:none;resize:none;margin-top:5px;transition:border-color .2s;}
    textarea:focus{border-color:rgba(168,85,247,0.5);}
    input[type="number"],input[type="time"]{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:var(--t);font-family:inherit;font-size:14px;padding:7px 9px;width:88px;outline:none;}
    input[type="time"]{width:auto;}
    .bprim{width:100%;padding:13px;border-radius:12px;background:rgba(168,85,247,0.18);border:1.5px solid rgba(168,85,247,0.35);color:#d8b4fe;font-family:inherit;font-weight:600;font-size:15px;cursor:pointer;margin-top:12px;transition:background .2s,transform .14s;}
    .bprim:active{background:rgba(168,85,247,0.28);transform:scale(0.97);}
    .expbtn{background:rgba(168,85,247,0.11);border:1px solid rgba(168,85,247,0.23);color:#d8b4fe;border-radius:8px;padding:6px 12px;cursor:pointer;font-size:11px;font-weight:600;font-family:inherit;}
    .gr{display:flex;justify-content:space-between;align-items:center;margin-bottom:13px;}
    .gr span{font-size:13px;color:#9ca3af;}
    .motiv{background:rgba(59,130,246,0.07);border:1px solid rgba(59,130,246,0.14);border-radius:14px;padding:14px;margin-bottom:10px;}
    .motiv .mt{font-size:10px;color:#60a5fa;font-weight:600;margin-bottom:5px;}
    .motiv p{font-size:13px;color:#93c5fd;line-height:1.6;font-style:italic;}
    .sban{margin-top:9px;padding:9px 13px;background:rgba(34,197,94,0.1);border-radius:9px;font-size:12px;color:#4ade80;text-align:center;animation:tIn .4s ease;}
    .chk{display:inline-block;animation:chkP .28s cubic-bezier(.34,1.56,.64,1);}
    @keyframes chkP{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
    .badge{display:flex;align-items:center;gap:11px;padding:11px 13px;border-radius:13px;margin-bottom:7px;border:1px solid transparent;}
    .badge.earned{border-color:rgba(168,85,247,0.2);}
    .badge.locked{opacity:.42;}
    .badge-icon{font-size:22px;width:36px;text-align:center;flex-shrink:0;}
    .badge-name{font-size:13px;font-weight:600;}
    .badge-desc{font-size:10px;color:#6b7280;margin-top:1px;}
    .badge-cat{font-size:9px;color:var(--m);font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin:14px 0 6px;padding-left:2px;}
    .wbar-wrap{display:flex;align-items:flex-end;justify-content:space-between;gap:4px;height:70px;}
    .wbar-col{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;}
    .wbar{width:100%;border-radius:4px 4px 0 0;min-height:3px;transition:height .6s cubic-bezier(.4,0,.2,1);}
    .wbar-lbl{font-size:9px;color:var(--m);font-weight:600;}
    .wbar-val{font-size:9px;font-weight:700;}
    .delta-up{color:#22c55e;font-size:11px;font-weight:700;}
    .delta-dn{color:#ef4444;font-size:11px;font-weight:700;}
    .toggle-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;}
    .toggle{width:44px;height:26px;border-radius:13px;border:none;cursor:pointer;position:relative;transition:background .2s;}
    .toggle::after{content:'';position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform .2s;}
    .toggle.on{background:#a855f7;}.toggle.on::after{transform:translateX(18px);}
    .toggle.off{background:rgba(255,255,255,0.15);}
    /* Sevrage score */
    .sev-score{background:linear-gradient(135deg,rgba(34,197,94,0.12),rgba(168,85,247,0.08));border:1px solid rgba(34,197,94,0.25);border-radius:16px;padding:18px;margin-bottom:10px;text-align:center;}
    .sev-num{font-size:52px;font-weight:700;font-family:'DM Serif Display',serif;line-height:1;}
    .sev-lbl{font-size:11px;color:#9ca3af;margin-top:4px;font-weight:500;}
    /* Recovery timeline */
    .rec-step{display:flex;gap:12px;margin-bottom:10px;align-items:flex-start;}
    .rec-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;margin-top:4px;}
    .rec-line{width:2px;background:rgba(255,255,255,0.08);flex-shrink:0;margin-top:14px;}
    /* AI analysis */
    .ai-box{background:rgba(168,85,247,0.06);border:1px solid rgba(168,85,247,0.15);border-radius:14px;padding:14px;margin-top:10px;}
    .ai-hdr{display:flex;align-items:center;gap:8px;margin-bottom:10px;}
    .ai-dot{width:7px;height:7px;border-radius:50%;background:#a855f7;animation:aiPulse 2s infinite;}
    @keyframes aiPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(0.8)}}
    .ai-text{font-size:13px;color:#c4b5fd;line-height:1.65;}
    .ai-loading{display:flex;gap:5px;align-items:center;padding:8px 0;}
    .ai-loading span{width:6px;height:6px;border-radius:50%;background:#a855f7;animation:dots 1.2s infinite;}
    .ai-loading span:nth-child(2){animation-delay:.2s;}
    .ai-loading span:nth-child(3){animation-delay:.4s;}
    @keyframes dots{0%,80%,100%{transform:scale(0);opacity:.4}40%{transform:scale(1);opacity:1}}
    .ai-section{margin-top:8px;padding-top:8px;border-top:1px solid rgba(168,85,247,0.1);}
    .ai-section-title{font-size:10px;color:#a855f7;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:5px;}
  </style>
</head>
<body>
<div id="root"></div>
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/babel">
const { useState, useEffect, useRef, useMemo, useCallback } = React;

const MONTHS=["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const MONTHS_S=["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"];
const DAYS=["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];
const DAYS_S=["L","M","M","J","V","S","D"];
const STORE="habit_v4",GSTORE="habit_goals_v3";
const MOODS=[{e:"😣",l:"Dur",c:"#ef4444"},{e:"😕",l:"Moyen",c:"#f97316"},{e:"😐",l:"Ok",c:"#6b7280"},{e:"🙂",l:"Bien",c:"#22c55e"},{e:"😊",l:"Top",c:"#a855f7"}];
const CTXS=["Stress","Ennui","Soirée","Social","Seul","Après repas","Au réveil","Travail","Anxiété","Fatigue"];

const dk=(y,m,d)=>`${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
const daysIn=(y,m)=>new Date(y,m+1,0).getDate();
const firstOff=(y,m)=>{const d=new Date(y,m,1).getDay();return d===0?6:d-1;};
const load=(k,def)=>{try{return JSON.parse(localStorage.getItem(k))||def;}catch{return def;}};

function deriveType(e){
  if(!e)return null;
  const hasCig=(e.cigs||0)>0,hasWeed=(e.joints||0)>0,hasAlc=(e.glasses||0)>0;
  const n=[hasCig,hasWeed,hasAlc].filter(Boolean).length;
  if(n===0)return e.clean?"none":null;
  if(n===3)return "triple";
  if(n===2){if(hasCig&&hasWeed)return "both";if(hasCig&&hasAlc)return "cigalc";return "weedalc";}
  if(hasCig)return "cigs";if(hasWeed)return "weed";return "alc";
}
const tColor=t=>({none:"#22c55e",cigs:"#f97316",weed:"#a855f7",alc:"#3b82f6",both:"#ef4444",cigalc:"#ef4444",weedalc:"#ef4444",triple:"#9f1239"})[t]||null;
const tBg=t=>({none:"rgba(34,197,94,0.14)",cigs:"rgba(249,115,22,0.14)",weed:"rgba(168,85,247,0.14)",alc:"rgba(59,130,246,0.14)",both:"rgba(239,68,68,0.14)",cigalc:"rgba(239,68,68,0.14)",weedalc:"rgba(239,68,68,0.14)",triple:"rgba(159,18,57,0.22)"})[t]||"rgba(255,255,255,0.03)";
const tEmoji=t=>({none:"✦",cigs:"🚬",weed:"🍃",alc:"🍺",both:"⚠",cigalc:"⚠",weedalc:"⚠",triple:"💀"})[t]||"·";

/* SVG Icons */
const Ico=(d,w=18)=>()=>(<svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{__html:d}}/>);
const IcoCalendar=Ico('<rect x="3" y="4" width="18" height="18" rx="3"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/><circle cx="8" cy="14" r="1" fill="currentColor"/><circle cx="12" cy="14" r="1" fill="currentColor"/><circle cx="16" cy="14" r="1" fill="currentColor"/>');
const IcoChart=Ico('<line x1="3" y1="21" x2="21" y2="21"/><rect x="5" y="12" width="3" height="9"/><rect x="10.5" y="7" width="3" height="14"/><rect x="16" y="3" width="3" height="18"/>');
const IcoBadge=Ico('<path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>');
const IcoSettings=Ico('<circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>');
const IcoExpand=Ico('<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>',14);
const IcoClose=Ico('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',15);
const IcoWeek=Ico('<rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="4" x2="9" y2="20"/><line x1="15" y1="4" x2="15" y2="20"/>',12);
const IcoMonth=Ico('<rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="7" y1="4" x2="7" y2="9"/><line x1="12" y1="4" x2="12" y2="9"/><line x1="17" y1="4" x2="17" y2="9"/>',12);

/* Animated bar */
function Bar({pct,color,thick}){
  const ref=useRef(null);
  useEffect(()=>{if(!ref.current)return;ref.current.style.width="0%";const t=setTimeout(()=>{if(ref.current)ref.current.style.width=pct+"%";},60);return()=>clearTimeout(t);},[pct]);
  return(<div className={`pb${thick?" t":""}`}><div ref={ref} className="pf" style={{background:color}}/></div>);
}

/* Sparkline */
function Spark({data,height=55}){
  if(!data?.length)return null;
  const W=300,H=height,p=6,max=Math.max(...data.map(d=>d.v),1);
  const pts=data.map((d,i)=>({x:p+(i/Math.max(data.length-1,1))*(W-p*2),y:H-p-(d.v/max)*(H-p*2),c:tColor(d.type)||"#6b7280"}));
  const path=pts.map((p,i)=>`${i===0?"M":"L"} ${p.x} ${p.y}`).join(" ");
  const area=`${path} L ${pts[pts.length-1].x} ${H} L ${pts[0].x} ${H} Z`;
  return(<svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",height:H}}><defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a855f7" stopOpacity=".3"/><stop offset="100%" stopColor="#a855f7" stopOpacity="0"/></linearGradient></defs><path d={area} fill="url(#sg)"/><path d={path} fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>{pts.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r={2} fill={p.c} stroke="#0a0a0f" strokeWidth="1.5"/>)}</svg>);
}

/* Counter */
function Counter({value,onChange,color}){
  return(<div className="ctr-right">
    <button className="ctr-btn" style={{borderColor:value>0?color:"rgba(255,255,255,0.1)"}} onClick={()=>onChange(Math.max(0,value-1))}>−</button>
    <div className="ctr-val" style={{color:value>0?color:"#4b5563"}}>{value}</div>
    <button className="ctr-btn" style={{borderColor:value>0?color:"rgba(255,255,255,0.1)"}} onClick={()=>onChange(Math.min(99,value+1))}>+</button>
  </div>);
}

/* Week bars */
function WeekBars({weeks,metric,color}){
  const max=Math.max(...weeks.map(w=>w[metric]||0),1);
  return(<div className="wbar-wrap">
    {weeks.map((w,i)=>{const val=w[metric]||0;const h=Math.max((val/max)*62,val>0?5:3);return(<div key={i} className="wbar-col"><div className="wbar-val" style={{color:val>0?color:"#4b5563",fontSize:9}}>{val>0?val:""}</div><div className="wbar" style={{height:h,background:val>0?color:"rgba(255,255,255,0.06)"}}/><div className="wbar-lbl">S{i+1}</div></div>);})}
  </div>);
}

/* AI Analysis Component */
function AIAnalysis({stats}){
  const [text,setText]=useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);

  const analyze=useCallback(async()=>{
    setLoading(true);setText(null);setError(null);
    const {totalCigs,totalJoints,totalGlasses,nClean,streak,longest,pct,month,daysCount,weeklyData,prevCigs,prevJoints,prevClean,totalWeedG}=stats;

    const prompt=`Tu es un médecin factuel. Un patient te présente ses données de consommation du mois :
- Cigarettes : ${totalCigs} au total ce mois (${(totalCigs/20).toFixed(1)} paquets), soit ~${weeklyData.map((w,i)=>`S${i+1}:${w.cigs}`).join(', ')} par semaine
- Joints de cannabis : ${totalJoints} (≈${totalWeedG}g), soit ~${weeklyData.map((w,i)=>`S${i+1}:${w.joints}`).join(', ')} par semaine  
- Verres d'alcool : ${totalGlasses} ce mois
- Jours clean : ${nClean}/${daysCount} (${pct}%)
- Streak actuel sans rien : ${streak} jours
- Record streak : ${longest} jours
- vs mois précédent : cigs ${prevCigs>totalCigs?"↓":"↑"} (${Math.abs(totalCigs-prevCigs)} de diff), joints ${prevJoints>totalJoints?"↓":"↑"} (${Math.abs(totalJoints-prevJoints)} de diff), jours clean ${prevClean<nClean?"↑":"↓"} (${Math.abs(nClean-prevClean)} de diff)

Réponds en JSON UNIQUEMENT avec cette structure exacte, sans backticks, sans markdown :
{"physique":{"tabac":"2-3 phrases effets physiques du tabac selon quantité","cannabis":"2-3 phrases effets physiques du cannabis selon quantité","alcool":"1-2 phrases effets physiques alcool selon quantité","global":"1-2 phrases bilan physique global"},"mental":{"tabac":"2 phrases effets mentaux/cognitifs du tabac","cannabis":"2 phrases effets mentaux du cannabis","global":"1-2 phrases bilan mental global"},"sevrage":{"bilan":"2-3 phrases factuel sur la progression sevrage ce mois","tendance":"1 phrase sur la tendance vs mois précédent","conseil":"1 conseil médical concret et direct"}}`;

    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          messages:[{role:"user",content:prompt}]
        })
      });
      const data=await res.json();
      const raw=data.content?.find(b=>b.type==="text")?.text||"";
      const clean=raw.replace(/```json|```/g,"").trim();
      const parsed=JSON.parse(clean);
      setText(parsed);
    }catch(e){
      setError("Analyse indisponible. Vérifie ta connexion.");
    }
    setLoading(false);
  },[stats]);

  useEffect(()=>{analyze();},[]);

  if(loading)return(<div className="ai-box"><div className="ai-hdr"><div className="ai-dot"/><span style={{fontSize:12,color:"#a855f7",fontWeight:600}}>Analyse médicale en cours...</span></div><div className="ai-loading"><span/><span/><span/></div></div>);
  if(error)return(<div className="ai-box"><div className="ai-text" style={{color:"#6b7280"}}>{error}</div></div>);
  if(!text)return null;

  return(
    <div className="ai-box">
      <div className="ai-hdr">
        <div className="ai-dot"/>
        <span style={{fontSize:12,color:"#a855f7",fontWeight:700,letterSpacing:".05em"}}>ANALYSE MÉDICALE</span>
      </div>

      <div className="ai-section">
        <div className="ai-section-title">🫀 Effets physiques</div>
        {text.physique.tabac&&stats.totalCigs>0&&<div className="ai-text" style={{marginBottom:6}}>🚬 {text.physique.tabac}</div>}
        {text.physique.cannabis&&stats.totalJoints>0&&<div className="ai-text" style={{marginBottom:6}}>🍃 {text.physique.cannabis}</div>}
        {text.physique.alcool&&stats.totalGlasses>0&&<div className="ai-text" style={{marginBottom:6}}>🍺 {text.physique.alcool}</div>}
        <div className="ai-text" style={{color:"#e2d9f3"}}>{text.physique.global}</div>
      </div>

      <div className="ai-section">
        <div className="ai-section-title">🧠 Effets mentaux & cognitifs</div>
        {text.mental.tabac&&stats.totalCigs>0&&<div className="ai-text" style={{marginBottom:6}}>🚬 {text.mental.tabac}</div>}
        {text.mental.cannabis&&stats.totalJoints>0&&<div className="ai-text" style={{marginBottom:6}}>🍃 {text.mental.cannabis}</div>}
        <div className="ai-text" style={{color:"#e2d9f3"}}>{text.mental.global}</div>
      </div>

      <div className="ai-section">
        <div className="ai-section-title">📈 Bilan sevrage</div>
        <div className="ai-text" style={{marginBottom:6}}>{text.sevrage.bilan}</div>
        <div className="ai-text" style={{marginBottom:6,color:"#a5f3fc"}}>{text.sevrage.tendance}</div>
        <div style={{marginTop:8,padding:"10px 12px",background:"rgba(34,197,94,0.08)",borderRadius:10,border:"1px solid rgba(34,197,94,0.15)"}}>
          <div style={{fontSize:10,color:"#22c55e",fontWeight:700,marginBottom:4}}>CONSEIL</div>
          <div className="ai-text" style={{color:"#4ade80"}}>{text.sevrage.conseil}</div>
        </div>
      </div>
    </div>
  );
}

/* Expand overlay */
function ExpandView({title,onClose,children}){
  return(<div className="exp-overlay"><div className="exp-hdr"><div className="exp-title">{title}</div><button className="exp-close" onClick={onClose}><IcoClose/></button></div><div className="exp-body">{children}</div></div>);
}

/* BADGES — 40 badges */
function computeBadges(data){
  const all=Object.entries(data);
  const vals=Object.values(data);
  const today=new Date();

  // Totals
  const totalCigs=vals.reduce((s,e)=>s+(e.cigs||0),0);
  const totalJoints=vals.reduce((s,e)=>s+(e.joints||0),0);
  const totalGlasses=vals.reduce((s,e)=>s+(e.glasses||0),0);
  const cleanDays=vals.filter(e=>deriveType(e)==="none").length;
  const loggedDays=vals.filter(e=>deriveType(e)!==null).length;
  const daysWith3=vals.filter(e=>deriveType(e)==="triple").length;

  // Streaks
  let streak=0,longest=0,run=0,prevD=null,curD=new Date(today);
  while(true){const k=dk(curD.getFullYear(),curD.getMonth(),curD.getDate());if(data[k]&&deriveType(data[k])==="none"){streak++;curD.setDate(curD.getDate()-1);}else break;}
  for(const k of Object.keys(data).sort()){if(deriveType(data[k])==="none"){const d=new Date(k);if(prevD&&(d-prevD)/86400000===1){run++;}else{run=1;}longest=Math.max(longest,run);prevD=d;}else{run=0;prevD=null;}}

  // Consecutive days without specific substance
  function consec(fn){let s=0,c=new Date(today);for(let i=0;i<999;i++){const k=dk(c.getFullYear(),c.getMonth(),c.getDate());const e=data[k];if(e&&fn(e)){s++;}else if(e){break;}c.setDate(c.getDate()-1);}return s;}
  const consecNoCigs=consec(e=>(e.cigs||0)===0&&deriveType(e)!==null);
  const consecNoWeed=consec(e=>(e.joints||0)===0&&deriveType(e)!==null);
  const consecNoAlc=consec(e=>(e.glasses||0)===0&&deriveType(e)!==null);

  // Mood
  const goodMoodDays=vals.filter(e=>e.mood>=3).length;

  // Monthly clean
  function monthClean(y,m){const dim=daysIn(y,m);let c=0;for(let d=1;d<=dim;d++){const e=data[dk(y,m,d)];if(e&&deriveType(e)==="none")c++;}return c;}
  const thisM=today.getMonth(),thisY=today.getFullYear();
  const prevM2=thisM===0?11:thisM-1,prevY2=thisM===0?thisY-1:thisY;
  const thisMonthClean=monthClean(thisY,thisM);
  const prevMonthClean=monthClean(prevY2,prevM2);

  return[
    // ── Premiers pas ──
    {cat:"🌱 Premiers pas",id:"first_log",icon:"📓",name:"Premier journal",desc:"Premier jour renseigné",earned:loggedDays>=1},
    {cat:null,id:"first_clean",icon:"🌿",name:"Premier jour clean",desc:"Ta première journée sans rien",earned:cleanDays>=1},
    {cat:null,id:"first_week_log",icon:"📅",name:"7 jours trackés",desc:"Une semaine de données",earned:loggedDays>=7},
    {cat:null,id:"month_log",icon:"📚",name:"30 jours trackés",desc:"Un mois complet de données",earned:loggedDays>=30},
    {cat:null,id:"log100",icon:"🏛️",name:"100 jours trackés",desc:"La constance paie",earned:loggedDays>=100},

    // ── Streaks clean ──
    {cat:"🔥 Streaks clean",id:"streak1",icon:"✨",name:"Première étincelle",desc:"1 jour clean d'affilée",earned:longest>=1},
    {cat:null,id:"streak3",icon:"🔥",name:"3 jours",desc:"Streak de 3 jours clean",earned:longest>=3},
    {cat:null,id:"streak7",icon:"⚡",name:"Une semaine",desc:"7 jours consécutifs sans rien",earned:longest>=7},
    {cat:null,id:"streak14",icon:"💎",name:"2 semaines",desc:"14 jours consécutifs",earned:longest>=14},
    {cat:null,id:"streak21",icon:"🌙",name:"3 semaines",desc:"21 jours — les nouvelles habitudes se forment",earned:longest>=21},
    {cat:null,id:"streak30",icon:"👑",name:"Un mois clean",desc:"30 jours consécutifs — record médical",earned:longest>=30},
    {cat:null,id:"streak60",icon:"🏆",name:"2 mois",desc:"60 jours — tu as transformé ton corps",earned:longest>=60},
    {cat:null,id:"streak90",icon:"🦋",name:"3 mois — Renaissance",desc:"90 jours. Tes poumons sont cliniquement restaurés.",earned:longest>=90},

    // ── Sevrage tabac ──
    {cat:"🚭 Sevrage tabac",id:"nocig3",icon:"🚭",name:"3 jours sans cigs",desc:"La nicotine quitte ton sang",earned:consecNoCigs>=3},
    {cat:null,id:"nocig7",icon:"💨",name:"7 jours sans fumer",desc:"Tes cils bronchiques repoussent",earned:consecNoCigs>=7},
    {cat:null,id:"nocig30",icon:"🫁",name:"Mois sans tabac",desc:"Risque cardiovasculaire déjà réduit",earned:consecNoCigs>=30},
    {cat:null,id:"cigdown50",icon:"📉",name:"Moitié moins de cigs",desc:"Vs mois précédent",earned:(()=>{const prevC=vals.filter((e,i)=>{const k=Object.keys(data).sort()[i];return k&&k.startsWith(`${prevY2}-${String(prevM2+1).padStart(2,"0")}`)}).reduce((s,e)=>s+(e.cigs||0),0);const curC=vals.filter((e,i)=>{const k=Object.keys(data).sort()[i];return k&&k.startsWith(`${thisY}-${String(thisM+1).padStart(2,"0")}`)}).reduce((s,e)=>s+(e.cigs||0),0);return prevC>0&&curC<prevC/2;})()},

    // ── Sevrage cannabis ──
    {cat:"🍃 Sevrage cannabis",id:"noweed3",icon:"🍃",name:"3 jours sans joints",desc:"Le THC commence à diminuer",earned:consecNoWeed>=3},
    {cat:null,id:"noweed7",icon:"🧠",name:"7 jours sans weed",desc:"Mémoire à court terme en récupération",earned:consecNoWeed>=7},
    {cat:null,id:"noweed14",icon:"💡",name:"2 semaines sans weed",desc:"Cognition et sommeil améliorés",earned:consecNoWeed>=14},
    {cat:null,id:"noweed30",icon:"🌟",name:"Mois sans cannabis",desc:"Système endocannabinoïde rétabli",earned:consecNoWeed>=30},

    // ── Alcool ──
    {cat:"🍺 Alcool",id:"noalc7",icon:"💧",name:"7 jours sans alcool",desc:"Foie en récupération active",earned:consecNoAlc>=7},
    {cat:null,id:"noalc14",icon:"🫀",name:"2 semaines sans alcool",desc:"Tension artérielle normalisée",earned:consecNoAlc>=14},
    {cat:null,id:"noalc30",icon:"🌊",name:"Mois sans alcool",desc:"Sommeil profond restauré, foie récupéré",earned:consecNoAlc>=30},

    // ── Clean totaux ──
    {cat:"✦ Jours clean cumulés",id:"clean10",icon:"🌱",name:"10 jours clean",desc:"Au total, tous mois confondus",earned:cleanDays>=10},
    {cat:null,id:"clean25",icon:"🌿",name:"25 jours clean",desc:"Au total",earned:cleanDays>=25},
    {cat:null,id:"clean50",icon:"🌳",name:"50 jours clean",desc:"Au total",earned:cleanDays>=50},
    {cat:null,id:"clean100",icon:"🏔️",name:"100 jours clean",desc:"Un cap majeur",earned:cleanDays>=100},
    {cat:null,id:"clean200",icon:"🌍",name:"200 jours clean",desc:"Tu as changé ta vie",earned:cleanDays>=200},

    // ── Mois parfait ──
    {cat:"📅 Mois parfait",id:"perfect_week",icon:"🗓️",name:"Semaine parfaite",desc:"7 jours clean d'affilée dans le mois",earned:longest>=7},
    {cat:null,id:"halfmonth",icon:"🌗",name:"Moitié du mois clean",desc:"15+ jours clean ce mois",earned:thisMonthClean>=15},
    {cat:null,id:"perfect_month",icon:"🌕",name:"Mois parfait",desc:"30 jours clean dans un mois",earned:thisMonthClean>=28},
    {cat:null,id:"better_month",icon:"📈",name:"Mois meilleur",desc:"Plus de jours clean que le mois précédent",earned:prevMonthClean>0&&thisMonthClean>prevMonthClean},

    // ── Humeur & bien-être ──
    {cat:"😊 Bien-être",id:"mood5",icon:"😊",name:"5 jours de bonne humeur",desc:"Humeur ≥ 4 renseignée",earned:goodMoodDays>=5},
    {cat:null,id:"mood20",icon:"🌈",name:"20 bons jours",desc:"20 jours avec humeur positive",earned:goodMoodDays>=20},
    {cat:null,id:"no_triple",icon:"🛡️",name:"Aucune nuit de tout",desc:"Jamais les 3 substances le même jour",earned:loggedDays>=7&&daysWith3===0},

    // ── Économies ──
    {cat:"💰 Économies",id:"save20",icon:"💶",name:"20€ économisés",desc:"Sur un mois",earned:false}, // dynamic in app
    {cat:null,id:"save100",icon:"💵",name:"100€ économisés",desc:"Au total estimé",earned:false},

    // ── Secrets ──
    {cat:"🔒 Badges secrets",id:"phoenix",icon:"🦅",name:"Phénix",desc:"Rechute puis 7 jours clean derrière",earned:(()=>{const keys=Object.keys(data).sort();let hadRelapse=false;for(let i=0;i<keys.length;i++){if(deriveType(data[keys[i]])!=="none"&&deriveType(data[keys[i]])!==null)hadRelapse=true;if(hadRelapse){let s=0;for(let j=i;j<keys.length&&j<i+7;j++){if(deriveType(data[keys[j]])==="none")s++;}if(s===7)return true;}}return false;})()},
    {cat:null,id:"monday",icon:"📆",name:"Lundi propre",desc:"4 lundis clean d'affilée",earned:(()=>{let c=0;for(let w=0;w<4;w++){const d=new Date(today);const dow=d.getDay()===0?6:d.getDay()-1;d.setDate(d.getDate()-dow-w*7);const k=dk(d.getFullYear(),d.getMonth(),d.getDate());if(data[k]&&deriveType(data[k])==="none")c++;}return c>=4;})()},
    {cat:null,id:"weekend",icon:"🏖️",name:"Week-end propre",desc:"Samedi ET dimanche clean",earned:(()=>{const d=new Date(today);const dow=d.getDay()===0?6:d.getDay()-1;const sat=new Date(d);sat.setDate(d.getDate()-(dow-5+7)%7);const sun=new Date(sat);sun.setDate(sat.getDate()+1);const ks=dk(sat.getFullYear(),sat.getMonth(),sat.getDate());const ksu=dk(sun.getFullYear(),sun.getMonth(),sun.getDate());return data[ks]&&deriveType(data[ks])==="none"&&data[ksu]&&deriveType(data[ksu])==="none";})()},
  ];
}

/* Sevrage score (0-100) */
function sevrageScore(streak,longest,pct,nClean,daysCount){
  const s1=Math.min(streak*3,30);
  const s2=Math.min(longest*1.5,25);
  const s3=pct*0.3;
  const s4=Math.min((nClean/Math.max(daysCount,1))*15,15);
  return Math.round(Math.min(s1+s2+s3+s4,100));
}

/* Recovery timeline based on streak */
function recoverySteps(streak,hasCigs,hasWeed){
  const steps=[];
  if(hasCigs||hasWeed){
    steps.push({time:"20 min",done:streak>0,color:"#22c55e",text:"Tension artérielle et rythme cardiaque normalisés"});
    steps.push({time:"8h",done:streak>0,color:"#22c55e",text:"CO sanguin divisé par 2, oxygénation améliorée"});
    steps.push({time:"48h",done:streak>=2,color:"#22c55e",text:"Nicotine éliminée, odorat et goût s'améliorent"});
    steps.push({time:"72h",done:streak>=3,color:"#22c55e",text:"Bronches se dilatent, respiration plus facile"});
    steps.push({time:"1 sem.",done:streak>=7,color:"#3b82f6",text:"Circulation sanguine en amélioration, énergie en hausse"});
    if(hasWeed)steps.push({time:"2 sem.",done:streak>=14,color:"#a855f7",text:"Mémoire à court terme en récupération, moins d'anxiété"});
    steps.push({time:"1 mois",done:streak>=30,color:"#f97316",text:"Risque d'infarctus déjà réduit, poumons en réparation"});
    steps.push({time:"3 mois",done:streak>=90,color:"#fbbf24",text:"Cils bronchiques restaurés, capacité pulmonaire +30%"});
    steps.push({time:"1 an",done:streak>=365,color:"#d8b4fe",text:"Risque cardiovasculaire divisé par 2 vs fumeur actif"});
  }
  return steps;
}

function App(){
  const today=new Date();
  const [year,setYear]=useState(today.getFullYear());
  const [month,setMonth]=useState(today.getMonth());
  const [data,setData]=useState(()=>load(STORE,{}));
  const [goals,setGoals]=useState(()=>load(GSTORE,{cig:10,weed:15,target:20,notifTime:"22:00",notifOn:false}));
  const [tab,setTab]=useState("cal");
  const [modal,setModal]=useState(null);
  const [calView,setCalView]=useState("month");
  const [weekOffset,setWeekOffset]=useState(0);
  const [bop,setBop]=useState(null);
  const [calKey,setCalKey]=useState(0);
  const [expand,setExpand]=useState(null);
  const [pulse,setPulse]=useState(false);
  const [badgeCat,setBadgeCat]=useState(null);
  const prevStreak=useRef(0);

  useEffect(()=>{try{localStorage.setItem(STORE,JSON.stringify(data));}catch{}},[data]);
  useEffect(()=>{try{localStorage.setItem(GSTORE,JSON.stringify(goals));}catch{}},[goals]);

  // Stats
  const daysCount=daysIn(year,month),offset=firstOff(year,month);
  const entries=useMemo(()=>Array.from({length:daysCount},(_,i)=>{const e=data[dk(year,month,i+1)]||null;return{d:i+1,e,type:e?deriveType(e):null};}),[data,year,month,daysCount]);
  const logged=entries.filter(x=>x.type!==null).length;
  const nClean=entries.filter(x=>x.type==="none").length;
  const nCigs=entries.filter(x=>["cigs","both","cigalc","triple"].includes(x.type)).length;
  const nWeed=entries.filter(x=>["weed","both","weedalc","triple"].includes(x.type)).length;
  const nBoth=entries.filter(x=>["both","cigalc","weedalc","triple"].includes(x.type)).length;
  const nAlc=entries.filter(x=>["alc","cigalc","weedalc","triple"].includes(x.type)).length;
  const pct=logged?Math.round((nClean/logged)*100):0;
  const totalCigs=entries.reduce((s,x)=>s+(x.e?.cigs||0),0);
  const totalJoints=entries.reduce((s,x)=>s+(x.e?.joints||0),0);
  const totalGlasses=entries.reduce((s,x)=>s+(x.e?.glasses||0),0);
  const totalWeedG=(totalJoints*0.3).toFixed(1);
  const barMax=Math.max(nClean,nCigs,nWeed,nBoth,1);

  const prevM=month===0?11:month-1,prevY=month===0?year-1:year;
  const prevEntries=useMemo(()=>{const dim=daysIn(prevY,prevM);return Array.from({length:dim},(_,i)=>{const e=data[dk(prevY,prevM,i+1)]||null;return{e,type:e?deriveType(e):null};});},[data,prevY,prevM]);
  const prevClean=prevEntries.filter(x=>x.type==="none").length;
  const prevCigs=prevEntries.reduce((s,x)=>s+(x.e?.cigs||0),0);
  const prevJoints=prevEntries.reduce((s,x)=>s+(x.e?.joints||0),0);

  const weeklyData=useMemo(()=>{const wks=[];for(let w=0;w<5;w++){const start=w*7+1,end=Math.min(start+6,daysCount);if(start>daysCount)break;const we=entries.filter(x=>x.d>=start&&x.d<=end);wks.push({cigs:we.reduce((s,x)=>s+(x.e?.cigs||0),0),joints:we.reduce((s,x)=>s+(x.e?.joints||0),0),glasses:we.reduce((s,x)=>s+(x.e?.glasses||0),0),clean:we.filter(x=>x.type==="none").length});}return wks;},[entries,daysCount]);

  const cigSaved=entries.filter(x=>!["cigs","both","cigalc","triple"].includes(x.type)).length;
  const weedSaved=entries.filter(x=>!["weed","both","weedalc","triple"].includes(x.type)).length;
  const moneyCig=(cigSaved*goals.cig).toFixed(0);
  const moneyWeed=(weedSaved*goals.weed*0.3).toFixed(0);
  const moneyTotal=(+moneyCig + +moneyWeed).toFixed(0);

  let streak=0,cur=new Date(today);
  while(true){const k=dk(cur.getFullYear(),cur.getMonth(),cur.getDate());const e=data[k];if(e&&deriveType(e)==="none"){streak++;cur.setDate(cur.getDate()-1);}else break;}
  useEffect(()=>{if(streak>prevStreak.current){setPulse(true);setTimeout(()=>setPulse(false),600);}prevStreak.current=streak;},[streak]);
  let longest=0,run=0,prevD=null;
  for(const k of Object.keys(data).sort()){const t=deriveType(data[k]);if(t==="none"){const d=new Date(k);if(prevD&&(d-prevD)/86400000===1){run++;}else{run=1;}longest=Math.max(longest,run);prevD=d;}else{run=0;prevD=null;}}

  const spark=useMemo(()=>Array.from({length:28},(_,i)=>{const d=new Date(today);d.setDate(d.getDate()-(27-i));const k=dk(d.getFullYear(),d.getMonth(),d.getDate());const e=data[k];const t=e?deriveType(e):null;return{v:t==="none"?3:t==="cigs"?1:t==="weed"?1:t==="both"?0:2,type:t||"none"};}),[data]);

  const score=sevrageScore(streak,longest,pct,nClean,daysCount);
  const badges=useMemo(()=>computeBadges(data),[data]);
  const earnedCount=badges.filter(b=>b.earned).length;

  const hasCigsEver=Object.values(data).some(e=>(e.cigs||0)>0);
  const hasWeedEver=Object.values(data).some(e=>(e.joints||0)>0);
  const recSteps=recoverySteps(streak,hasCigsEver,hasWeedEver);

  const aiStats=useMemo(()=>({totalCigs,totalJoints,totalGlasses,nClean,streak,longest,pct,month,daysCount,weeklyData,prevCigs,prevJoints,prevClean,totalWeedG}),[totalCigs,totalJoints,totalGlasses,nClean,streak,longest,pct,month,daysCount,weeklyData,prevCigs,prevJoints,prevClean,totalWeedG]);

  // Calendar
  const cells=[];
  for(let i=0;i<offset;i++)cells.push(null);
  for(let d=1;d<=daysCount;d++)cells.push(d);
  while(cells.length%7!==0)cells.push(null);

  function getWeekDays(off){const base=new Date(today);const dow=base.getDay()===0?6:base.getDay()-1;base.setDate(base.getDate()-dow+off*7);return Array.from({length:7},(_,i)=>{const d=new Date(base);d.setDate(base.getDate()+i);return{date:d,key:dk(d.getFullYear(),d.getMonth(),d.getDate())};});}
  const weekDays=getWeekDays(weekOffset);

  function changeMonth(dir){if(dir<0){if(month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1);}else{if(month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1);}setCalKey(k=>k+1);}

  function updateEntry(y,m,d,patch){const key=dk(y,m,d);setData(prev=>({...prev,[key]:{cigs:0,joints:0,glasses:0,clean:false,note:"",mood:null,ctx:[],...(prev[key]||{}),...patch}}));}
  const selKey=modal?dk(modal.y,modal.m,modal.d):null;
  const selRaw=selKey?data[selKey]:null;
  const sel={cigs:0,joints:0,glasses:0,clean:false,note:"",mood:null,ctx:[],...(selRaw||{})};

  function setClean(v){if(!modal)return;updateEntry(modal.y,modal.m,modal.d,v?{cigs:0,joints:0,glasses:0,clean:true}:{clean:false});if(v){setBop(modal.d);setTimeout(()=>setBop(null),450);}}
  function setCigs(v){if(!modal)return;updateEntry(modal.y,modal.m,modal.d,{cigs:v,clean:false});if(v>0){setBop(modal.d);setTimeout(()=>setBop(null),450);}}
  function setJoints(v){if(!modal)return;updateEntry(modal.y,modal.m,modal.d,{joints:v,clean:false});if(v>0){setBop(modal.d);setTimeout(()=>setBop(null),450);}}
  function setGlasses(v){if(!modal)return;updateEntry(modal.y,modal.m,modal.d,{glasses:v});}
  function setMood(m){if(!modal)return;updateEntry(modal.y,modal.m,modal.d,{mood:sel.mood===m?null:m});}
  function toggleCtx(c){if(!modal)return;const arr=sel.ctx||[];updateEntry(modal.y,modal.m,modal.d,{ctx:arr.includes(c)?arr.filter(x=>x!==c):[...arr,c]});}
  function setNote(note){if(!modal)return;updateEntry(modal.y,modal.m,modal.d,{note});}
  function clearDay(){if(!modal)return;setData(prev=>{const n={...prev};delete n[dk(modal.y,modal.m,modal.d)];return n;});}
  function exportJSON(){const blob=new Blob([JSON.stringify({data,goals},null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="habit_tracker.json";a.click();}

  const scoreColor=score>=70?"#22c55e":score>=40?"#f97316":"#ef4444";
  const scoreLabel=score>=70?"Bonne progression":score>=40?"En chemin":score>=20?"À améliorer":"Début du parcours";

  const barData=[{l:"Clean",v:nClean,c:"#22c55e"},{l:"Cigarettes",v:nCigs,c:"#f97316"},{l:"Cannabis",v:nWeed,c:"#a855f7"},{l:"Les deux",v:nBoth,c:"#ef4444"}];

  // Badge categories
  const badgeCats=[...new Set(badges.map(b=>b.cat).filter(Boolean))];
  const filteredBadges=badgeCat?badges.filter(b=>b.cat===badgeCat||(!b.cat&&badgeCats.indexOf(badgeCat)===badges.findIndex(x=>x.cat===badgeCat)-1)):badges;

  return(
    <div className="shell">
      <div className="hdr">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
          <div>
            <div style={{fontSize:9,letterSpacing:".15em",color:"#6b7280",textTransform:"uppercase",fontWeight:600}}>Suivi Personnel</div>
            <h1 style={{fontSize:18,fontFamily:"'DM Serif Display',serif",fontWeight:400,color:"#f0f0f8",lineHeight:1.1}}>Habit Tracker</h1>
          </div>
          <button className="expbtn" onClick={exportJSON}>↓ JSON</button>
        </div>
      </div>

      <div className="content">

        {/* ══ CALENDRIER ══ */}
        {tab==="cal"&&(<div className="tc">
          <div className="nav">
            <button className="nbtn" onClick={()=>calView==="month"?changeMonth(-1):setWeekOffset(w=>w-1)}>‹</button>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:13,fontWeight:600}}>{calView==="week"?`${weekDays[0].date.getDate()}–${weekDays[6].date.getDate()} ${MONTHS_S[weekDays[3].date.getMonth()]}`:`${MONTHS[month]} ${year}`}</span>
              <div className="vpill">
                <button className={`vbtn${calView==="month"?" on":""}`} onClick={()=>setCalView("month")}><IcoMonth/>Mois</button>
                <button className={`vbtn${calView==="week"?" on":""}`} onClick={()=>setCalView("week")}><IcoWeek/>Sem.</button>
              </div>
            </div>
            <button className="nbtn" onClick={()=>calView==="month"?changeMonth(1):setWeekOffset(w=>w+1)}>›</button>
          </div>

          {calView==="month"&&<>
            <div className="cal-hdr">{DAYS.map(d=><div key={d} className="cdl">{d}</div>)}</div>
            <div className="cal-grid" key={calKey}>
              {cells.map((d,i)=>{
                if(!d)return <div key={`e${i}`}/>;
                const e=data[dk(year,month,d)]||null,t=e?deriveType(e):null,col=t?tColor(t):null;
                const isToday=d===today.getDate()&&month===today.getMonth()&&year===today.getFullYear();
                return(<div key={d} className={`day${isToday?" td":""}${bop===d?" bop":""}`}
                  style={{background:tBg(t),borderColor:col||(isToday?"rgba(168,85,247,0.5)":"transparent"),color:col||"#6b7280",animationDuration:`${Math.min(i*14,260)+160}ms`}}
                  onClick={()=>setModal({y:year,m:month,d})}>
                  <span style={{fontSize:11,fontWeight:isToday?700:500}}>{d}</span>
                  {t&&<span style={{fontSize:8,marginTop:1}}>{tEmoji(t)}</span>}
                  {e?.mood!=null&&<span style={{position:"absolute",bottom:2,right:3,fontSize:7}}>{MOODS[e.mood]?.e}</span>}
                  {e?.note&&<div className="dot"/>}
                </div>);
              })}
            </div>
          </>}

          {calView==="week"&&(<div className="week-grid">
            {weekDays.map(({date,key},i)=>{
              const e=data[key]||null,t=e?deriveType(e):null,col=t?tColor(t):null;
              const isToday=date.toDateString()===today.toDateString();
              return(<div key={key} className={`wday${isToday?" td":""}`}
                style={{background:tBg(t),borderColor:col||(isToday?"rgba(168,85,247,0.55)":"transparent")}}
                onClick={()=>setModal({y:date.getFullYear(),m:date.getMonth(),d:date.getDate()})}>
                <div style={{fontSize:9,fontWeight:600,color:"var(--m)",textTransform:"uppercase",marginBottom:2}}>{DAYS_S[i]}</div>
                <div style={{fontSize:14,fontWeight:700,color:col||(isToday?"#d8b4fe":"#e8e8f0"),marginBottom:3}}>{date.getDate()}</div>
                <div style={{fontSize:12}}>{t?tEmoji(t):"·"}</div>
                {e?.cigs>0&&<div style={{fontSize:8,color:"#f97316",marginTop:2}}>{e.cigs}🚬</div>}
                {e?.joints>0&&<div style={{fontSize:8,color:"#a855f7",marginTop:1}}>{e.joints}🍃</div>}
                {e?.glasses>0&&<div style={{fontSize:8,color:"#3b82f6",marginTop:1}}>{e.glasses}🍺</div>}
                {e?.mood!=null&&<div style={{fontSize:10,marginTop:2}}>{MOODS[e.mood]?.e}</div>}
              </div>);
            })}
          </div>)}

          <div className="leg">
            {[["#22c55e","Clean"],["#f97316","Cigs"],["#a855f7","Weed"],["#3b82f6","Alcool"],["#ef4444","2 subst."],["#9f1239","Les 3"]].map(([c,l])=>(<div key={l} className="li"><div className="ld" style={{background:c}}/>{l}</div>))}
          </div>
          <div className="ss" style={{marginTop:10}}>
            <div className="m"><div className="v" style={{color:"#22c55e"}}>{nClean}</div><div className="l">Clean</div></div>
            <div className="m"><div className={`v${pulse?" pulse":""}`} style={{color:"#a855f7",display:"inline-block"}}>{streak}j</div><div className="l">Streak</div></div>
            <div className="m"><div className="v" style={{color:scoreColor}}>{score}</div><div className="l">Score</div></div>
          </div>
        </div>)}

        {/* ══ STATS SEVRAGE ══ */}
        {tab==="stats"&&(<div className="tc">

          {/* Score sevrage */}
          <div className="sev-score">
            <div style={{fontSize:11,color:"#9ca3af",marginBottom:4,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase"}}>Score de sevrage</div>
            <div className="sev-num" style={{color:scoreColor}}>{score}<span style={{fontSize:20}}>/100</span></div>
            <div className="sev-lbl">{scoreLabel}</div>
            <div style={{marginTop:12}}><Bar pct={score} color={`linear-gradient(90deg,${scoreColor},${scoreColor}88)`} thick/></div>
          </div>

          {/* Recovery timeline */}
          {recSteps.length>0&&<div className="card">
            <div className="clbl">Timeline de récupération</div>
            <div style={{fontSize:11,color:"#6b7280",marginBottom:12}}>Basé sur {streak} jours de streak actuel</div>
            {recSteps.map((s,i)=>(
              <div key={i} className="rec-step">
                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                  <div className="rec-dot" style={{background:s.done?s.color:"rgba(255,255,255,0.1)",boxShadow:s.done?`0 0 8px ${s.color}44`:""}}/>
                  {i<recSteps.length-1&&<div style={{width:2,height:26,background:"rgba(255,255,255,0.06)",marginTop:3}}/>}
                </div>
                <div style={{paddingBottom:i<recSteps.length-1?8:0}}>
                  <div style={{fontSize:11,fontWeight:700,color:s.done?s.color:"#4b5563",marginBottom:2}}>{s.time}</div>
                  <div style={{fontSize:12,color:s.done?"#e8e8f0":"#4b5563",lineHeight:1.4}}>{s.text}</div>
                </div>
              </div>
            ))}
          </div>}

          {/* Totaux */}
          <div className="card">
            <div className="clbl">Totaux du mois</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
              {[{v:totalCigs,l:"cigarettes",sub:`${(totalCigs/20).toFixed(1)} paquets`,c:"#f97316",e:"🚬"},{v:totalJoints,l:"joints",sub:`${totalWeedG}g`,c:"#a855f7",e:"🍃"},{v:totalGlasses,l:"verres",sub:"alcool",c:"#3b82f6",e:"🍺"}].map(s=>(
                <div key={s.l} style={{background:"rgba(255,255,255,0.04)",border:"1px solid var(--b)",borderRadius:12,padding:"10px 6px",textAlign:"center"}}>
                  <div style={{fontSize:9,marginBottom:3}}>{s.e}</div>
                  <div style={{fontSize:20,fontWeight:700,color:s.c,fontFamily:"'DM Serif Display',serif"}}>{s.v}</div>
                  <div style={{fontSize:10,color:"#e8e8f0",fontWeight:500}}>{s.l}</div>
                  <div style={{fontSize:9,color:"#6b7280",marginTop:1}}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparaison mois précédent */}
          <div className="card">
            <div className="clbl">vs {MONTHS_S[prevM]}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
              {[{l:"Jours clean",cur:nClean,prev:prevClean,c:"#22c55e",better:"up"},{l:"Cigarettes",cur:totalCigs,prev:prevCigs,c:"#f97316",better:"down"},{l:"Joints",cur:totalJoints,prev:prevJoints,c:"#a855f7",better:"down"}].map(s=>{
                const diff=s.cur-s.prev;const improved=(s.better==="up"&&diff>0)||(s.better==="down"&&diff<0);
                return(<div key={s.l} style={{background:"rgba(255,255,255,0.04)",border:"1px solid var(--b)",borderRadius:12,padding:"10px 8px",textAlign:"center"}}>
                  <div style={{fontSize:20,fontWeight:700,color:s.c,fontFamily:"'DM Serif Display',serif"}}>{s.cur}</div>
                  <div style={{fontSize:10,color:"#9ca3af",margin:"3px 0"}}>{s.l}</div>
                  {diff!==0&&<div className={improved?"delta-up":"delta-dn"}>{improved?"↓":"↑"}{Math.abs(diff)}</div>}
                  {diff===0&&<div style={{fontSize:11,color:"#6b7280"}}>— idem</div>}
                </div>);
              })}
            </div>
          </div>

          {/* Streaks */}
          <div className="xcard">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div className="clbl" style={{margin:0}}>Streaks</div>
              <button className="xbtn" onClick={()=>setExpand("streak")}><IcoExpand/></button>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:10}}>
              <div><div style={{fontSize:11,color:"#9ca3af"}}>Actuel</div><div style={{fontSize:22,fontWeight:700,color:"#22c55e",fontFamily:"'DM Serif Display',serif"}}><span style={{display:"inline-block"}} className={pulse?"pulse":""}>{streak}</span><span style={{fontSize:12}}> j</span></div></div>
              <div style={{textAlign:"center"}}><div style={{fontSize:11,color:"#9ca3af"}}>Record</div><div style={{fontSize:22,fontWeight:700,color:"#a855f7",fontFamily:"'DM Serif Display',serif"}}>{longest}<span style={{fontSize:12}}> j</span></div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:11,color:"#9ca3af"}}>Taux</div><div style={{fontSize:22,fontWeight:700,color:"#3b82f6",fontFamily:"'DM Serif Display',serif"}}>{pct}<span style={{fontSize:12}}>%</span></div></div>
            </div>
          </div>

          {/* Progression hebdo */}
          <div className="xcard">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div className="clbl" style={{margin:0}}>Par semaine</div>
              <button className="xbtn" onClick={()=>setExpand("weekly")}><IcoExpand/></button>
            </div>
            <div style={{marginBottom:8}}><div style={{fontSize:10,color:"#f97316",fontWeight:600,marginBottom:5}}>🚬 Cigs</div><WeekBars weeks={weeklyData} metric="cigs" color="#f97316"/></div>
            <div><div style={{fontSize:10,color:"#a855f7",fontWeight:600,marginBottom:5}}>🍃 Joints</div><WeekBars weeks={weeklyData} metric="joints" color="#a855f7"/></div>
          </div>

          {/* Tendance */}
          <div className="xcard">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div className="clbl" style={{margin:0}}>Tendance 28j</div>
              <button className="xbtn" onClick={()=>setExpand("spark")}><IcoExpand/></button>
            </div>
            <Spark data={spark}/>
          </div>

          {/* Économies */}
          <div className="xcard" style={{background:"rgba(168,85,247,0.07)",borderColor:"rgba(168,85,247,0.18)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{fontSize:11,color:"#a855f7",fontWeight:600,marginBottom:3}}>💰 Économies ce mois</div>
                <div style={{fontSize:30,fontWeight:700,color:"#d8b4fe",fontFamily:"'DM Serif Display',serif"}}>{moneyTotal}€</div>
                <div style={{fontSize:10,color:"#9ca3af",marginTop:2}}>{moneyCig}€ cigs · {moneyWeed}€ weed</div>
              </div>
              <button className="xbtn" style={{marginTop:2}} onClick={()=>setExpand("money")}><IcoExpand/></button>
            </div>
          </div>
        </div>)}

        {/* ══ BADGES ══ */}
        {tab==="badges"&&(<div className="tc">
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
            <div style={{fontSize:13,color:"#9ca3af"}}><span style={{color:"#d8b4fe",fontWeight:700}}>{earnedCount}</span>/{badges.length} obtenus</div>
            <div style={{fontSize:12,color:"#a855f7",fontWeight:700}}>{Math.round((earnedCount/badges.length)*100)}%</div>
          </div>
          <div style={{marginBottom:14}}><Bar pct={(earnedCount/badges.length)*100} color="linear-gradient(90deg,#a855f7,#d8b4fe)"/></div>

          {badges.map((b,i)=>{
            const showCat=b.cat!==null;
            return(<React.Fragment key={b.id}>
              {showCat&&<div className="badge-cat">{b.cat}</div>}
              <div className={`badge${b.earned?" earned":" locked"}`}
                style={{background:b.earned?"rgba(168,85,247,0.07)":"rgba(255,255,255,0.02)"}}>
                <div className="badge-icon" style={{filter:b.earned?"none":"grayscale(1) opacity(0.3)"}}>{b.icon}</div>
                <div style={{flex:1}}>
                  <div className="badge-name" style={{color:b.earned?"#e8e8f0":"#4b5563"}}>{b.name}</div>
                  <div className="badge-desc">{b.desc}</div>
                </div>
                {b.earned&&<div style={{fontSize:14,color:"#a855f7",marginLeft:"auto",flexShrink:0}}><span className="chk">✓</span></div>}
              </div>
            </React.Fragment>);
          })}
        </div>)}

        {/* ══ RÉGLAGES ══ */}
        {tab==="goals"&&(<div className="tc">
          <div className="card">
            <div className="clbl">Paramètres</div>
            {[{l:"Coût paquet cigs (€)",k:"cig"},{l:"Coût cannabis / g (€)",k:"weed"}].map(g=>(<div key={g.k} className="gr"><span>{g.l}</span><input type="number" value={goals[g.k]} onChange={e=>setGoals(p=>({...p,[g.k]:+e.target.value}))} min="0" step="0.5"/></div>))}
            <div style={{fontSize:10,color:"#4b5563"}}>* 1 joint = 0,3g par défaut</div>
          </div>
          <div className="card">
            <div className="clbl">Objectif mensuel</div>
            <div className="gr"><span>Jours clean visés</span><input type="number" value={goals.target} onChange={e=>setGoals(p=>({...p,target:+e.target.value}))} min="1" max="31"/></div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:13,color:"#e8e8f0"}}>Progression</span><span style={{fontSize:13,fontWeight:700,color:"#22c55e"}}>{nClean} / {goals.target}</span></div>
            <Bar pct={Math.min((nClean/Math.max(goals.target,1))*100,100)} color="linear-gradient(90deg,#22c55e,#86efac)" thick/>
            {nClean>=goals.target&&<div className="sban">🎉 Objectif atteint !</div>}
          </div>
          <div className="card">
            <div className="clbl">Rappels</div>
            <div className="toggle-row">
              <div><div style={{fontSize:13,color:"#e8e8f0",fontWeight:500}}>Notification du soir</div><div style={{fontSize:11,color:"#6b7280",marginTop:2}}>Rappel de renseigner ta journée</div></div>
              <button className={`toggle${goals.notifOn?" on":" off"}`} onClick={async()=>{if(!goals.notifOn){if("Notification" in window){const p=await Notification.requestPermission();if(p==="granted"){setGoals(g=>({...g,notifOn:true}));}}else setGoals(g=>({...g,notifOn:true}));}else setGoals(g=>({...g,notifOn:false}));}}/>
            </div>
            {goals.notifOn&&<div className="gr" style={{marginBottom:0}}><span>Heure</span><input type="time" value={goals.notifTime||"22:00"} onChange={e=>setGoals(p=>({...p,notifTime:e.target.value}))}/></div>}
          </div>
          <div className="sg">
            <div className="sm"><div className="v" style={{color:"#fbbf24"}}>{moneyTotal}€</div><div className="l">économisés</div></div>
            <div className="sm"><div className="v" style={{color:"#22c55e"}}><span style={{display:"inline-block"}} className={pulse?"pulse":""}>{streak}</span></div><div className="l">streak</div></div>
            <div className="sm"><div className="v" style={{color:scoreColor}}>{score}</div><div className="l">score</div></div>
            <div className="sm"><div className="v" style={{color:"#a855f7"}}>{earnedCount}</div><div className="l">badges</div></div>
          </div>
          <div className="motiv">
            <div className="mt">✦ Mindset</div>
            <p>{streak>=30?"30+ jours. Ton corps s'est physiologiquement adapté à l'absence de ces substances. C'est irréversible.":streak>=14?`${streak} jours. Le cortex préfrontal reprend le contrôle sur les circuits de récompense. Continue.`:streak>=7?`${streak} jours. Les niveaux de dopamine se rééquilibrent. Le plus dur est derrière.`:streak>=3?`${streak} jours. Les premières 72h sont les plus dures neurologiquement.`:"Commence. Chaque heure sans consommer remodèle ton cerveau."}</p>
          </div>
        </div>)}
      </div>

      {/* Tabs */}
      <div className="tabs">
        {[["cal",<IcoCalendar/>,"Agenda"],["stats",<IcoChart/>,"Sevrage"],["badges",<IcoBadge/>,"Badges"],["goals",<IcoSettings/>,"Config"]].map(([k,icon,label])=>(<button key={k} className={`tb${tab===k?" on":""}`} onClick={()=>setTab(k)}>{icon}{label}</button>))}
      </div>

      {/* ══ Expand overlays ══ */}
      {expand==="streak"&&(<ExpandView title="Streaks & Records" onClose={()=>setExpand(null)}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {[{l:"Streak actuel",v:streak,c:"#22c55e",sub:"jours consécutifs"},{l:"Record absolu",v:longest,c:"#a855f7",sub:"meilleure série"},{l:"Taux clean",v:`${pct}%`,c:"#3b82f6",sub:`${nClean}/${logged} jours`},{l:"Score sevrage",v:score,c:scoreColor,sub:scoreLabel}].map(s=>(<div key={s.l} style={{background:"rgba(255,255,255,0.04)",borderRadius:14,padding:16,textAlign:"center"}}><div style={{fontSize:34,fontWeight:700,color:s.c,fontFamily:"'DM Serif Display',serif"}}>{s.v}</div><div style={{fontSize:12,color:"#e8e8f0",fontWeight:500,marginTop:4}}>{s.l}</div><div style={{fontSize:10,color:"#6b7280",marginTop:2}}>{s.sub}</div></div>))}
        </div>
        <AIAnalysis stats={aiStats}/>
      </ExpandView>)}

      {expand==="weekly"&&(<ExpandView title="Progression hebdomadaire" onClose={()=>setExpand(null)}>
        {[{metric:"cigs",color:"#f97316",label:"Cigarettes",e:"🚬"},{metric:"joints",color:"#a855f7",label:"Joints",e:"🍃"},{metric:"glasses",color:"#3b82f6",label:"Verres d'alcool",e:"🍺"},{metric:"clean",color:"#22c55e",label:"Jours clean",e:"✦"}].map(m=>(<div key={m.metric} style={{background:"rgba(255,255,255,0.03)",borderRadius:14,padding:14}}>
          <div style={{fontSize:12,color:m.color,fontWeight:600,marginBottom:10}}>{m.e} {m.label}</div>
          <WeekBars weeks={weeklyData} metric={m.metric} color={m.color}/>
        </div>))}
        <AIAnalysis stats={aiStats}/>
      </ExpandView>)}

      {expand==="spark"&&(<ExpandView title="Tendance 28 jours" onClose={()=>setExpand(null)}>
        <div style={{background:"rgba(255,255,255,0.03)",borderRadius:16,padding:16}}><Spark data={spark} height={150}/></div>
        <div style={{background:"rgba(255,255,255,0.03)",borderRadius:14,padding:14}}>
          {barData.map(b=>(<div key={b.l} style={{marginBottom:10}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:12,color:"#9ca3af"}}>{b.l}</span><span style={{fontSize:12,fontWeight:700,color:b.c}}>{b.v}j</span></div><Bar pct={(b.v/barMax)*100} color={b.c}/></div>))}
        </div>
        <AIAnalysis stats={aiStats}/>
      </ExpandView>)}

      {expand==="money"&&(<ExpandView title="Économies détaillées" onClose={()=>setExpand(null)}>
        <div style={{background:"rgba(168,85,247,0.08)",border:"1px solid rgba(168,85,247,0.2)",borderRadius:18,padding:20,textAlign:"center"}}>
          <div style={{fontSize:10,color:"#a855f7",fontWeight:600,marginBottom:6}}>TOTAL ÉCONOMISÉ CE MOIS</div>
          <div style={{fontSize:50,fontWeight:700,color:"#d8b4fe",fontFamily:"'DM Serif Display',serif",lineHeight:1}}>{moneyTotal}€</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div style={{background:"rgba(255,255,255,0.04)",borderRadius:14,padding:14,textAlign:"center"}}><div style={{fontSize:26,fontWeight:700,color:"#f97316",fontFamily:"'DM Serif Display',serif"}}>{moneyCig}€</div><div style={{fontSize:11,color:"#9ca3af",marginTop:3}}>{cigSaved}j sans cigs</div></div>
          <div style={{background:"rgba(255,255,255,0.04)",borderRadius:14,padding:14,textAlign:"center"}}><div style={{fontSize:26,fontWeight:700,color:"#a855f7",fontFamily:"'DM Serif Display',serif"}}>{moneyWeed}€</div><div style={{fontSize:11,color:"#9ca3af",marginTop:3}}>{weedSaved}j sans weed</div></div>
        </div>
        <AIAnalysis stats={aiStats}/>
      </ExpandView>)}

      {/* ══ Modal ══ */}
      {modal&&(<div className="mo" onClick={()=>setModal(null)}>
        <div className="mb" onClick={e=>e.stopPropagation()}>
          <div className="mh"/>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:10,color:"#6b7280",letterSpacing:".1em",textTransform:"uppercase"}}>Journal</div>
            <div style={{fontSize:16,fontFamily:"'DM Serif Display',serif",color:"#f0f0f8"}}>{modal.d} {MONTHS[modal.m]} {modal.y}</div>
          </div>
          <div className="slbl">Journée</div>
          <div className={`ctr-row${sel.clean?" active":""}`} style={{background:sel.clean?"rgba(34,197,94,0.12)":"rgba(255,255,255,0.04)",color:"#22c55e",cursor:"pointer",marginBottom:12}} onClick={()=>setClean(!sel.clean)}>
            <div className="ctr-left"><div className="ctr-emoji">✦</div><div><div className="ctr-lbl" style={{color:"#22c55e"}}>Journée clean</div><div className="ctr-sub">Aucune consommation</div></div></div>
            {sel.clean&&<span className="chk" style={{color:"#22c55e",fontSize:16,marginRight:4}}>✓</span>}
          </div>
          <div className="slbl">Cigarettes 🚬</div>
          <div className={`ctr-row${sel.cigs>0?" active":""}`} style={{background:sel.cigs>0?"rgba(249,115,22,0.12)":"rgba(255,255,255,0.04)",color:"#f97316"}}>
            <div className="ctr-left"><div className="ctr-emoji">🚬</div><div><div className="ctr-lbl" style={{color:sel.cigs>0?"#f97316":"#e8e8f0"}}>Cigarettes</div><div className="ctr-sub">{sel.cigs>0?`~${(sel.cigs/20).toFixed(2)} paquet`:"Combien ?"}</div></div></div>
            <Counter value={sel.cigs} onChange={setCigs} color="#f97316"/>
          </div>
          <div className="slbl" style={{marginTop:8}}>Cannabis 🍃</div>
          <div className={`ctr-row${sel.joints>0?" active":""}`} style={{background:sel.joints>0?"rgba(168,85,247,0.12)":"rgba(255,255,255,0.04)",color:"#a855f7"}}>
            <div className="ctr-left"><div className="ctr-emoji">🍃</div><div><div className="ctr-lbl" style={{color:sel.joints>0?"#a855f7":"#e8e8f0"}}>Joints</div><div className="ctr-sub">{sel.joints>0?`≈ ${(sel.joints*0.3).toFixed(1)}g`:"Combien ?"}</div></div></div>
            <Counter value={sel.joints} onChange={setJoints} color="#a855f7"/>
          </div>
          <div className="slbl" style={{marginTop:8}}>Alcool 🍺</div>
          <div className={`ctr-row${sel.glasses>0?" active":""}`} style={{background:sel.glasses>0?"rgba(59,130,246,0.12)":"rgba(255,255,255,0.04)",color:"#3b82f6",marginBottom:12}}>
            <div className="ctr-left"><div className="ctr-emoji">🍺</div><div><div className="ctr-lbl" style={{color:sel.glasses>0?"#3b82f6":"#e8e8f0"}}>Verres</div><div className="ctr-sub">{sel.glasses>0?`${sel.glasses} verre${sel.glasses>1?"s":""}`:"Combien ?"}</div></div></div>
            <Counter value={sel.glasses} onChange={setGlasses} color="#3b82f6"/>
          </div>
          <div className="slbl">Humeur 😊</div>
          <div className="mood-row">
            {MOODS.map((m,i)=>(<button key={i} className={`mood-btn${sel.mood===i?" on":""}`} style={{borderColor:sel.mood===i?m.c:"transparent",color:sel.mood===i?m.c:"#6b7280"}} onClick={()=>setMood(i)}><span>{m.e}</span><span>{m.l}</span></button>))}
          </div>
          {(sel.cigs>0||sel.joints>0||sel.glasses>0)&&<>
            <div className="slbl">Contexte 🏷️</div>
            <div className="tag-row">{CTXS.map(c=>(<button key={c} className={`tag${(sel.ctx||[]).includes(c)?" on":""}`} onClick={()=>toggleCtx(c)}>{c}</button>))}</div>
          </>}
          <div className="slbl">Note</div>
          <textarea rows={2} placeholder="Comment tu te sens ?" value={sel.note||""} onChange={e=>setNote(e.target.value)}/>
          <div style={{display:"flex",gap:8,marginTop:12}}>
            {selRaw&&<button onClick={()=>{clearDay();setModal(null);}} style={{flex:1,padding:"12px",borderRadius:12,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:"#6b7280",fontFamily:"inherit",fontWeight:600,fontSize:13,cursor:"pointer"}}>Effacer</button>}
            <button className="bprim" style={{flex:2,margin:0}} onClick={()=>setModal(null)}>Enregistrer</button>
          </div>
        </div>
      </div>)}
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
</script>
<script>
if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js').catch(()=>{});});}
</script>
</body>
</html>
