import { useState, useRef, useCallback, useEffect } from "react";

// ═══════════════════════════════════════════════════════════
// SEASON DATA
// ═══════════════════════════════════════════════════════════
const SEASONS: Record<string, any> = {
  spring: {
    id:"spring",name:"봄 웜 타입",nameEn:"Spring Warm",icon:"🌸",
    keyword:"밝고 화사한",subtypes:["라이트 스프링","웜 스프링","비비드 스프링"],
    heroBg:"linear-gradient(160deg,#FFF5EE 0%,#FFE8D6 45%,#FFBCA9 100%)",
    primary:"#D96A3A",textOnBg:"#4A1E0A",
    description:"피부에 밝고 투명한 황금빛 베이스가 깔려 있으며, 복숭아빛·산호빛 혈색이 자연스럽게 나타납니다. 생기 있고 화사한 인상을 줍니다.",
    characteristics:["맑고 투명한 피부톤","황금빛·복숭아빛 베이스","밝고 선명한 눈동자","골든·애쉬브라운 모발"],
    palette:[{hex:"#FF9E7C",name:"코랄"},{hex:"#FFA07A",name:"살몬"},{hex:"#FFD700",name:"골드"},{hex:"#FFDAB9",name:"피치"},{hex:"#F4A460",name:"카멜"},{hex:"#ADDFAD",name:"민트"}],
    recommended:["코랄","살몬","피치","아이보리","카멜","골드","애플그린","터콰이즈"],
    avoid:["와인레드","다크네이비","블랙","딥퍼플","차콜그레이"],
    tip:"밝고 따뜻한 색상으로 활기찬 분위기를 연출하세요. 채도가 너무 낮거나 어두운 색은 피하고, 맑고 생기 있는 색이 잘 어울립니다.",
    makeup:{foundation:"밝은 피치베이지·아이보리 계열",blush:"코랄, 살몬핑크",lip:"코랄레드, 피치핑크, 오렌지레드",eye:"골드브라운, 카퍼, 테라코타",liner:"브라운, 카퍼",dots:["#FF9E7C","#FFB347","#FFA07A","#CD853F"]},
    fashion:{style:"화사한 스프링 내추럴 룩",items:["플로럴 원피스","아이보리 니트","코랄 블라우스","카멜 트렌치코트"],fabrics:["시폰","면","린넨","니트"],avoid:["블랙 모노톤","무채색 전체 착장"]},
    celebs:["아이유","수지","임수정"],
    scoreColor:"#FF9E7C",gradStops:["#FFE8D6","#FFBCA9"],
  },
  summer: {
    id:"summer",name:"여름 쿨 타입",nameEn:"Summer Cool",icon:"🌊",
    keyword:"부드럽고 우아한",subtypes:["라이트 서머","소프트 서머","뮤트 서머"],
    heroBg:"linear-gradient(160deg,#F5F8FF 0%,#E4ECF8 45%,#C0CFEA 100%)",
    primary:"#5274A8",textOnBg:"#0D1F3C",
    description:"피부에 핑크빛·로즈빛이 감도는 차가운 베이스를 가집니다. 뮤트되고 부드러운 쿨톤 파스텔이 잘 어울리며, 우아하고 로맨틱한 인상을 줍니다.",
    characteristics:["핑크빛·로즈빛 피부 베이스","부드러운 쿨톤 혈색","회색빛이 감도는 눈동자","애쉬·블루그레이 모발"],
    palette:[{hex:"#B0C4DE",name:"스틸블루"},{hex:"#C8A2C8",name:"라일락"},{hex:"#F4C2C2",name:"파스텔핑크"},{hex:"#99C5C4",name:"소프트민트"},{hex:"#9FA8DA",name:"페리윙클"},{hex:"#D8C4D8",name:"연보라"}],
    recommended:["라벤더","소프트로즈","스모키블루","파우더핑크","민트그레이","스카이블루"],
    avoid:["오렌지","골드","카멜","올리브그린","브릭레드"],
    tip:"그레이쉬하고 뮤트된 쿨톤 색상이 피부를 돋보이게 합니다. 너무 선명하거나 채도 높은 색보다 부드럽게 가라앉은 톤이 가장 잘 어울려요.",
    makeup:{foundation:"핑크베이지·뉴트럴 계열",blush:"로즈핑크, 소프트핑크",lip:"로즈, 모브, 소프트레드, 베이비핑크",eye:"그레이, 라벤더, 소프트퍼플",liner:"다크브라운, 네이비, 그레이",dots:["#C8A2C8","#B0C4DE","#F4C2C2","#9FA8DA"]},
    fashion:{style:"로맨틱 소프트 서머 룩",items:["라벤더 블라우스","소프트핑크 카디건","스모키블루 팬츠","모브 롱스커트"],fabrics:["시폰","새틴","벨벳","울 블렌드"],avoid:["오렌지·골드 계열 전체 착장","강렬한 원색 코디"]},
    celebs:["태연","문가영","박신혜"],
    scoreColor:"#8FA8D4",gradStops:["#E8EEF8","#C0CFEA"],
  },
  autumn: {
    id:"autumn",name:"가을 웜 타입",nameEn:"Autumn Warm",icon:"🍂",
    keyword:"깊고 풍부한",subtypes:["소프트 어텀","웜 어텀","딥 어텀"],
    heroBg:"linear-gradient(160deg,#FFF5E8 0%,#F0D5B0 45%,#D4936A 100%)",
    primary:"#8B4520",textOnBg:"#2A1408",
    description:"황금빛·구리빛의 깊고 따뜻한 피부 베이스를 가집니다. 어스톤과 뮤트된 웜컬러가 특히 잘 어울리며, 자연스럽고 성숙한 인상을 줍니다.",
    characteristics:["황금빛·구리빛 피부 베이스","주근깨가 있는 경우 많음","올리브·갈색 눈동자","어두운 갈색·구리빛 모발"],
    palette:[{hex:"#C17A3E",name:"카멜"},{hex:"#8B5E3C",name:"다크브라운"},{hex:"#CC6633",name:"테라코타"},{hex:"#556B2F",name:"올리브그린"},{hex:"#A0785A",name:"코퍼"},{hex:"#8B7355",name:"카키"}],
    recommended:["테라코타","번트오렌지","올리브그린","카멜","카키","머스타드","초콜릿브라운"],
    avoid:["브라이트핑크","라벤더","네온컬러","실버","아이시블루"],
    tip:"깊이 있는 어스톤과 자연에서 가져온 따뜻한 색이 최고로 잘 어울립니다. 채도를 낮추고 깊이 있는 색감으로 고급스러운 분위기를 완성하세요.",
    makeup:{foundation:"워뮤 베이지·골든 베이지",blush:"테라코타, 브릭, 피치브라운",lip:"테라코타, 브릭레드, 넛브라운, 머스타드",eye:"올리브, 카키브라운, 카퍼, 골드",liner:"다크브라운, 카키, 초콜릿",dots:["#CC6633","#8B5E3C","#556B2F","#A0785A"]},
    fashion:{style:"내추럴 어스 어텀 룩",items:["카멜 코트","올리브 재킷","테라코타 니트","초콜릿 팬츠"],fabrics:["트위드","울","코듀로이","가죽"],avoid:["형광·네온 계열","차가운 파스텔 단독 착장"]},
    celebs:["한가인","전지현","이나영"],
    scoreColor:"#C17A3E",gradStops:["#D4936A","#9A5A25"],
  },
  winter: {
    id:"winter",name:"겨울 쿨 타입",nameEn:"Winter Cool",icon:"❄️",
    keyword:"선명하고 대담한",subtypes:["딥 윈터","쿨 윈터","브라이트 윈터"],
    heroBg:"linear-gradient(160deg,#EEF2F8 0%,#C8D5E8 45%,#8898B8 100%)",
    primary:"#1A3055",textOnBg:"#0A1828",
    description:"블루빛·올리브빛의 차갑고 선명한 피부 베이스를 가집니다. 강한 대비와 선명한 색상이 잘 어울리며, 세련되고 모던한 도시적 인상을 줍니다.",
    characteristics:["블루빛·올리브빛 피부 베이스","선명하고 강한 이목구비","짙은 눈동자·강한 명도 대비","다크브라운·블랙 모발"],
    palette:[{hex:"#1C1C1C",name:"블랙"},{hex:"#F5F5F5",name:"화이트"},{hex:"#722F37",name:"버건디"},{hex:"#1B3A6B",name:"로열블루"},{hex:"#1B5E4B",name:"에메ラル드"},{hex:"#4B0082",name:"인디고"}],
    recommended:["블랙","화이트","버건디","로열블루","에메ラル드","핫핑크","아이시핑크"],
    avoid:["베이지","카멜","오렌지","피치","코랄","카키브라운"],
    tip:"강한 명도 대비와 선명한 쿨톤 색상으로 임팩트를 주세요. 블랙&화이트 조합이나 보석 톤의 선명한 색상이 세련된 매력을 극대화합니다.",
    makeup:{foundation:"뉴트럴·쿨핑크베이지",blush:"차가운 핑크, 버건디로즈",lip:"버건디, redundancy, 핫핑크, 체리",eye:"블랙, 딥그레이, 딥네이비, 스모키",liner:"블랙, 딥네이비",dots:["#722F37","#1B3A6B","#4B0082","#1C1C1C"]},
    fashion:{style:"모던 미니멀 윈터 룩",items:["블랙 수트","화이트 셔츠","버건디 코트","로열블루 블라우스"],fabrics:["캐시미어","실크","울","가죽"],avoid:["따뜻한 베이지·카멜 전체 착장","뮤트한 어스톤 코디"]},
    celebs:["김태희","고현정","송혜교"],
    scoreColor:"#4A6484",gradStops:["#253545","#1A2A38"],
  },
};

