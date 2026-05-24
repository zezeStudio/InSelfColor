import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────
// PCCS 24 HUE DATA
// ─────────────────────────────────────────────────────────
interface HueData {
  n: number;
  name: string;
  label: string;
  color: string;
  warm: boolean;
}

const PCCS_HUES: HueData[] = [
  {n:1,  name:"pR",  label:"자주빨강", color:"#C80040", warm:true},
  {n:2,  name:"R",   label:"빨강",     color:"#E60026", warm:true},
  {n:3,  name:"yR",  label:"노랑빨강", color:"#EF4423", warm:true},
  {n:4,  name:"rO",  label:"빨강주황", color:"#F06A00", warm:true},
  {n:5,  name:"O",   label:"주황",     color:"#F39800", warm:true},
  {n:6,  name:"yO",  label:"노랑주황", color:"#F7B700", warm:true},
  {n:7,  name:"rY",  label:"빨강노랑", color:"#F5D400", warm:true},
  {n:8,  name:"Y",   label:"노랑",     color:"#EFE000", warm:true},
  {n:9,  name:"gY",  label:"녹색노랑", color:"#BCCE00", warm:true},
  {n:10, name:"YG",  label:"연두",     color:"#80BB2A", warm:false},
  {n:11, name:"yG",  label:"노랑녹색", color:"#38AE3C", warm:false},
  {n:12, name:"G",   label:"녹색",     color:"#00994A", warm:false},
  {n:13, name:"bG",  label:"파랑녹색", color:"#00A070", warm:false},
  {n:14, name:"BG",  label:"청록",     color:"#00A098", warm:false},
  {n:15, name:"gB",  label:"녹색파랑", color:"#0090C0", warm:false},
  {n:16, name:"B",   label:"파랑",     color:"#006ABF", warm:false},
  {n:17, name:"B",   label:"남색",     color:"#003EA0", warm:false},
  {n:18, name:"pB",  label:"보라파랑", color:"#1E30A0", warm:false},
  {n:19, name:"V",   label:"보라",     color:"#5830A0", warm:false},
  {n:20, name:"bP",  label:"파랑보라", color:"#7840A8", warm:false},
  {n:21, name:"P",   label:"자주",     color:"#9848A8", warm:false},
  {n:22, name:"rP",  label:"빨강보라", color:"#B03890", warm:false},
  {n:23, name:"RP",  label:"빨강자주", color:"#C80065", warm:false},
  {n:24, name:"pR",  label:"자주빨강", color:"#C00048", warm:true},
];

// ─────────────────────────────────────────────────────────
// PCCS TONE DATA (lightness 0-100, saturation 0-100)
// ─────────────────────────────────────────────────────────
interface ToneData {
  key: string;
  name: string;
  abbr: string;
  l: number;
  s: number;
  bg: string;
  tc: string;
  border?: string;
}

const PCCS_TONES: ToneData[] = [
  {key:"W",   name:"흰색",       abbr:"W",   l:98, s:3,  bg:"#F8F8F8", tc:"#888", border:"#ddd"},
  {key:"p",   name:"페일",       abbr:"p",   l:88, s:20, bg:"#FDEEE4", tc:"#999"},
  {key:"ltg", name:"라이트\n그레이시", abbr:"ltg", l:66, s:16, bg:"#D8C8C0", tc:"#555"},
  {key:"g",   name:"그레이시",   abbr:"g",   l:44, s:14, bg:"#A89088", tc:"#fff"},
  {key:"dkg", name:"다크\n그레이시",  abbr:"dkg", l:20, s:12, bg:"#504540", tc:"#fff"},
  {key:"Bk",  name:"검정",       abbr:"Bk",  l:2,  s:3,  bg:"#1A1A1A", tc:"#fff", border:"#555"},
  {key:"lt",  name:"라이트",     abbr:"lt",  l:78, s:44, bg:"#F9CFAF", tc:"#555"},
  {key:"b",   name:"브라이트",   abbr:"b",   l:68, s:72, bg:"#FF9B6A", tc:"#fff"},
  {key:"v",   name:"비비드",     abbr:"v",   l:54, s:96, bg:"#FF5520", tc:"#fff"},
  {key:"sf",  name:"소프트",     abbr:"sf",  l:54, s:36, bg:"#D48A6A", tc:"#fff"},
  {key:"d",   name:"덜",         abbr:"d",   l:34, s:34, bg:"#A06040", tc:"#fff"},
  {key:"s",   name:"스트롱",     abbr:"s",   l:44, s:78, bg:"#C84422", tc:"#fff"},
  {key:"dp",  name:"딥",         abbr:"dp",  l:28, s:74, bg:"#8B2200", tc:"#fff"},
  {key:"dk",  name:"다크",       abbr:"dk",  l:18, s:50, bg:"#5A2200", tc:"#fff"},
];

// ─────────────────────────────────────────────────────────
// SEASON DATA (for guide)
// ─────────────────────────────────────────────────────────
interface GuideSeason {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  bg: string;
  primary: string;
  dark: string;
  undertone: string;
  undertoneColor: string;
  tone: string;
  brightness: string;
  contrast: string;
  skin: string;
  hair: string;
  eye: string;
  bestTones: string[];
  palette: string[];
  paletteNames: string[];
  keywords: string[];
}

const GUIDE_SEASONS: GuideSeason[] = [
  {
    id:"spring", name:"봄 웜", nameEn:"Spring Warm", icon:"🌸",
    bg:"linear-gradient(135deg,#FFF5EE,#FFE8D6,#FFD0B8)",
    primary:"#D96A3A", dark:"#4A1E0A",
    undertone:"웜",undertoneColor:"#E8905A",
    tone:"라이트·비비드",brightness:"밝음",contrast:"중간",
    skin:"밝은 황금빛 베이지·아이보리",hair:"골든 브라운·애쉬브라운",eye:"밝은 갈색·헤이즐",
    bestTones:["lt","b","v"],
    palette:["#FF9E7C","#FFA07A","#FFD700","#FFDAB9","#F4A460","#ADDFAD","#FF6B35","#FFB347"],
    paletteNames:["코랄","살몬","골드","피치","카멜","민트","오렌지","앰버"],
    keywords:["투명한","화사한","생기있는","따뜻한","경쾌한"],
  },
  {
    id:"summer", name:"여름 쿨", nameEn:"Summer Cool", icon:"🌊",
    bg:"linear-gradient(135deg,#F5F8FF,#E4ECF8,#D0DEEE)",
    primary:"#5274A8", dark:"#0D1F3C",
    undertone:"쿨",undertoneColor:"#5A82BF",
    tone:"라이트·소프트",brightness:"밝음",contrast:"낮음",
    skin:"핑크빛 베이지·로즈베이지",hair:"애쉬브라운·블루그레이",eye:"소프트브라운·그레이",
    bestTones:["lt","p","sf"],
    palette:["#B0C4DE","#C8A2C8","#F4C2C2","#99C5C4","#9FA8DA","#D8C4D8","#B8D4E8","#C8B8D8"],
    paletteNames:["스틸블루","라일락","파스텔핑크","소프트민트","페리윙클","연보라","파우더블루","모브"],
    keywords:["우아한","부드러운","로맨틱한","섬세한","투명한"],
  },
  {
    id:"autumn", name:"가을 웜", nameEn:"Autumn Warm", icon:"🍂",
    bg:"linear-gradient(135deg,#FFF5E8,#F0D5B0,#D4936A)",
    primary:"#8B4520", dark:"#2A1408",
    undertone:"웜",undertoneColor:"#C4703A",
    tone:"소프트·딥",brightness:"어두움",contrast:"중간",
    skin:"황금빛·구리빛 베이지",hair:"다크브라운·구리빛",eye:"올리브·다크브라운",
    bestTones:["d","dp","sf"],
    palette:["#C17A3E","#8B5E3C","#CC6633","#556B2F","#A0785A","#8B7355","#B8860B","#6B4226"],
    paletteNames:["카멜","다크브라운","테라코타","올리브","코퍼","카키","골든로드","초콜릿"],
    keywords:["성숙한","자연스러운","풍부한","따뜻한","깊은"],
  },
  {
    id:"winter", name:"겨울 쿨", nameEn:"Winter Cool", icon:"❄️",
    bg:"linear-gradient(135deg,#EEF2F8,#C8D5E8,#8898B8)",
    primary:"#1A3055", dark:"#060E1C",
    undertone:"쿨",undertoneColor:"#2A5090",
    tone:"비비드·딥",brightness:"어두움",contrast:"높음",
    skin:"블루빛·올리브 베이지",hair:"다크브라운·블랙",eye:"짙은 갈색·블랙",
    bestTones:["v","dp","b"],
    palette:["#1C1C1C","#F5F5F5","#722F37","#1B3A6B","#1B5E4B","#4B0082","#DC143C","#00CED1"],
    paletteNames:["블랙","화이트","버건디","로열블루","에메랄드","인디고","크림슨","틸"],
    keywords:["세련된","선명한","강렬한","모던한","대담한"],
  },
];

