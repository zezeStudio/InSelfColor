import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────
// PCCS 24 HUE DATA
// ─────────────────────────────────────────────────────────
interface HueData {
  n: number;
  name: string;
  label: string;
  labelEn: string;
  color: string;
  warm: boolean;
}

const PCCS_HUES: HueData[] = [
  {n:1,  name:"pR",  label:"자주빨강", labelEn:"Purplish Red", color:"#C80040", warm:true},
  {n:2,  name:"R",   label:"빨강",     labelEn:"Red", color:"#E60026", warm:true},
  {n:3,  name:"yR",  label:"노랑빨강", labelEn:"Yellowish Red", color:"#EF4423", warm:true},
  {n:4,  name:"rO",  label:"빨강주황", labelEn:"Reddish Orange", color:"#F06A00", warm:true},
  {n:5,  name:"O",   label:"주황",     labelEn:"Orange", color:"#F39800", warm:true},
  {n:6,  name:"yO",  label:"노랑주황", labelEn:"Yellowish Orange", color:"#F7B700", warm:true},
  {n:7,  name:"rY",  label:"빨강노랑", labelEn:"Reddish Yellow", color:"#F5D400", warm:true},
  {n:8,  name:"Y",   label:"노랑",     labelEn:"Yellow", color:"#EFE000", warm:true},
  {n:9,  name:"gY",  label:"녹색노랑", labelEn:"Greenish Yellow", color:"#BCCE00", warm:true},
  {n:10, name:"YG",  label:"연두",     labelEn:"Yellow Green", color:"#80BB2A", warm:false},
  {n:11, name:"yG",  label:"노랑녹색", labelEn:"Yellowish Green", color:"#38AE3C", warm:false},
  {n:12, name:"G",   label:"녹색",     labelEn:"Green", color:"#00994A", warm:false},
  {n:13, name:"bG",  label:"파랑녹색", labelEn:"Blueish Green", color:"#00A070", warm:false},
  {n:14, name:"BG",  label:"청록",     labelEn:"Blue Green", color:"#00A098", warm:false},
  {n:15, name:"gB",  label:"녹색파랑", labelEn:"Greenish Blue", color:"#0090C0", warm:false},
  {n:16, name:"B",   label:"파랑",     labelEn:"Blue", color:"#006ABF", warm:false},
  {n:17, name:"B",   label:"남색",     labelEn:"Navy Blue", color:"#003EA0", warm:false},
  {n:18, name:"pB",  label:"보라파랑", labelEn:"Purplish Blue", color:"#1E30A0", warm:false},
  {n:19, name:"V",   label:"보라",     labelEn:"Violet", color:"#5830A0", warm:false},
  {n:20, name:"bP",  label:"파랑보라", labelEn:"Blueish Purple", color:"#7840A8", warm:false},
  {n:21, name:"P",   label:"자주",     labelEn:"Purple", color:"#9848A8", warm:false},
  {n:22, name:"rP",  label:"빨강보라", labelEn:"Reddish Purple", color:"#B03890", warm:false},
  {n:23, name:"RP",  label:"빨강자주", labelEn:"Reddish Purple RP", color:"#C80065", warm:false},
  {n:24, name:"pR",  label:"자주빨강", labelEn:"Purplish Red pR", color:"#C00048", warm:true},
];

// ─────────────────────────────────────────────────────────
// PCCS TONE DATA (lightness 0-100, saturation 0-100)
// ─────────────────────────────────────────────────────────
interface ToneData {
  key: string;
  name: string;
  nameEn: string;
  abbr: string;
  l: number;
  s: number;
  bg: string;
  tc: string;
  border?: string;
}

const PCCS_TONES: ToneData[] = [
  {key:"W",   name:"흰색",       nameEn:"White",       abbr:"W",   l:98, s:3,  bg:"#F8F8F8", tc:"#888", border:"#ddd"},
  {key:"p",   name:"페일",       nameEn:"Pale",        abbr:"p",   l:88, s:20, bg:"#FDEEE4", tc:"#999"},
  {key:"ltg", name:"라이트\n그레이시", nameEn:"Light\nGrayish",   abbr:"ltg", l:66, s:16, bg:"#D8C8C0", tc:"#555"},
  {key:"g",   name:"그레이시",   nameEn:"Grayish",     abbr:"g",   l:44, s:14, bg:"#A89088", tc:"#fff"},
  {key:"dkg", name:"다크\n그레이시",  nameEn:"Dark\nGrayish",    abbr:"dkg", l:20, s:12, bg:"#504540", tc:"#fff"},
  {key:"Bk",  name:"검정",       nameEn:"Black",       abbr:"Bk",  l:2,  s:3,  bg:"#1A1A1A", tc:"#fff", border:"#555"},
  {key:"lt",  name:"라이트",     nameEn:"Light",       abbr:"lt",  l:78, s:44, bg:"#F9CFAF", tc:"#555"},
  {key:"b",   name:"브라이트",   nameEn:"Bright",      abbr:"b",   l:68, s:72, bg:"#FF9B6A", tc:"#fff"},
  {key:"v",   name:"비비드",     nameEn:"Vivid",       abbr:"v",   l:54, s:96, bg:"#FF5520", tc:"#fff"},
  {key:"sf",  name:"소프트",     nameEn:"Soft",        abbr:"sf",  l:54, s:36, bg:"#D48A6A", tc:"#fff"},
  {key:"d",   name:"덜",         nameEn:"Dull",        abbr:"d",   l:34, s:34, bg:"#A06040", tc:"#fff"},
  {key:"s",   name:"스트롱",     nameEn:"Strong",      abbr:"s",   l:44, s:78, bg:"#C84422", tc:"#fff"},
  {key:"dp",  name:"딥",         nameEn:"Deep",        abbr:"dp",  l:28, s:74, bg:"#8B2200", tc:"#fff"},
  {key:"dk",  name:"다크",       nameEn:"Dark",        abbr:"dk",  l:18, s:50, bg:"#5A2200", tc:"#fff"},
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
  undertoneEn: string;
  undertoneColor: string;
  tone: string;
  toneEn: string;
  brightness: string;
  brightnessEn: string;
  contrast: string;
  contrastEn: string;
  skin: string;
  skinEn: string;
  hair: string;
  hairEn: string;
  eye: string;
  eyeEn: string;
  bestTones: string[];
  palette: string[];
  paletteNames: string[];
  paletteNamesEn: string[];
  keywords: string[];
  keywordsEn: string[];
}