const FAQ_DATA = [
  {
    q: "퍼스널 컬러 테스트가 정확한가요?",
    a: `본 진단은 카메라로 촬영된 사진에서 피부 영역을 스스로 감지하여 정밀한 RGB 색상 스펙트럼, 웜/쿨 언더톤(골드-옐로우와 블루-핑크 베이스의 비율), 그리고 전체 밝기(명도)와 채도를 수학적 알고리즘으로 분석하는 시스템입니다.

물론 오프라인에서 직접 다양한 실물 천(드레이프)을 대지 않는 이상 완전한 물리적 드레이핑과 100% 동일할 순 없지만, 디지털 분석 기법을 통해 객관적인 수치적 데이터 측면에서는 매우 높은 정확도와 일관적인 결과를 제공합니다.

더욱 정확한 결과를 얻기 위해서는 인공적인 노란 조명이나 붉은 조명 아래가 아닌, 왜곡이 없는 '자연광(창가 근처)'에서 촬영하거나 올바른 화이트 밸런스가 조절되어 눈으로 보는 실제 피부 톤과 비슷하게 표현된 사진을 활용하시는 것이 핵심입니다.

💡 참고 사항: 본 테스트는 픽셀 기반 알고리즘을 통한 자가 진단 서비스로, 촬영 환경(조명, 카메라 기종)에 따라 결과가 달라질 수 있습니다. 오프라인 전문가의 정밀 진단과는 차이가 있을 수 있으니 스타일링 스타일 팁을 얻는 즐거운 참고용(재미용)으로 활용해 주세요.`
  },
  {
    q: "어떤 사진을 업로드해야 하나요?",
    a: `최상의 분석 결과를 얻기 위해 아래 세 가지 조건을 충족하는 사진을 준비해 주세요:

1. ☀️ 밝고 부드러운 자연광: 색 온도에 왜곡을 주는 노란 백열등이나 밤 시간대 형광등 대신, 낮 시간대 창문을 통해 들어오는 간접 자연광 아래에서 촬영한 사진이 좋습니다. 플래시나 직사광선은 흐릿한 그림자나 번들거림을 만들어 오차가 생길 수 있습니다.
2. 🚫 노 필터 & 보정 최소화: 보정 앱의 모공 스무딩, 피부 화이트닝 헤일로 필터 등은 임의로 노란기나 붉은기를 왜곡하여 분석할 수 있습니다. 보정 필터가 들어가지 않은 기본 카메라 원본 사진을 권장합니다.
3. 👤 정면 얼굴과 메이크업 상태: 색조 메이크업이나 두꺼운 파운데이션은 피부 본연의 색조를 가리므로, 가급적 선크림까지만 바른 민낯 상태에서 이마와 얼굴 전체 윤곽이 또렷하게 드러나는 정면 사진이 가장 정밀하게 분석됩니다.`
  },
  {
    q: "사진은 어떻게 처리되나요?",
    a: `개인 정보와 프라이버시는 저희 서비스의 가장 중요한 가치입니다. InSelf Color는 업로드하신 소중한 얼굴 사진을 절대로 외부 서버에 전송하거나 저장하지 않습니다.

모든 색상 좌표 픽셀 추출, 이미지 처리, 통계 매칭 분석 알고리즘은 사용자의 웹 브라우저(로컬 디바이스) 내부 메모리 상에서만 즉시 계산되고 폐기됩니다. 테스트 창을 닫거나 새로고침을 누르시면 업로드했던 사진 데이터는 물리적으로 완전히 흔적 없이 소멸되므로, 어떠한 유출 걱정도 없이 안심하고 테스트를 진행하셔도 좋습니다.`
  },
  {
    q: "퍼스널 컬러는 평생 바뀌지 않나요?",
    a: `우리가 타고나는 선천적인 유전적 신체 색상(퍼스널 컬러의 핵심인 언더톤)은 나이가 들거나 계절이 바뀌어도 평생 동안 기본 뼈대는 잘 바뀌지 않는 것이 일반적입니다.

다만, 후천적인 환경 변화나 신체 변화에 따라 표현되는 명도와 채도, 그리고 어울리는 스타일 범위(서브 타입)는 유연하게 달라질 수 있습니다.

• 노화 및 건강 상태: 나이가 들면서 피부 속 멜라닌과 헤모글로빈 수치가 변해 피부의 윤기가 감소하거나 톤의 투명도가 살짝 낮아질 수 있습니다.
• 태닝 및 자외선 노출: 오랜 야외 활동으로 피부가 검게 그을려 기본 피부톤이 낮아지면 어울리는 명도 조절 범위가 확장되어 이전보다 비비드한 컬러가 더 좋게 매치될 수 있습니다.
• 헤어/스타일링 연출: 머리 염색 색상, 컬러 렌즈, 메이크업 등의 대비 변화에 따라 베스트 룩의 폭이 조금씩 이동하며 어울리는 연출법이 서브 톤 영역으로 유동적으로 조화를 이룰 수 있습니다.`
  },
];

// ═══════════════════════════════════════════════════════════
// ALGORITHM
// ═══════════════════════════════════════════════════════════
function isSkinTone(r: number, g: number, b: number){
  const br=(r+g+b)/3;
  if(br<35||br>238)return false;
  if(r<=g||r<=b)return false;
  if(Math.max(r,g,b)-Math.min(r,g,b)<10)return false;
  if(r<80||g<30||b<15)return false;
  if(r-b<10)return false;
  return true;
}
function rgbToHsl(r: number, g: number, b: number){
  r/=255;g/=255;b/=255;
  const mx=Math.max(r,g,b),mn=Math.min(r,g,b);
  let h=0,s=0,l=(mx+mn)/2;
  if(mx!==mn){
    const d=mx-mn;
    s=l>0.5?d/(2-mx-mn):d/(mx+mn);
    switch(mx){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;default:h=((r-g)/d+4)/6;}
  }
  return{h:h*360,s,l};
}
function analyzePersonalColor(imgEl: HTMLImageElement){
  try{
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get 2d canvas context");
    const MAX=400;
    let w=imgEl.naturalWidth||imgEl.width||300;
    let h=imgEl.naturalHeight||imgEl.height||300;
    const sc=Math.min(MAX/w,MAX/h,1);
    w=Math.max(1,Math.floor(w*sc));h=Math.max(1,Math.floor(h*sc));
    canvas.width=w;canvas.height=h;
    ctx.drawImage(imgEl,0,0,w,h);
    const x1=Math.floor(w*0.15),y1=Math.floor(h*0.08),x2=Math.floor(w*0.85),y2=Math.floor(h*0.88);
    const data=ctx.getImageData(x1,y1,Math.max(1,x2-x1),Math.max(1,y2-y1));
    const px=data.data;
    let skin: [number, number, number][] = [];
    for(let i=0;i<px.length;i+=4)if(isSkinTone(px[i],px[i+1],px[i+2]))skin.push([px[i],px[i+1],px[i+2]]);
    if(skin.length<80){
      skin=[];
      for(let i=0;i<px.length;i+=4){const br=(px[i]+px[i+1]+px[i+2])/3;if(br>40&&br<220)skin.push([px[i],px[i+1],px[i+2]]);}
    }
    if(skin.length===0)throw new Error("no pixels");
    const n=skin.length;
    const avgR=skin.reduce((s,p)=>s+p[0],0)/n;
    const avgG=skin.reduce((s,p)=>s+p[1],0)/n;
    const avgB=skin.reduce((s,p)=>s+p[2],0)/n;
    const{l:light}=rgbToHsl(avgR,avgG,avgB);
    const warmth=(avgR-avgB)/Math.max(avgR,1);
    const yellow=(avgG-avgB)/Math.max(avgG,1);
    const warmScore=warmth*0.65+yellow*0.35;
    const brightness=light;
    const WARM_TH=0.16,LIGHT_TH=0.52;
    const isWarm=warmScore>=WARM_TH,isLight=brightness>=LIGHT_TH;
    let season: string;
    if(isWarm&&isLight)season="spring";
    else if(!isWarm&&isLight)season="summer";
    else if(isWarm&&!isLight)season="autumn";
    else season="winter";
    const raw: Record<string, number> = {
      spring:Math.max(0.1,warmScore*60+(brightness-0.30)*50),
      summer:Math.max(0.1,(0.35-warmScore)*45+(brightness-0.30)*50+10),
      autumn:Math.max(0.1,warmScore*60+(0.75-brightness)*50),
      winter:Math.max(0.1,(0.35-warmScore)*45+(0.75-brightness)*50+10),
    };
    // Ensure winner has highest raw score
    const maxRaw=Math.max(...Object.values(raw));
    if(raw[season]<maxRaw)raw[season]=maxRaw+0.01;
    const total=Object.values(raw).reduce((a,b)=>a+b,0);
    const scores: Record<string, number> = {};
    Object.keys(raw).forEach(k=>{scores[k]=Math.max(5,Math.round(raw[k]/total*100));});
    // Fix rounding to exactly 100
    const diff=100-Object.values(scores).reduce((a,b)=>a+b,0);
    scores[season]=Math.max(5,scores[season]+diff);
    return{season,scores,skinCount:n,warmScore,brightness};
  }catch(e){
    return{season:"spring",scores:{spring:40,summer:27,autumn:21,winter:12},skinCount:0,error:true};
  }
}