// ─────────────────────────────────────────────────────────
// CSS
// ─────────────────────────────────────────────────────────
const CSS = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root{
    --cream:#FDF8F2;--rg:#C4956A;--dark:#1E1410;--text:#3D2B1A;--sub:#7A6052;
    --border:rgba(196,149,106,0.18);--shadow:0 4px 24px rgba(62,40,20,0.08);
    --r:16px;--rl:24px;
    --fs:'Noto Serif KR',Georgia,serif;--fd:'Cormorant Garamond',Georgia,serif;
  }
  body{background:var(--cream);font-family:var(--fs);color:var(--text);overflow-x:hidden;}
  .gw{min-height:100vh;background:var(--cream);position:relative;}

  /* ── NAV ── */
  .gnav{display:flex;align-items:center;justify-content:space-between;padding:18px 32px;position:sticky;top:0;background:rgba(253,248,242,0.88);backdrop-filter:blur(12px);z-index:100;border-bottom:1px solid var(--border);}
  .glogo{font-family:var(--fd);font-size:19px;font-weight:600;color:var(--dark);letter-spacing:.04em;}
  .glogo span{color:var(--rg);font-style:italic;}
  .gnav-links{display:flex;gap:6px;}
  .gnl{padding:7px 14px;border-radius:100px;font-size:12px;cursor:pointer;border:1px solid transparent;color:var(--sub);background:none;font-family:var(--fs);transition:all .2s;white-space:nowrap;}
  .gnl:hover{color:var(--rg);border-color:rgba(196,149,106,.25);background:rgba(196,149,106,.06);}
  .gnl.active{color:var(--rg);border-color:rgba(196,149,106,.3);background:rgba(196,149,106,.09);}

  /* ── HERO ── */
  .ghero{padding:72px 24px 60px;text-align:center;position:relative;overflow:hidden;background:linear-gradient(160deg,#FDF8F2 0%,#F5EBE0 50%,#EDD8C4 100%);}
  .gh-orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;}
  .gh-o1{width:500px;height:500px;background:radial-gradient(circle,rgba(255,175,130,.28) 0%,transparent 70%);top:-150px;right:-100px;}
  .gh-o2{width:350px;height:350px;background:radial-gradient(circle,rgba(196,149,106,.2) 0%,transparent 70%);bottom:-80px;left:-80px;}
  .gh-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(196,149,106,.10);border:1px solid rgba(196,149,106,.26);border-radius:100px;padding:5px 18px;font-size:11px;letter-spacing:.16em;color:var(--rg);margin-bottom:24px;text-transform:uppercase;font-weight:500;}
  .gh-title{font-family:var(--fd);font-size:clamp(38px,7vw,80px);font-weight:300;line-height:1.08;color:var(--dark);letter-spacing:-.02em;margin-bottom:6px;}
  .gh-title span{color:var(--rg);font-style:italic;}
  .gh-sub{font-size:clamp(13px,1.8vw,16px);color:var(--sub);line-height:1.85;max-width:520px;margin:18px auto 0;font-weight:300;}
  .gh-scroll{display:flex;gap:28px;justify-content:center;margin-top:40px;flex-wrap:wrap;}
  .gh-sc{padding:9px 18px;border:1px solid var(--border);border-radius:100px;font-size:12px;color:var(--sub);cursor:pointer;transition:all .22s;background:rgba(255,255,255,.5);}
  .gh-sc:hover{border-color:var(--rg);color:var(--rg);background:rgba(196,149,106,.06);}

  /* ── SECTIONS ── */
  .gsec{padding:72px 24px;max-width:1080px;margin:0 auto;}
  .gsec-sm{padding:56px 24px;max-width:1080px;margin:0 auto;}
  .sec-label{font-size:11px;letter-spacing:.18em;text-transform:uppercase;font-weight:600;color:var(--rg);margin-bottom:12px;display:flex;align-items:center;gap:10px;}
  .sec-label::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,var(--border),transparent);}
  .sec-title{font-family:var(--fd);font-size:clamp(28px,5vw,52px);font-weight:400;color:var(--dark);line-height:1.15;margin-bottom:14px;}
  .sec-desc{font-size:clamp(13px,1.7vw,15px);color:var(--sub);line-height:1.85;max-width:660px;}
  .sec-divider{width:60px;height:2px;background:linear-gradient(90deg,var(--rg),rgba(196,149,106,.3));border-radius:2px;margin:20px 0;}

  /* ── INTRO CARDS ── */
  .intro-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px;}
  .ic{background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.85);border-radius:var(--rl);padding:28px 22px;box-shadow:var(--shadow);transition:transform .25s,box-shadow .25s;}
  .ic:hover{transform:translateY(-4px);box-shadow:0 12px 36px rgba(62,40,20,.12);}
  .ic-icon{font-size:28px;margin-bottom:14px;}
  .ic-title{font-size:15px;font-weight:600;color:var(--dark);margin-bottom:8px;}
  .ic-desc{font-size:12px;color:var(--sub);line-height:1.72;}

  /* ── UNDERTONE ── */
  .ut-wrap{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:36px;}
  .ut-card{border-radius:var(--rl);padding:28px 24px;position:relative;overflow:hidden;}
  .ut-warm{background:linear-gradient(135deg,#FFF5EE,#FFE8D6,#FFD0B8);}
  .ut-cool{background:linear-gradient(135deg,#F0F4FF,#E0EAFF,#C8D8F0);}
  .ut-label{font-size:20px;font-weight:700;margin-bottom:6px;}
  .ut-label.warm{color:#C4603A;}
  .ut-label.cool{color:#3A60C4;}
  .ut-sub{font-size:12px;font-weight:500;margin-bottom:14px;opacity:.7;}
  .ut-features{list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:16px;}
  .ut-feature{font-size:12px;color:var(--text);display:flex;align-items:flex-start;gap:8px;line-height:1.5;}
  .ut-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;margin-top:5px;}
  .ut-metals{display:flex;gap:8px;flex-wrap:wrap;}
  .ut-metal{padding:5px 12px;border-radius:100px;font-size:11px;font-weight:500;}
  .ut-swatches{display:flex;gap:6px;margin-top:14px;}
  .ut-sw{width:32px;height:32px;border-radius:50%;border:2px solid rgba(255,255,255,.7);box-shadow:0 2px 8px rgba(0,0,0,.1);}

  /* ── VEIN TEST ── */
  .vein-box{background:rgba(255,255,255,.55);border:1px solid var(--border);border-radius:var(--rl);padding:24px;margin-top:20px;display:flex;gap:20px;align-items:flex-start;flex-wrap:wrap;}
  .vein-item{flex:1;min-width:140px;}
  .vein-title{font-size:12px;font-weight:600;color:var(--dark);margin-bottom:8px;}
  .vein-color{width:100%;height:24px;border-radius:8px;margin-bottom:6px;}
  .vein-desc{font-size:11px;color:var(--sub);line-height:1.6;}

  /* ── PCCS HUE ── */
  .pccs-wrap{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start;margin-top:36px;}
  .pccs-svg-wrap{display:flex;justify-content:center;}
  .pccs-desc{display:flex;flex-direction:column;gap:14px;}
  .pccs-item{background:rgba(255,255,255,.55);border:1px solid var(--border);border-radius:14px;padding:16px 18px;}
  .pccs-item-title{font-size:13px;font-weight:600;color:var(--dark);margin-bottom:5px;}
  .pccs-item-desc{font-size:12px;color:var(--sub);line-height:1.68;}
  .pccs-warm-cool{display:flex;gap:8px;margin-top:10px;}
  .pccs-tag{padding:4px 11px;border-radius:100px;font-size:11px;font-weight:500;}
  .ptag-w{background:#FFF0E8;color:#C4603A;border:1px solid rgba(196,96,58,.2);}
  .ptag-c{background:#EEF4FF;color:#3A60C4;border:1px solid rgba(58,96,196,.2);}

  /* ── TONE MAP ── */
  .tone-wrap{margin-top:36px;}
  .tone-svg-container{background:rgba(255,255,255,.55);border:1px solid var(--border);border-radius:var(--rl);padding:20px;overflow:hidden;}
  .tone-legend{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;margin-top:20px;}
  .tl-item{display:flex;align-items:center;gap:9px;padding:9px 12px;background:rgba(255,255,255,.5);border:1px solid var(--border);border-radius:11px;}
  .tl-dot{width:28px;height:28px;border-radius:50%;flex-shrink:0;box-shadow:0 2px 6px rgba(0,0,0,.12);}
  .tl-info{flex:1;}
  .tl-abbr{font-size:11px;font-weight:700;color:var(--dark);}
  .tl-name{font-size:10px;color:var(--sub);}

  /* ── TONE SEASON TABLE ── */
  .tone-season{margin-top:28px;background:rgba(255,255,255,.55);border:1px solid var(--border);border-radius:var(--rl);overflow:hidden;}
  .ts-head{display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1fr;background:rgba(196,149,106,.08);padding:12px 16px;font-size:11px;font-weight:600;color:var(--sub);letter-spacing:0.05em;}
  .ts-row{display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1fr;padding:12px 16px;border-top:1px solid var(--border);align-items:center;font-size:12px;}
  .ts-row:hover{background:rgba(196,149,106,.04);}
  .ts-tone{font-weight:600;color:var(--dark);}
  .ts-chip{display:inline-block;padding:3px 8px;border-radius:100px;font-size:10px;font-weight:500;}
  .ts-sp{background:#FFF0E8;color:#C07050;}
  .ts-su{background:#EEF2FA;color:#5070B0;}
  .ts-au{background:#F5E6D3;color:#906030;}
  .ts-wi{background:#E8EDF5;color:#304060;}

  /* ── SEASON CARDS ── */
  .sc-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-top:36px;}
  .sc-card{border-radius:var(--rl);overflow:hidden;box-shadow:var(--shadow);transition:transform .28s,box-shadow .28s;}
  .sc-card:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(62,40,20,.14);}
  .sc-header{padding:28px 22px 22px;position:relative;}
  .sc-icon{font-size:36px;margin-bottom:10px;}
  .sc-name{font-family:var(--fd);font-size:26px;font-weight:400;margin-bottom:3px;}
  .sc-en{font-size:11px;letter-spacing:0.1em;opacity:.65;text-transform:uppercase;}
  .sc-keyword{display:inline-block;margin-top:8px;padding:4px 12px;border-radius:100px;font-size:11px;font-weight:500;background:rgba(255,255,255,.4);backdrop-filter:blur(4px);}
  .sc-body{padding:20px;background:rgba(255,255,255,.75);backdrop-filter:blur(8px);}
  .sc-row{display:flex;gap:8px;margin-bottom:14px;align-items:flex-start;font-size:12px;}
  .sc-row-lbl{width:54px;color:var(--sub);flex-shrink:0;padding-top:1px;}
  .sc-row-val{color:var(--text);line-height:1.5;flex:1;}
  .sc-palette{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;}
  .sc-sw{width:26px;height:26px;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,.12);transition:transform .2s;cursor:default;border:1.5px solid rgba(255,255,255,.7);}
  .sc-sw:hover{transform:scale(1.18);}
  .sc-tags{display:flex;flex-wrap:wrap;gap:5px;}
  .sc-tag{padding:4px 9px;border-radius:100px;font-size:10px;font-weight:500;background:rgba(196,149,106,.08);color:var(--sub);border:1px solid rgba(196,149,106,.15);}
  .sc-tone-chips{display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;}
  .sc-tc{padding:3px 9px;border-radius:100px;font-size:10px;font-weight:600;}

  /* ── SEASON QUADRANT ── */
  .sq-wrap{display:flex;justify-content:center;margin-top:36px;}

  /* ── TIPS ── */
  .tips-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:32px;}
  .tip-card{background:rgba(255,255,255,.65);border:1px solid var(--border);border-radius:var(--rl);padding:22px 20px;transition:transform .22s;}
  .tip-card:hover{transform:translateY(-3px);}
  .tip-num{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#C4956A,#E8AA80);color:#fff;font-size:12px;font-weight:600;display:flex;align-items:center;justify-content:center;margin-bottom:12px;}
  .tip-title{font-size:14px;font-weight:600;color:var(--dark);margin-bottom:7px;}
  .tip-desc{font-size:12px;color:var(--sub);line-height:1.72;}

  /* ── CTA ── */
  .cta{text-align:center;padding:80px 24px;background:linear-gradient(160deg,#FDF8F2,#F5EBE0,#EDD8C4);position:relative;overflow:hidden;}
  .cta-orb{position:absolute;border-radius:50%;filter:blur(70px);pointer-events:none;}
  .cta-o1{width:400px;height:400px;background:radial-gradient(circle,rgba(255,175,130,.25) 0%,transparent 70%);top:-100px;right:-80px;}
  .cta-o2{width:300px;height:300px;background:radial-gradient(circle,rgba(196,149,106,.18) 0%,transparent 70%);bottom:-60px;left:-60px;}
  .cta-title{font-family:var(--fd);font-size:clamp(30px,5vw,56px);font-weight:300;color:var(--dark);margin-bottom:14px;position:relative;}
  .cta-sub{font-size:clamp(13px,1.8vw,15px);color:var(--sub);line-height:1.8;margin-bottom:36px;position:relative;}
  .cta-btn{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,#C4956A,#E8AA80);color:#fff;border:none;border-radius:100px;padding:17px 46px;font-size:15px;font-family:var(--fs);font-weight:500;cursor:pointer;box-shadow:0 8px 28px rgba(196,149,106,.32);transition:all .3s cubic-bezier(.34,1.56,.64,1);letter-spacing:0.03em;position:relative;}
  .cta-btn:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 14px 38px rgba(196,149,106,.42);}

  /* ── SEPARATOR ── */
  .g-sep{height:1px;background:linear-gradient(90deg,transparent,var(--border),transparent);margin:0 24px;}

  /* ── TOP BUTTON ── */
  .totop{
    position:fixed;
    bottom:28px;
    right:28px;
    width:50px;
    height:50px;
    background:#fff;
    border:1px solid var(--border);
    border-radius:50%;
    box-shadow:0 4px 20px rgba(62,40,20,0.12);
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    font-size:11px;
    font-weight:600;
    color:var(--text);
    cursor:pointer;
    z-index:999;
    transition:all 0.3s cubic-bezier(.16,1,0.3,1);
    opacity:0;
    pointer-events:none;
    transform:translateY(16px);
    font-family:var(--fs);
    outline:none;
  }
  .totop.visible{
    opacity:1;
    pointer-events:all;
    transform:translateY(0);
  }
  .totop:hover{
    background:var(--cream);
    color:var(--rg);
    border-color:var(--rg);
    box-shadow:0 8px 30px rgba(196,149,106,0.22);
    transform:translateY(-4px);
  }
  .totop:active{
    transform:translateY(0);
  }
  .totop-arrow{
    font-size:10px;
    margin-bottom:-1px;
  }

  /* ── RESPONSIVE ── */
  @media(max-width:900px){
    .intro-grid{grid-template-columns:1fr 1fr;}
    .pccs-wrap{grid-template-columns:1fr;}
    .sc-grid{grid-template-columns:1fr;}
    .gnav-links{gap:4px;}.gnl{padding:6px 11px;font-size:11px;}
  }
  @media(max-width:640px){
    .gnav{padding:14px 16px;}
    .gnav-links{display:none;}
    .gsec,.gsec-sm{padding:52px 16px;}
    .ghero{padding:52px 16px 44px;}
    .ut-wrap{grid-template-columns:1fr;}
    .intro-grid{grid-template-columns:1fr;}
    .ts-head,.ts-row{grid-template-columns:1fr 1fr 1fr;font-size:10px;}
    .ts-head>*:nth-child(n+4),.ts-row>*:nth-child(n+4){display:none;}
    .tips-grid{grid-template-columns:1fr;}
  }
`;

// ─────────────────────────────────────────────────────────
// FONT LOADER
// ─────────────────────────────────────────────────────────
function FontLoader(){
  useEffect(()=>{
    if(document.getElementById("pcg-gf"))return;
    const l=document.createElement("link");
    l.id="pcg-gf";l.rel="stylesheet";
    l.href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap";
    document.head.appendChild(l);
  },[]);
  return null;
}

// ─────────────────────────────────────────────────────────
// SVG HELPERS
// ─────────────────────────────────────────────────────────
function polar(cx: number, cy: number, r: number, deg: number){
  const rad=(deg-90)*Math.PI/180;
  return{x:cx+r*Math.cos(rad),y:cy+r*Math.sin(rad)};
}
function arcPath(cx: number, cy: number, r1: number, r2: number, a1: number, a2: number){
  const s=polar(cx,cy,r2,a1),e=polar(cx,cy,r2,a2);
  const s2=polar(cx,cy,r1,a2),e2=polar(cx,cy,r1,a1);
  const lg=(a2-a1)>180?1:0;
  return `M${s.x.toFixed(2)},${s.y.toFixed(2)} A${r2},${r2} 0 ${lg} 1 ${e.x.toFixed(2)},${e.y.toFixed(2)} L${s2.x.toFixed(2)},${s2.y.toFixed(2)} A${r1},${r1} 0 ${lg} 0 ${e2.x.toFixed(2)},${e2.y.toFixed(2)} Z`;
}

// ─────────────────────────────────────────────────────────
// PCCS HUE CIRCLE SVG
// ─────────────────────────────────────────────────────────
function PCCSHueCircle(){
  const SZ=340,cx=SZ/2,cy=SZ/2,OR=138,MR=100,IR=62,LR=152;
  const step=360/24;
  const[hover,setHover]=useState<number | null>(null);

  return(
    <svg viewBox={`0 0 ${SZ} ${SZ}`} width="100%" style={{maxWidth:340,display:"block"}}>
      <path d={`M${polar(cx,cy,OR+12,-45).x},${polar(cx,cy,OR+12,-45).y} A${OR+12},${OR+12} 0 1 1 ${polar(cx,cy,OR+12,-46).x},${polar(cx,cy,OR+12,-46).y}`} fill="none" stroke="transparent"/>

      {PCCS_HUES.map((h,i)=>{
        const a1=i*step,a2=a1+step;
        const d=arcPath(cx,cy,MR,OR,a1,a2);
        const mid=a1+step/2;
        const isHov=hover===i;
        return (
          <g key={i} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)}>
            <path d={d} fill={h.color} stroke="rgba(255,255,255,0.6)" strokeWidth="0.8"
              style={{filter:isHov?"brightness(1.15)":"none",transition:"filter .15s"}}/>
            {i%2===0&&(
              <text x={polar(cx,cy,(MR+OR)/2+2,mid).x} y={polar(cx,cy,(MR+OR)/2+2,mid).y}
                textAnchor="middle" dominantBaseline="middle" fontSize="7.5" fill="rgba(255,255,255,0.85)" fontWeight="600">
                {h.n}
              </text>
            )}
          </g>
        );
      })}

      {PCCS_HUES.map((h,i)=>{
        const mid=i*step+step/2;
        const lp=polar(cx,cy,MR-16,mid);
        if(i%3!==0)return null;
        return(
          <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle"
            fontSize="7" fill={h.warm?"#C4603A":"#3A60C4"} fontWeight="600">{h.name}</text>
        );
      })}

      <circle cx={cx} cy={cy} r={IR} fill="white"/>
      <circle cx={cx} cy={cy} r={IR} fill="none" stroke="rgba(196,149,106,0.2)" strokeWidth="1"/>

      <text x={cx} y={cy-18} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3D2B1A" fontFamily="serif">PCCS</text>
      <text x={cx} y={cy-4} textAnchor="middle" fontSize="8.5" fill="#7A6052">Practical Color</text>
      <text x={cx} y={cy+9} textAnchor="middle" fontSize="8.5" fill="#7A6052">Co-ordinate System</text>
      <text x={cx} y={cy+26} textAnchor="middle" fontSize="9" fill="#C4956A" fontWeight="500">24색상환</text>

      <text x={polar(cx,cy,OR+18,0).x} y={polar(cx,cy,OR+18,0).y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#C4603A" fontWeight="600">웜톤</text>
      <text x={polar(cx,cy,OR+18,180).x} y={polar(cx,cy,OR+18,180).y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#3A60C4" fontWeight="600">쿨톤</text>

      {hover!==null&&(
        <g>
          <rect x={cx-50} y={cy+IR+8} width={100} height={32} rx={8} fill="rgba(30,20,10,0.82)"/>
          <text x={cx} y={cy+IR+22} textAnchor="middle" fontSize="9" fill="white" fontWeight="600">{PCCS_HUES[hover].n}:{PCCS_HUES[hover].name}</text>
          <text x={cx} y={cy+IR+33} textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.75)">{PCCS_HUES[hover].label}</text>
        </g>
      )}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────
// PCCS TONE MAP SVG
// ─────────────────────────────────────────────────────────
function PCCSToneMap(){
  const W=560,H=360,ml=58,mr=24,mt=24,mb=52;
  const pw=W-ml-mr,ph=H-mt-mb;
  const[hover,setHover]=useState<number | null>(null);

  const tx=(s: number)=>ml+s/100*pw;
  const ty=(l: number)=>mt+(1-l/100)*ph;

  const gridX=[0,20,40,60,80,100];
  const gridY=[0,25,50,75,100];

  return(
    <div className="tone-svg-container">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{display:"block"}}>
        {gridX.map(v=>(
          <line key={`gx${v}`} x1={tx(v)} y1={mt} x2={tx(v)} y2={H-mb} stroke="rgba(196,149,106,0.12)" strokeWidth="1" strokeDasharray="4 4"/>
        ))}
        {gridY.map(v=>(
          <line key={`gy${v}`} x1={ml} y1={ty(v)} x2={W-mr} y2={ty(v)} stroke="rgba(196,149,106,0.12)" strokeWidth="1" strokeDasharray="4 4"/>
        ))}

        <line x1={ml} y1={mt} x2={ml} y2={H-mb} stroke="rgba(196,149,106,0.4)" strokeWidth="1.5"/>
        <line x1={ml} y1={H-mb} x2={W-mr} y2={H-mb} stroke="rgba(196,149,106,0.4)" strokeWidth="1.5"/>

        <text x={W/2} y={H-8} textAnchor="middle" fontSize="11" fill="#7A6052" fontWeight="500">채도 (Saturation) →</text>
        <text x={12} y={H/2} textAnchor="middle" fontSize="11" fill="#7A6052" fontWeight="500" transform={`rotate(-90,12,${H/2})`}>명도 (Lightness) ↑</text>

        {gridX.map(v=>(
          <text key={`xl${v}`} x={tx(v)} y={H-mb+13} textAnchor="middle" fontSize="8" fill="rgba(122,96,82,0.6)">{v}</text>
        ))}
        {gridY.map(v=>(
          <text key={`yl${v}`} x={ml-6} y={ty(v)+3} textAnchor="end" fontSize="8" fill="rgba(122,96,82,0.6)">{v}</text>
        ))}

        {PCCS_TONES.map((t,i)=>{
          const x=tx(t.s),y=ty(t.l);
          const r=hover===i?22:18;
          return (
            <g key={t.key} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)}
              style={{cursor:"default"}}>
              <circle cx={x} cy={y} r={r} fill={t.bg} stroke={t.border||"rgba(255,255,255,0.6)"} strokeWidth="1.5"
                style={{filter:`drop-shadow(0 2px 4px rgba(0,0,0,0.12))`,transition:"r .15s"}}/>
              <text x={x} y={y-3} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="700" fill={t.tc}>{t.abbr}</text>
              <text x={x} y={y+7} textAnchor="middle" fontSize="7" fill={t.tc} opacity="0.85">
                {t.name.includes("\n")?t.name.split("\n")[0]:t.name}
              </text>
              {hover===i&&(
                <g>
                  <rect x={x-36} y={y-r-28} width={72} height={22} rx={6} fill="rgba(30,20,10,0.82)"/>
                  <text x={x} y={y-r-18} textAnchor="middle" fontSize="8.5" fill="white" fontWeight="600">{t.name.replace("\n","")}</text>
                  <text x={x} y={y-r-10} textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.75)">명:{t.l} 채:{t.s}</text>
                </g>
              )}
            </g>
          );
        })}

        <text x={tx(80)} y={ty(85)} textAnchor="middle" fontSize="9" fill="rgba(200,100,50,0.55)" fontWeight="600">고명도·고채도</text>
        <text x={tx(12)} y={ty(50)} textAnchor="middle" fontSize="9" fill="rgba(122,96,82,0.45)" fontWeight="600">중성·저채도</text>
        <text x={tx(72)} y={ty(18)} textAnchor="middle" fontSize="9" fill="rgba(80,40,20,0.45)" fontWeight="600">저명도·고채도</text>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// SEASON QUADRANT SVG
// ─────────────────────────────────────────────────────────
function SeasonQuadrant(){
  const SZ=320,cx=SZ/2,cy=SZ/2;
  const seasons=[
    {name:"봄 웜 🌸",x:cx+60,y:cy-60,bg:"#FFE8D6",color:"#C4603A",sub:"밝음·웜"},
    {name:"여름 쿨 🌊",x:cx-60,y:cy-60,bg:"#E4ECF8",color:"#3A60C4",sub:"밝음·쿨"},
    {name:"가을 웜 🍂",x:cx+60,y:cy+60,bg:"#F0D5B0",color:"#8B4520",sub:"어두움·웜"},
    {name:"겨울 쿨 ❄️",x:cx-60,y:cy+60,bg:"#C8D5E8",color:"#1A3055",sub:"어두움·쿨"},
  ];
  return(
    <svg viewBox={`0 0 ${SZ} ${SZ}`} width="100%" style={{maxWidth:320,display:"block"}}>
      <rect x={cx} y={0} width={cx} height={cy} fill="rgba(255,232,210,0.35)"/>
      <rect x={0} y={0} width={cx} height={cy} fill="rgba(224,234,248,0.35)"/>
      <rect x={cx} y={cy} width={cx} height={cy} fill="rgba(240,213,176,0.35)"/>
      <rect x={0} y={cy} width={cx} height={cy} fill="rgba(200,213,232,0.35)"/>

      <line x1={cx} y1={8} x2={cx} y2={SZ-8} stroke="rgba(196,149,106,0.4)" strokeWidth="1.5" strokeDasharray="5 3"/>
      <line x1={8} y1={cy} x2={SZ-8} y2={cy} stroke="rgba(196,149,106,0.4)" strokeWidth="1.5" strokeDasharray="5 3"/>

      <text x={cx} y={16} textAnchor="middle" fontSize="10" fill="#7A6052" fontWeight="600">밝음 (Light)</text>
      <text x={cx} y={SZ-5} textAnchor="middle" fontSize="10" fill="#7A6052" fontWeight="600">어두움 (Deep)</text>
      <text x={8} y={cy-6} textAnchor="middle" fontSize="10" fill="#3A60C4" fontWeight="600" transform={`rotate(-90,8,${cy})`}>← 쿨</text>
      <text x={SZ-8} y={cy-6} textAnchor="middle" fontSize="10" fill="#C4603A" fontWeight="600" transform={`rotate(90,${SZ-8},${cy})`}>← 웜</text>

      <circle cx={cx} cy={cy} r={4} fill="rgba(196,149,106,0.5)"/>

      {seasons.map((s,i)=>(
        <g key={i}>
          <circle cx={s.x} cy={s.y} r={44} fill={s.bg} stroke="rgba(255,255,255,0.8)" strokeWidth="2"
            style={{filter:"drop-shadow(0 3px 8px rgba(0,0,0,0.1))"}}/>
          <text x={s.x} y={s.y-7} textAnchor="middle" fontSize="11" fontWeight="700" fill={s.color}>{s.name.split(" ")[0]} {s.name.split(" ")[1]}</text>
          <text x={s.x} y={s.y+6} textAnchor="middle" fontSize="14">{s.name.split(" ")[2]}</text>
          <text x={s.x} y={s.y+20} textAnchor="middle" fontSize="8.5" fill={s.color} opacity="0.75">{s.sub}</text>
        </g>
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────
// SEASON CARD
// ─────────────────────────────────────────────────────────
const TONE_COLORS: Record<string, string>={
  p:"#FDEEE4",lt:"#F9CFAF",b:"#FF9B6A",v:"#FF5520",
  sf:"#D48A6A",d:"#A06040",s:"#C84422",dp:"#8B2200",dk:"#5A2200",
  W:"#F8F8F8",ltg:"#D8C8C0",g:"#A89088",dkg:"#504540",Bk:"#1A1A1A",
};

interface SeasonCardProps {
  key?: string | number;
  s: GuideSeason;
}

function SeasonCard({s}: SeasonCardProps){
  return(
    <div className="sc-card">
      <div className="sc-header" style={{background:s.bg,color:s.dark}}>
        <div className="sc-icon">{s.icon}</div>
        <div className="sc-name">{s.name}</div>
        <div className="sc-en">{s.nameEn}</div>
        <span className="sc-keyword" style={{color:s.primary}}>{s.tone} 톤 · {s.brightness}</span>
      </div>
      <div className="sc-body">
        <div className="sc-row"><span className="sc-row-lbl">피부</span><span className="sc-row-val">{s.skin}</span></div>
        <div className="sc-row"><span className="sc-row-lbl">모발</span><span className="sc-row-val">{s.hair}</span></div>
        <div className="sc-row"><span className="sc-row-lbl">눈동자</span><span className="sc-row-val">{s.eye}</span></div>

        <div className="sc-row">
          <span className="sc-row-lbl">언더톤</span>
          <span className="sc-tc" style={{background:`${s.undertoneColor}22`,color:s.undertoneColor,padding:"3px 10px",borderRadius:"100px",fontSize:11,fontWeight:600}}>
            {s.undertone}톤 ({s.undertone==="웜"?"Yellow/Golden":"Pink/Blue"})
          </span>
        </div>

        <div className="sc-row">
          <span className="sc-row-lbl">추천 톤</span>
          <div className="sc-tone-chips">
            {s.bestTones.map(t=>(
              <span key={t} className="sc-tc" style={{background:TONE_COLORS[t]||"#eee",color:"rgba(30,20,10,0.8)",border:"1px solid rgba(0,0,0,0.07)"}}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div style={{fontSize:11,color:"var(--sub)",marginBottom:8,fontWeight:600,letterSpacing:"0.03em"}}>🎨대표 컬러 프리뷰</div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1.5fr)",
          gap: "6px",
          marginBottom: "14px"
        }}>
          {s.palette.map((c,i)=>(
            <div key={c} style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              background: `${c}10`,
              border: `1px solid ${c}28`,
              borderRadius: "100px",
              padding: "4px 6px",
              boxShadow: "0 1px 2px rgba(62,40,20,0.02)",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "default"
            }}
            title={`${s.paletteNames[i]}: ${c}`}
            >
              <div style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: c,
                boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
                border: "1px solid rgba(255,255,255,0.8)",
                flexShrink: 0
              }} />
              <span style={{
                fontSize: "10px",
                fontWeight: "600",
                color: "var(--dark)",
                opacity: 0.85,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}>
                {s.paletteNames[i]}
              </span>
            </div>
          ))}
        </div>

        <div className="sc-tags">
          {s.keywords.map(k=><span key={k} className="sc-tag">{k}</span>)}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// MAIN GUIDE PAGE
// ─────────────────────────────────────────────────────────
const NAV_ITEMS=[
  {id:"intro",label:"퍼스널컬러란"},
  {id:"undertone",label:"웜·쿨 언더톤"},
  {id:"pccs",label:"PCCS 색채"},
  {id:"seasons",label:"4계절 타입"},
  {id:"tips",label:"진단 팁"},
];

interface PersonalColorGuideProps {
  onBack: () => void;
}

export default function PersonalColorGuide({ onBack }: PersonalColorGuideProps){
  const[activeNav,setActiveNav]=useState("intro");
  const[showTop,setShowTop]=useState(false);
  const secRefs=useRef<Record<string, HTMLElement | null>>({});

  const scrollTo=(id: string)=>{
    const el=secRefs.current[id];
    if(el)el.scrollIntoView({behavior:"smooth",block:"start"});
    setActiveNav(id);
  };

  useEffect(()=>{
    const handleScroll=()=>{
      if(window.scrollY > 400){
        setShowTop(true);
      }else{
        setShowTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return()=>window.removeEventListener("scroll", handleScroll);
  },[]);

  const scrollToTop=()=>{
    window.scrollTo({top:0,behavior:"smooth"});
  };

  useEffect(()=>{
    const refsMap = secRefs.current;
    const obs=new IntersectionObserver(
      (entries)=>{
        entries.forEach(e=>{
          if(e.isIntersecting){
            const sec = e.target.getAttribute("data-section");
            if (sec) setActiveNav(sec);
          }
        });
      },
      {rootMargin:"-40% 0px -55% 0px"}
    );
    Object.values(refsMap).forEach(el=>{if(el)obs.observe(el as HTMLElement);});
    return()=>obs.disconnect();
  }, []);

  const setRef=(id: string)=>(el: HTMLElement | null)=>{
    secRefs.current[id]=el;
    if(el)el.setAttribute("data-section", id);
  };

  return(
    <div className="gw">
      <FontLoader/>
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav className="gnav">
        <div className="glogo" style={{ cursor: "pointer" }} onClick={onBack}>InSelf<span>Color</span> <span style={{fontSize:14,fontWeight:300,color:"var(--sub)",fontStyle:"normal"}}>가이드</span></div>
        <div className="gnav-links">
          {NAV_ITEMS.map(n=>(
            <button key={n.id} type="button" className={`gnl${activeNav===n.id?" active":""}`} onClick={()=>scrollTo(n.id)}>{n.label}</button>
          ))}
          <button 
            type="button"
            className="gnl" 
            style={{background:"linear-gradient(135deg,#C4956A,#E8AA80)",color:"#fff",border:"none"}}
            onClick={onBack}
          >
            ← 테스트 하기
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="ghero">
        <div className="gh-orb gh-o1"/><div className="gh-orb gh-o2"/>
        <div className="gh-badge">✦ Personal Color Guide</div>
        <h1 className="gh-title">퍼스널 컬러<br/><span>완전 가이드</span></h1>
        <p className="gh-sub">PCCS 색채 이론부터 4계절 퍼스널 컬러까지, 나에게 어울리는 색을 찾는 모든 것을 담았습니다.</p>
        <div className="gh-scroll">
          {NAV_ITEMS.map(n=>(
            <button key={n.id} type="button" className="gh-sc" onClick={()=>scrollTo(n.id)}>{n.label}</button>
          ))}
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="gsec" ref={setRef("intro")}>
        <div className="sec-label">Introduction</div>
        <h2 className="sec-title">퍼스널 컬러란?</h2>
        <div className="sec-divider"/>
        <p className="sec-desc">퍼스널 컬러(Personal Color)는 개인의 피부·눈동자·모발 색상과 조화를 이루는 색채 팔레트를 말합니다. 1970년대 미국에서 시작되어 일본을 거쳐 한국에 대중화된 색채 이론으로, 올바른 퍼스널 컬러를 활용하면 피부가 밝고 생기있어 보이며 전반적인 인상이 개선됩니다.</p>
        <div className="intro-grid">
          {[
            {ic:"🎨",t:"색채 조화",d:"피부 고유의 색조(언더톤)와 가장 잘 어울리는 색상을 찾아 조화를 이루는 것이 핵심입니다. 잘못된 색상은 피부가 칙칙해 보이게 할 수 있습니다."},
            {ic:"✨",t:"언더톤",d:"피부 표면 아래에 흐르는 색의 흐름을 언더톤이라 합니다. 크게 웜톤(황금빛·복숭아빛)과 쿨톤(핑크빛·파란빛)으로 나뉩니다."},
            {ic:"🌈",t:"4계절 분류",d:"봄·여름·가을·겨울 4가지 타입으로 분류합니다. 웜/쿨 언더톤과 명도(밝기) 조합으로 결정되며, 각 타입마다 어울리는 색이 다릅니다."},
            {ic:"👗",t:"패션·메이크업",d:"퍼스널 컬러는 의상, 메이크업, 헤어 컬러 선택의 기준이 됩니다. 나에게 맞는 색상으로 코디하면 자연스럽고 세련된 룩을 완성할 수 있습니다."},
            {ic:"💡",t:"왜 중요한가",d:"같은 색도 사람에 따라 다르게 보입니다. 피부 언더톤과 맞는 색은 얼굴을 환하게 하고, 맞지 않는 색은 피부가 노랗거나 창백해 보일 수 있습니다."},
            {ic:"🔬",t:"과학적 근거",d:"PCCS, Munsell 등 색채 이론을 기반으로 합니다. 색의 웜/쿨 온도, 명도, 채도가 피부 반사광과 어떻게 상호작용하는지를 분석한 이론입니다."},
          ].map(({ic,t,d})=>(
            <div key={t} className="ic">
              <div className="ic-icon">{ic}</div>
              <div className="ic-title">{t}</div>
              <div className="ic-desc">{d}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="g-sep"/>

      {/* ── UNDERTONE ── */}
      <section className="gsec" ref={setRef("undertone")}>
        <div className="sec-label">Undertone</div>
        <h2 className="sec-title">웜톤 vs 쿨톤</h2>
        <div className="sec-divider"/>
        <p className="sec-desc">언더톤은 피부 표면 아래 흐르는 색조입니다. 빛 아래서 피부가 어떤 색으로 반사되느냐로 결정됩니다. 메이크업이나 조명의 영향을 받지 않는 자연 상태에서 관찰하는 것이 중요합니다.</p>

        <div className="ut-wrap">
          {/* WARM */}
          <div className="ut-card ut-warm">
            <div className="ut-label warm">🌅 웜톤 (Warm Tone)</div>
            <div className="ut-sub" style={{color:"#C4603A"}}>Yellow·Golden·Peachy Undertone</div>
            <ul className="ut-features">
              {["피부에 황금빛·복숭아빛·노랑빛이 감돔","햇빛 아래서 피부가 골드·허니빛으로 빛남","볼에 복숭아빛·산호빛 혈색","손목 혈관이 녹색·올리브빛으로 보임","태닝 시 골드빛으로 그을림"].map(f=>(
                <li key={f} className="ut-feature"><span className="ut-dot" style={{background:"#E8905A"}}/>{f}</li>
              ))}
            </ul>
            <div className="ut-metals">
              <span className="ut-metal" style={{background:"#DAA520",color:"#fff"}}>💛 골드</span>
              <span className="ut-metal" style={{background:"#B8860B",color:"#fff"}}>🟡 옐로우골드</span>
              <span className="ut-metal" style={{background:"#CD7F32",color:"#fff"}}>🟤 브론즈</span>
            </div>
            <div className="ut-swatches">
              {["#FF9E7C","#FFA07A","#FFD700","#F4A460","#CC6633","#DAA520"].map(c=>(
                <div key={c} className="ut-sw" style={{background:c}}/>
              ))}
            </div>
          </div>
          {/* COOL */}
          <div className="ut-card ut-cool">
            <div className="ut-label cool">🌙 쿨톤 (Cool Tone)</div>
            <div className="ut-sub" style={{color:"#3A60C4"}}>Pink·Blue·Rosy Undertone</div>
            <ul className="ut-features">
              {["피부에 핑크빛·로즈빛·파란빛이 감돔","형광등 아래서 피부가 포슬린·로즈빛으로 보임","볼에 핑크빛·장밋빛 혈색","손목 혈관이 파란빛·보라빛으로 보임","태닝 시 붉게 타거나 잘 안 그을림"].map(f=>(
                <li key={f} className="ut-feature"><span className="ut-dot" style={{background:"#5A82BF"}}/>{f}</li>
              ))}
            </ul>
            <div className="ut-metals">
              <span className="ut-metal" style={{background:"#C0C0C0",color:"#555"}}>⚪ 실버</span>
              <span className="ut-metal" style={{background:"#E8E8E8",color:"#888"}}>🔘 화이트골드</span>
              <span className="ut-metal" style={{background:"#A8A9AD",color:"#fff"}}>⬜ 플래티넘</span>
            </div>
            <div className="ut-swatches">
              {["#B0C4DE","#C8A2C8","#F4C2C2","#9FA8DA","#722F37","#4B0082"].map(c=>(
                <div key={c} className="ut-sw" style={{background:c}}/>
              ))}
            </div>
          </div>
        </div>

        {/* Vein test */}
        <div style={{marginTop:24}}>
          <div style={{fontSize:13,fontWeight:600,color:"var(--dark)",marginBottom:12}}>✋ 혈관 색상으로 확인하는 셀프 진단</div>
          <div className="vein-box">
            {[
              {t:"녹색·올리브빛",c:"linear-gradient(135deg,#3CB371,#6B8E23)",d:"웜톤 가능성이 높습니다. 황금빛 베이스가 녹색으로 반사됩니다.",type:"웜톤 🌅"},
              {t:"파란빛·보라빛",c:"linear-gradient(135deg,#4169E1,#8A2BE2)",d:"쿨톤 가능성이 높습니다. 차가운 핑크 베이스가 파란빛으로 보입니다.",type:"쿨톤 🌙"},
              {t:"혼합·판단 어려움",c:"linear-gradient(135deg,#708090,#9B8EA8)",d:"뉴트럴 톤일 수 있습니다. 웜과 쿨의 중간 특성을 가집니다.",type:"뉴트럴 ⚖️"},
            ].map(v=>(
              <div key={v.t} className="vein-item">
                <div className="vein-title">{v.type}</div>
                <div className="vein-color" style={{background:v.c}}/>
                <div style={{fontSize:12,fontWeight:600,color:"var(--dark)",marginBottom:4}}>혈관 색상: {v.t}</div>
                <div className="vein-desc">{v.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="g-sep"/>

      {/* ── PCCS ── */}
      <section className="gsec" ref={setRef("pccs")}>
        <div className="sec-label">PCCS Color System</div>
        <h2 className="sec-title">PCCS 색채 시스템</h2>
        <div className="sec-divider"/>
        <p className="sec-desc">PCCS(Practical Color Co-ordinate System)는 일본색연구소가 1964년 개발한 색채 체계입니다. 색상(Hue), 명도(Lightness), 채도(Saturation)의 3속성을 기반으로, 특히 '톤(Tone)' 개념을 도입해 패션과 퍼스널 컬러 진단에 널리 활용됩니다.</p>

        {/* Hue Circle */}
        <div style={{marginTop:36}}>
          <div style={{fontSize:13,fontWeight:600,color:"var(--dark)",marginBottom:20,display:"flex",alignItems:"center",gap:8}}>
            <span style={{width:4,height:18,background:"var(--rg)",borderRadius:2,display:"inline-block"}}/>
            PCCS 24색상환 (Hue Circle)
          </div>
          <div className="pccs-wrap">
            <div className="pccs-svg-wrap">
              <PCCSHueCircle/>
            </div>
            <div className="pccs-desc">
              <div className="pccs-item">
                <div className="pccs-item-title">색상환 구성</div>
                <div className="pccs-item-desc">PCCS는 색상을 24등분하여 번호(1~24)와 기호(R, Y, G, B, P 등)로 표기합니다. 빨강(2:R)을 기준으로 시계 방향으로 주황, 노랑, 녹색, 파랑, 보라 순으로 배열됩니다.</div>
              </div>
              <div className="pccs-item">
                <div className="pccs-item-title">웜/쿨 구분</div>
                <div className="pccs-item-desc">빨강~노랑~주황계열(1~9번)은 웜톤 색상으로 따뜻하고 에너지 있는 느낌을 줍니다. 파랑~보라~청록(13~21번)은 쿨톤 색상으로 차갑고 시원한 느낌을 줍니다.</div>
                <div className="pccs-warm-cool">
                  <span className="pccs-tag ptag-w">웜 1~9번</span>
                  <span className="pccs-tag ptag-c">쿨 13~21번</span>
                </div>
              </div>
              <div className="pccs-item">
                <div className="pccs-item-title">퍼스널 컬러에서의 활용</div>
                <div className="pccs-item-desc">봄·가을 웜톤은 색상환의 웜 영역(빨강·주황·노랑·황록) 색상이 잘 어울립니다. 여름·겨울 쿨톤은 쿨 영역(파랑·보라·핑크·청록) 색상을 권장합니다.</div>
              </div>
              <div className="pccs-item">
                <div className="pccs-item-title">보색과 유사색</div>
                <div className="pccs-item-desc">색상환에서 반대편에 위치한 색이 보색입니다. 퍼스널 컬러에서는 유사색(인접 색상) 코디가 자연스럽고, 보색은 포인트 컬러로 활용합니다.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tone Map */}
        <div className="tone-wrap">
          <div style={{fontSize:13,fontWeight:600,color:"var(--dark)",marginBottom:20,display:"flex",alignItems:"center",gap:8}}>
            <span style={{width:4,height:18,background:"var(--rg)",borderRadius:2,display:"inline-block"}}/>
            PCCS 톤 맵 (Tone Map)
          </div>
          <p style={{fontSize:12,color:"var(--sub)",lineHeight:1.75,marginBottom:20}}>
            톤(Tone)은 명도(밝기)와 채도(선명도)의 조합으로 결정됩니다. PCCS는 12가지 유채색 톤과 무채색 계열(흰색·회색·검정)을 정의합니다. 아래 맵에서 각 톤의 위치를 확인하세요.
          </p>
          <PCCSToneMap/>

          {/* Legend */}
          <div className="tone-legend">
            {PCCS_TONES.map(t=>(
              <div key={t.key} className="tl-item">
                <div className="tl-dot" style={{background:t.bg,border:`2px solid ${t.border||"rgba(255,255,255,0.5)"}`}}/>
                <div className="tl-info">
                  <div className="tl-abbr">{t.abbr} — {t.name.replace("\n","")}</div>
                  <div className="tl-name">명:{t.l} 채:{t.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tone-Season table */}
        <div style={{marginTop:36}}>
          <div style={{fontSize:13,fontWeight:600,color:"var(--dark)",marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
            <span style={{width:4,height:18,background:"var(--rg)",borderRadius:2,display:"inline-block"}}/>
            톤별 추천 계절 타입
          </div>
          <div className="tone-season">
            <div className="ts-head">
              <span>톤</span><span>명도</span>
              <span>🌸봄</span><span>🌊여름</span><span>🍂가을</span>
            </div>
            {TONE_SEASON_MAP.map((r,i)=>(
              <div key={i} className="ts-row">
                <span className="ts-tone">{r.tone}</span>
                <span style={{fontSize:11,color:"var(--sub)"}}>{r.brightness}</span>
                <span>{r.sp&&<span className="ts-chip ts-sp">봄</span>}</span>
                <span>{r.su&&<span className="ts-chip ts-su">여름</span>}</span>
                <span>{r.au&&<span className="ts-chip ts-au">가을</span>}</span>
              </div>
            ))}
          </div>
          <p style={{fontSize:11,color:"var(--sub)",marginTop:10,lineHeight:1.65}}>
            * 겨울 타입은 비비드(v), 딥(dp), 브라이트(b) 톤과 블랙·화이트 무채색 계열이 특히 잘 어울립니다.
          </p>
        </div>
      </section>

      <div className="g-sep"/>

      {/* ── 4 SEASONS ── */}
      <section className="gsec" ref={setRef("seasons")}>
        <div className="sec-label">4 Season Types</div>
        <h2 className="sec-title">4계절 퍼스널 컬러</h2>
        <div className="sec-divider"/>
        <p className="sec-desc">웜/쿨 언더톤과 밝음/어두움(명도)의 조합으로 4가지 계절 타입이 결정됩니다. 각 타입의 특징과 어울리는 PCCS 톤을 확인하세요.</p>

        {/* Quadrant */}
        <div className="sq-wrap">
          <SeasonQuadrant/>
        </div>

        {/* Season Cards */}
        <div className="sc-grid">
          {GUIDE_SEASONS.map(s=><SeasonCard key={s.id} s={s}/>)}
        </div>
      </section>

      <div className="g-sep"/>

      {/* ── TIPS ── */}
      <section className="gsec-sm" ref={setRef("tips")}>
        <div className="sec-label">Diagnosis Tips</div>
        <h2 className="sec-title">퍼스널 컬러 진단 팁</h2>
        <div className="sec-divider"/>
        <p className="sec-desc">정확한 퍼스널 컬러 진단을 위한 전문가 조언입니다. 진단 전 아래 항목을 확인해두세요.</p>
        <div className="tips-grid">
          {[
            {t:"자연광에서 확인하기",d:"형광등이나 백열등은 피부 색조를 왜곡합니다. 낮에 창문 옆 자연광 아래서 진단하면 가장 정확합니다. 직사광선보다 간접 자연광이 이상적입니다."},
            {t:"메이크업 없는 상태에서",d:"파운데이션, 블러셔 등 색조 메이크업은 피부 본래 색을 가립니다. 메이크업을 지운 상태에서 진단해야 언더톤을 정확히 파악할 수 있습니다."},
            {t:"드레이핑 테스트",d:"흰 천, 크림색 천, 회색 천 등 다양한 색의 천을 얼굴 아래 대어보세요. 피부가 가장 밝고 생기있어 보이는 색상이 퍼스널 컬러와 가깝습니다."},
            {t:"금속 액세서리 테스트",d:"금색(골드)과 은색(실버) 액세서리를 각각 착용해보세요. 피부가 더 환하고 잘 어울리는 금속이 힌트가 됩니다. 골드→웜톤, 실버→쿨톤."},
            {t:"화이트 vs 아이보리",d:"순백(화이트)과 아이보리 흰색 중 어느 것이 피부에 더 잘 맞는지 확인하세요. 화이트가 잘 맞으면 쿨톤, 아이보리·크림이 더 어울리면 웜톤일 가능성이 높습니다."},
            {t:"전문가 진단 vs AI 분석",d:"전문 퍼스널 컬러리스트는 드레이핑, 색 반사 테스트 등 다양한 방법으로 진단합니다. AI·사진 기반 분석은 보조 도구로 활용하고 최종적으로는 전문가 상담을 권장합니다."},
            {t:"서브타입도 확인하기",d:"4계절 타입 안에서도 서브타입이 있습니다. 봄이라면 '라이트 스프링', '웜 스프링', '비비드 스프링' 등으로 세분화되어 더 정밀한 색 선택이 가능합니다."},
            {t:"컬러 팔레트 활용하기",d:"진단 후에는 퍼스널 컬러 팔레트 카드를 만들어 쇼핑이나 코디 시 활용하세요. 어울리는 색과 피해야 할 색을 한눈에 비교하면 실용적입니다."},
          ].map((tip,i)=>(
            <div key={tip.t} className="tip-card">
              <div className="tip-num">{i+1}</div>
              <div className="tip-title">{tip.t}</div>
              <div className="tip-desc">{tip.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta">
        <div className="cta-orb cta-o1"/><div className="cta-orb cta-o2"/>
        <h2 className="cta-title">이제 나의 컬러를<br/>찾아볼 시간</h2>
        <p className="cta-sub">이론을 충분히 익혔다면 직접 사진으로 분석해보세요.<br/>InSelf Color의 색상 분석 알고리즘이 당신의 퍼스널 컬러를 찾아드립니다.</p>
        <button type="button" className="cta-btn" onClick={onBack}>
          <span>퍼스널 컬러 테스트 시작</span><span>→</span>
        </button>
      </section>

      <button
        type="button"
        className={`totop${showTop ? " visible" : ""}`}
        onClick={scrollToTop}
        title="맨 위로 이동"
        aria-label="맨 위로 이동"
      >
        <span className="totop-arrow">▲</span>
        <span>TOP</span>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// EXTRA TABLE DATA TYPES
// ─────────────────────────────────────────────────────────
interface ToneSeasonRow {
  tone: string;
  brightness: string;
  sp: boolean;
  su: boolean;
  au: boolean;
  wi: boolean;
}

const TONE_SEASON_MAP: ToneSeasonRow[] = [
  {tone:"v (비비드)",  brightness:"중간", sp:true,  su:false,au:false,wi:true},
  {tone:"b (브라이트)", brightness:"높음", sp:true,  su:false,au:false,wi:false},
  {tone:"s (스트롱)",  brightness:"중간", sp:false, su:false,au:true, wi:true},
  {tone:"dp (딥)",     brightness:"낮음", sp:false, su:false,au:true, wi:true},
  {tone:"lt (라이트)", brightness:"높음", sp:true,  su:true, au:false,wi:false},
  {tone:"sf (소프트)", brightness:"중간", sp:false, su:true, au:true, wi:false},
  {tone:"d (덜)",      brightness:"낮음", sp:false, su:false,au:true, wi:false},
  {tone:"dk (다크)",   brightness:"낮음", sp:false, su:false,au:true, wi:true},
  {tone:"p (페일)",    brightness:"최고", sp:true,  su:true, au:false,wi:false},
  {tone:"ltg (라이트그레이시)",brightness:"높음",sp:false,su:true,au:false,wi:false},
  {tone:"g (그레이시)",brightness:"중간", sp:false, su:true, au:false,wi:false},
  {tone:"dkg (다크그레이시)",brightness:"낮음",sp:false,su:false,au:false,wi:true},
];