const GUIDE_SEASONS: GuideSeason[] = [
  {
    id:"spring", name:"봄 웜", nameEn:"Spring Warm", icon:"🌸",
    bg:"linear-gradient(135deg,#FFF5EE,#FFE8D6,#FFD0B8)",
    primary:"#D96A3A", dark:"#4A1E0A",
    undertone:"웜", undertoneEn:"Warm", undertoneColor:"#E8905A",
    tone:"라이트·비비드", toneEn:"Light & Vivid", brightness:"밝음", brightnessEn:"Bright", contrast:"중간", contrastEn:"Medium",
    skin:"밝은 황금빛 베이지·아이보리", skinEn:"Bright golden beige / ivory", hair:"골든 브라운·애쉬브라운", hairEn:"Golden brown / Ash brown", eye:"밝은 갈색·헤이즐", eyeEn:"Bright brown / Hazel",
    bestTones:["lt","b","v"],
    palette:["#FF9E7C","#FFA07A","#FFD700","#FFDAB9","#F4A460","#ADDFAD","#FF6B35","#FFB347"],
    paletteNames:["코랄","살몬","골드","피치","카멜","민트","오렌지","앰버"],
    paletteNamesEn:["Coral","Salmon","Gold","Peach","Camel","Mint","Orange","Amber"],
    keywords:["투명한","화사한","생기있는","따뜻한","경쾌한"],
    keywordsEn:["Clear","Radiant","Lively","Warm","Playful"],
  },
  {
    id:"summer", name:"여름 쿨", nameEn:"Summer Cool", icon:"🌊",
    bg:"linear-gradient(135deg,#F5F8FF,#E4ECF8,#D0DEEE)",
    primary:"#5274A8", dark:"#0D1F3C",
    undertone:"쿨", undertoneEn:"Cool", undertoneColor:"#5A82BF",
    tone:"라이트·소프트", toneEn:"Light & Soft", brightness:"밝음", brightnessEn:"Bright", contrast:"낮음", contrastEn:"Low",
    skin:"핑크빛 베이지·로즈베이지", skinEn:"Pinkish beige / Rose beige", hair:"애쉬브라운·블루그레이", hairEn:"Ash brown / Blue gray", eye:"소프트브라운·그레이", eyeEn:"Soft brown / Grayish",
    bestTones:["lt","p","sf"],
    palette:["#B0C4DE","#C8A2C8","#F4C2C2","#99C5C4","#9FA8DA","#D8C4D8","#B8D4E8","#C8B8D8"],
    paletteNames:["스틸블루","라일락","파스텔핑크","소프트민트","페리윙클","연보라","파우더블루","모브"],
    paletteNamesEn:["Steel Blue","Lilac","Pastel Pink","Soft Mint","Periwinkle","Lilac Purple","Powder Blue","Mauve"],
    keywords:["우아한","부드러운","로맨틱한","섬세한","투명한"],
    keywordsEn:["Elegant","Soft","Romantic","Delicate","Pure"],
  },
  {
    id:"autumn", name:"가을 웜", nameEn:"Autumn Warm", icon:"🍂",
    bg:"linear-gradient(135deg,#FFF5E8,#F0D5B0,#D4936A)",
    primary:"#8B4520", dark:"#2A1408",
    undertone:"웜", undertoneEn:"Warm", undertoneColor:"#C4703A",
    tone:"소프트·딥", toneEn:"Soft & Deep", brightness:"어두움", brightnessEn:"Deep", contrast:"중간", contrastEn:"Medium",
    skin:"황금빛·구리빛 베이지", skinEn:"Golden / coppery olive beige", hair:"다크브라운·구리빛", hairEn:"Dark brown / Copper-colored", eye:"올리브·다크브라운", eyeEn:"Olive green / Dark brown",
    bestTones:["d","dp","sf"],
    palette:["#C17A3E","#8B5E3C","#CC6633","#556B2F","#A0785A","#8B7355","#B8860B","#6B4226"],
    paletteNames:["카멜","다크브라운","테라코타","올리브","코퍼","카키","골든로드","초콜릿"],
    paletteNamesEn:["Camel","Dark Brown","Terracotta","Olive","Copper","Khaki","Goldenrod","Chocolate"],
    keywords:["성숙한","자연스러운","풍부한","따뜻한","깊은"],
    keywordsEn:["Mature","Natural","Rich","Warm","Deep"],
  },
  {
    id:"winter", name:"겨울 쿨", nameEn:"Winter Cool", icon:"❄️",
    bg:"linear-gradient(135deg,#EEF2F8,#C8D5E8,#8898B8)",
    primary:"#1A3055", dark:"#060E1C",
    undertone:"쿨", undertoneEn:"Cool", undertoneColor:"#2A5090",
    tone:"비비드·딥", toneEn:"Vivid & Deep", brightness:"어두움", brightnessEn:"Deep", contrast:"높음", contrastEn:"High",
    skin:"블루빛·올리브 베이지", skinEn:"Porcelain cool / Olive-beige", hair:"다크브라운·블랙", hairEn:"Dark brown / Thick black", eye:"짙은 갈색·블랙", eyeEn:"Dark brown / Black",
    bestTones:["v","dp","b"],
    palette:["#1C1C1C","#F5F5F5","#722F37","#1B3A6B","#1B5E4B","#4B0082","#DC143C","#00CED1"],
    paletteNames:["블랙","화이트","버건디","로열블루","에메랄드","인디고","크림슨","틸"],
    paletteNamesEn:["Black","White","Burgundy","Royal Blue","Emerald","Indigo","Crimson","Teal"],
    keywords:["세련된","선명한","강렬한","모던한","대담한"],
    keywordsEn:["Sophisticated","Vivid","Intense","Modern","Bold"],
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
  .gnav{display:flex;align-items:center;justify-content:space-between;height:64px;padding:0 32px;position:sticky;top:0;background:rgba(253,248,242,0.88);backdrop-filter:blur(12px);z-index:100;border-bottom:1px solid var(--border);}
  .glogo{font-family:var(--fd);font-size:19px;font-weight:600;color:var(--dark);letter-spacing:.04em;}
  .glogo span{color:var(--rg);font-style:italic;}
  .glogo-img{height:48px;width:auto;object-fit:contain;display:block;}
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
    .gnav{height:52px;padding:0 16px;}
    .glogo-img{height:38px;}
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
function PCCSHueCircle({ lang = "ko" }: { lang?: "ko" | "en" }){
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
      <text x={cx} y={cy+26} textAnchor="middle" fontSize="9" fill="#C4956A" fontWeight="500">{lang === "ko" ? "24색상환" : "24 Hue Circle"}</text>

      <text x={polar(cx,cy,OR+18,0).x} y={polar(cx,cy,OR+18,0).y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#C4603A" fontWeight="600">{lang === "ko" ? "웜톤" : "Warm"}</text>
      <text x={polar(cx,cy,OR+18,180).x} y={polar(cx,cy,OR+18,180).y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#3A60C4" fontWeight="600">{lang === "ko" ? "쿨톤" : "Cool"}</text>

      {hover!==null&&(
        <g>
          <rect x={cx-55} y={cy+IR+8} width={110} height={32} rx={8} fill="rgba(30,20,10,0.82)"/>
          <text x={cx} y={cy+IR+21} textAnchor="middle" fontSize="9" fill="white" fontWeight="600">{PCCS_HUES[hover].n}:{PCCS_HUES[hover].name}</text>
          <text x={cx} y={cy+IR+32} textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.75)">{lang === "ko" ? PCCS_HUES[hover].label : PCCS_HUES[hover].labelEn}</text>
        </g>
      )}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────
// PCCS TONE MAP SVG
// ─────────────────────────────────────────────────────────
function PCCSToneMap({ lang = "ko" }: { lang?: "ko" | "en" }){
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

        <text x={W/2} y={H-8} textAnchor="middle" fontSize="11" fill="#7A6052" fontWeight="500">{lang === "ko" ? "채도 (Saturation) →" : "Saturation (S) →"}</text>
        <text x={12} y={H/2} textAnchor="middle" fontSize="11" fill="#7A6052" fontWeight="500" transform={`rotate(-90,12,${H/2})`}>{lang === "ko" ? "명도 (Lightness) ↑" : "Lightness (L) ↑"}</text>

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
                {lang === "ko"
                  ? (t.name.includes("\n") ? t.name.split("\n")[0] : t.name)
                  : (t.nameEn.includes("\n") ? t.nameEn.split("\n")[0] : t.nameEn)
                }
              </text>
              {hover===i&&(
                <g>
                  <rect x={x-45} y={y-r-28} width={90} height={22} rx={6} fill="rgba(30,20,10,0.82)"/>
                  <text x={x} y={y-r-18} textAnchor="middle" fontSize="8.5" fill="white" fontWeight="600">
                    {lang === "ko" ? t.name.replace("\n"," ") : t.nameEn.replace("\n"," ")}
                  </text>
                  <text x={x} y={y-r-10} textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.75)">
                    {lang === "ko" ? `명:${t.l} 채:${t.s}` : `L:${t.l} S:${t.s}`}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        <text x={tx(80)} y={ty(85)} textAnchor="middle" fontSize="9" fill="rgba(200,100,50,0.55)" fontWeight="600">{lang === "ko" ? "고명도·고채도" : "Vivid & Light"}</text>
        <text x={tx(12)} y={ty(50)} textAnchor="middle" fontSize="9" fill="rgba(122,96,82,0.45)" fontWeight="600">{lang === "ko" ? "중성·저채도" : "Muted & Gray"}</text>
        <text x={tx(72)} y={ty(18)} textAnchor="middle" fontSize="9" fill="rgba(80,40,20,0.45)" fontWeight="600">{lang === "ko" ? "저명도·고채도" : "Dark & Intense"}</text>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// SEASON QUADRANT SVG
// ─────────────────────────────────────────────────────────
function SeasonQuadrant({ lang = "ko" }: { lang?: "ko" | "en" }){
  const SZ=320,cx=SZ/2,cy=SZ/2;
  const seasons=[
    {name: lang === "ko" ? "봄 웜 🌸" : "Spring Warm 🌸",x:cx+60,y:cy-60,bg:"#FFE8D6",color:"#C4603A",sub: lang === "ko" ? "밝음·웜" : "Bright & Warm"},
    {name: lang === "ko" ? "여름 쿨 🌊" : "Summer Cool 🌊",x:cx-60,y:cy-60,bg:"#E4ECF8",color:"#3A60C4",sub: lang === "ko" ? "밝음·쿨" : "Bright & Cool"},
    {name: lang === "ko" ? "가을 웜 🍂" : "Autumn Warm 🍂",x:cx+60,y:cy+60,bg:"#F0D5B0",color:"#8B4520",sub: lang === "ko" ? "어두움·웜" : "Deep & Warm"},
    {name: lang === "ko" ? "겨울 쿨 ❄️" : "Winter Cool ❄️",x:cx-60,y:cy+60,bg:"#C8D5E8",color:"#1A3055",sub: lang === "ko" ? "어두움·쿨" : "Deep & Cool"},
  ];
  return(
    <svg viewBox={`0 0 ${SZ} ${SZ}`} width="100%" style={{maxWidth:320,display:"block"}}>
      <rect x={cx} y={0} width={cx} height={cy} fill="rgba(255,232,210,0.35)"/>
      <rect x={0} y={0} width={cx} height={cy} fill="rgba(224,234,248,0.35)"/>
      <rect x={cx} y={cy} width={cx} height={cy} fill="rgba(240,213,176,0.35)"/>
      <rect x={0} y={cy} width={cx} height={cy} fill="rgba(200,213,232,0.35)"/>

      <line x1={cx} y1={8} x2={cx} y2={SZ-8} stroke="rgba(196,149,106,0.4)" strokeWidth="1.5" strokeDasharray="5 3"/>
      <line x1={8} y1={cy} x2={SZ-8} y2={cy} stroke="rgba(196,149,106,0.4)" strokeWidth="1.5" strokeDasharray="5 3"/>

      <text x={cx} y={16} textAnchor="middle" fontSize="10" fill="#7A6052" fontWeight="600">{lang === "ko" ? "밝음 (Light)" : "Light"}</text>
      <text x={cx} y={SZ-5} textAnchor="middle" fontSize="10" fill="#7A6052" fontWeight="600">{lang === "ko" ? "어두움 (Deep)" : "Deep"}</text>
      <text x={8} y={cy-6} textAnchor="middle" fontSize="10" fill="#3A60C4" fontWeight="600" transform={`rotate(-90,8,${cy})`}>{lang === "ko" ? "← 쿨" : "← Cool"}</text>
      <text x={SZ-8} y={cy-6} textAnchor="middle" fontSize="10" fill="#C4603A" fontWeight="600" transform={`rotate(90,${SZ-8},${cy})`}>{lang === "ko" ? "← 웜" : "← Warm"}</text>

      <circle cx={cx} cy={cy} r={4} fill="rgba(196,149,106,0.5)"/>

      {seasons.map((s,i)=>(
        <g key={i}>
          <circle cx={s.x} cy={s.y} r={44} fill={s.bg} stroke="rgba(255,255,255,0.8)" strokeWidth="2"
            style={{filter:"drop-shadow(0 3px 8px rgba(0,0,0,0.1))"}}/>
          <text x={s.x} y={s.y-7} textAnchor="middle" fontSize="11" fontWeight="700" fill={s.color}>
            {lang === "ko" ? s.name.split(" ").slice(0, 2).join(" ") : s.name.split(" ").slice(0, 2).join(" ")}
          </text>
          <text x={s.x} y={s.y+6} textAnchor="middle" fontSize="14">
            {s.name.split(" ")[2]}
          </text>
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
  lang: "ko" | "en";
}

function SeasonCard({s, lang}: SeasonCardProps){
  return(
    <div className="sc-card">
      <div className="sc-header" style={{background:s.bg,color:s.dark}}>
        <div className="sc-icon">{s.icon}</div>
        <div className="sc-name">{lang === "ko" ? s.name : s.nameEn}</div>
        <div className="sc-en">{s.nameEn}</div>
        <span className="sc-keyword" style={{color:s.primary}}>
          {lang === "ko"
            ? `${s.tone} 톤 · ${s.brightness}`
            : `${s.toneEn} Tone · ${s.brightnessEn}`}
        </span>
      </div>
      <div className="sc-body">
        <div className="sc-row">
          <span className="sc-row-lbl">{lang === "ko" ? "피부" : "Skin"}</span>
          <span className="sc-row-val">{lang === "ko" ? s.skin : s.skinEn}</span>
        </div>
        <div className="sc-row">
          <span className="sc-row-lbl">{lang === "ko" ? "모발" : "Hair"}</span>
          <span className="sc-row-val">{lang === "ko" ? s.hair : s.hairEn}</span>
        </div>
        <div className="sc-row">
          <span className="sc-row-lbl">{lang === "ko" ? "눈동자" : "Eyes"}</span>
          <span className="sc-row-val">{lang === "ko" ? s.eye : s.eyeEn}</span>
        </div>

        <div className="sc-row">
          <span className="sc-row-lbl">{lang === "ko" ? "언더톤" : "Undertone"}</span>
          <span className="sc-tc" style={{background:`${s.undertoneColor}22`,color:s.undertoneColor,padding:"3px 10px",borderRadius:"100px",fontSize:11,fontWeight:600}}>
            {lang === "ko"
              ? `${s.undertone}톤 (Yellow/Golden)`
              : `${s.undertoneEn} (${s.undertoneEn==="Warm"?"Yellow/Golden":"Pink/Blue"})`}
          </span>
        </div>

        <div className="sc-row">
          <span className="sc-row-lbl">{lang === "ko" ? "추천 톤" : "Best Keys"}</span>
          <div className="sc-tone-chips">
            {s.bestTones.map(t=>(
              <span key={t} className="sc-tc" style={{background:TONE_COLORS[t]||"#eee",color:"rgba(30,20,10,0.8)",border:"1px solid rgba(0,0,0,0.07)"}}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div style={{fontSize:11,color:"var(--sub)",marginBottom:8,fontWeight:600,letterSpacing:"0.03em"}}>
          {lang === "ko" ? "🎨대표 컬러 프리뷰" : "🎨 Representative Swatches"}
        </div>
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
            title={`${lang === "ko" ? s.paletteNames[i] : s.paletteNamesEn[i]}: ${c}`}
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
                {lang === "ko" ? s.paletteNames[i] : s.paletteNamesEn[i]}
              </span>
            </div>
          ))}
        </div>

        <div className="sc-tags">
          {lang === "ko"
            ? s.keywords.map(k=><span key={k} className="sc-tag">{k}</span>)
            : s.keywordsEn.map(k=><span key={k} className="sc-tag">{k}</span>)
          }
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// MAIN GUIDE PAGE
// ─────────────────────────────────────────────────────────
interface PersonalColorGuideProps {
  onBack: () => void;
  lang?: "ko" | "en";
  setLang?: (lang: "ko" | "en") => void;
}

export default function PersonalColorGuide({ onBack, lang = "ko", setLang }: PersonalColorGuideProps){
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

  // Bilingual translation resource
  const T = {
    back: lang === "ko" ? "← 테스트 하기" : "← Try the Test",
    guideHeader: lang === "ko" ? "가이드" : "Guide",
    heroTitle: lang === "ko" ? <>퍼스널 컬러<br/><span>완전 가이드</span></> : <>Personal Color<br/><span>Complete Guide</span></>,
    heroSub: lang === "ko"
      ? "PCCS 색채 이론부터 4계절 퍼스널 컬러까지, 나에게 어울리는 색을 찾는 모든 것을 담았습니다."
      : "From standard PCCS color theories to modern 4-season assessments—explore all you need to unlock your customized color palette.",
    introLabel: "Introduction",
    introTitle: lang === "ko" ? "퍼스널 컬러란?" : "What is Personal Color?",
    introDesc: lang === "ko"
      ? "퍼스널 컬러(Personal Color)는 개인의 피부·눈동자·모발 색상과 조화를 이루는 색채 팔레트를 말합니다. 1970년대 미국에서 시작되어 일본을 거쳐 한국에 대중화된 색채 이론으로, 올바른 퍼스널 컬러를 활용하면 피부가 밝고 생기있어 보이며 전반적인 인상이 개선됩니다."
      : "Personal Color is a tailored color styling framework designed to harmonize with your biological skin tones, eyes, and hair color. Originating in the US during the 1970s and fully popularized across East Asia, selecting harmonious personal colors helps clarify blemishes, illuminate your complexion, and refine your overall presence.",
    // Intro Grid Items
    introGrid: [
      {
        ic: "🎨",
        t: lang === "ko" ? "색채 조화" : "Color Harmony",
        d: lang === "ko"
          ? "피부 고유의 색조(언더톤)와 가장 잘 어울리는 색상을 찾아 조화를 이루는 것이 핵심입니다. 잘못된 색상은 피부가 칙칙해 보이게 할 수 있습니다."
          : "Centering around colors that elevate and smooth out your natural undertone. Mismatched color sets can result in a tired, muddy, or pale skin tone."
      },
      {
        ic: "✨",
        t: lang === "ko" ? "언더톤" : "Skin Undertones",
        d: lang === "ko"
          ? "피부 표면 아래에 흐르는 색의 흐름을 언더톤이라 합니다. 크게 웜톤(황금빛·복숭아빛)과 쿨톤(핑크빛·파란빛)으로 나뉩니다."
          : "The primary base coloration glowing beneath the skin's surface. Broadly cataloged into Warm (yellow/peachy) and Cool (pink/blueish-rosy)."
      },
      {
        ic: "🌈",
        t: lang === "ko" ? "4계절 분류" : "The 4 Seasons",
        d: lang === "ko"
          ? "봄·여름·가을·겨울 4가지 타입으로 분류합니다. 웜/쿨 언더톤과 명도(밝기) 조합으로 결정되며, 각 타입마다 어울리는 색이 다릅니다."
          : "Categorized into Spring, Summer, Autumn, and Winter. Determined by combining color warmth/coolness with structural lightness and saturation metrics."
      },
      {
        ic: "👗",
        t: lang === "ko" ? "패션·메이크업" : "Wardrobe & Makeup",
        d: lang === "ko"
          ? "퍼스널 컬러는 의상, 메이크업, 헤어 컬러 선택의 기준이 됩니다. 나에게 맞는 색상으로 코디하면 자연스럽고 세련된 룩을 완성할 수 있습니다."
          : "Forms an optimal benchmark for picking styling tones, hair dyes, lipsticks, and jewelry. Secures a seamless, highly cohesive personal style."
      },
      {
        ic: "💡",
        t: lang === "ko" ? "왜 중요한가" : "Why Matters First",
        d: lang === "ko"
          ? "같은 색도 사람에 따라 다르게 보입니다. 피부 언더톤과 맞는 색은 얼굴을 환하게 하고, 맞지 않는 색은 피부가 노랗거나 창백해 보일 수 있습니다."
          : "Identical colors reflect uniquely on every skin underlay. True-match hues instantly brighten dark zones, while faulty choices enhance puffiness or pale tints."
      },
      {
        ic: "🔬",
        t: lang === "ko" ? "과학적 근거" : "Color Science Basis",
        d: lang === "ko"
          ? "PCCS, Munsell 등 색채 이론을 기반으로 합니다. 색의 웜/쿨 온도, 명도, 채도가 피부 반사광과 어떻게 상호작용하는지를 분석한 이론입니다."
          : "Grounded in established color science modules such as PCCS and Munsell, analyzing how temperature, tint, and chroma interact with physical reflection wavelengths."
      }
    ],
    // Undertone
    utLabel: "Undertone",
    utTitle: lang === "ko" ? "웜톤 vs 쿨톤" : "Warm Tone vs Cool Tone",
    utDesc: lang === "ko"
      ? "언더톤은 피부 표면 아래 흐르는 색조입니다. 빛 아래서 피부가 어떤 색으로 반사되느냐로 결정됩니다. 메이크업이나 조명의 영향을 받지 않는 자연 상태에서 관찰하는 것이 중요합니다."
      : "An undertone is the color temperature flowing beneath your skin surface, unaffected by surface blemishes or tanning. It is best evaluated under direct, unshaded natural daylight.",
    utWarmTitle: lang === "ko" ? "🌅 웜톤 (Warm Tone)" : "🌅 Warm Tone",
    utWarmSub: "Yellow · Golden · Peachy Undertone",
    utWarmFeatures: lang === "ko"
      ? ["피부에 황금빛·복숭아빛·노랑빛이 감돔","햇빛 아래서 피부가 골드·허니빛으로 빛남","볼에 복숭아빛·산호빛 혈색","손목 혈관이 녹색·올리브빛으로 보임","태닝 시 골드빛으로 그을림"]
      : ["Skin displays golden, peach, or soft yellow undercurrents", "Sunlight brings out a rich honey/amber-colored sheen", "Cheeks have a warm coral, peach, or orange-ish flush", "Wrist veins lean green or olive under typical natural light", "Tanning leads to a smooth golden bronze instead of burning"],
    utWarmMetals: lang === "ko" ? ["💛 골드", "🟡 옐로우골드", "🟤 브론즈"] : ["💛 Yellow Gold", "🟡 Soft Gold", "🟤 Bronze"],
    utCoolTitle: lang === "ko" ? "🌙 쿨톤 (Cool Tone)" : "🌙 Cool Tone",
    utCoolSub: "Pink · Blue · Rosy Undertone",
    utCoolFeatures: lang === "ko"
      ? ["피부에 핑크빛·로즈빛·파란빛이 감돔","형광등 아래서 피부가 포슬린·로즈빛으로 보임","볼에 핑크빛·장밋빛 혈색","손목 혈관이 파란빛·보라빛으로 보임","태닝 시 붉게 타거나 잘 안 그을림"]
      : ["Skin carries pinkish, cool rosy, or blueish shades", "Indoor bulbs/fluorescents accentuate clean, cool rose lights", "Cheeks show a crisp rosy pink or strawberry red blush", "Wrist veins show visible dark blue, purple, or indigo lines", "Sun exposure causes quick sunburns rather than bronzing"],
    utCoolMetals: lang === "ko" ? ["⚪ 실버", "🔘 화이트골드", "⬜ 플래티넘"] : ["⚪ Sterling Silver", "🔘 White Gold", "⬜ Platinum"],
    // Vein Test Section
    veinTitle: lang === "ko" ? "✋ 혈관 색상으로 확인하는 셀프 진단" : "✋ Wrist Veins Quick Evaluation",
    veinItems: [
      {
        t: lang === "ko" ? "녹색·올리브빛" : "Green / Olive",
        c: "linear-gradient(135deg,#3CB371,#6B8E23)",
        d: lang === "ko"
          ? "웜톤 가능성이 높습니다. 황금빛 베이스가 녹색으로 반사됩니다."
          : "Golden skin tones filter blue light to make wrist veins appear green or olive-hued.",
        type: lang === "ko" ? "웜톤 🌅" : "Warm Tone 🌅"
      },
      {
        t: lang === "ko" ? "파란빛·보라빛" : "Blue / Purple",
        c: "linear-gradient(135deg,#4169E1,#8A2BE2)",
        d: lang === "ko"
          ? "쿨톤 가능성이 높습니다. 차가운 핑크 베이스가 파란빛으로 보입니다."
          : "Pink skin undertones project light directly, making veins look dark blue or violet.",
        type: lang === "ko" ? "쿨톤 🌙" : "Cool Tone 🌙"
      },
      {
        t: lang === "ko" ? "혼합·판단 어려움" : "Mixed / Blended",
        c: "linear-gradient(135deg,#708090,#9B8EA8)",
        d: lang === "ko"
          ? "뉴트럴 톤일 수 있습니다. 웜과 쿨의 중간 특성을 가집니다."
          : "Often suggests Neutral Tones, pulling off coordinates from both ends cleanly.",
        type: lang === "ko" ? "뉴트럴 ⚖️" : "Neutral ⚖️"
      }
    ],
    veinHeader: lang === "ko" ? "혈관 색상:" : "Vein Color:",

    // PCCS Group
    pccsTitle: lang === "ko" ? "PCCS 색채 시스템" : "PCCS Color System",
    pccsDesc: lang === "ko"
      ? "PCCS(Practical Color Co-ordinate System)는 일본색연구소가 1964년 개발한 색채 체계입니다. 색상(Hue), 명도(Lightness), 채도(Saturation)의 3속성을 기반으로, 특히 '톤(Tone)' 개념을 도입해 패션과 퍼스널 컬러 진단에 널리 활용됩니다."
      : "PCCS (Practical Color Co-ordinate System) was formulated by the Japan Color Research Institute in 1964. By clustering Hue and combined Saturation/Lightness metrics, it creates visual grids that assist designers, stylists, and makeup artists.",
    pccsHueTitle: lang === "ko" ? "PCCS 24색상환 (Hue Circle)" : "PCCS 24 Hue Circle",
    pccsItems: [
      {
        t: lang === "ko" ? "색상환 구성" : "Hue Wheel Layout",
        d: lang === "ko"
          ? "PCCS는 색상을 24등분하여 번호(1~24)와 기호(R, Y, G, B, P 등)로 표기합니다. 빨강(2:R)을 기준으로 시계 방향으로 주황, 노랑, 녹색, 파랑, 보라 순으로 배열됩니다."
          : "Divided into 24 hues mapped with coordinates (1 to 24) and codes (R, Y, G, B, P). Pivots from pure Red (2:R) clockwise through orange, yellow, green, blue, and violet."
      },
      {
        t: lang === "ko" ? "웜/쿨 구분" : "Warm vs Cool Segments",
        d: lang === "ko"
          ? "빨강~노랑~주황계열(1~9번)은 웜톤 색상으로 따뜻하고 에너지 있는 느낌을 줍니다. 파랑~보라~청록(13~21번)은 쿨톤 색상으로 차갑고 시원한 느낌을 줍니다."
          : "Hues 1 through 9 (Red, Orange, Yellow) represent Warm tones with cozy energy. Hues 13 through 21 (Greenish Blue, Blue, Violet) project crisp, refreshing Cool waves.",
        hasTags: true
      },
      {
        t: lang === "ko" ? "퍼스널 컬러에서의 활용" : "Application in Styling",
        d: lang === "ko"
          ? "봄·가을 웜톤은 색상환의 웜 영역(빨강·주황·노랑·황록) 색상이 잘 어울립니다. 여름·겨울 쿨톤은 쿨 영역(파랑·보라·핑크·청록) 색상을 권장합니다."
          : "Warm Spring & Autumn profiles lean on the warm hues. Cool Summer & Winter profiles pop elegantly against the icy cool boundaries."
      },
      {
        t: lang === "ko" ? "보색과 유사색" : "Complements & Analogs",
        d: lang === "ko"
          ? "색상환에서 반대편에 위치한 색이 보색입니다. 퍼스널 컬러에서는 유사색(인접 색상) 코디가 자연스럽고, 보색은 포인트 컬러로 활용합니다."
          : "Opposing colors are complementary. Personal styling uses neighboring analogous colors for smooth outfits, saving complements for high-contrast accents."
      }
    ],
    warmRange: lang === "ko" ? "웜 1~9번" : "Warm #1~9",
    coolRange: lang === "ko" ? "쿨 13~21번" : "Cool #13~21",

    // Tone Map Group
    toneMapHeader: lang === "ko" ? "PCCS 톤 맵 (Tone Map)" : "PCCS Tone Map",
    toneMapDesc: lang === "ko"
      ? "톤(Tone)은 명도(밝기)와 채도(선명도)의 조합으로 결정됩니다. PCCS는 12가지 유채색 톤과 무채색 계열(흰색·회색·검정)을 정의합니다. 아래 맵에서 각 톤의 위치를 확인하세요."
      : "Tone coordinates are determined by standard Lightness and Saturation pairings. PCCS catalogs 12 colorful keys alongside basic Neutrals (white, grays, black) to help map precise visual weights.",
    toneSeasonHeader: lang === "ko" ? "톤별 추천 계절 타입" : "Key Guidelines by Tone",
    toneSeasonHeaders: lang === "ko"
      ? ["톤", "명도", "🌸봄", "🌊여름", "🍂가을"]
      : ["Tone", "Lightness", "🌸Spring", "🌊Summer", "🍂Autumn"],
    toneSeasonNote: lang === "ko"
      ? "* 겨울 타입은 비비드(v), 딥(dp), 브라이트(b) 톤과 블랙·화이트 무채색 계열이 특히 잘 어울립니다."
      : "* Winter types are uniquely enhanced by Vivid (v), Deep (dp), and Bright (b) keys, as well as high-contrast neutrals (Black, White).",

    // 4 Seasons
    seasonsTitle: lang === "ko" ? "4계절 퍼스널 컬러" : "The 4 Seasons",
    seasonsDesc: lang === "ko"
      ? "웜/쿨 언더톤과 밝음/어두움(명도)의 조합으로 4가지 계절 타입이 결정됩니다. 각 타입의 특징과 어울리는 PCCS 톤을 확인하세요."
      : "Combining undertone temperature (Warm/Cool) with depth profiles (Light/Deep) establishes the 4 iconic season categories. View their details below.",

    // Stylist Tips
    tipsTitle: lang === "ko" ? "퍼스널 컬러 진단 팁" : "Self-Diagnosis Styling Tips",
    tipsDesc: lang === "ko"
      ? "정확한 퍼스널 컬러 진단을 위한 전문가 조언입니다. 진단 전 아래 항목을 확인해두세요."
      : "Expert advice from certified, state-licensed colorists to secure premium, reliable self-test readings.",
    tipsList: [
      {
        t: lang === "ko" ? "자연광에서 확인하기" : "Acknowledge Natural Daylight",
        d: lang === "ko"
          ? "형광등이나 백열등은 피부 색조를 왜곡합니다. 낮에 창문 옆 자연광 아래서 진단하면 가장 정확합니다. 직사광선보다 간접 자연광이 이상적입니다."
          : "Yellowish and harsh fluorescent tubes bend original color rays. Complete your evaluations in bright, indirect light near a window to prevent visual skewing."
      },
      {
        t: lang === "ko" ? "메이크업 없는 상태에서" : "Fresh, bareface Canvas",
        d: lang === "ko"
          ? "파운데이션, 블러셔 등 색조 메이크업은 피부 본래 색을 가립니다. 메이크업을 지운 상태에서 진단해야 언더톤을 정확히 파악할 수 있습니다."
          : "Foundations, concealers, and lip stains mask baseline biological values. Cleanse makeup completely to uncover original rosy blue or golden beige layers."
      },
      {
        t: lang === "ko" ? "드레이핑 테스트" : "Use Drape Swatches",
        d: lang === "ko"
          ? "흰 천, 크림색 천, 회색 천 등 다양한 색의 천을 얼굴 아래 대어보세요. 피부가 가장 밝고 생기있어 보이는 색상이 퍼스널 컬러와 가깝습니다."
          : "Test with white, cream, or heather gray fabrics right beneath your neck. Notice which swatch illuminates skin texture and neutralizes shadows under your eyes."
      },
      {
        t: lang === "ko" ? "금속 액세서리 테스트" : "Gold vs Silver Test",
        d: lang === "ko"
          ? "금색(골드)과 은색(실버) 액세서리를 각각 착용해보세요. 피부가 더 환하고 잘 어울리는 금속이 힌트가 됩니다. 골드→웜톤, 실버→쿨톤."
          : "Place polished gold and silver jewelry near your skin. If yellow gold adds a warm glow, you skew Warm; if sterling silver makes your skin pop, you lean Cool."
      },
      {
        t: lang === "ko" ? "화이트 vs 아이보리" : "White vs Ivory Swatches",
        d: lang === "ko"
          ? "순백(화이트)과 아이보리 흰색 중 어느 것이 피부에 더 잘 맞는지 확인하세요. 화이트가 잘 맞으면 쿨톤, 아이보리·크림이 더 어울리면 웜톤일 가능성이 높습니다."
          : "Pick whether pure stark white or warm ivory/cream blends best. Cool types radiate in flat white; Warm types appear robust in cozy ivory colors."
      },
      {
        t: lang === "ko" ? "전문가 진단 vs AI 분석" : "AI Scanner vs Certified Stylist",
        d: lang === "ko"
          ? "전문 퍼스널 컬러리스트는 드레이핑, 색 반사 테스트 등 다양한 방법으로 진단합니다. AI·사진 기반 분석은 보조 도구로 활용하고 최종적으로는 전문가 상담을 권장합니다."
          : "While machine-vision algorithms offer highly practical entry guides, consult licensed, board-certified colorists for definitive, official audits."
      },
      {
        t: lang === "ko" ? "서브타입도 확인하기" : "Check Your Subtypes",
        d: lang === "ko"
          ? "4계절 타입 안에서도 서브타입이 있습니다. 봄이라면 '라이트 스프링', '웜 스프링', '비비드 스프링' 등으로 세분화되어 더 정밀한 색 선택이 가능합니다."
          : "Seasons divide further into sub-categories (e.g. Light Spring, Deep Autumn, Bright Winter) to optimize hue precision."
      },
      {
        t: lang === "ko" ? "컬러 팔레트 활용하기" : "Utilize Palettes Wisely",
        d: lang === "ko"
          ? "진단 후에는 퍼스널 컬러 팔레트 카드를 만들어 쇼핑이나 코디 시 활용하세요. 어울리는 색과 피해야 할 색을 한눈에 비교하면 실용적입니다."
          : "Keep verified color wheel cards saved on your phone. Checking hues during shopping instantly cuts out clashing clothes."
      }
    ],

    // CTA
    ctaTitle: lang === "ko" ? "이제 나의 컬러를 찾아볼 시간" : "Uncover Your Genuine Palette",
    ctaSub: lang === "ko"
      ? "이론을 충분히 익혔다면 직접 사진으로 분석해보세요. InSelf Color의 색상 분석 알고리즘이 당신의 퍼스널 컬러를 찾아드립니다."
      : "Acquired the basic framework? Upload your photo now. InSelf Color's custom analytical engine will calculate your custom color matching code.",
    ctaBtn: lang === "ko" ? "퍼스널 컬러 테스트 시작" : "Start Personal Color Test",
    topBtn: lang === "ko" ? "맨 위로 이동" : "Scroll to Top"
  };

  const NAV_ITEMS = [
    {id:"intro", label: lang === "ko" ? "퍼스널컬러란" : "Introduction"},
    {id:"undertone", label: lang === "ko" ? "웜·쿨 언더톤" : "Warm vs Cool"},
    {id:"pccs", label: lang === "ko" ? "PCCS 색채" : "PCCS System"},
    {id:"seasons", label: lang === "ko" ? "4계절 타입" : "Seasons"},
    {id:"tips", label: lang === "ko" ? "진단 팁" : "Stylist Tips"},
  ];

  return(
    <div className="gw">
      <FontLoader/>
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav className="gnav">
        <div className="glogo" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }} onClick={onBack}>
          <img 
            src="/images/seasons/logo.png" 
            alt="InSelf Color" 
            className="glogo-img"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const f = document.getElementById("g-logo-fallback");
              if (f) f.style.display = "inline";
            }}
          />
          <span id="g-logo-fallback" style={{ display: "none" }}>InSelf<span>Color</span></span>
          <span style={{fontSize:14,fontWeight:300,color:"var(--sub)",fontStyle:"normal",marginLeft:"4px"}}>{T.guideHeader}</span>
        </div>

        {/* Language selector & menu tabs */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }} className="gnav-controls-container">
          <div className="gnav-links" style={{ alignItems: "center" }}>
            {NAV_ITEMS.map(n=>(
              <button key={n.id} type="button" className={`gnl${activeNav===n.id?" active":""}`} onClick={()=>scrollTo(n.id)}>{n.label}</button>
            ))}

            <div style={{
              display: "inline-flex",
              background: "rgba(196,149,106,0.08)",
              padding: "3px",
              borderRadius: "100px",
              border: "1px solid rgba(196,149,106,0.18)",
              alignItems: "center"
            }}>
              <button
                onClick={() => setLang?.("ko")}
                style={{
                  background: lang === "ko" ? "linear-gradient(135deg,#C4956A,#E8AA80)" : "transparent",
                  color: lang === "ko" ? "#fff" : "var(--sub)",
                  border: "none",
                  borderRadius: "100px",
                  padding: "4px 10px",
                  fontSize: "11px",
                  fontWeight: lang === "ko" ? "700" : "400",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                KO
              </button>
              <button
                onClick={() => setLang?.("en")}
                style={{
                  background: lang === "en" ? "linear-gradient(135deg,#C4956A,#E8AA80)" : "transparent",
                  color: lang === "en" ? "#fff" : "var(--sub)",
                  border: "none",
                  borderRadius: "100px",
                  padding: "4px 10px",
                  fontSize: "11px",
                  fontWeight: lang === "en" ? "700" : "400",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              className="gnl"
              style={{background:"linear-gradient(135deg,#C4956A,#E8AA80)",color:"#fff",border:"none"}}
              onClick={onBack}
            >
              {T.back}
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="ghero">
        <div className="gh-orb gh-o1"/><div className="gh-orb gh-o2"/>
        <div className="gh-badge">✦ Personal Color Guide</div>
        <h1 className="gh-title">{T.heroTitle}</h1>
        <p className="gh-sub">{T.heroSub}</p>
        <div className="gh-scroll">
          {NAV_ITEMS.map(n=>(
            <button key={n.id} type="button" className="gh-sc" onClick={()=>scrollTo(n.id)}>{n.label}</button>
          ))}
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="gsec" ref={setRef("intro")}>
        <div className="sec-label">{T.introLabel}</div>
        <h2 className="sec-title">{T.introTitle}</h2>
        <div className="sec-divider"/>
        <p className="sec-desc">{T.introDesc}</p>
        <div className="intro-grid">
          {T.introGrid.map(({ic,t,d})=>(
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
        <div className="sec-label">{T.utLabel}</div>
        <h2 className="sec-title">{T.utTitle}</h2>
        <div className="sec-divider"/>
        <p className="sec-desc">{T.utDesc}</p>

        <div className="ut-wrap">
          {/* WARM */}
          <div className="ut-card ut-warm">
            <div className="ut-label warm">{T.utWarmTitle}</div>
            <div className="ut-sub" style={{color:"#C4603A"}}>{T.utWarmSub}</div>
            <ul className="ut-features">
              {T.utWarmFeatures.map(f=>(
                <li key={f} className="ut-feature"><span className="ut-dot" style={{background:"#E8905A"}}/>{f}</li>
              ))}
            </ul>
            <div className="ut-metals">
              {T.utWarmMetals.map(m => (
                <span key={m} className="ut-metal" style={{background:"#DAA520",color:"#fff"}}>{m}</span>
              ))}
            </div>
            <div className="ut-swatches">
              {["#FF9E7C","#FFA07A","#FFD700","#F4A460","#CC6633","#DAA520"].map(c=>(
                <div key={c} className="ut-sw" style={{background:c}}/>
              ))}
            </div>
          </div>
          {/* COOL */}
          <div className="ut-card ut-cool">
            <div className="ut-label cool">{T.utCoolTitle}</div>
            <div className="ut-sub" style={{color:"#3A60C4"}}>{T.utCoolSub}</div>
            <ul className="ut-features">
              {T.utCoolFeatures.map(f=>(
                <li key={f} className="ut-feature"><span className="ut-dot" style={{background:"#5A82BF"}}/>{f}</li>
              ))}
            </ul>
            <div className="ut-metals">
              {T.utCoolMetals.map(m => (
                <span key={m} className="ut-metal" style={{background:"#C0C0C0",color:"#555"}}>{m}</span>
              ))}
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
          <div style={{fontSize:13,fontWeight:600,color:"var(--dark)",marginBottom:12}}>{T.veinTitle}</div>
          <div className="vein-box">
            {T.veinItems.map(v=>(
              <div key={v.t} className="vein-item">
                <div className="vein-title">{v.type}</div>
                <div className="vein-color" style={{background:v.c}}/>
                <div style={{fontSize:12,fontWeight:600,color:"var(--dark)",marginBottom:4}}>{T.veinHeader} {v.t}</div>
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
        <h2 className="sec-title">{T.pccsTitle}</h2>
        <div className="sec-divider"/>
        <p className="sec-desc">{T.pccsDesc}</p>

        {/* Hue Circle */}
        <div style={{marginTop:36}}>
          <div style={{fontSize:13,fontWeight:600,color:"var(--dark)",marginBottom:20,display:"flex",alignItems:"center",gap:8}}>
            <span style={{width:4,height:18,background:"var(--rg)",borderRadius:2,display:"inline-block"}}/>
            {T.pccsHueTitle}
          </div>
          <div className="pccs-wrap">
            <div className="pccs-svg-wrap">
              <PCCSHueCircle lang={lang} />
            </div>
            <div className="pccs-desc">
              {T.pccsItems.map(item => (
                <div key={item.t} className="pccs-item">
                  <div className="pccs-item-title">{item.t}</div>
                  <div className="pccs-item-desc">{item.d}</div>
                  {item.hasTags && (
                    <div className="pccs-warm-cool">
                      <span className="pccs-tag ptag-w">{T.warmRange}</span>
                      <span className="pccs-tag ptag-c">{T.coolRange}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tone Map */}
        <div className="tone-wrap">
          <div style={{fontSize:13,fontWeight:600,color:"var(--dark)",marginBottom:20,display:"flex",alignItems:"center",gap:8}}>
            <span style={{width:4,height:18,background:"var(--rg)",borderRadius:2,display:"inline-block"}}/>
            {T.toneMapHeader}
          </div>
          <p style={{fontSize:12,color:"var(--sub)",lineHeight:1.75,marginBottom:20}}>
            {T.toneMapDesc}
          </p>
          <PCCSToneMap lang={lang} />

          {/* Legend */}
          <div className="tone-legend">
            {PCCS_TONES.map(t=>(
              <div key={t.key} className="tl-item">
                <div className="tl-dot" style={{background:t.bg,border:`2px solid ${t.border||"rgba(255,255,255,0.5)"}`}}/>
                <div className="tl-info">
                  <div className="tl-abbr">
                    {t.abbr} — {lang === "ko" ? t.name.replace("\n","") : t.nameEn.replace("\n","")}
                  </div>
                  <div className="tl-name">
                    {lang === "ko" ? `명:${t.l} 채:${t.s}` : `L:${t.l} S:${t.s}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tone-Season table */}
        <div style={{marginTop:36}}>
          <div style={{fontSize:13,fontWeight:600,color:"var(--dark)",marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
            <span style={{width:4,height:18,background:"var(--rg)",borderRadius:2,display:"inline-block"}}/>
            {T.toneSeasonHeader}
          </div>
          <div className="tone-season">
            <div className="ts-head">
              {T.toneSeasonHeaders.map(h => <span key={h}>{h}</span>)}
            </div>
            {TONE_SEASON_MAP.map((r,i)=>(
              <div key={i} className="ts-row">
                <span className="ts-tone">{lang === "ko" ? r.tone : r.toneEn}</span>
                <span style={{fontSize:11,color:"var(--sub)"}}>{lang === "ko" ? r.brightness : r.brightnessEn}</span>
                <span>{r.sp&&<span className="ts-chip ts-sp">{lang === "ko" ? "봄" : "Spring"}</span>}</span>
                <span>{r.su&&<span className="ts-chip ts-su">{lang === "ko" ? "여름" : "Summer"}</span>}</span>
                <span>{r.au&&<span className="ts-chip ts-au">{lang === "ko" ? "가을" : "Autumn"}</span>}</span>
              </div>
            ))}
          </div>
          <p style={{fontSize:11,color:"var(--sub)",marginTop:10,lineHeight:1.65}}>
            {T.toneSeasonNote}
          </p>
        </div>
      </section>

      <div className="g-sep"/>

      {/* ── 4 SEASONS ── */}
      <section className="gsec" ref={setRef("seasons")}>
        <div className="sec-label">4 Season Types</div>
        <h2 className="sec-title">{T.seasonsTitle}</h2>
        <div className="sec-divider"/>
        <p className="sec-desc">{T.seasonsDesc}</p>

        {/* Quadrant */}
        <div className="sq-wrap">
          <SeasonQuadrant lang={lang} />
        </div>

        {/* Season Cards */}
        <div className="sc-grid">
          {GUIDE_SEASONS.map(s=><SeasonCard key={s.id} s={s} lang={lang} />)}
        </div>
      </section>

      <div className="g-sep"/>

      {/* ── TIPS ── */}
      <section className="gsec-sm" ref={setRef("tips")}>
        <div className="sec-label">Diagnosis Tips</div>
        <h2 className="sec-title">{T.tipsTitle}</h2>
        <div className="sec-divider"/>
        <p className="sec-desc">{T.tipsDesc}</p>
        <div className="tips-grid">
          {T.tipsList.map((tip,i)=>(
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
        <h2 className="cta-title">{T.ctaTitle}</h2>
        <p className="cta-sub">{T.ctaSub}</p>
        <button type="button" className="cta-btn" onClick={onBack}>
          <span>{T.ctaBtn}</span><span>→</span>
        </button>
      </section>

      <button
        type="button"
        className={`totop${showTop ? " visible" : ""}`}
        onClick={scrollToTop}
        title={T.topBtn}
        aria-label={T.topBtn}
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
  toneEn: string;
  brightness: string;
  brightnessEn: string;
  sp: boolean;
  su: boolean;
  au: boolean;
  wi: boolean;
}

const TONE_SEASON_MAP: ToneSeasonRow[] = [
  {tone:"v (비비드)",  toneEn:"v (Vivid)",  brightness:"중간", brightnessEn:"Medium", sp:true,  su:false,au:false,wi:true},
  {tone:"b (브라이트)", toneEn:"b (Bright)", brightness:"높음", brightnessEn:"High", sp:true,  su:false,au:false,wi:false},
  {tone:"s (스트롱)",  toneEn:"s (Strong)",  brightness:"중간", brightnessEn:"Medium", sp:false, su:false,au:true, wi:true},
  {tone:"dp (딥)",     toneEn:"dp (Deep)",     brightness:"낮음", brightnessEn:"Low", sp:false, su:false,au:true, wi:true},
  {tone:"lt (라이트)", toneEn:"lt (Light)", brightness:"높음", brightnessEn:"High", sp:true,  su:true, au:false,wi:false},
  {tone:"sf (소프트)", toneEn:"sf (Soft)", brightness:"중간", brightnessEn:"Medium", sp:false, su:true, au:true, wi:false},
  {tone:"d (덜)",      toneEn:"d (Dull)",      brightness:"낮음", brightnessEn:"Low", sp:false, su:false,au:true, wi:false},
  {tone:"dk (다크)",   toneEn:"dk (Dark)",   brightness:"낮음", brightnessEn:"Low", sp:false, su:false,au:true, wi:true},
  {tone:"p (페일)",    toneEn:"p (Pale)",    brightness:"최고", brightnessEn:"Highest", sp:true,  su:true, au:false,wi:false},
  {tone:"ltg (라이트그레이시)", toneEn:"ltg (Lt. Grayish)", brightness:"높음", brightnessEn:"High", sp:false,su:true,au:false,wi:false},
  {tone:"g (그레이시)", toneEn:"g (Grayish)", brightness:"중간", brightnessEn:"Medium", sp:false, su:true, au:false,wi:false},
  {tone:"dkg (다크그레이시)", toneEn:"dkg (Dk. Grayish)", brightness:"낮음", brightnessEn:"Low", sp:false,su:false,au:false,wi:true},
];