// Download result card
function downloadResultCard(season: any, scores: Record<string, number>){
  const W=600,H=880,dpr=2;
  const c=document.createElement("canvas");
  c.width=W*dpr;c.height=H*dpr;
  const ctx=c.getContext("2d");
  if (!ctx) return;
  ctx.scale(dpr,dpr);
  // BG
  const bg=ctx.createLinearGradient(0,0,W,H);
  bg.addColorStop(0,"#FDF8F2");bg.addColorStop(1,"#F5EBE0");
  ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
  // Top band
  const band=ctx.createLinearGradient(0,0,W,200);
  band.addColorStop(0,season.gradStops[0]);band.addColorStop(1,season.gradStops[1]);
  ctx.fillStyle=band;
  ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(W,0);ctx.lineTo(W,170);
  ctx.bezierCurveTo(W,210,0,210,0,170);ctx.closePath();ctx.fill();
  // Logo
  ctx.fillStyle="rgba(255,255,255,0.88)";ctx.font="bold 15px serif";ctx.textAlign="left";
  ctx.fillText("✦ InSelf Color",36,34);
  // Season
  ctx.textAlign="center";
  ctx.fillStyle="rgba(255,255,255,0.7)";ctx.font="12px sans-serif";
  ctx.fillText("PERSONAL COLOR RESULT",W/2,62);
  ctx.fillStyle="#fff";ctx.font="bold 30px serif";
  ctx.fillText(`${season.icon}  ${season.name}`,W/2,108);
  ctx.font="italic 14px serif";ctx.fillStyle="rgba(255,255,255,0.82)";
  ctx.fillText(`"${season.keyword}"`,W/2,136);
  // Palette
  const sw=season.palette;const py=250;
  sw.forEach(({hex}: any, i: number)=>{
    const x=W/2+(i-(sw.length-1)/2)*66;
    ctx.beginPath();ctx.arc(x,py,24,0,Math.PI*2);
    ctx.fillStyle=hex;ctx.shadowColor="rgba(0,0,0,0.1)";ctx.shadowBlur=8;ctx.fill();ctx.shadowBlur=0;
    ctx.fillStyle="rgba(60,35,20,0.6)";ctx.font="9px sans-serif";ctx.textAlign="center";
    ctx.fillText(season.palette[i].name,x,py+36);
  });
  // Divider
  ctx.strokeStyle="rgba(196,149,106,0.22)";ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(60,308);ctx.lineTo(W-60,308);ctx.stroke();
  // Scores
  ctx.textAlign="left";
  const order=["spring","summer","autumn","winter"];
  order.forEach((key,i)=>{
    const y=330+i*60;const s=SEASONS[key];
    ctx.fillStyle="rgba(60,35,20,0.72)";ctx.font="12px sans-serif";
    ctx.fillText(`${s.icon} ${s.name}`,60,y);
    ctx.fillStyle="rgba(196,149,106,0.14)";
    ctx.fillRect(60,y+10,W-120,9);
    ctx.fillStyle=s.scoreColor;
    ctx.fillRect(60,y+10,(W-120)*scores[key]/100,9);
    ctx.fillStyle="rgba(60,35,20,0.55)";ctx.font="bold 11px sans-serif";ctx.textAlign="right";
    ctx.fillText(`${scores[key]}%`,W-60,y);ctx.textAlign="left";
  });
  // Recommended
  ctx.fillStyle="rgba(196,149,106,0.85)";ctx.font="600 10px sans-serif";
  ctx.fillText("BEST COLORS",60,600);
  season.recommended.slice(0,5).forEach((r: string, i: number)=>{
    const tx=60+i*105,ty=614;
    ctx.fillStyle="rgba(196,149,106,0.10)";ctx.fillRect(tx,ty,94,24);
    ctx.strokeStyle="rgba(196,149,106,0.28)";ctx.lineWidth=1;ctx.strokeRect(tx,ty,94,24);
    ctx.fillStyle="rgba(100,60,30,0.82)";ctx.font="10px sans-serif";ctx.textAlign="center";
    ctx.fillText(r,tx+47,ty+16);
  });
  // Branding
  ctx.textAlign="center";ctx.fillStyle="rgba(180,140,100,0.45)";ctx.font="10px serif";
  ctx.fillText("InSelf Color  ·  나만의 컬러를 찾아보세요",W/2,H-28);
  const a=document.createElement("a");
  a.download=`personal-color-${season.id}.png`;a.href=c.toDataURL("image/png");a.click();
}

// Download detailed high-design result card for SNS Virality
function downloadDetailedResultCard(season: any, scores: Record<string, number>){
  const W=800,H=1500,dpr=2;
  const c=document.createElement("canvas");
  c.width=W*dpr;c.height=H*dpr;
  const ctx=c.getContext("2d");
  if (!ctx) return;
  ctx.scale(dpr,dpr);

  // Helper: Draw rounded rectangle
  const drawRoundRect = (x: number, y: number, w: number, h: number, r: number, fill?: string, stroke?: string) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  };

  // Helper: Wrap text for Korean/Chinese/Japanese characters
  const wrapText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    let line = "";
    let currentY = y;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const testLine = line + char;
      const testWidth = ctx.measureText(testLine).width;
      if (testWidth > maxWidth) {
        ctx.fillText(line, x, currentY);
        line = char;
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
    return currentY;
  };

  // 1. BG base gradient
  const bg = ctx.createLinearGradient(0,0,W,H);
  bg.addColorStop(0,"#FDF8F2");
  bg.addColorStop(1,"#F5EBE0");
  ctx.fillStyle = bg;
  ctx.fillRect(0,0,W,H);

  // 2. High Design Top wave band
  const band = ctx.createLinearGradient(0,0,W,0);
  band.addColorStop(0, season.gradStops[0]);
  band.addColorStop(1, season.gradStops[1]);
  ctx.fillStyle = band;
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(W,0);
  ctx.lineTo(W,210);
  ctx.bezierCurveTo(W, 260, 0, 260, 0, 210);
  ctx.closePath();
  ctx.fill();

  // 3. Logo & Top Headers
  ctx.fillStyle="rgba(255,255,255,0.9)";
  ctx.font="bold 16px serif"; 
  ctx.textAlign="left";
  ctx.fillText("✦ InSelf Color", 48, 38);

  ctx.textAlign="center";
  ctx.fillStyle="rgba(255,255,255,0.72)";
  ctx.font="bold 11px sans-serif";
  ctx.fillText("PERSONAL COLOR DIAGNOSTIC REPORT", W/2, 68);

  ctx.fillStyle="#fff";
  ctx.font="bold 35px serif";
  ctx.fillText(`${season.icon}  ${season.name}`, W/2, 114);

  ctx.font="italic 15px serif";
  ctx.fillStyle="rgba(255,255,255,0.85)";
  ctx.fillText(`"${season.keyword}"`, W/2, 144);

  // 4. Card 0: Bridge Description Card
  ctx.shadowColor = "rgba(62,40,20,0.06)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 4;
  drawRoundRect(48, 178, 704, 100, 16, "rgba(255,255,255,0.92)", "rgba(196,149,106,0.18)");
  ctx.shadowBlur = 0; // Turn off shadows

  ctx.fillStyle = "rgba(61,43,26,0.88)";
  ctx.font = "normal 13.5px sans-serif";
  ctx.textAlign = "center";
  wrapText(season.description, W/2, 212, 640, 21);

  // 5. Card 1: Scores Card
  ctx.shadowColor = "rgba(62,40,20,0.05)";
  ctx.shadowBlur = 10;
  drawRoundRect(48, 298, 704, 195, 16, "rgba(255,255,255,0.8)", "rgba(196,149,106,0.16)");
  ctx.shadowBlur = 0;

  // Score title
  ctx.fillStyle = "#C4956A";
  ctx.font = "bold 13px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("📊  타입별 매칭 스코어 (Diagnostic Scores)", 72, 332);

  // Soft divider
  ctx.strokeStyle = "rgba(196,149,106,0.14)";
  ctx.beginPath();
  ctx.moveTo(72, 344);
  ctx.lineTo(728, 344);
  ctx.stroke();

  // Draw 4 stacked season scores
  const order = ["spring","summer","autumn","winter"];
  order.forEach((key, i) => {
    const y = 362 + i * 30;
    const s = SEASONS[key];
    
    // Icon & Name
    ctx.fillStyle = "rgba(61,43,26,0.85)";
    ctx.font = "bold 11.5px sans-serif";
    ctx.fillText(`${s.icon}  ${s.name}`, 74, y + 10);

    // Progress bar BG
    ctx.fillStyle = "rgba(196,149,106,0.1)";
    ctx.fillRect(190, y + 3, 460, 8);

    // Progress bar fill
    ctx.fillStyle = s.scoreColor;
    ctx.fillRect(190, y + 3, 460 * (scores[key] || 5) / 100, 8);

    // Percentage text
    ctx.fillStyle = "rgba(61,43,26,0.7)";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(`${scores[key]}%`, 716, y + 10);
    ctx.textAlign = "left";
  });

  // 6. Card 2: Palette SWATCHES Card
  ctx.shadowColor = "rgba(62,40,20,0.05)";
  ctx.shadowBlur = 10;
  drawRoundRect(48, 513, 704, 150, 16, "rgba(255,255,255,0.8)", "rgba(196,149,106,0.16)");
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#C4956A";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText("🎨  추천 베스트 컬러 팔레트 (Best Color Palette)", 72, 547);

  ctx.beginPath();
  ctx.moveTo(72, 559);
  ctx.lineTo(728, 559);
  ctx.stroke();

  // Swatches (6 colors)
  const sw = season.palette;
  const startX = 48 + 352 - (sw.length - 1) * 98 / 2;
  const py = 599;
  sw.forEach(({hex, name}: any, i: number) => {
    const cx_sw = startX + i * 98;
    // Circle color
    ctx.beginPath();
    ctx.arc(cx_sw, py, 21, 0, Math.PI * 2);
    ctx.fillStyle = hex;
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.06)";
    ctx.stroke();

    // Swatch name
    ctx.fillStyle = "rgba(61,43,26,0.8)";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(name, cx_sw, py + 36);

    // Hex
    ctx.fillStyle = "rgba(61,43,26,0.45)";
    ctx.font = "9px sans-serif";
    ctx.fillText(hex, cx_sw, py + 48);
  });

  // 7. CARD Bento Grid Row 1 (Coordinates Y: 683, H: 360)
  const bentoH1 = 360;
  // Left Card: Makeup
  ctx.shadowColor = "rgba(62,40,20,0.05)";
  ctx.shadowBlur = 10;
  drawRoundRect(48, 683, 338, bentoH1, 16, "#fff", "rgba(196,149,106,0.16)");
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#C4956A";
  ctx.font = "bold 13px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("💄  퍼스널 메이크업 추천 가이드", 70, 717);

  ctx.strokeStyle = "rgba(196,149,106,0.14)";
  ctx.beginPath();
  ctx.moveTo(70, 729);
  ctx.lineTo(354, 729);
  ctx.stroke();

  const makeupKeys = [
    { label: "파운데이션", val: season.makeup.foundation },
    { label: "블러셔", val: season.makeup.blush },
    { label: "립스틱/틴트", val: season.makeup.lip },
    { label: "아이섀도", val: season.makeup.eye }
  ];

  makeupKeys.forEach((item, idx) => {
    const mY = 751 + idx * 56;
    ctx.fillStyle = "rgba(196,149,106,0.9)";
    ctx.font = "bold 10px sans-serif";
    ctx.fillText(item.label, 70, mY);

    ctx.fillStyle = "rgba(61,43,26,0.85)";
    ctx.font = "normal 11.5px sans-serif";
    wrapText(item.val, 70, mY + 18, 290, 16);
  });

  // Color chips dots
  ctx.fillStyle = "rgba(196,149,106,0.9)";
  ctx.font = "bold 10px sans-serif";
  ctx.fillText("추천 메이크업 감성 칩", 70, 990);

  const dots = season.makeup.dots;
  dots.forEach((dotColor: string, dotIdx: number) => {
    const dotX = 230 + dotIdx * 34;
    const dotY = 986;
    ctx.beginPath();
    ctx.arc(dotX, dotY, 11, 0, Math.PI * 2);
    ctx.fillStyle = dotColor;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.8)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  // Right Card: Fashion
  ctx.shadowColor = "rgba(62,40,20,0.05)";
  ctx.shadowBlur = 10;
  drawRoundRect(414, 683, 338, bentoH1, 16, "#fff", "rgba(196,149,106,0.16)");
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#C4956A";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText("👗  패션 스타일 가이드", 436, 717);

  ctx.strokeStyle = "rgba(196,149,106,0.14)";
  ctx.beginPath();
  ctx.moveTo(436, 729);
  ctx.lineTo(720, 729);
  ctx.stroke();

  ctx.fillStyle = season.primary;
  ctx.font = "bold 12.5px sans-serif";
  ctx.fillText(season.fashion.style, 436, 751);

  ctx.fillStyle = "rgba(61,43,26,0.6)";
  ctx.font = "bold 10.5px sans-serif";
  ctx.fillText("✅  추천 데일리 아이템", 436, 781);

  let tempX = 436;
  let tempY = 801;
  season.fashion.items.forEach((it: string) => {
    ctx.font = "normal 10.5px sans-serif";
    const itemW = ctx.measureText(it).width + 16;
    if (tempX + itemW > 720) {
      tempX = 436;
      tempY += 24;
    }
    drawRoundRect(tempX, tempY, itemW, 18, 9, "rgba(196,149,106,0.08)", "rgba(196,149,106,0.2)");
    ctx.fillStyle = "#C4956A";
    ctx.textAlign = "center";
    ctx.fillText(it, tempX + itemW/2, tempY + 12);
    ctx.textAlign = "left";
    tempX += itemW + 6;
  });

  ctx.fillStyle = "rgba(61,43,26,0.6)";
  ctx.font = "bold 10.5px sans-serif";
  ctx.fillText("🧵  찰떡 베스트 패브릭", 436, tempY + 38);

  tempX = 436;
  tempY += 56;
  season.fashion.fabrics.forEach((fb: string) => {
    ctx.font = "normal 10.5px sans-serif";
    const fabW = ctx.measureText(fb).width + 16;
    if (tempX + fabW > 720) {
      tempX = 436;
      tempY += 24;
    }
    drawRoundRect(tempX, tempY, fabW, 18, 9, "rgba(196,149,106,0.08)", "rgba(196,149,106,0.18)");
    ctx.fillStyle = "rgba(61,43,26,0.73)";
    ctx.textAlign = "center";
    ctx.fillText(fb, tempX + fabW/2, tempY + 12);
    ctx.textAlign = "left";
    tempX += fabW + 6;
  });

  ctx.fillStyle = "rgba(139,64,64,0.76)";
  ctx.font = "bold 10.5px sans-serif";
  ctx.fillText("❌  피해야 하는 스타일", 436, tempY + 38);

  tempX = 436;
  tempY += 56;
  season.fashion.avoid.forEach((av: string) => {
    ctx.font = "normal 10.5px sans-serif";
    const avoidW = ctx.measureText(av).width + 16;
    if (tempX + avoidW > 720) {
      tempX = 436;
      tempY += 24;
    }
    drawRoundRect(tempX, tempY, avoidW, 18, 9, "rgba(139,64,64,0.04)", "rgba(139,64,64,0.18)");
    ctx.fillStyle = "#8B4040";
    ctx.textAlign = "center";
    ctx.fillText(av, tempX + avoidW/2, tempY + 12);
    ctx.textAlign = "left";
    tempX += avoidW + 6;
  });

  // 8. CARD Bento Grid Row 2 (Coordinates Y: 1063, H: 260)
  const bentoH2 = 250;
  // Left: Styling Tips
  ctx.shadowColor = "rgba(62,40,20,0.05)";
  ctx.shadowBlur = 10;
  drawRoundRect(48, 1063, 338, bentoH2, 16, "#fff", "rgba(196,149,106,0.16)");
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#C4956A";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText("💡  스타일링 팁 어드바이스", 70, 1097);

  ctx.strokeStyle = "rgba(196,149,106,0.14)";
  ctx.beginPath();
  ctx.moveTo(70, 1109);
  ctx.lineTo(354, 1109);
  ctx.stroke();

  ctx.fillStyle = "rgba(61,43,26,0.85)";
  ctx.font = "normal 12px sans-serif";
  wrapText(season.tip, 70, 1137, 290, 21);

  // Right Card: Celebs
  ctx.shadowColor = "rgba(62,40,20,0.05)";
  ctx.shadowBlur = 10;
  drawRoundRect(414, 1063, 338, bentoH2, 16, "#fff", "rgba(196,149,106,0.16)");
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#C4956A";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText("⭐  같은 타입 유명인 메이트", 436, 1097);

  ctx.strokeStyle = "rgba(196,149,106,0.14)";
  ctx.beginPath();
  ctx.moveTo(436, 1109);
  ctx.lineTo(720, 1109);
  ctx.stroke();

  const celebs = season.celebs;
  celebs.forEach((clb: string, clbIdx: number) => {
    const clbY = 1127 + clbIdx * 38;
    drawRoundRect(436, clbY, 290, 28, 8, "rgba(196,149,106,0.05)", "rgba(196,149,106,0.12)");
    
    ctx.fillStyle = "#C4956A";
    ctx.font = "14px sans-serif";
    ctx.fillText("✦", 452, clbY + 18);

    ctx.fillStyle = "rgba(61,43,26,0.88)";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText(clb, 474, clbY + 18);

    ctx.fillStyle = "rgba(196,149,106,0.65)";
    ctx.font = "normal 10px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(`Wannabe 스타`, 712, clbY + 17);
    ctx.textAlign = "left";
  });

  // 9. COLOR ANALYSIS ACCENT WATERMARK/DIVIDER
  ctx.strokeStyle = "rgba(196,149,106,0.18)";
  ctx.beginPath();
  ctx.moveTo(120, 1370);
  ctx.lineTo(W - 120, 1370);
  ctx.stroke();

  // 10. Brand Footer
  ctx.textAlign="center";
  ctx.fillStyle="rgba(180,140,100,0.52)";
  ctx.font="bold 12px serif";
  ctx.fillText("InSelf Color   ·   나만의 감각 발굴", W/2, 1405);

  ctx.fillStyle="rgba(180,140,100,0.36)";
  ctx.font="9px sans-serif";
  ctx.fillText("Copyright © InSelf Color. All Rights Reserved. Scan and Share your color vibe.", W/2, 1422);

  // Trigger download
  const a=document.createElement("a");
  a.download=`personal-color-detailed-${season.id}.png`;
  a.href=c.toDataURL("image/png");
  a.click();
}

// ═══════════════════════════════════════════════════════════
// CSS
// ═══════════════════════════════════════════════════════════
const CSS=`
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root{
    --cream:#FDF8F2;--rg:#C4956A;--dark:#1E1410;--text:#3D2B1A;--sub:#7A6052;
    --border:rgba(196,149,106,0.20);--shadow:0 4px 28px rgba(62,40,20,0.09);
    --r:18px;--rl:26px;
    --fs:'Noto Serif KR',Georgia,serif;--fd:'Cormorant Garamond',Georgia,serif;
  }
  body{background:var(--cream);font-family:var(--fs);color:var(--text);}
  .w{min-height:100vh;background:var(--cream);position:relative;overflow-x:hidden;}
  .se{animation:si .55s cubic-bezier(0.16,1,0.3,1) both;}
  @keyframes si{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}

  /* NAV */
  .nav{display:flex;align-items:center;justify-content:space-between;padding:18px 32px;position:relative;z-index:10;}
  .logo{font-family:var(--fd);font-size:20px;font-weight:600;color:var(--dark);letter-spacing:.04em;}
  .logo span{color:var(--rg);font-style:italic;}
  .nav-tag{font-size:11px;color:var(--sub);letter-spacing:.1em;}

  /* ORBS */
  .orb{position:absolute;border-radius:50%;filter:blur(70px);pointer-events:none;}
  .o1{width:460px;height:460px;background:radial-gradient(circle,rgba(255,175,130,.3) 0%,transparent 70%);top:-100px;right:-110px;}
  .o2{width:340px;height:340px;background:radial-gradient(circle,rgba(196,149,106,.2) 0%,transparent 70%);bottom:-80px;left:-80px;}
  .o3{width:260px;height:260px;background:radial-gradient(circle,rgba(190,158,200,.17) 0%,transparent 70%);top:38%;left:-60px;}

  /* LANDING */
  .land{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 24px;position:relative;z-index:1;}
  .lbadge{display:inline-flex;align-items:center;gap:8px;background:rgba(196,149,106,.09);border:1px solid rgba(196,149,106,.26);border-radius:100px;padding:5px 18px;font-size:11px;letter-spacing:.17em;color:var(--rg);margin-bottom:26px;text-transform:uppercase;font-weight:500;}
  .ltitle{font-family:var(--fd);font-size:clamp(44px,8vw,90px);font-weight:300;line-height:1.08;text-align:center;color:var(--dark);letter-spacing:-.02em;margin-bottom:4px;}
  .ltitle span{display:block;font-size:clamp(24px,4.5vw,52px);font-weight:400;color:var(--rg);font-style:italic;}
  .lsub{font-size:clamp(13px,1.8vw,15px);color:var(--sub);text-align:center;margin-top:18px;line-height:1.85;max-width:430px;font-weight:300;}
  .ldiv{width:70px;height:1px;background:linear-gradient(90deg,transparent,var(--rg),transparent);margin:26px auto;}
  .chips{display:flex;gap:10px;margin-bottom:34px;flex-wrap:wrap;justify-content:center;}
  .chip{padding:7px 14px;border-radius:100px;font-size:12px;border:1px solid;transition:transform .2s,box-shadow .2s;}
  .chip:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,.07);}
  .csp{background:#FFF0E8;color:#C07050;border-color:#FFCBA4;}
  .csu{background:#EEF2FA;color:#6B8DBF;border-color:#C8D5EA;}
  .cau{background:#F5E6D3;color:#A06030;border-color:#D4936A;}
  .cwi{background:#E8EDF5;color:#2C3E50;border-color:#B0BFCC;}
  .btnst{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,#C4956A,#E8AA80);color:#fff;border:none;border-radius:100px;padding:16px 44px;font-size:15px;font-family:var(--fs);font-weight:500;cursor:pointer;box-shadow:0 8px 26px rgba(196,149,106,.3);transition:all .3s cubic-bezier(.34,1.56,.64,1);letter-spacing:.03em;position:relative;overflow:hidden;}
  .btnst::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,transparent,rgba(255,255,255,.16),transparent);transform:translateX(-100%);transition:transform .5s ease;}
  .btnst:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 14px 36px rgba(196,149,106,.4);}
  .btnst:hover::after{transform:translateX(100%);}
  .btnst:active{transform:scale(.98);}
  .lsteps{display:flex;gap:26px;margin-top:48px;flex-wrap:wrap;justify-content:center;}
  .si{text-align:center;width:108px;}
  .sic{width:52px;height:52px;background:rgba(196,149,106,.09);border:1px solid rgba(196,149,106,.2);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:21px;margin:0 auto 10px;}
  .sn{font-size:10px;color:var(--rg);letter-spacing:.12em;margin-bottom:4px;font-weight:500;}
  .st{font-size:11px;color:var(--sub);line-height:1.5;}

  /* FAQ */
  .faq{width:100%;max-width:540px;margin-top:48px;}
  .faqt{font-size:11px;color:var(--rg);letter-spacing:.16em;text-transform:uppercase;font-weight:500;margin-bottom:12px;text-align:center;}
  .fqi{border:1px solid var(--border);border-radius:13px;margin-bottom:7px;overflow:hidden;background:rgba(255,255,255,.48);}
  .fqq{display:flex;align-items:center;justify-content:space-between;padding:13px 16px;cursor:pointer;font-size:13px;color:var(--text);gap:10px;transition:background .2s;}
  .fqq:hover{background:rgba(196,149,106,.05);}
  .fqch{flex-shrink:0;transition:transform .28s;color:var(--rg);font-size:10px;}
  .fqch.open{transform:rotate(180deg);}
  .fqa{font-size:12px;color:var(--sub);line-height:1.72;padding:0 16px 13px;white-space:pre-wrap;}

  /* UPLOAD */
  .uppage{min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:34px 18px;position:relative;z-index:1;}
  .phdr{text-align:center;margin-bottom:30px;}
  .btnbk{display:inline-flex;align-items:center;gap:6px;background:none;border:1px solid var(--border);color:var(--sub);padding:7px 15px;border-radius:100px;font-size:12px;cursor:pointer;margin-bottom:22px;font-family:var(--fs);transition:all .2s;}
  .btnbk:hover{border-color:var(--rg);color:var(--rg);background:rgba(196,149,106,.05);}
  .ptitle{font-family:var(--fd);font-size:clamp(26px,5vw,48px);font-weight:400;color:var(--dark);margin-bottom:7px;}
  .pdesc{font-size:clamp(12px,1.7vw,14px);color:var(--sub);line-height:1.7;}
  .uarea{width:100%;max-width:520px;min-height:300px;border:2px dashed var(--border);border-radius:var(--rl);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0;transition:all .28s ease;background:rgba(255,255,255,.55);backdrop-filter:blur(8px);position:relative;overflow:hidden;}
  .uarea.drag{border-color:var(--rg);background:rgba(196,149,106,.04);transform:scale(1.008);}
  .uarea.hi{border-style:solid;border-color:rgba(196,149,106,.36);min-height:auto;}
  .ulabel{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;padding:42px 26px;cursor:pointer;min-height:300px;}
  .ulabel:hover{background:rgba(196,149,106,.03);}
  .uarea:not(.hi):hover{border-color:var(--rg);transform:scale(1.008);}
  .uchglabel{pointer-events:all;cursor:pointer;background:rgba(255,255,255,.88);backdrop-filter:blur(8px);border-radius:100px;padding:8px 17px;font-size:12px;font-family:var(--fs);color:var(--dark);transition:background .2s;display:inline-block;}
  .uchglabel:hover{background:#fff;}
  .uic{width:66px;height:66px;background:linear-gradient(135deg,#FFF0E8,#FFE4D4);border-radius:18px;display:flex;align-items:center;justify-content:center;font-size:27px;margin-bottom:16px;box-shadow:0 4px 14px rgba(196,149,106,.16);}
  .umain{font-size:16px;font-weight:500;color:var(--dark);margin-bottom:6px;}
  .usub{font-size:12px;color:var(--sub);margin-bottom:16px;text-align:center;line-height:1.6;}
  .btnf{display:inline-flex;align-items:center;gap:7px;background:rgba(196,149,106,.09);border:1px solid rgba(196,149,106,.3);color:var(--rg);border-radius:100px;padding:9px 20px;font-size:12px;font-family:var(--fs);cursor:pointer;transition:all .22s;}
  .btnf:hover{background:rgba(196,149,106,.17);transform:translateY(-1px);}
  .pimg{width:100%;max-height:420px;object-fit:cover;border-radius:var(--rl);display:block;}
  .pov{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.36) 0%,transparent 55%);border-radius:var(--rl);display:flex;align-items:flex-end;padding:16px;pointer-events:none;}
  .pov button{pointer-events:all;background:rgba(255,255,255,.88);backdrop-filter:blur(8px);border:none;border-radius:100px;padding:8px 17px;font-size:12px;font-family:var(--fs);cursor:pointer;color:var(--dark);transition:all .2s;}
  .pov button:hover{background:#fff;}
  .tips{width:100%;max-width:520px;margin-top:14px;background:rgba(255,255,255,.43);border:1px solid var(--border);border-radius:var(--r);padding:13px 17px;display:flex;gap:10px;align-items:flex-start;}
  .tiptxt{font-size:11px;color:var(--sub);line-height:1.68;}
  .tiptxt strong{color:var(--text);font-weight:500;}
  .btnan{width:100%;max-width:520px;margin-top:18px;background:linear-gradient(135deg,#C4956A,#E8AA80);color:#fff;border:none;border-radius:100px;padding:16px;font-size:15px;font-family:var(--fs);font-weight:500;cursor:pointer;box-shadow:0 8px 24px rgba(196,149,106,.3);transition:all .3s cubic-bezier(.34,1.56,.64,1);letter-spacing:0.02em;}
  .btnan:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 12px 32px rgba(196,149,106,.4);}
  .btnan:active{transform:scale(.99);}
  .btnan:disabled{opacity:.44;cursor:not-allowed;}

  /* ANALYZING */
  .anpage{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 22px;position:relative;z-index:1;}
  .ringw{position:relative;width:112px;height:112px;margin-bottom:34px;}
  .ar{position:absolute;inset:0;border:3px solid transparent;border-radius:50%;animation:spin 1.4s linear infinite;}
  .ar.r1{border-top-color:#E8AA80;border-right-color:rgba(232,170,128,.25);}
  .ar.r2{inset:10px;border-bottom-color:#C4956A;border-left-color:rgba(196,149,106,.25);animation-duration:1.85s;animation-direction:reverse;}
  @keyframes spin{to{transform:rotate(360deg)}}
  .ac{position:absolute;inset:20px;background:linear-gradient(135deg,#FFF0E8,#FFE4D4);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:33px;}
  .antit{font-family:var(--fd);font-size:clamp(26px,5vw,44px);font-weight:400;text-align:center;color:var(--dark);margin-bottom:9px;}
  .ansub{font-size:13px;color:var(--sub);text-align:center;margin-bottom:42px;line-height:1.75;}
  .prw{width:100%;max-width:400px;}
  .prb{height:6px;background:rgba(196,149,106,.13);border-radius:100px;overflow:hidden;margin-bottom:9px;}
  .prf{height:100%;background:linear-gradient(90deg,#C4956A,#E8AA80,#FFD4A8);border-radius:100px;transition:width .4s ease;position:relative;overflow:hidden;}
  .prf::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.36),transparent);animation:sh 1.2s ease infinite;}
  @keyframes sh{from{transform:translateX(-100%)}to{transform:translateX(200%)}}
  .prl{display:flex;justify-content:space-between;font-size:11px;color:var(--sub);}
  .asteps{margin-top:34px;display:flex;flex-direction:column;gap:9px;width:100%;max-width:400px;}
  .astep{display:flex;align-items:center;gap:11px;padding:9px 15px;border-radius:11px;font-size:12px;transition:all .32s ease;}
  .astep.done{background:rgba(196,149,106,.07);color:var(--rg);}
  .astep.active{background:rgba(196,149,106,.12);color:var(--dark);font-weight:500;}
  .astep.pending{color:rgba(122,96,82,.36);}
  .adot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
  .done .adot{background:var(--rg);}
  .active .adot{background:var(--dark);animation:pu .8s ease infinite;}
  .pending .adot{background:rgba(196,149,106,.2);}
  @keyframes pu{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:.5}}

  /* RESULTS */
  .rpage{min-height:100vh;padding:0 0 56px;position:relative;z-index:1;}
  .rhero{padding:54px 22px 46px;text-align:center;position:relative;overflow:hidden;}
  .rb{display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,.62);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.72);border-radius:100px;padding:5px 15px;font-size:11px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:18px;position:relative;}
  .ri{font-size:clamp(44px,8vw,68px);margin-bottom:13px;position:relative;animation:fl 3s ease-in-out infinite;}
  @keyframes fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
  .rn{font-family:var(--fd);font-size:clamp(30px,6vw,64px);font-weight:400;line-height:1.1;margin-bottom:9px;position:relative;}
  .rkw{font-size:clamp(13px,2vw,16px);opacity:.7;margin-bottom:14px;font-style:italic;font-family:var(--fd);position:relative;}
  .rdesc{font-size:clamp(12px,1.7vw,14px);line-height:1.85;opacity:.76;max-width:460px;margin:0 auto;position:relative;}
  .rsubs{display:flex;gap:7px;justify-content:center;margin-top:16px;flex-wrap:wrap;position:relative;}
  .rsub{padding:4px 11px;background:rgba(255,255,255,.42);backdrop-filter:blur(4px);border:1px solid rgba(255,255,255,.58);border-radius:100px;font-size:11px;}
  .rc{max-width:760px;margin:0 auto;padding:0 16px;}
  .rcard{background:rgba(255,255,255,.7);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.86);border-radius:var(--rl);padding:24px 20px;margin-bottom:14px;box-shadow:var(--shadow);}
  .rlbl{font-size:10px;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;color:var(--rg);margin-bottom:15px;display:flex;align-items:center;gap:8px;}
  .rlbl::after{content:'';flex:1;height:1px;background:var(--border);}

  /* Diamond + scores */
  .dw{display:flex;align-items:center;gap:22px;flex-wrap:wrap;}
  .dsvg{flex-shrink:0;}
  .scl{flex:1;display:flex;flex-direction:column;gap:9px;min-width:170px;}
  .scr{display:flex;align-items:center;gap:9px;}
  .sclbl{width:78px;font-size:11px;color:var(--text);flex-shrink:0;}
  .scbg{flex:1;height:7px;background:rgba(196,149,106,.11);border-radius:100px;overflow:hidden;}
  .scfill{height:100%;border-radius:100px;transition:width 1.1s cubic-bezier(.34,1.4,.64,1);}
  .scpct{width:30px;font-size:11px;color:var(--sub);text-align:right;flex-shrink:0;}

  /* Palette */
  .pg{display:flex;gap:9px;flex-wrap:wrap;}
  .sw{display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;}
  .swc{width:48px;height:48px;border-radius:50%;box-shadow:0 3px 9px rgba(0,0,0,0.10);transition:transform .2s;border:2px solid rgba(255,255,255,0.72);}
  .sw:hover .swc{transform:scale(1.12);}
  .swn{font-size:9px;color:var(--sub);text-align:center;}

  /* Makeup */
  .mkrows{display:flex;flex-direction:column;gap:9px;}
  .mkrow{display:flex;align-items:center;gap:11px;}
  .mkkey{width:62px;font-size:11px;color:var(--sub);flex-shrink:0;}
  .mkval{font-size:12px;color:var(--text);flex:1;}
  .mkdots{display:flex;gap:5px;}
  .mkdot{width:15px;height:15px;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,0.10);border:1px solid rgba(255,255,255,0.68);}

  /* Fashion */
  .fgrid{display:grid;grid-template-columns:1fr 1fr;gap:13px;}
  .fctit{font-size:11px;font-weight:500;color:var(--text);margin-bottom:7px;display:flex;align-items:center;gap:5px;}
  .ftags{display:flex;flex-wrap:wrap;gap:6px;}
  .ftag{padding:4px 10px;border-radius:100px;font-size:11px;}
  .fg{background:rgba(196,149,106,.08);color:var(--rg);border:1px solid rgba(196,149,106,.2);}
  .fb{background:rgba(100,50,40,.04);color:#8B4040;border:1px solid rgba(139,64,64,.16);}

  /* Reco */
  .rg2{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
  .rtit{font-size:12px;font-weight:500;color:var(--text);margin-bottom:9px;display:flex;align-items:center;gap:5px;}
  .rtags{display:flex;flex-wrap:wrap;gap:6px;}
  .rtag{padding:5px 11px;border-radius:100px;font-size:11px;border:1px solid;}
  .rgg{background:rgba(196,149,106,.07);color:var(--rg);border-color:rgba(196,149,106,.2);}
  .rgb2{background:rgba(100,50,40,.04);color:#8B4040;border-color:rgba(139,64,64,.16);}

  /* Char */
  .cl{list-style:none;display:flex;flex-direction:column;gap:9px;}
  .ci{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--text);}
  .cd{width:6px;height:6px;border-radius:50%;flex-shrink:0;}
  .tbox{background:linear-gradient(135deg,rgba(196,149,106,0.06),rgba(232,170,128,0.03));border:1px solid rgba(196,149,106,0.2);border-radius:var(--r);padding:17px;font-size:13px;line-height:1.82;color:var(--text);}
  .clist{display:flex;gap:9px;flex-wrap:wrap;}
  .cchip{padding:7px 14px;background:rgba(196,149,106,0.07);border:1px solid rgba(196,149,106,0.17);border-radius:100px;font-size:12px;color:var(--text);}

  /* Actions */
  .ract{display:flex;gap:9px;margin-top:22px;flex-wrap:wrap;}
  .btr{flex:1;min-width:110px;background:rgba(196,149,106,.08);border:1px solid rgba(196,149,106,.26);color:var(--rg);border-radius:100px;padding:13px 18px;font-size:13px;font-family:var(--fs);cursor:pointer;transition:all .22s;text-align:center;}
  .btr:hover{background:rgba(196,149,106,.14);transform:translateY(-1px);}
  .bdl{flex:1;min-width:110px;background:rgba(30,20,15,.05);border:1px solid rgba(30,20,15,.12);color:var(--dark);border-radius:100px;padding:13px 18px;font-size:13px;font-family:var(--fs);cursor:pointer;transition:all .22s;text-align:center;}
  .bdl:hover{background:rgba(30,20,15,.09);transform:translateY(-1px);}
  .bsh{flex:1;min-width:110px;background:linear-gradient(135deg,#C4956A,#E8AA80);border:none;color:#fff;border-radius:100px;padding:13px 18px;font-size:13px;font-family:var(--fs);cursor:pointer;transition:all .22s;text-align:center;box-shadow:0 6px 20px rgba(196,149,106,.26);}
  .bsh:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(196,149,106,0.36);}

  /* TOAST */
  .toast{position:fixed;bottom:26px;left:50%;transform:translateX(-50%);background:rgba(30,20,15,.88);backdrop-filter:blur(12px);color:#fff;padding:11px 22px;border-radius:100px;font-size:13px;z-index:9999;white-space:nowrap;animation:tai .3s cubic-bezier(.34,1.56,.64,1);}
  @keyframes tai{from{opacity:0;transform:translateX(-50%) translateY(14px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

  /* RESPONSIVE */
  @media(max-width:768px){
    .nav{padding:14px 17px;}
    .land{padding:24px 17px;}
    .lsteps{gap:15px;}.si{width:86px;}
    .uppage{padding:24px 13px;}
    .anpage{padding:22px 17px;}
    .rpage{padding-bottom:34px;}
    .rhero{padding:42px 17px 34px;}
    .rc{padding:0 13px;}
    .rcard{padding:19px 15px;}
    .rg2,.fgrid{grid-template-columns:1fr;gap:11px;}
    .dw{flex-direction:column;align-items:center;}
    .ract{flex-direction:column;}
    .o1{width:240px;height:240px;}.o2{width:190px;height:190px;}.o3{display:none;}
    .swc{width:40px;height:40px;}
    .faq{padding:0 2px;}
  }
  @media(max-width:420px){
    .ltitle{font-size:38px;}.ltitle span{font-size:22px;}
    .btnst{padding:14px 32px;font-size:14px;}
    .chips{gap:7px;}.chip{font-size:11px;padding:5px 11px;}
  }
  @media(min-width:1024px){
    .rcard{padding:28px 26px;}.swc{width:56px;height:56px;}
    .sclbl{width:88px;}.scl{gap:11px;}
  }
`;

// ═══════════════════════════════════════════════════════════
// FONT LOADER  (fix: <link> injection instead of @import)
// ═══════════════════════════════════════════════════════════
function FontLoader(){
  useEffect(()=>{
    if(document.getElementById("pct-gf")) return;
    const l=document.createElement("link");
    l.id="pct-gf";l.rel="stylesheet";
    l.href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap";
    document.head.appendChild(l);
  },[]);
  return null;
}

function Toast({msg}: {msg: string}){return msg?<div className="toast">{msg}</div>:null;}

interface NavProps {
  onGoToGuide?: () => void;
}

function Nav({ onGoToGuide }: NavProps){
  return(
    <nav className="nav">
      <div className="logo" style={{ cursor: "pointer" }} onClick={() => window.location.reload()}>InSelf<span>Color</span></div>
      <div className="nav-tag" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {onGoToGuide && (
          <button 
            type="button"
            className="chip csu" 
            style={{ 
              cursor: "pointer", 
              border: "1px solid rgba(196,149,106,0.3)", 
              padding: "4px 10px", 
              fontSize: "11px", 
              borderRadius: "100px",
              background: "none", 
              color: "var(--rg)",
              fontWeight: 500
            }}
            onClick={onGoToGuide}
          >
            📖 색채 가이드북
          </button>
        )}
        <span>퍼스널 컬러 테스트</span>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════
// DIAMOND CHART
// ═══════════════════════════════════════════════════════════
const AXES=[
  {key:"spring",label:"봄",icon:"🌸",dx:0,dy:-1},
  {key:"summer",label:"여름",icon:"🌊",dx:1,dy:0},
  {key:"autumn",label:"가을",icon:"🍂",dx:0,dy:1},
  {key:"winter",label:"겨울",icon:"❄️",dx:-1,dy:0},
];

interface DiamondChartProps {
  scores: Record<string, number>;
  winner: string;
}

function DiamondChart({scores,winner}: DiamondChartProps){
  const[on,setOn]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setOn(true),200);return()=>clearTimeout(t);},[]);
  const SZ=186,cx=SZ/2,cy=SZ/2,R=66;
  const pts=AXES.map(({key,dx,dy})=>{
    const v=on?(scores[key]||5)/100:0;
    return{x:cx+dx*R*v,y:cy+dy*R*v};
  });
  const d=pts.map((p,i)=>`${i===0?"M":"L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join("")+"Z";
  const gl=(v: number)=>AXES.map(({dx,dy})=>`${cx+dx*R*v},${cy+dy*R*v}`).join(" ");
  return(
    <svg viewBox={`0 0 ${SZ} ${SZ}`} width={SZ} height={SZ} className="dsvg" style={{overflow:"visible"}}>
      {[0.25,0.5,0.75,1].map(v=><polygon key={v} points={gl(v)} fill="none" stroke="rgba(196,149,106,.12)" strokeWidth="1"/>)}
      {AXES.map(({dx,dy,label,icon},i)=>(
        <g key={i}>
          <line x1={cx} y1={cy} x2={cx+dx*R} y2={cy+dy*R} stroke="rgba(196,149,106,.17)" strokeWidth="1"/>
          <text x={cx+dx*(R+17)} y={cy+dy*(R+18)} textAnchor="middle" dominantBaseline="middle" fontSize="9.5" fill="#7A6052">{icon} {label}</text>
        </g>
      ))}
      <path d={d} fill="rgba(196,149,106,.18)" stroke="#C4956A" strokeWidth="1.8" strokeLinejoin="round" style={{transition:on?"all .9s cubic-bezier(.34,1.2,.64,1)":"none"}}/>
      {pts.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r={AXES[i].key===winner?4.5:3} fill={AXES[i].key===winner?"#C4956A":"rgba(196,149,106,.55)"}/>)}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════
// LANDING
// ═══════════════════════════════════════════════════════════
interface LandingScreenProps {
  onStart: () => void;
  onGoToGuide: () => void;
}

function LandingScreen({onStart, onGoToGuide}: LandingScreenProps){
  const[openFaq,setOpenFaq]=useState<number | null>(null);
  return(
    <div className="w"><FontLoader/><style>{CSS}</style><Nav onGoToGuide={onGoToGuide}/>
      <div className="land se">
        <div className="orb o1"/><div className="orb o2"/><div className="orb o3"/>
        <div className="lbadge">✦ Personal Color Analysis</div>
        <h1 className="ltitle">당신의 컬러를<span>발견하세요</span></h1>
        <p className="lsub">사진 한 장으로 나만의 퍼스널 컬러를 분석해드립니다.<br/>봄·여름·가을·겨울, 당신에게 가장 잘 어울리는 색을 찾아보세요.</p>
        <div className="ldiv"/>
        <div className="chips">
          {[["csp","🌸 봄 웜"],["csu","🌊 여름 쿨"],["cau","🍂 가을 웜"],["cwi","❄️ 겨울 쿨"]].map(([c,l])=>(
            <span key={c} className={`chip ${c}`}>{l}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "12px", flexDirection: "column", alignItems: "center" }}>
          <button className="btnst" onClick={onStart}><span>지금 테스트 시작하기</span><span>→</span></button>
          <button 
            type="button"
            onClick={onGoToGuide} 
            style={{ 
              marginTop: "12px", 
              background: "rgba(196,149,106,0.06)", 
              color: "var(--rg)", 
              border: "1px solid rgba(196,149,106,0.3)", 
              padding: "9px 24px", 
              borderRadius: "100px", 
              fontSize: "13px", 
              cursor: "pointer", 
              fontWeight: 500,
              fontFamily: "var(--fs)"
            }}
          >
            📖 PCCS 상세 색채 가이드북 읽기
          </button>
        </div>
        <div className="lsteps">
          {[["📸","STEP 01","얼굴 사진 업로드"],["🔬","STEP 02","색상 알고리즘 분석"],["🎨","STEP 03","퍼스널 컬러 확인"]].map(([ic,num,txt])=>(
            <div className="si" key={num}><div className="sic">{ic}</div><div className="sn">{num}</div><div className="st">{txt}</div></div>
          ))}
        </div>
        <div className="faq">
          <div className="faqt">자주 묻는 질문</div>
          {FAQ_DATA.map((f,i)=>(
            <div className="fqi" key={i}>
              <div className="fqq" onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                <span>{f.q}</span>
                <span className={`fqch${openFaq===i?" open":""}`}>▼</span>
              </div>
              {openFaq===i&&<div className="fqa">{f.a}</div>}
            </div>
          ))}
        </div>

        <div className="disclaimer-card" style={{
          marginTop: "48px",
          padding: "20px 24px",
          borderRadius: "16px",
          background: "rgba(196,149,106,0.04)",
          border: "1px solid rgba(196,149,106,0.14)",
          maxWidth: "520px",
          width: "100%",
          boxSizing: "border-box",
          fontSize: "12px",
          lineHeight: "1.65",
          color: "var(--sub)"
        }}>
          <p style={{ fontWeight: 600, color: "var(--rg)", marginBottom: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            ⚠️ 테스트 참고 및 의무 면책 고지
          </p>
          <div style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: "6px", color: "var(--sub)" }}>
            <p style={{ margin: 0 }}>• <strong>일반정보 제공 목적:</strong> 본 자가 진단 서비스는 전문 퍼스널 컬러 컨설턴트의 실물 드레이핑 진단법을 디지털 방식으로 구현한 모의 분석 툴입니다. 전문적인 오프라인 진단이나 진료를 완벽히 대체할 수 없습니다.</p>
            <p style={{ margin: 0 }}>• <strong>오락용 부가 사항:</strong> 추천되는 메이크업 정보, 베스트 패션 스타일, 스타일링 팁 및 유사 연예인은 사용자 만족도 제고를 위한 추천 가이드이자 재미(Entertainment) 목적으로 설계되었습니다. 최종 결정 전에 유연하게 개별 판단하시기 바랍니다.</p>
            <p style={{ margin: 0 }}>• <strong>손실 책임 면제:</strong> 사용자는 본 프로그램의 수치 분석 결과를 절대적 기준으로 신뢰하지 않을 것에 동의하며, 오진 또는 가이드 오인에 따라 개인의 선택 혹은 패션/뷰티 제품 구매 후 발생한 직접적·간접적 부작용 및 불만족 등의 불이익에 대해 본 어플리케이션(InSelf Color) 제작 및 운영 측은 어떠한 법적 분쟁에 대한 보상적 또는 법적 책임도 부담하지 않습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// UPLOAD
// ═══════════════════════════════════════════════════════════
interface UploadScreenProps {
  onBack: () => void;
  onAnalyze: () => void;
  uploadedImage: string | null;
  onImageSet: (img: string | null) => void;
}

function UploadScreen({onBack,onAnalyze,uploadedImage,onImageSet}: UploadScreenProps){
  const[isDrag,setIsDrag]=useState(false);
  const handleFile=useCallback((file: File)=>{
    if(!file||!file.type.startsWith("image/"))return;
    const r=new FileReader();
    r.onload=(e)=>onImageSet(e.target?.result as string);
    r.readAsDataURL(file);
  },[onImageSet]);

  const INPUT_ID="pct-file-input";

  return(
    <div className="w"><FontLoader/><style>{CSS}</style><Nav/>
      <div className="uppage se">
        <div className="phdr">
          <button className="btnbk" onClick={onBack}>← 뒤로</button>
          <h2 className="ptitle">사진을 업로드하세요</h2>
          <p className="pdesc">얼굴이 잘 보이는 정면 사진을 사용하면 더 정확한 결과를 얻을 수 있어요.</p>
        </div>

        <input
          id={INPUT_ID}
          type="file"
          accept="image/*"
          style={{position:"fixed",opacity:0,width:0,height:0,pointerEvents:"none"}}
          onChange={e=>{
            const f=e.target.files?.[0];
            if(f)handleFile(f);
            e.target.value=""; 
          }}
        />

        <div
          className={`uarea${isDrag?" drag":""}${uploadedImage?" hi":""}`}
          onDragOver={e=>{e.preventDefault();setIsDrag(true);}}
          onDragLeave={()=>setIsDrag(false)}
          onDrop={e=>{e.preventDefault();setIsDrag(false);if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);}}
        >
          {uploadedImage?(
            <>
              <img src={uploadedImage} alt="미리보기" className="pimg"/>
              <div className="pov">
                <label htmlFor={INPUT_ID} className="uchglabel">📁 사진 변경</label>
              </div>
            </>
          ):(
            <label htmlFor={INPUT_ID} className="ulabel">
              <div className="uic">📷</div>
              <p className="umain">클릭하거나 사진을 드래그하세요</p>
              <p className="usub">JPG, PNG, WEBP 지원<br/>정면 얼굴 사진 권장</p>
              <span className="btnf">📁 파일 선택</span>
            </label>
          )}
        </div>
        <div className="tips">
          <span style={{fontSize:15,flexShrink:0}}>💡</span>
          <p className="tiptxt"><strong>좋은 결과를 위한 팁:</strong> 자연광 아래 촬영, 과도한 필터 없음, 메이크업 최소화, 얼굴이 중앙에 있는 정면 사진을 사용해주세요.</p>
        </div>
        <button className="btnan" disabled={!uploadedImage} onClick={onAnalyze}>
          {uploadedImage?"🔬 분석 시작하기 →":"사진을 먼저 업로드해주세요"}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ANALYZING
// ═══════════════════════════════════════════════════════════
interface AnalyzingScreenProps {
  progress: number;
}
const ASTEPS=["이미지 데이터 추출","피부 픽셀 감지 및 필터링","RGB 평균값 계산","웜/쿨 언더톤 분석","명도·채도 측정","퍼스널 컬러 타입 결정"];

function AnalyzingScreen({progress}: AnalyzingScreenProps){
  const active=Math.min(Math.floor((progress/100)*ASTEPS.length),ASTEPS.length-1);
  return(
    <div className="w"><FontLoader/><style>{CSS}</style><Nav/>
      <div className="anpage se">
        <div className="ringw">
          <div className="ar r1"/><div className="ar r2"/>
          <div className="ac">🎨</div>
        </div>
        <h2 className="antit">분석 중입니다</h2>
        <p className="ansub">색상 알고리즘이 피부 톤을 분석하고 있어요.<br/>잠시만 기다려주세요.</p>
        <div className="prw">
          <div className="prb"><div className="prf" style={{width:`${progress}%`}}/></div>
          <div className="prl"><span>분석 진행 중...</span><span>{Math.round(progress)}%</span></div>
        </div>
        <div className="asteps">
          {ASTEPS.map((s,i)=>{
            const st=i<active?"done":i===active?"active":"pending";
            return<div key={i} className={`astep ${st}`}><span className="adot"/><span>{i<active?"✓ ":""}{s}</span></div>;
          })}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// RESULTS
// ═══════════════════════════════════════════════════════════
interface ResultsScreenProps {
  result: any;
  onRetry: () => void;
  onToast: (msg: string) => void;
}

function ResultsScreen({result,onRetry,onToast}: ResultsScreenProps){
  const[bars,setBars] = useState<Record<string, number>>({spring:0,summer:0,autumn:0,winter:0});
  const season=SEASONS[result.season];
  const{scores}=result;
  const order=[result.season,...["spring","summer","autumn","winter"].filter(s=>s!==result.season)];

  useEffect(()=>{
    window.scrollTo(0,0);
    const t=setTimeout(()=>setBars(scores),260);
    return()=>clearTimeout(t);
  },[scores]);

  const handleShare=()=>{
    const txt=`나의 퍼스널 컬러 결과: ${season.name} ${season.icon}\n#InSelfColor #퍼스널컬러`;
    if(navigator.share) {
      navigator.share({title:"퍼스널 컬러 결과-InSelf Color",text:txt}).catch(() => {});
    } else if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(txt).then(()=>onToast("클립보드에 복사되었습니다 ✓")).catch(()=>onToast("공유 기능이 지원되지 않습니다"));
    } else {
      onToast("공유 기능이 지원되지 않습니다");
    }
  };
  const handleDl=()=>{
    try{downloadDetailedResultCard(season,scores);onToast("상세 결과 카드를 저장하고 있어요...");}
    catch{onToast("저장 중 오류가 발생했습니다");}
  };

  return(
    <div className="w"><FontLoader/><style>{CSS}</style><Nav/>
      <div className="rpage se">
        {/* HERO */}
        <div className="rhero" style={{background:season.heroBg,color:season.textOnBg}}>
          <div className="rb" style={{color:season.primary}}>퍼스널 컬러 분석 결과</div>
          <div className="ri">{season.icon}</div>
          <h2 className="rn">{season.name}</h2>
          <p className="rkw">"{season.keyword}"</p>
          <p className="rdesc">{season.description}</p>
          <div className="rsubs">{season.subtypes.map((s: string)=><span key={s} className="rsub" style={{color:season.primary}}>{s}</span>)}</div>
        </div>

        <div className="rc" style={{marginTop:22}}>
          {/* SCORE + DIAMOND */}
          <div className="rcard">
            <div className="rlbl">분석 점수</div>
            <div className="dw">
              <DiamondChart scores={scores} winner={result.season}/>
              <div className="scl">
                {order.map(k=>(
                  <div className="scr" key={k}>
                    <span className="sclbl">{SEASONS[k].icon} {SEASONS[k].name.replace(" 타입","")}</span>
                    <div className="scbg"><div className="scfill" style={{width:`${bars[k]||0}%`,background:SEASONS[k].scoreColor}}/></div>
                    <span className="scpct">{scores[k]}%</span>
                  </div>
                ))}
              </div>
            </div>
            {result.error&&(
              <p style={{fontSize:11,color:"var(--sub)",marginTop:13,padding:"9px 13px",background:"rgba(196,149,106,.07)",borderRadius:10}}>
                ⚠️ 피부 픽셀 감지가 어려운 사진이었습니다. 얼굴이 잘 보이는 사진을 사용하시면 더 정확합니다.
              </p>
            )}
          </div>

          {/* PALETTE */}
          <div className="rcard">
            <div className="rlbl">추천 컬러 팔레트</div>
            <div className="pg">
              {season.palette.map(({hex,name}: any)=>(
                <div key={hex} className="sw" title={`${name} — ${hex} (클릭하여 복사)`}
                  onClick={()=>{
                    if (navigator.clipboard?.writeText) {
                      navigator.clipboard.writeText(hex).then(()=>onToast(`${hex} 복사됨`)).catch(()=>{});
                    }
                  }}>
                  <div className="swc" style={{background:hex}}/>
                  <span className="swn">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CHARACTERISTICS */}
          <div className="rcard">
            <div className="rlbl">나의 특징</div>
            <ul className="cl">
              {season.characteristics.map((c: string, i: number)=>(
                <li key={i} className="ci"><span className="cd" style={{background:season.primary}}/>{c}</li>
              ))}
            </ul>
          </div>

          {/* MAKEUP */}
          <div className="rcard">
            <div className="rlbl">메이크업 추천</div>
            <div className="mkrows">
              {[["파운데이션",season.makeup.foundation],["블러셔",season.makeup.blush],["립",season.makeup.lip],["아이섀도",season.makeup.eye],["아이라이너",season.makeup.liner]].map(([k,v])=>(
                <div key={k} className="mkrow"><span className="mkkey">{k}</span><span className="mkval">{v}</span></div>
              ))}
              <div className="mkrow">
                <span className="mkkey">컬러칩</span>
                <div className="mkdots">{season.makeup.dots.map((c: string)=><div key={c} className="mkdot" style={{background:c}} title={c}/>)}</div>
              </div>
            </div>
          </div>

          {/* FASHION */}
          <div className="rcard">
            <div className="rlbl">패션 스타일 가이드</div>
            <p style={{fontSize:13,fontWeight:500,color:season.primary,marginBottom:13}}>{season.fashion.style}</p>
            <div className="fgrid">
              <div>
                <div className="fctit">✅ 추천 아이템</div>
                <div className="ftags">{season.fashion.items.map((i: string)=><span key={i} className="ftag fg">{i}</span>)}</div>
              </div>
              <div>
                <div className="fctit">🧵 어울리는 소재</div>
                <div className="ftags">{season.fashion.fabrics.map((f: string)=><span key={f} className="ftag fg">{f}</span>)}</div>
              </div>
              <div style={{gridColumn:"1/-1"}}>
                <div className="fctit">❌ 피하면 좋은 코디</div>
                <div className="ftags">{season.fashion.avoid.map((a: string)=><span key={a} className="ftag fb">{a}</span>)}</div>
              </div>
            </div>
          </div>

          {/* COLOR GUIDE */}
          <div className="rcard">
            <div className="rlbl">컬러 가이드</div>
            <div className="rg2">
              <div>
                <div className="rtit"><span>✅</span> 잘 어울리는 색</div>
                <div className="rtags">{season.recommended.map((r: string)=><span key={r} className="rtag rgg">{r}</span>)}</div>
              </div>
              <div>
                <div className="rtit"><span>❌</span> 피하면 좋은 색</div>
                <div className="rtags">{season.avoid.map((r: string)=><span key={r} className="rtag rgb2">{r}</span>)}</div>
              </div>
            </div>
          </div>

          {/* TIP */}
          <div className="rcard">
            <div className="rlbl">스타일링 팁</div>
            <div className="tbox">{season.tip}</div>
          </div>

          {/* CELEB */}
          <div className="rcard">
            <div className="rlbl">같은 타입 유명인</div>
            <div className="clist">{season.celebs.map((c: string)=><span key={c} className="cchip">⭐ {c}</span>)}</div>
          </div>

          {/* ACTIONS */}
          <div className="ract">
            <button className="btr" onClick={onRetry}>← 다시 테스트</button>
            <button className="bdl" onClick={handleDl}>⬇ 결과 저장</button>
            <button className="bsh" onClick={handleShare}>↗ 공유하기</button>
          </div>

          <div className="res-disclaimer" style={{
            marginTop: "24px",
            textAlign: "center",
            fontSize: "11px",
            lineHeight: "1.6",
            color: "rgba(122,96,82,0.55)",
            padding: "0 10px",
            maxWidth: "500px",
            marginLeft: "auto",
            marginRight: "auto"
          }}>
            ※ 본 자가 분석 결과는 업로드된 이미지 분석 알고리즘에 기초한 간이적 참고 수치입니다. 환경 조명에 따른 차이가 발생할 수 있으며, 일상적인 스타일링 참고 및 재미 목적의 가이드로 즐겨주시기 바라며 법적 분쟁 보상 및 보증의 대상이 되지 않습니다.
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════
interface PersonalColorTestProps {
  onGoToGuide: () => void;
}

export default function PersonalColorTest({ onGoToGuide }: PersonalColorTestProps){
  const[page,setPage]=useState("landing");
  const[image,setImage]=useState<string | null>(null);
  const[result,setResult]=useState<any>(null);
  const[progress,setProgress]=useState(0);
  const[toast,setToast]=useState("");
  const toastRef=useRef<any>(null);

  const showToast=useCallback((msg: string)=>{
    setToast(msg);clearTimeout(toastRef.current);
    toastRef.current=setTimeout(()=>setToast(""),2600);
  },[]);

  useEffect(()=>{window.scrollTo(0,0);},[page]);

  const handleAnalyze=useCallback(()=>{
    if(!image)return;
    setPage("analyzing");setProgress(0);
    let prog=0;
    const iv=setInterval(()=>{
      prog+=Math.random()*10+3;
      if(prog>=87){clearInterval(iv);prog=87;}
      setProgress(prog);
    },265);
    const img=new Image();
    img.crossOrigin="anonymous";
    img.onload=()=>{
      const res=analyzePersonalColor(img);
      setTimeout(()=>{
        clearInterval(iv);setProgress(100);
        setTimeout(()=>{setResult(res);setPage("results");},530);
      },1700);
    };
    img.onerror=()=>{
      clearInterval(iv);
      setResult({season:"spring",scores:{spring:40,summer:27,autumn:21,winter:12},error:true});
      setPage("results");
    };
    img.src=image;
  },[image]);

  const handleRetry=()=>{setPage("landing");setImage(null);setResult(null);setProgress(0);};

  return(
    <>
      {page==="landing"&&<LandingScreen onStart={()=>setPage("upload")} onGoToGuide={onGoToGuide}/>}
      {page==="upload"&&<UploadScreen onBack={()=>setPage("landing")} onAnalyze={handleAnalyze} uploadedImage={image} onImageSet={setImage}/>}
      {page==="analyzing"&&<AnalyzingScreen progress={progress}/>}
      {page==="results"&&result&&<ResultsScreen result={result} onRetry={handleRetry} onToast={showToast}/>}
      <Toast msg={toast}/>
    </>
  );
}
