import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import html2canvas from "html2canvas";
import { trackEvent, trackSessionVisit } from "../utils/stats";

// ═══════════════════════════════════════════════════════════
// SEASON DATA
// ═══════════════════════════════════════════════════════════
const SEASONS: Record<string, any> = {
  spring: {
    id:"spring",name:"봄 웜 타입",nameEn:"Spring Warm",icon:"🌸",
    keyword:"밝고 화사한",keywordEn:"Bright & Vibrant",
    subtypes:["라이트 스프링","웜 스프링","비비드 스프링"],subtypesEn:["Light Spring","Warm Spring","Vivid Spring"],
    heroBg:"linear-gradient(160deg,#FFF5EE 0%,#FFE8D6 45%,#FFBCA9 100%)",
    primary:"#D96A3A",textOnBg:"#4A1E0A",
    description:"피부에 밝고 투명한 황금빛 베이스가 깔려 있으며, 복숭아빛·산호빛 혈색이 자연스럽게 나타납니다. 생기 있고 화사한 인상을 줍니다.",
    descriptionEn:"Your skin has a bright and transparent golden undertone base, radiating a naturally vibrant and cheerful appeal.",
    characteristics:["맑고 투명한 피부톤","황금빛·복숭아빛 베이스","밝고 선명한 눈동자","골든·애쉬브라운 모발"],
    characteristicsEn:["Transparent, bright skin tone","Golden and peach skin base","Bright and sparkling eyes","Golden or ash-brown hair"],
    palette:[
      {hex:"#FF9E7C",name:"코랄",nameEn:"Coral"},
      {hex:"#FFA07A",name:"살몬",nameEn:"Salmon"},
      {hex:"#FFD700",name:"골드",nameEn:"Gold"},
      {hex:"#FFDAB9",name:"피치",nameEn:"Peach"},
      {hex:"#F4A460",name:"카멜",nameEn:"Camel"},
      {hex:"#ADDFAD",name:"민트",nameEn:"Mint"}
    ],
    recommended:["코랄","살몬","피치","아이보리","카멜","골드","애플그린","터콰이즈"],
    recommendedEn:["Coral","Salmon","Peach","Ivory","Camel","Gold","Apple Green","Turquoise"],
    avoid:["와인레드","다크네이비","블랙","딥퍼플","차콜그레이"],
    avoidEn:["Wine Red","Dark Navy","Black","Deep Purple","Charcoal Gray"],
    tip:"밝고 따뜻한 색상으로 활기찬 분위기를 연출하세요. 채도가 너무 낮거나 어두운 색은 피하고, 맑고 생기 있는 색이 잘 어울립니다.",
    tipEn:"Embrace bright, warm hues to amplify your lively charm. Avoid heavy or overly muted tones; clear, sunny colors suit you best.",
    makeup:{
      foundation:"밝은 피치베이지·아이보리 계열",foundationEn:"Light Peach Beige / Ivory",
      blush:"코랄, 살몬핑크",blushEn:"Coral, Salmon Pink",
      lip:"코랄레드, 피치핑크, 오렌지레드",lipEn:"Coral Red, Peach Pink, Orange Red",
      eye:"골드브라운, 카퍼, 테라코타",eyeEn:"Gold Brown, Copper, Terracotta",
      liner:"브라운, 카퍼",linerEn:"Brown, Copper",
      dots:["#FF9E7C","#FFB347","#FFA07A","#CD853F"]
    },
    fashion:{
      style:"화사한 스프링 내추럴 룩",styleEn:"Vibrant Spring Casual Look",
      items:["플로럴 원피스","아이보리 니트","코랄 블라우스","카멜 트렌치코트"],itemsEn:["Floral Dress","Ivory Knitwear","Coral Blouse","Camel Trench Coat"],
      fabrics:["시폰","면","린넨","니트"],fabricsEn:["Chiffon","Cotton","Linen","Knitwear"],
      avoid:["블랙 모노톤","무채색 전체 착장"],avoidEn:["Total Black Look","Achromatic Outfits"]
    },
    celebs:{
      female: ["#사랑스러운_과즙미", "#상큼청량", "#인간_비타민", "#햇살가득_포근함", "#피치브릭_어바웃", "#상큼발랄한_무드"],
      male: ["#밀크남", "#청량한_소년미", "#따뜻한_밀크티", "#부드러운_클래식", "#피치베이지_댄디", "#상큼한_스무디"]
    },
    celebsEn:{
      female: ["#LovelyPeachVibe", "#FreshJuicy", "#WarmSunshine", "#InnocentSweetness", "#CharmingCoral", "#BrightEnergy"],
      male: ["#SoftBoyishCharm", "#WarmMilkTea", "#GentleClassic", "#PeachBeigeDandy", "#FreshSunnySmile", "#VibrantCasual"]
    },
    scoreColor:"#FF9E7C",gradStops:["#FFE8D6","#FFBCA9"],
  },
  summer: {
    id:"summer",name:"여름 쿨 타입",nameEn:"Summer Cool",icon:"🌊",
    keyword:"부드럽고 우아한",keywordEn:"Soft & Elegant",
    subtypes:["라이트 서머","소프트 서머","뮤트 서머"],subtypesEn:["Light Summer","Soft Summer","Muted Summer"],
    heroBg:"linear-gradient(160deg,#F5F8FF 0%,#E4ECF8 45%,#C0CFEA 100%)",
    primary:"#5274A8",textOnBg:"#0D1F3C",
    description:"피부에 핑크빛·로즈빛이 감도는 차가운 베이스를 가집니다. 뮤트되고 부드러운 쿨톤 파스텔이 잘 어울리며, 우아하고 로맨틱한 인상을 줍니다.",
    descriptionEn:"Your skin features a rosy cool base. Soft pastel tones with grayish or bluish undertones highlight your elegant and romantic vibe.",
    characteristics:["핑크빛·로즈빛 피부 베이스","부드러운 쿨톤 혈색","회색빛이 감도는 눈동자","애쉬·블루그레이 모발"],
    characteristicsEn:["Pinkish, rosy undertone skin","Soft cool and hazy glow","Muted gray-tinted eyes","Ash-brown or blue-black hair"],
    palette:[
      {hex:"#B0C4DE",name:"스틸블루",nameEn:"Steel Blue"},
      {hex:"#C8A2C8",name:"라일락",nameEn:"Lilac"},
      {hex:"#F4C2C2",name:"파스텔핑크",nameEn:"Pastel Pink"},
      {hex:"#99C5C4",name:"소프트민트",nameEn:"Soft Mint"},
      {hex:"#9FA8DA",name:"페리윙클",nameEn:"Periwinkle"},
      {hex:"#D8C4D8",name:"연보라",nameEn:"Lavender"}
    ],
    recommended:["라벤더","소프트로즈","스모키블루","파우더핑크","민트그레이","스카이블루"],
    recommendedEn:["Lavender","Soft Rose","Smoky Blue","Powder Pink","Mint Gray","Sky Blue"],
    avoid:["오렌지","골드","카멜","올리브그린","브릭레드"],
    avoidEn:["Orange","Gold","Camel","Olive Green","Brick Red"],
    tip:"그레이쉬하고 뮤트된 쿨톤 색상이 피부를 돋보이게 합니다. 너무 선명하거나 채도 높은 색보다 부드럽게 가라앉은 톤이 가장 잘 어울려요.",
    tipEn:"Muted, subtle cool tones make your skin look radiant. Choose soft, dusty pastels over bright primary or strong earthy colors.",
    makeup:{
      foundation:"핑크베이지·뉴트럴 계열",foundationEn:"Pink Beige / Neutral",
      blush:"로즈핑크, 소프트핑크",blushEn:"Rose Pink, Soft Pink",
      lip:"로즈, 모브, 소프트레드, 베이비핑크",lipEn:"Rose, Mauve, Soft Red, Baby Pink",
      eye:"그레이, 라벤더, 소프트퍼플",eyeEn:"Gray, Lavender, Muted Purple",
      liner:"다크브라운, 네이비, 그레이",linerEn:"Dark Brown, Navy, Slate Gray",
      dots:["#C8A2C8","#B0C4DE","#F4C2C2","#9FA8DA"]
    },
    fashion:{
      style:"로맨틱 소프트 서머 룩",styleEn:"Romantic Soft Summer Look",
      items:["라벤더 블라우스","소프트핑크 카디건","스모키블루 팬츠","모브 롱스커트"],itemsEn:["Lavender Blouse","Soft Pink Cardigan","Smoky Blue Pants","Mauve Long Skirt"],
      fabrics:["시폰","새틴","벨벳","울 블렌드"],fabricsEn:["Chiffon","Satin","Velvet","Wool Blend"],
      avoid:["오렌지·골드 계열 전체 착장","강렬한 원색 코디"],avoidEn:["Total Orange/Gold Outfit","Vivid Primary Colors"]
    },
    celebs:{
      female: ["#청초한_아우라", "#이슬같은_투명함", "#은은한_라벤더", "#우아한_클래식", "#깨끗한_퓨어룩", "#소프트모브_아로마"],
      male: ["#청량미소년", "#이온음료_무드", "#깨끗한_댄디룩", "#투명한_청량함", "#파우더블루_셔츠핏", "#뮤트브리즈"]
    },
    celebsEn:{
      female: ["#ElegantAura", "#DewyTransparent", "#MutedLavender", "#GracefulClassic", "#PureAndSoft", "#DreamyPastel"],
      male: ["#PureFreshPrince", "#SoftMutedDandy", "#BlueBreeze", "#IcyLavenderMood", "#CrispWhiteShirt", "#SummerMist"]
    },
    scoreColor:"#8FA8D4",gradStops:["#E8EEF8","#C0CFEA"],
  },
  autumn: {
    id:"autumn",name:"가을 웜 타입",nameEn:"Autumn Warm",icon:"🍂",
    keyword:"깊고 풍부한",keywordEn:"Deep & Rich",
    subtypes:["소프트 어텀","웜 어텀","딥 어텀"],subtypesEn:["Soft Autumn","Warm Autumn","Deep Autumn"],
    heroBg:"linear-gradient(160deg,#FFF5E8 0%,#F0D5B0 45%,#D4936A 100%)",
    primary:"#8B4520",textOnBg:"#2A1408",
    description:"황금빛·구리빛의 깊고 따뜻한 피부 베이스를 가집니다. 어스톤과 뮤트된 웜컬러가 특히 잘 어울리며, 자연스럽고 성숙한 인상을 줍니다.",
    descriptionEn:"Your skin has a golden bronze-like warm base. Warm, rich earth tones suit you best, presenting a sophisticated, mature, and natural charisma.",
    characteristics:["황금빛·구리빛 피부 베이스","주근깨가 있는 경우 많음","올리브·갈색 눈동자","어두운 갈색·구리빛 모발"],
    characteristicsEn:["Deep golden, bronze skin tone","Often has warm freckles","Olive or deep brown eyes","Dark brown, copper hair"],
    palette:[
      {hex:"#C17A3E",name:"카멜",nameEn:"Camel"},
      {hex:"#8B5E3C",name:"다크브라운",nameEn:"Dark Brown"},
      {hex:"#CC6633",name:"테라코타",nameEn:"Terracotta"},
      {hex:"#556B2F",name:"올리브그린",nameEn:"Olive Green"},
      {hex:"#A0785A",name:"코퍼",nameEn:"Copper"},
      {hex:"#8B7355",name:"카키",nameEn:"Khaki"}
    ],
    recommended:["테라코타","번트오렌지","올리브그린","카멜","카키","머스타드","초콜릿브라운"],
    recommendedEn:["Terracotta","Burnt Orange","Olive Green","Camel","Khaki","Mustard","Chocolate Brown"],
    avoid:["브라이트핑크","라벤더","네온컬러","실버","아이시블루"],
    avoidEn:["Bright Pink","Lavender","Neon Colors","Silver","Icy Blue"],
    tip:"깊이 있는 어스톤과 자연에서 가져온 따뜻한 색이 최고로 잘 어울립니다. 채도를 낮추고 깊이 있는 색감으로 고급스러운 분위기를 완성하세요.",
    tipEn:"Deep earth tones and warm colors found in nature are your perfect match. Complete a luxurious vibe with deep, muted shades.",
    makeup:{
      foundation:"워뮤 베이지·골든 베이지",foundationEn:"Warm Beige / Golden Beige",
      blush:"테라코타, 브릭, 피치브라운",blushEn:"Terracotta, Brick, Peach Brown",
      lip:"테라코타, 브릭레드, 넛브라운, 머스타드",lipEn:"Terracotta, Brick Red, Nut Brown",
      eye:"올리브, 카키브라운, 카퍼, 골드",eyeEn:"Olive, Khaki Brown, Copper, Gold",
      liner:"다크브라운, 카키, 초콜릿",linerEn:"Dark Brown, Khaki, Dark Chocolate",
      dots:["#CC6633","#8B5E3C","#556B2F","#A0785A"]
    },
    fashion:{
      style:"내추럴 어스 어텀 룩",styleEn:"Natural Earth Autumn Look",
      items:["카멜 코트","올리브 재킷","테라코타 니트","초콜릿 팬츠"],itemsEn:["Camel Coat","Olive Jacket","Terracotta Knitwear","Chocolate Pants"],
      fabrics:["트위드","울","코듀로이","가죽"],fabricsEn:["Tweed","Wool","Corduroy","Leather"],
      avoid:["형광·네온 계열","차가운 파스텔 단독 착장"],avoidEn:["Fluorescent/Neon Colors","Cold Pastel Outfits"]
    },
    celebs:{
      female: ["#성숙한_분위기", "#가을뮤즈_센치", "#클래식_트렌치", "#고혹적인_음영", "#웜벨벳_러브", "#메이플브릭_감성"],
      male: ["#깊이있는_서사", "#분위기_남신", "#클래식_트렌치", "#묵직한_어른미", "#따뜻한_라떼", "#빈티지코퍼_멋남"]
    },
    celebsEn:{
      female: ["#SophisticatedMood", "#AutumnMuse", "#ClassicTrench", "#SeductiveShadow", "#WarmVelvetSoft", "#MapleBrickSensibility"],
      male: ["#DeepStorytelling", "#AtmosphereGod", "#ClassicTrenchCoat", "#HeavyAdultCharm", "#WarmLatteVibe", "#VintageCopper"]
    },
    scoreColor:"#C17A3E",gradStops:["#D4936A","#9A5A25"],
  },
  winter: {
    id:"winter",name:"겨울 쿨 타입",nameEn:"Winter Cool",icon:"❄️",
    keyword:"선명하고 대담한",keywordEn:"Bold & Sophisticated",
    subtypes:["딥 윈터","쿨 윈터","브라이트 윈터"],subtypesEn:["Deep Winter","Cool Winter","Bright Winter"],
    heroBg:"linear-gradient(160deg,#EEF2F8 0%,#C8D5E8 45%,#8898B8 100%)",
    primary:"#1A3055",textOnBg:"#0A1828",
    description:"블루빛·올리브빛의 차갑고 선명한 피부 베이스를 가집니다. 강한 대비와 선명한 색상이 잘 어울리며, 세련되고 모던한 도시적 인상을 줍니다.",
    descriptionEn:"Your skin features a bluish, cool tone. Strong contrast and bold, clear monochromatic compositions highlight your modern and charismatic impression.",
    characteristics:["블루빛·올리브빛 피부 베이스","선명하고 강한 이목구비","짙은 눈동자·강한 명도 대비","다크브라운·블랙 모발"],
    characteristicsEn:["Bluish, pale or olive-cool base","Sharp, high-contrast facial features","Deep dark or pitch black eyes","Dark brown or jet-black hair"],
    palette:[
      {hex:"#1C1C1C",name:"블랙",nameEn:"Black"},
      {hex:"#F5F5F5",name:"화이트",nameEn:"White"},
      {hex:"#722F37",name:"버건디",nameEn:"Burgundy"},
      {hex:"#1B3A6B",name:"로열블루",nameEn:"Royal Blue"},
      {hex:"#1B5E4B",name:"에메랄드",nameEn:"Emerald"},
      {hex:"#4B0082",name:"인디고",nameEn:"Indigo"}
    ],
    recommended:["블랙","화이트","버건디","로열블루","에메랄드","핫핑크","아이시핑크"],
    recommendedEn:["Black","White","Burgundy","Royal Blue","Emerald","Hot Pink","Icy Pink"],
    avoid:["베이지","카멜","오렌지","피치","코랄","카키브라운"],
    avoidEn:["Beige","Camel","Orange","Peach","Coral","Warm Brown"],
    tip:"강한 명도 대비와 선명한 쿨톤 색상으로 임팩트를 주세요. 블랙&화이트 조합이나 보석 톤의 선명한 색상이 세련된 매력을 극대화합니다.",
    tipEn:"Maximize your sophisticated appeal with stark color contrast. Black-and-white combos or jewel-tones bring out your best features.",
    makeup:{
      foundation:"뉴트럴·쿨핑크베이지",foundationEn:"Neutral / Cool Pink Beige",
      blush:"차가운 핑크, 버건디로즈",blushEn:"Icy Pink, Burgundy Rose",
      lip:"버건디, 레드, 핫핑크, 체리",lipEn:"Burgundy, Red, Hot Pink, Cherry",
      eye:"블랙, 딥그레이, 딥네이비, 스모키",eyeEn:"Black, Deep Gray, Deep Navy, Smoky",
      liner:"블랙, 딥네이비",linerEn:"Black, Deep Navy",
      dots:["#722F37","#1B3A6B","#4B0082","#1C1C1C"]
    },
    fashion:{
      style:"모던 미니멀 윈터 룩",styleEn:"Modern Minimal Winter Look",
      items:["블랙 수트","화이트 셔츠","버건디 코트","로열블루 블라우스"],itemsEn:["Black Suit","White Shirt","Burgundy Coat","Royal Blue Blouse"],
      fabrics:["캐시미어","실크","울","가죽"],fabricsEn:["Cashmere","Silk","Wool","Leather"],
      avoid:["따뜻한 베이지·카멜 전체 착장","뮤트한 어스톤 코디"],avoidEn:["Beige/Camel Outfits","Muted Earthy Tones"]
    },
    celebs:{
      female: ["#도시적인_시크", "#볼드한_카리스마", "#독보적_아우라", "#백설공주_무드", "#대비감이_빛나는", "#차가운_버건디피플"],
      male: ["#시크한_냉미남", "#독보적_아우라", "#치명적인_모던함", "#볼드한_카리스마", "#블랙수트_정석", "#스틸블루_어반피플"]
    },
    celebsEn:{
      female: ["#UrbanChic", "#BoldCharisma", "#IceQueen", "#FlawlessContrast", "#RoyalBlueElegance", "#SharpSleekMinimal"],
      male: ["#CoolChicGentleman", "#VampireVibe", "#FatalModernity", "#BoldCharisma", "#PerfectBlackSuit", "#SleekSharpIntellect"]
    },
    scoreColor:"#4A6484",gradStops:["#253545","#1A2A38"],
  },
};

const FAQ_DATA: Record<string, { q: string; a: string }[]> = {
  ko: [
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
    {
      q: "본 진단기기에서 제공하는 이미지와 가이드를 블로그나 웹사이트에 안심하고 배포해도 되나요?",
      a: `네, 100% 완전 안전하며 자유로운 상업적 재배포와 웹사이트 인용이 전면 허용됩니다!

InSelf Color는 구글 애드센스 광고주 고품질 웹사이트 가이드라인(독창성, 저작재산권 보호, 투명도 확보)을 완벽하게 완수하도록 기획되었습니다.

1. 🚫 유명인 침해 요소 제로 (Anti-Celebrity-Theft Rule): 타 유사 진단 사이트에서 무단 인용하여 애드센스 계정 정지 사유가 되는 실존 연예인의 성명이나 미합의된 얼굴 초상권을 일체 도용하지 않습니다. 분석 결과는 '#사랑스러운_과즙미', '#은은한_라벤더' 같은 아름답게 정제된 키워드와 가독성 있는 '해시태그 페르소나' 형태로 출력되어 권리 관계 손실 위험을 완벽히 차단했습니다.
2. 🎨 100% 저작권 프리 뷰티 그래픽스 (Copyright-Free Visual Artworks): 계절 결과별 발급되는 스타일 IDPass 및 스타일 시각 이미지들은 저작권 허용 라이선스가 발급된 100% 원본 AI 생성 아트워크 및 무료 분배 라이선스(Unsplash/Pixabay 기준) 특수 리소스이므로, 저작권 분쟁으로부터 완벽하게 자유롭습니다.
3. 💼 도메인 점수 향상 및 상업적 이익: 본 이미지 다운로드 자산(📋 전체내용 이미지, 📸 SNS용 이미지 등)을 귀하의 네이버 블로그, 티스토리, 워드프레스 애드센스 수익형 사이트에 '독창적인 고해상도 정보 콘텐츠(High Unique Value Unit)'로 첨부하면 검색엔진 지표 최적화(SEO)에도 압도적으로 유리합니다.`
    }
  ],
  en: [
    {
      q: "Is personal color analysis accurate?",
      a: `Our diagnosis system automatically detects the skin region from your camera photo, analyzing precise RGB spectrums, warm/cool undertone ratio (the balance between yellow-gold and pink-blue bases), brightness, and saturation via a mathematical model.

While it cannot fully replicate physical draping (laying actual fabrics on your body) at a 100% match rate, it provides highly consistent and accurate results relative to objective color coordinates.

To get the most precise results, use photos taken under "direct/indirect natural light" (e.g. near a window) instead of indoor fluorescent, yellow, or red lights.

💡 Note: This is an algorithm-based self-test. Results may vary depending on camera devices and lighting environments. Use it as an exciting style tip and entertainment guide!`
    },
    {
      q: "What kind of photo is best to upload?",
      a: `For optimal skin tone scanning results, please prepare a photo that meets the following three conditions:

1. ☀️ Gentle Natural Light: Photos taken during daytime in natural indirect sunlight are highly recommended. Avoid overhead yellowish incandescent bulbs or direct flashes, which cause harsh highlights or yellow distortion.
2. 🚫 Clean Cam & No Filter: Mobile beauty filters (whitening halos, smoothing filters) distort your natural skin pigmets. Share an unedited original photo taken with your device's default camera application.
3. 👤 Front Angle & Minimized Makeup: Thick foundation covers your real skin chemistry. A bare face (sunscreen only) taken directly from the front with your eyes, forehead, and jawline fully visible yields the most precise classification.`
    },
    {
      q: "How are my uploaded photos handled?",
      a: `Your privacy is our utmost priority. InSelf Color never sends, saves, or stores your face images on external databases or cloud servers.

All calculations—such as pixel scanning, RGB extracting, and matching statistics—run exclusively in-memory inside your browser client. Once you close the tab or refresh the page, your photo is instantly and permanently destroyed, so you can enjoy the test with absolute peace of mind.`
    },
    {
      q: "Does my personal-color stay the same forever?",
      a: `Your primary genetic undertone (the warm/cool anchor) typically remains unchanged throughout your lifetime.

However, your sub-classification range (the best-matching brightness, saturation levels, and styling seasons) can shift slightly based on environmental changes:

• Dynamic Aging: Over time, subtle shifts in melanin and hemoglobin levels can lower skin transparency, calling for brighter or softer highlights.
• Sun Exposure & Tanning: Outdoor activities and sun-tanning darken your skin, slightly expanding the compatible brightness values to bold vivid limits.
• Wardrobe & Contrast: Changes in dyed hair colors, contact lenses, or styling make your look adjust across adjacent seasonal sub-types smoothly.`
    },
    {
      q: "Is it completely safe to share the generated style cards on ad-monetized blogs and websites?",
      a: `Absolutely! All downloads and screenshots are 100% royalty-free and commercial-redistribution safe.

InSelf Color strictly follows the transparency and copyright compliance doctrines set forth by Google AdSense quality guidelines:

1. 🚫 Anti-Celebrity-Theft: We reject deceptive placeholders. By displaying zero active celebrity names or likeness elements—substituting them with hashtags such as '#ElegantAura' and '#PureFreshPrince'—your blog stays fully compliant with AdSense intellectual property rules.
2. 🎨 Commercial Model Licensing: Every graphical portrait embedded in the style certificates is an AI-generated, high-fidelity premium design conforming to CC0/Unsplash distributor licenses. They are free of any legal copyright claims.
3. 💼 Boost Organic Search Rankings (SEO): Incorporating these high-design cards (📋 Full Content Card, 📸 SNS Card) into your blogs, Tistory, or WordPress sites adds "highly unique, rich informational visual content," which positively influences your search relevance and Domain Authority!`
    }
  ],
};

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

function getFormattedTimestamp() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${yyyy}${mm}${dd}_${hh}${min}`;
}

// Download result card
function downloadResultCard(season: any, scores: Record<string, number>, lang: "ko" | "en"){
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
  const seasonName = lang === "ko" ? season.name : season.nameEn;
  ctx.fillText(`${season.icon}  ${seasonName}`,W/2,108);
  ctx.font="italic 14px serif";ctx.fillStyle="rgba(255,255,255,0.82)";
  const seasonKeyword = lang === "ko" ? season.keyword : season.keywordEn;
  ctx.fillText(`"${seasonKeyword}"`,W/2,136);
  // Palette
  const sw=season.palette;const py=250;
  sw.forEach(({hex}: any, i: number)=>{
    const x=W/2+(i-(sw.length-1)/2)*66;
    ctx.beginPath();ctx.arc(x,py,24,0,Math.PI*2);
    ctx.fillStyle=hex;ctx.shadowColor="rgba(0,0,0,0.1)";ctx.shadowBlur=8;ctx.fill();ctx.shadowBlur=0;
    ctx.fillStyle="rgba(60,35,20,0.6)";ctx.font="9px sans-serif";ctx.textAlign="center";
    const swatchName = lang === "ko" ? season.palette[i].name : season.palette[i].nameEn;
    ctx.fillText(swatchName,x,py+36);
  });
  // Divider
  ctx.strokeStyle="rgba(196,149,106,0.22)";ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(60,308);ctx.lineTo(W-60,308);ctx.stroke();
  // Scores
  ctx.textAlign="left";
  const order=["spring","summer","autumn","winter"];
  order.forEach((key,i)=>{
    const y=330+i*60;const s=SEASONS[key];
    const sName = lang === "ko" ? s.name : s.nameEn;
    ctx.fillStyle="rgba(60,35,20,0.72)";ctx.font="12px sans-serif";
    ctx.fillText(`${s.icon} ${sName}`,60,y);
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
  const recoArr = lang === "ko" ? season.recommended : season.recommendedEn;
  recoArr.slice(0,5).forEach((r: string, i: number)=>{
    const tx=60+i*105,ty=614;
    ctx.fillStyle="rgba(196,149,106,0.10)";ctx.fillRect(tx,ty,94,24);
    ctx.strokeStyle="rgba(196,149,106,0.28)";ctx.lineWidth=1;ctx.strokeRect(tx,ty,94,24);
    ctx.fillStyle="rgba(100,60,30,0.82)";ctx.font="10px sans-serif";ctx.textAlign="center";
    ctx.fillText(r,tx+47,ty+16);
  });
  // Branding
  ctx.textAlign="center";ctx.fillStyle="rgba(180,140,100,0.45)";ctx.font="10px serif";
  const brandSub = lang === "ko" ? "InSelf Color  ·  나만의 컬러를 찾아보세요" : "InSelf Color  ·  Discover Your Personalized Vibe";
  ctx.fillText(brandSub,W/2,H-28);
  const a=document.createElement("a");
  a.download=`personal-color-${season.id}_${getFormattedTimestamp()}.png`;a.href=c.toDataURL("image/png");a.click();
}

// Download detailed high-design result card for SNS Virality - Portrait Luxury Editorial format
function downloadDetailedResultCard(
  season: any,
  scores: Record<string, number>,
  lang: "ko" | "en",
  customCelebs?: string[],
  activeCard?: { tag: string; imgPath: string },
  cardImg?: HTMLImageElement | null,
  userName?: string
){
  const W = 1000, H = 2600, dpr = 2;
  const c = document.createElement("canvas");
  c.width = W * dpr; c.height = H * dpr;
  const ctx = c.getContext("2d");
  if (!ctx) return;
  ctx.scale(dpr, dpr);

  // Helper map for converting worst/avoid color names to matching premium hex codes
  const colorNameToHex: Record<string, string> = {
    "와인레드": "#722F37", "다크네이비": "#1B2A4A", "블랙": "#1C1C1C", "딥퍼플": "#4B0082", "차콜그레이": "#36454F",
    "오렌지": "#FF5F1F", "골드": "#D4AF37", "카멜": "#C19A6B", "올리브그린": "#556B2F", "브릭레드": "#8E3A1F",
    "브라이트핑크": "#FF007F", "라벤더": "#C8A2C8", "네온컬러": "#39FF14", "실버": "#C0C0C0", "아이시블루": "#D0F0F0",
    "베이지": "#F5F5DC", "피치": "#FFDAB9", "코랄": "#FF7F50", "카키브라운": "#4B4D36", "황금빛": "#FFD700",
    "차가운 파스텔": "#B0E0E6", "형광": "#ADFF2F", "네온": "#00FF00", "올리브": "#808000",
    "Wine Red": "#722F37", "Dark Navy": "#1B2A4A", "Black": "#1C1C1C", "Deep Purple": "#4B0082", "Charcoal Gray": "#36454F",
    "Orange": "#FF5F1F", "Gold": "#D4AF37", "Camel": "#C19A6B", "Olive Green": "#556B2F", "Brick Red": "#8E3A1F",
    "Bright Pink": "#FF007F", "Lavender": "#C8A2C8", "Neon Colors": "#39FF14", "Silver": "#C0C0C0", "Icy Blue": "#D0F0F0",
    "Beige": "#F5F5DC", "Peach": "#FFDAB9", "Coral": "#FF7F50", "Warm Brown": "#8B5E3C"
  };

  // Helper: Draw rounded rectangle
  const drawRoundRect = (x: number, y: number, w: number, h: number, r: number, fill?: string | CanvasGradient, stroke?: string) => {
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
      ctx.lineWidth = 1.0;
      ctx.stroke();
    }
  };

  // Helper: Wrap text
  const wrapText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number, maxLines: number = 5) => {
    let words = text.split(" ");
    let line = "";
    let currentY = y;
    let linesDrawn = 0;

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + " ";
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, currentY);
        line = words[n] + " ";
        currentY += lineHeight;
        linesDrawn++;
        if (linesDrawn >= maxLines) {
          return currentY;
        }
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
    return currentY + lineHeight;
  };

  const getFormattedDate = () => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd}`;
  };

  // 1. Elegant cotton-rag ivory background
  ctx.fillStyle = "#FCFAF5";
  ctx.fillRect(0, 0, W, H);

  // Architectural hairline layout frame
  ctx.strokeStyle = "rgba(196,149,106,0.32)";
  ctx.lineWidth = 1;
  ctx.strokeRect(20, 20, W - 40, H - 40);
  ctx.strokeStyle = "rgba(196,149,106,0.12)";
  ctx.strokeRect(26, 26, W - 52, H - 52);

  // Corner crosshairs accent (+ style markings)
  ctx.strokeStyle = "rgba(196,149,106,0.4)";
  ctx.lineWidth = 1;
  const drawCross = (cx: number, cy: number) => {
    ctx.beginPath();
    ctx.moveTo(cx - 8, cy); ctx.lineTo(cx + 8, cy);
    ctx.moveTo(cx, cy - 8); ctx.lineTo(cx, cy + 8);
    ctx.stroke();
  };
  drawCross(20, 20); drawCross(W - 20, 20);
  drawCross(20, H - 20); drawCross(W - 20, H - 20);

  // 2. High-Fashion Editorial Header
  ctx.textAlign = "left";
  ctx.fillStyle = "#1E120A"; // Deep Charcoal Espresso
  ctx.font = "bold 25px Georgia, serif";
  ctx.fillText("✦  INSELF SPECTRUM DIAL", 50, 68);

  ctx.fillStyle = "rgba(122,96,82,0.72)";
  ctx.font = "bold 9px sans-serif";
  ctx.fillText("OFFICIAL PERSONAL COLOR CLINICAL REPORT & AESTHETIC BLUEPRINT", 50, 90);

  const passengerName = userName && userName.trim() ? userName.trim().toUpperCase() : "INSELF GUEST REGISTRY";
  const uniqueId = `IS-${season.id.substring(0,3).toUpperCase()}-${Math.floor(100000 + Math.random()*900000)}`;

  ctx.textAlign = "right";
  ctx.font = "bold 11px monospace";
  ctx.fillStyle = "#C4956A";
  ctx.fillText(`SERIAL: ${uniqueId}`, 950, 56);

  ctx.font = "normal 10px sans-serif";
  ctx.fillStyle = "rgba(122,96,82,0.8)";
  ctx.fillText(`CANDIDATE: ${passengerName}`, 950, 74);
  ctx.fillText(`DIAGNOSED: ${getFormattedDate()}`, 950, 90);
  
  // Clean thin horizontal dividing rules
  ctx.strokeStyle = "rgba(196,149,106,0.22)";
  ctx.beginPath();
  ctx.moveTo(50, 110);
  ctx.lineTo(950, 110);
  ctx.stroke();

  // ═══════════════════════════════════════════════════════════
  // SECTION 01: PERSONAL IDENTITY & FOCUS VISUAL (Y: 130 ~ 680)
  // ═══════════════════════════════════════════════════════════
  ctx.textAlign = "left";
  ctx.fillStyle = "#C4956A";
  ctx.font = "bold 9px sans-serif";
  ctx.fillText("01  /  SEASON CONTEXT & REPRESENTATIVE VISUAL", 50, 135);

  // Representative Mood Image Frame (With golden frame outline, vertical portrait layout)
  const imgX = 50, imgY = 160, imgW = 350, imgH = 490;
  if (cardImg) {
    ctx.save();
    ctx.beginPath();
    const r = 12;
    ctx.moveTo(imgX + r, imgY);
    ctx.lineTo(imgX + imgW - r, imgY);
    ctx.quadraticCurveTo(imgX + imgW, imgY, imgX + imgW, imgY + r);
    ctx.lineTo(imgX + imgW, imgY + imgH - r);
    ctx.quadraticCurveTo(imgX + imgW, imgY + imgH, imgX + imgW - r, imgY + imgH);
    ctx.lineTo(imgX + r, imgY + imgH);
    ctx.quadraticCurveTo(imgX, imgY + imgH, imgX, imgY + imgH - r);
    ctx.lineTo(imgX, imgY + r);
    ctx.quadraticCurveTo(imgX, imgY, imgX + r, imgY);
    ctx.closePath();
    ctx.clip();
    
    // Draw fine warm gallery backing fill inside clipped area
    ctx.fillStyle = "rgba(196,149,106,0.06)";
    ctx.fillRect(imgX, imgY, imgW, imgH);

    try {
      const imgRatio = cardImg.width / cardImg.height;
      const targetRatio = imgW / imgH;

      const zoom = 1.22; // 22% scale up to crop and fill nicely
      let sWidth = cardImg.width;
      let sHeight = cardImg.height;
      let sx = 0;
      let sy = 0;

      if (imgRatio > targetRatio) {
        // Wide image: crop horizontally
        sHeight = cardImg.height / zoom;
        sWidth = sHeight * targetRatio;
        sx = (cardImg.width - sWidth) / 2;
        sy = Math.max(0, (cardImg.height - sHeight) * 0.15);
      } else {
        // Tall image: crop vertically
        sWidth = cardImg.width / zoom;
        sHeight = sWidth / targetRatio;
        sx = (cardImg.width - sWidth) / 2;
        // Shift crop frame UP so that we show more of the head/hair (12% of remaining height offset)
        sy = Math.max(0, (cardImg.height - sHeight) * 0.12);
      }

      ctx.drawImage(cardImg, sx, sy, sWidth, sHeight, imgX, imgY, imgW, imgH);
    } catch (e) {
      console.warn("Could not draw representative image", e);
    }
    ctx.restore();
    drawRoundRect(imgX, imgY, imgW, imgH, 12, undefined, "rgba(196,149,106,0.25)");
  } else {
    const grad = ctx.createLinearGradient(imgX, imgY, imgX + imgW, imgY + imgH);
    grad.addColorStop(0, season.gradStops?.[0] || "#E8EEF8");
    grad.addColorStop(1, season.gradStops?.[1] || "#C0CFEA");
    drawRoundRect(imgX, imgY, imgW, imgH, 12, grad, "rgba(196,149,106,0.18)");
    
    ctx.fillStyle = "#2D1E12";
    ctx.font = "bold 13px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("[ Aesthetic Color Swatch Gradient ]", imgX + imgW/2, imgY + imgH/2);
    ctx.textAlign = "left";
  }

  // Right side of Section 1 (Detail Description columns - widened and balanced)
  const sideX = 430, sideW = 520;
  ctx.fillStyle = "#1E120A";
  ctx.font = "bold 32px Georgia, serif";
  const masterSeasonName = lang === "ko" ? season.name : season.nameEn;
  ctx.fillText(`${season.icon}  ${masterSeasonName}`, sideX, 205);

  // Elegant Signature tag badging
  const signatureTag = activeCard ? activeCard.tag : (lang === "ko" ? "#인셀프_시그니처_바이온" : "#InSelfCustomVibe");
  ctx.font = "bold 9.5px sans-serif";
  const specPillW = ctx.measureText(signatureTag).width + 18;
  drawRoundRect(sideX, 222, specPillW, 20, 4, "rgba(196,149,106,0.05)", "rgba(196,149,106,0.25)");
  ctx.fillStyle = "#B08055";
  ctx.fillText(signatureTag, sideX + 9, 235);

  // Deep spacing Italian luxury Cursive keyword
  ctx.font = "italic bold 15px Georgia, serif";
  ctx.fillStyle = "#8B5E3C";
  const signatureKeyword = lang === "ko" ? `"${season.keyword}"` : `"${season.keywordEn}"`;
  ctx.fillText(signatureKeyword, sideX, 272);

  // Description narrative
  ctx.font = "normal 11.5px sans-serif";
  ctx.fillStyle = "rgba(61,43,26,0.85)";
  const descString = lang === "ko" ? season.description : season.descriptionEn;
  wrapText(descString, sideX, 295, sideW, 18.5, 5);

  // On-Screen Feature Inclusion: Subtypes
  ctx.fillStyle = "#C4956A";
  ctx.font = "bold 9px sans-serif";
  ctx.fillText("✦ DYNAMIC SUBTYPES / CLASSIFICATION", sideX, 430);

  const subtypesList = lang === "ko" ? season.subtypes : season.subtypesEn;
  let subX = sideX;
  subtypesList.forEach((sub: string) => {
    ctx.font = "normal 10px sans-serif";
    const tw = ctx.measureText(sub).width + 14;
    drawRoundRect(subX, 444, tw, 20, 3, "rgba(196,149,106,0.04)", "rgba(196,149,106,0.18)");
    ctx.fillStyle = "#4C382A";
    ctx.fillText(sub, subX + 7, 457);
    subX += tw + 8;
  });

  // On-Screen Feature Inclusion: Characteristics profile
  ctx.fillStyle = "#C4956A";
  ctx.font = "bold 9px sans-serif";
  ctx.fillText("✦ AESTHETIC PROFILE & INDIVIDUAL SIGNALS", sideX, 505);

  const charList = lang === "ko" ? season.characteristics : season.characteristicsEn;
  charList.slice(0, 3).forEach((char: string, idx: number) => {
    const cy = 530 + idx * 24;
    ctx.fillStyle = "#8B5E3C";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText("•", sideX, cy + 9);
    ctx.fillStyle = "rgba(61,43,26,0.9)";
    ctx.font = "normal 11px sans-serif";
    ctx.fillText(char, sideX + 12, cy + 9, sideW - 14);
  });

  // Section divider line
  ctx.strokeStyle = "rgba(196,149,106,0.16)";
  ctx.beginPath(); ctx.moveTo(50, 670); ctx.lineTo(950, 670); ctx.stroke();

  // ═══════════════════════════════════════════════════════════
  // SECTION 02: DIAGNOSTIC MATRIX ANALYSIS (Y: 700 ~ 905)
  // ═══════════════════════════════════════════════════════════
  ctx.fillStyle = "#C4956A";
  ctx.font = "bold 9px sans-serif";
  ctx.fillText("02  /  DIAGNOSTIC ANALYSIS MATRIX WITH ACCUMULATIVE SCORES", 50, 700);

  // Left Matrix Gauges
  const sortedKeysList = Object.keys(scores).sort((a,b) => scores[b] - scores[a]);
  const gaugeLX = 50, gaugeLW = 400;
  sortedKeysList.forEach((key, kIdx) => {
    if (kIdx > 3) return;
    const yLine = 730 + kIdx * 35;
    const s = SEASONS[key];
    if (!s) return;
    const sName = lang === "ko" ? s.name.replace(" 타입","") : s.nameEn;
    const currentScore = scores[key] || 0;

    ctx.fillStyle = "#1E120A";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText(`${s.icon} ${sName}`, gaugeLX, yLine + 9);

    const railX = 140;
    const railW = 200;
    ctx.fillStyle = "rgba(196,149,106,0.12)";
    ctx.fillRect(railX, yLine + 5, railW, 4);

    ctx.fillStyle = s.scoreColor || "#C4956A";
    const fillW = railW * (currentScore / 100);
    ctx.fillRect(railX, yLine + 5, fillW, 4);

    ctx.beginPath();
    ctx.arc(railX + fillW, yLine + 7, 5, 0, Math.PI * 2);
    ctx.fillStyle = s.scoreColor || "#C4956A";
    ctx.fill();
    ctx.strokeStyle = "#FCFAF5";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.textAlign = "right";
    ctx.font = "bold 10px monospace";
    ctx.fillStyle = "#4C382A";
    ctx.fillText(`${currentScore}%`, gaugeLX + gaugeLW, yLine + 9);
    ctx.textAlign = "left";
  });

  // Right Quote & Spectrum Narrative
  ctx.fillStyle = "#8B5E3C";
  ctx.font = "italic bold 14px Georgia, serif";
  ctx.fillText("✦ Optimal Resonance Ratio", sideX, 735);

  ctx.fillStyle = "rgba(122,96,82,0.85)";
  ctx.font = "normal 11px sans-serif";
  const ratioNote = lang === "ko"
    ? "이 분석 매트릭스는 후보자님의 피부 광택 데이터와 이목구비 음영 대비율을 결합하여 산출해 낸 최적의 신체 스펙트럼 배합 수치입니다."
    : "This diagnostic calibration index details the visual contrast ratio between skin clarity and facial illumination parameters.";
  wrapText(ratioNote, sideX, 762, sideW, 17, 4);

  // Section divider line
  ctx.strokeStyle = "rgba(196,149,106,0.16)";
  ctx.beginPath(); ctx.moveTo(50, 905); ctx.lineTo(950, 905); ctx.stroke();

  // ═══════════════════════════════════════════════════════════
  // SECTION 03: THE PAINT DECK COLOR PALETTE (Y: 935 ~ 1165)
  // ═══════════════════════════════════════════════════════════
  ctx.fillStyle = "#C4956A";
  ctx.font = "bold 9px sans-serif";
  ctx.fillText("03  /  RECOMMENDED PERSONAL COLOR SWATCHES & DESIGNER DECKS", 50, 935);

  const swX_start = 50;
  const swCardW = 132;
  const swCardH = 175;
  const swGap = 18;
  const listPalette = season.palette || [];

  listPalette.forEach(({hex, name, nameEn}: any, i: number) => {
    if (i > 5) return; // Top 6 colors limit
    const cx_card = swX_start + i * (swCardW + swGap);
    const cy_card = 960;

    // Premium Rounded Swatch Card Frame
    drawRoundRect(cx_card, cy_card, swCardW, swCardH, 8, "rgba(255,255,255,0.85)", "rgba(196,149,106,0.18)");

    // Inner Upper block (the direct solid color coat)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx_card + 3, cy_card + 3);
    ctx.lineTo(cx_card + swCardW - 3, cy_card + 3);
    ctx.quadraticCurveTo(cx_card + swCardW, cy_card + 3, cx_card + swCardW, cy_card + 6);
    ctx.lineTo(cx_card + swCardW, cy_card + 115);
    ctx.lineTo(cx_card, cy_card + 115);
    ctx.lineTo(cx_card, cy_card + 6);
    ctx.quadraticCurveTo(cx_card, cy_card + 3, cx_card + 3, cy_card + 3);
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = hex;
    ctx.fillRect(cx_card, cy_card, swCardW, 115);
    ctx.restore();

    // Matte White Paper Bottom Info Area
    ctx.fillStyle = "#1E120A";
    ctx.font = "bold 9.5px sans-serif";
    ctx.textAlign = "center";
    const labelLabel = lang === "ko" ? name : nameEn;
    ctx.fillText(labelLabel, cx_card + swCardW/2, cy_card + swCardH - 34, swCardW - 10);

    ctx.fillStyle = "rgba(122,96,82,0.65)";
    ctx.font = "normal 8.5px monospace";
    ctx.fillText(hex.toUpperCase(), cx_card + swCardW/2, cy_card + swCardH - 14);
  });
  ctx.textAlign = "left"; // reset

  // Section divider line
  ctx.strokeStyle = "rgba(196,149,106,0.16)";
  ctx.beginPath(); ctx.moveTo(50, 1165); ctx.lineTo(950, 1165); ctx.stroke();

  // ═══════════════════════════════════════════════════════════
  // SECTION 04: COUTURE STYLING & BEAUTY MATRICES (Y: 1195 ~ 1680)
  // ═══════════════════════════════════════════════════════════
  ctx.fillStyle = "#C4956A";
  ctx.font = "bold 9px sans-serif";
  ctx.fillText("04  /  COUTURE DIAGNOSTICS & BESPOKE CURATION MATRICES", 50, 1195);

  const colY = 1225;
  const colA_X = 50, colA_W = 430;
  const colB_X = 520, colB_W = 430;

  // Let's print column A: BEAUTY/MAKEUP COUTURE
  ctx.fillStyle = "#1E120A";
  ctx.font = "bold 15px Georgia, serif";
  ctx.fillText("💄  COUTURE BEAUTY & SKIN COALITION", colA_X, colY);

  const beautyItems = [
    { title: lang === "ko" ? "피부 베이스 (Skin Base)" : "Skin Base", val: lang === "ko" ? season.makeup.foundation : season.makeup.foundationEn },
    { title: lang === "ko" ? "블러셔 (Cheek Blush)" : "Cheek Blush", val: lang === "ko" ? season.makeup.blush : season.makeup.blushEn },
    { title: lang === "ko" ? "아이 메이크업 (Eye Accent)" : "Eye Accent", val: lang === "ko" ? season.makeup.eye : season.makeup.eyeEn },
    { title: lang === "ko" ? "립 메이크업 (Lip Color)" : "Lip Color", val: lang === "ko" ? season.makeup.lip : season.makeup.lipEn }
  ];

  beautyItems.forEach((b, idx) => {
    const itemY = colY + 35 + idx * 82;
    ctx.fillStyle = "#8B5E3C";
    ctx.font = "bold 10px sans-serif";
    ctx.fillText(`• ${b.title.toUpperCase()}`, colA_X, itemY);

    ctx.fillStyle = "rgba(61,43,26,0.9)";
    ctx.font = "normal 11px sans-serif";
    wrapText(b.val, colA_X + 10, itemY + 16, colA_W - 10, 16.5, 3);
  });

  // On-Screen Feature Inclusion: Makeup color chips/dots
  ctx.fillStyle = "#8B5E3C";
  ctx.font = "bold 9px sans-serif";
  ctx.fillText("✦ BEAUTY ACCENT COLOR CHIPS", colA_X, 1590);

  const dotColors = season.makeup.dots || [];
  dotColors.forEach((colorHex: string, chipIdx: number) => {
    const cx = colA_X + chipIdx * 28;
    const cy = 1618;
    ctx.beginPath();
    ctx.arc(cx, cy, 9, 0, Math.PI * 2);
    ctx.fillStyle = colorHex;
    ctx.fill();
    ctx.strokeStyle = "rgba(196,149,106,0.25)";
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // Let's print column B: APPAREL/WARDROBE COUTURE
  ctx.fillStyle = "#1E120A";
  ctx.font = "bold 15px Georgia, serif";
  ctx.fillText("👔  WARDROBE ARCHITECT & APPAREL MATRICES", colB_X, colY);

  const wardrobeItems = [
    { title: lang === "ko" ? "스타일링 무드 (Couture Mood)" : "Signature Couture Mood", val: lang === "ko" ? season.fashion.style : season.fashion.styleEn },
    { title: lang === "ko" ? "베스트 아웃핏 (Key Pieces)" : "Key Outfit Pieces", val: lang === "ko" ? season.fashion.items.join(", ") : season.fashion.itemsEn.join(", ") },
    { title: lang === "ko" ? "추천 질감 & 원단 (Fabric Textures)" : "Recommended Fabrics", val: lang === "ko" ? season.fashion.fabrics.join(", ") : season.fashion.fabricsEn.join(", ") },
    { title: lang === "ko" ? "헤어 컬러 차트 (Curated Hair)" : "Curated Hair Tones", val: lang === "ko" ? (season.hairGuide || "가볍고 경쾌한 브라운 컬") : (season.hairGuideEn || "Light vibrant brown shades") }
  ];

  wardrobeItems.forEach((w, idx) => {
    const itemY = colY + 35 + idx * 82;
    ctx.fillStyle = "#8B5E3C";
    ctx.font = "bold 10px sans-serif";
    ctx.fillText(`• ${w.title.toUpperCase()}`, colB_X, itemY);

    ctx.fillStyle = "rgba(61,43,26,0.9)";
    ctx.font = "normal 11px sans-serif";
    wrapText(w.val, colB_X + 10, itemY + 16, colB_W - 10, 16.5, 3);
  });

  // Section divider line
  ctx.strokeStyle = "rgba(196,149,106,0.16)";
  ctx.beginPath(); ctx.moveTo(50, 1680); ctx.lineTo(950, 1680); ctx.stroke();

  // ═══════════════════════════════════════════════════════════
  // SECTION 05: AVOIDANCE CAUTIONS & ALERTS (Y: 1710 ~ 1915)
  // ═══════════════════════════════════════════════════════════
  ctx.fillStyle = "#A44E44"; // Elegant Warn Maroon Red
  ctx.font = "bold 9px sans-serif";
  ctx.fillText("05  /  AVOIDANCE ALERTS & STYLING WARNINGS (RED FLAGS)", 50, 1710);

  const warnY = 1740;

  // Left side: Worst Color Warning chips
  ctx.fillStyle = "#4C382A";
  ctx.font = "bold 11px sans-serif";
  ctx.fillText(lang === "ko" ? "⚠️  피해야 할 워스트 색상" : "⚠️  Recommended Worst Palette", 50, warnY);

  const avoidList = season.avoid || [];
  const startX_av = 50 + 10;
  const avY_circle = 1800;

  avoidList.forEach((colName: string, i: number) => {
    if (i > 3) return; // limit to 4
    const cx_av = startX_av + i * 85;
    const hexVal = colorNameToHex[colName] || "#D3D3D3";

    // Circle color disk
    ctx.beginPath();
    ctx.arc(cx_av, avY_circle, 22, 0, Math.PI * 2);
    ctx.fillStyle = hexVal;
    ctx.fill();
    ctx.strokeStyle = "rgba(164,78,68,0.35)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Red cancel markers cross
    ctx.strokeStyle = "#A44E44";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(cx_av - 11, avY_circle - 11);
    ctx.lineTo(cx_av + 11, avY_circle + 11);
    ctx.moveTo(cx_av + 11, avY_circle - 11);
    ctx.lineTo(cx_av - 11, avY_circle + 11);
    ctx.stroke();

    // label text
    ctx.fillStyle = "#1E120A";
    ctx.font = "bold 9px sans-serif";
    ctx.textAlign = "center";
    const avoidLabelStr = lang === "ko" ? colName : (season.avoidEn?.[i] || colName);
    ctx.fillText(avoidLabelStr, cx_av, avY_circle + 40, 80);
  });
  ctx.textAlign = "left"; // reset

  // Right side: Worst Wear Alert Text
  ctx.fillStyle = "#A44E44";
  ctx.font = "bold 11.5px sans-serif";
  ctx.fillText(lang === "ko" ? "⚠️  피해야 할 스타일링 경고" : "⚠️  Apparel Guidelines to Avoid", sideX, warnY);

  ctx.fillStyle = "rgba(61,43,26,0.92)";
  ctx.font = "normal 11px sans-serif";
  const fashionAvoidVal = lang === "ko" ? season.fashion.avoid.join(", ") : season.fashion.avoidEn.join(", ");
  const curWarnTextY = wrapText(`${lang === "ko" ? "최악의 착장" : "Worst Apparel"}: ${fashionAvoidVal}`, sideX, warnY + 28, sideW, 16.5, 3) + 12;

  const styleTipStr = lang === "ko" ? season.tip : season.tipEn;
  wrapText(`${lang === "ko" ? "스타일 가이드" : "Styling Tip"}: ${styleTipStr}`, sideX, curWarnTextY + 6, sideW, 16.5, 3);

  // Section divider line
  ctx.strokeStyle = "rgba(196,149,106,0.16)";
  ctx.beginPath(); ctx.moveTo(50, 1915); ctx.lineTo(950, 1915); ctx.stroke();

  // ═══════════════════════════════════════════════════════════
  // SECTION 06: ESTHETIC HARMONY & DETAILED COLOR CHARTS (Y: 1945 ~ 2110)
  // ═══════════════════════════════════════════════════════════
  ctx.fillStyle = "#C4956A";
  ctx.font = "bold 9px sans-serif";
  ctx.fillText("06  /  ESTHETIC COLOR HARMONY & CONTRAST CALIBRATION", 50, 1945);

  const detY = 1975;
  // Left Side: Best Colors
  ctx.fillStyle = "#1E120A";
  ctx.font = "bold 11px sans-serif";
  ctx.fillText(lang === "ko" ? "✅  어울리는 베스트 색상표" : "✅  Recommended Harmonious Palette", 50, detY);

  ctx.fillStyle = "rgba(61,43,26,0.9)";
  ctx.font = "normal 11.5px sans-serif";
  const bestColors = lang === "ko" ? season.recommended : season.recommendedEn;
  wrapText(bestColors.join("  ·  "), 50, detY + 30, colA_W, 18, 4);

  // Right Side: Avoid Colors
  ctx.fillStyle = "#A44E44";
  ctx.font = "bold 11px sans-serif";
  ctx.fillText(lang === "ko" ? "❌  자제해야 할 세부 색상" : "❌  Clashing Colors to Minimize", sideX, detY);

  ctx.fillStyle = "rgba(61,43,26,0.9)";
  ctx.font = "normal 11.5px sans-serif";
  const avoidColorsLst = lang === "ko" ? season.avoid : season.avoidEn;
  wrapText(avoidColorsLst.join("  ·  "), sideX, detY + 30, colB_W, 18, 4);

  // Section divider line
  ctx.strokeStyle = "rgba(196,149,106,0.16)";
  ctx.beginPath(); ctx.moveTo(50, 2110); ctx.lineTo(950, 2110); ctx.stroke();

  // ═══════════════════════════════════════════════════════════
  // SECTION 07: CELEBRITY MOOD & TAG REFERENCE (Y: 2140 ~ 2275)
  // ═══════════════════════════════════════════════════════════
  ctx.fillStyle = "#C4956A";
  ctx.font = "bold 9px sans-serif";
  ctx.fillText("07  /  SIGNATURE REPLICAS & ACCENT CELEBRITY QUALITY TAGS", 50, 2140);

  ctx.fillStyle = "#1E120A";
  ctx.font = "bold 11px sans-serif";
  ctx.fillText(lang === "ko" ? "✦ 대표 키워드 & 무드 태그 조합" : "✦ Representative Keywords & Custom Mood Tags", 50, 2165);

  const rCelebs = lang === "ko" ? customCelebs || [] : customCelebs || [];
  let badgeX = 50;
  let badgeY = 2190;
  rCelebs.forEach((tag: string) => {
    ctx.font = "bold 10px sans-serif";
    const tagW = ctx.measureText(tag).width + 20;
    if (badgeX + tagW > 950) {
      badgeX = 50;
      badgeY += 28;
    }
    // Draw pretty tag capsule
    drawRoundRect(badgeX, badgeY, tagW, 22, 11, "rgba(196,149,106,0.06)", "rgba(196,149,106,0.2)");
    ctx.fillStyle = "#8B5E3C";
    ctx.fillText(tag, badgeX + 10, badgeY + 14);
    badgeX += tagW + 12;
  });

  // Section divider line before footer
  ctx.strokeStyle = "rgba(196,149,106,0.22)";
  ctx.beginPath(); ctx.moveTo(50, 2375); ctx.lineTo(950, 2375); ctx.stroke();

  // ═══════════════════════════════════════════════════════════
  // SECTION 08: BRANDING INTEGRITY, BARCODE & STAMP (Y: 2400 ~ 2580)
  // ═══════════════════════════════════════════════════════════
  
  // A. Quality certification decorative concentric seal stamp (Left)
  ctx.save();
  ctx.strokeStyle = "rgba(196,149,106,0.3)";
  ctx.lineWidth = 0.8;
  const stampX = 140, stampY = 2465;
  ctx.beginPath(); ctx.arc(stampX, stampY, 40, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(stampX, stampY, 36, 0, Math.PI * 2); ctx.stroke();
  
  ctx.fillStyle = "rgba(196,149,106,0.55)";
  ctx.font = "bold 6px monospace";
  ctx.textAlign = "center";
  ctx.fillText("AUTHENTICITY", stampX, stampY - 10);
  ctx.font = "bold 8px sans-serif";
  ctx.fillText("INSELF", stampX, stampY + 2);
  ctx.font = "bold 6px monospace";
  ctx.fillText("VERIFIED SPECTRA", stampX, stampY + 14);
  ctx.restore();

  // B. Editorial Copyright Center Stamp
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(180,140,100,0.52)";
  ctx.font = "normal 9px sans-serif";
  ctx.fillText("DESIGNED BY INSELF STUDIO   ·   ALL SPECTRUM SPECIFICATIONS REGISTERED", W / 2, 2442);
  ctx.fillText("DISCOVER YOUR DEEPEST COGNITIVE AESTHETICS AND AUTHENTIC PERSONAL COLOR", W / 2, 2458);
  ctx.fillText("✓ 100% ROYALTY-FREE INTELLECTUAL PROPERTY SAFE FOR COMMERCIAL DISTRIBUTION", W / 2, 2474);

  // C. Designer Security Barcode block (Right)
  const barX = 730, barY = 2432, barW = 200, barH = 34;
  ctx.fillStyle = "#1E120A";
  // Draw random unique barcodes
  let curX = barX;
  const barPatterns = [2,1,2,3,1,1,2,3,1,4,1,2,1,1,3,2,1,1,2,1,3,1,1,4,1,1,3,2,2];
  for (let b = 0; b < barPatterns.length; b++) {
    const singleW = barPatterns[b];
    if (b % 2 === 0) {
      ctx.fillRect(curX, barY, singleW * 1.5, barH);
    }
    curX += singleW * 1.5 + 1.2;
  }
  // Alphanumeric Serial below barcode
  ctx.fillStyle = "rgba(122,96,82,0.8)";
  ctx.font = "bold 8.5px monospace";
  ctx.textAlign = "center";
  ctx.fillText(`* ${uniqueId} *`, barX + barW/2, barY + barH + 11);

  // Trigger Download
  const a = document.createElement("a");
  a.download = `inself-style-master-report-${season.id}_${getFormattedTimestamp()}.png`;
  a.href = c.toDataURL("image/png");
  a.click();
}

// Download detailed high-design result card for SNS Virality - Bento Boxes layout
function downloadSnsCard(
  season: any,
  scores: Record<string, number>,
  lang: "ko" | "en",
  customCelebs?: string[],
  activeCard?: { tag: string; imgPath: string },
  cardImg?: HTMLImageElement | null,
  userName?: string
){
  const W=1280,H=720,dpr=2;
  const c=document.createElement("canvas");
  c.width=W*dpr;c.height=H*dpr;
  const ctx=c.getContext("2d");
  if (!ctx) return;
  ctx.scale(dpr,dpr);

  // Helper map for converting worst/avoid color names to matching premium hex codes
  const colorNameToHex: Record<string, string> = {
    "와인레드": "#722F37", "다크네이비": "#1B2A4A", "블랙": "#1C1C1C", "딥퍼플": "#4B0082", "차콜그레이": "#36454F",
    "오렌지": "#FF5F1F", "골드": "#D4AF37", "카멜": "#C19A6B", "올리브그린": "#556B2F", "브릭레드": "#8E3A1F",
    "브라이트핑크": "#FF007F", "라벤더": "#C8A2C8", "네온컬러": "#39FF14", "실버": "#C0C0C0", "아이시블루": "#D0F0F0",
    "베이지": "#F5F5DC", "피치": "#FFDAB9", "코랄": "#FF7F50", "카키브라운": "#4B4D36", "황금빛": "#FFD700",
    "차가운 파스텔": "#B0E0E6", "형광": "#ADFF2F", "네온": "#00FF00", "올리브": "#808000",
    "Wine Red": "#722F37", "Dark Navy": "#1B2A4A", "Black": "#1C1C1C", "Deep Purple": "#4B0082", "Charcoal Gray": "#36454F",
    "Orange": "#FF5F1F", "Gold": "#D4AF37", "Camel": "#C19A6B", "Olive Green": "#556B2F", "Brick Red": "#8E3A1F",
    "Bright Pink": "#FF007F", "Lavender": "#C8A2C8", "Neon Colors": "#39FF14", "Silver": "#C0C0C0", "Icy Blue": "#D0F0F0",
    "Beige": "#F5F5DC", "Peach": "#FFDAB9", "Coral": "#FF7F50", "Warm Brown": "#8B5E3C"
  };

  // Helper: Draw rounded rectangle
  const drawRoundRect = (x: number, y: number, w: number, h: number, r: number, fill?: string | CanvasGradient, stroke?: string) => {
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
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
  };

  // Helper: Wrap text that automatically shrinks if it overflows slightly
  const wrapText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number, maxLines: number = 3) => {
    let words = text.split(" ");
    let line = "";
    let currentY = y;
    let linesDrawn = 0;

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + " ";
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, currentY);
        line = words[n] + " ";
        currentY += lineHeight;
        linesDrawn++;
        if (linesDrawn >= maxLines) {
          return currentY;
        }
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
    return currentY + lineHeight;
  };

  const getFormattedDate = () => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd}`;
  };

  ctx.fillStyle = "#FBF9F5"; // Elegant cotton sand off-white
  ctx.fillRect(0, 0, W, H);

  // Geometric layout border framing
  ctx.strokeStyle = "rgba(196,149,106,0.32)";
  ctx.lineWidth = 1;
  ctx.strokeRect(18, 18, W - 36, H - 36);
  ctx.strokeStyle = "rgba(196,149,106,0.12)";
  ctx.strokeRect(23, 23, W - 46, H - 46);

  // 2. High-Fashion Editorial Header
  ctx.textAlign = "left";
  ctx.fillStyle = "#2D1E12"; // Deep Espresso Charcoal
  ctx.font = "bold 23px serif";
  ctx.fillText("✦  INSELF STYLE MASTER REPORT", 48, 62);

  ctx.fillStyle = "rgba(122,96,82,0.72)";
  ctx.font = "bold 9.5px sans-serif";
  ctx.fillText("PREMIUM PERSONAL COLOR DIAGNOSIS & Bespoke STYLE REPORT", 48, 83);

  const passengerName = userName && userName.trim() ? userName.trim().toUpperCase() : "INSELF GUEST";
  const uniqueId = `IS-${season.id.substring(0,3).toUpperCase()}-${Math.floor(100000 + Math.random()*900000)}`;

  ctx.textAlign = "right";
  ctx.font = "bold 11px monospace";
  ctx.fillStyle = "#C4956A";
  ctx.fillText(`ID: ${uniqueId}`, 1230, 50);

  ctx.font = "normal 10.5px sans-serif";
  ctx.fillStyle = "rgba(122,96,82,0.8)";
  ctx.fillText(`PASSENGER: ${passengerName}`, 1230, 68);
  ctx.fillText(`ISSUED: ${getFormattedDate()}`, 1230, 84);
  
  // Clean horizontal divider rule
  ctx.strokeStyle = "rgba(196,149,106,0.22)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(48, 102);
  ctx.lineTo(1230, 102);
  ctx.stroke();

  // ═══════════════════════════════════════════════════════════
  // COLUMN 1: PERSONAL IDENTITY (X: 48 ~ 370)
  // ═══════════════════════════════════════════════════════════
  ctx.textAlign = "left";

  const imgX = 68, imgY = 125, imgW = 280, imgH = 390;
  if (cardImg) {
    ctx.save();
    ctx.beginPath();
    const r = 12;
    ctx.moveTo(imgX + r, imgY);
    ctx.lineTo(imgX + imgW - r, imgY);
    ctx.quadraticCurveTo(imgX + imgW, imgY, imgX + imgW, imgY + r);
    ctx.lineTo(imgX + imgW, imgY + imgH - r);
    ctx.quadraticCurveTo(imgX + imgW, imgY + imgH, imgX + imgW - r, imgY + imgH);
    ctx.lineTo(imgX + r, imgY + imgH);
    ctx.quadraticCurveTo(imgX, imgY + imgH, imgX, imgY + imgH - r);
    ctx.lineTo(imgX, imgY + r);
    ctx.quadraticCurveTo(imgX, imgY, imgX + r, imgY);
    ctx.closePath();
    ctx.clip();
    
    // Draw fine warm gallery backing fill inside clipped area
    ctx.fillStyle = "rgba(196,149,106,0.06)";
    ctx.fillRect(imgX, imgY, imgW, imgH);

    try {
      const imgRatio = cardImg.width / cardImg.height;
      const targetRatio = imgW / imgH;

      const zoom = 1.22; // 22% scale up to crop and fill nicely
      let sWidth = cardImg.width;
      let sHeight = cardImg.height;
      let sx = 0;
      let sy = 0;

      if (imgRatio > targetRatio) {
        // Wide image: crop horizontally
        sHeight = cardImg.height / zoom;
        sWidth = sHeight * targetRatio;
        sx = (cardImg.width - sWidth) / 2;
        sy = Math.max(0, (cardImg.height - sHeight) * 0.15);
      } else {
        // Tall image: crop vertically
        sWidth = cardImg.width / zoom;
        sHeight = sWidth / targetRatio;
        sx = (cardImg.width - sWidth) / 2;
        // Shift crop frame UP to preserve head/hair (12% of remaining height offset)
        sy = Math.max(0, (cardImg.height - sHeight) * 0.12);
      }

      ctx.drawImage(cardImg, sx, sy, sWidth, sHeight, imgX, imgY, imgW, imgH);
    } catch (e) {
      console.warn("Could not draw representative image", e);
    }
    ctx.restore();
    
    // Fine golden frame around the image clip
    drawRoundRect(imgX, imgY, imgW, imgH, 12, undefined, "rgba(196,149,106,0.22)");
  } else {
    // Elegant dynamic color tone gradient wash
    const grad = ctx.createLinearGradient(imgX, imgY, imgX + imgW, imgY + imgH);
    grad.addColorStop(0, season.gradStops?.[0] || "#E8EEF8");
    grad.addColorStop(1, season.gradStops?.[1] || "#C0CFEA");
    drawRoundRect(imgX, imgY, imgW, imgH, 12, grad, "rgba(196,149,106,0.18)");
    
    ctx.fillStyle = "#2D1E12";
    ctx.font = "bold 13px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("[ Aesthetic Color Swatch ]", imgX + imgW/2, imgY + imgH/2);
    ctx.textAlign = "left";
  }

  // Detected Season Tone title label (shifted down slightly for increased image height)
  ctx.fillStyle = "#2D1E12";
  ctx.font = "bold 23px serif";
  const masterSeasonName = lang === "ko" ? season.name : season.nameEn;
  ctx.fillText(`${season.icon}  ${masterSeasonName}`, 48, 544);

  // Style Tag Badge
  const signatureTag = activeCard ? activeCard.tag : (lang === "ko" ? "#인셀프_시그니처_바이온" : "#InSelfCustomVibe");
  ctx.font = "bold 9.5px sans-serif";
  ctx.fillStyle = "rgba(196,149,106,0.06)";
  const specPillW = ctx.measureText(signatureTag).width + 18;
  drawRoundRect(48, 560, specPillW, 20, 10, "rgba(196,149,106,0.06)", "rgba(196,149,106,0.2)");
  
  ctx.fillStyle = "#C4956A";
  ctx.fillText(signatureTag, 57, 573);

  // Elegant cursive spacing mood keyword
  ctx.font = "italic bold 13.5px serif";
  ctx.fillStyle = "#8B5E3C";
  const signatureKeyword = lang === "ko" ? `"${season.keyword}"` : `"${season.keywordEn}"`;
  ctx.fillText(signatureKeyword, 48, 604);

  // Detailed Description Body
  ctx.font = "normal 10.5px sans-serif";
  ctx.fillStyle = "rgba(61,43,26,0.85)";
  const descString = lang === "ko" ? season.description : season.descriptionEn;
  wrapText(descString, 48, 622, 320, 15, 5);

  // ═══════════════════════════════════════════════════════════
  // RIGHT AREA BENTO BOXES (BENTO BOX 1 & BENTO BOX 2)
  // ═══════════════════════════════════════════════════════════
  
  // Bento Box 1: Palette (X: 430, Y: 120, W: 470, H: 180)
  drawRoundRect(430, 120, 470, 180, 16, "rgba(255,255,255,0.73)", "rgba(196,149,106,0.16)");

  ctx.fillStyle = "#2D1E12";
  ctx.font = "bold 12px sans-serif";
  ctx.fillText(lang === "ko" ? "🎨  추천 컬러 팔레트" : "🎨  Recommended Color Palette", 450, 142);

  const startX_sw = 450;
  const swY = 162;
  const swatchChipW = 54;
  const swatchChipH = 75;
  const swatchGap = 12;
  const swList = season.palette || [];

  swList.forEach(({hex, name, nameEn}: any, i: number) => {
    if (i > 5) return; // Top 6 colors limit
    const cx_sw = startX_sw + i * (swatchChipW + swatchGap);
    
    // Draw paint card swatch block
    drawRoundRect(cx_sw, swY, swatchChipW, swatchChipH, 6, hex, "rgba(0,0,0,0.05)");
    
    // Fine paper matte boundary labels block
    ctx.fillStyle = "rgba(255,255,255,0.72)";
    drawRoundRect(cx_sw, swY + swatchChipH - 24, swatchChipW, 24, 2, "rgba(255,255,255,0.72)");
    
    ctx.fillStyle = "#3D2B1A";
    ctx.font = "bold 8.5px sans-serif";
    ctx.textAlign = "center";
    const swatchLabel = lang === "ko" ? name.substring(0, 5) : nameEn.substring(0, 7);
    ctx.fillText(swatchLabel, cx_sw + swatchChipW/2, swY + swatchChipH - 10, swatchChipW - 6);
  });
  ctx.textAlign = "left"; // reset alignment

  // Bento Box 2: Precision Matching Scores (X: 920, Y: 120, W: 310, H: 180)
  drawRoundRect(920, 120, 310, 180, 16, "rgba(255,255,255,0.73)", "rgba(196,149,106,0.16)");

  ctx.fillStyle = "#3D2B1A";
  ctx.font = "bold 13px sans-serif";
  const scoreBoxTitle = lang === "ko" ? "📊  정밀 분석 매칭 스코어" : "📊  Precision Matching Scores";
  ctx.fillText(scoreBoxTitle, 940, 145);

  const sortedKeysList = Object.keys(scores).sort((a,b) => scores[b] - scores[a]);
  sortedKeysList.forEach((key, kIdx) => {
    if (kIdx > 3) return;
    const yLine = 162 + kIdx * 25;
    const s = SEASONS[key];
    if (!s) return;
    const sName = lang === "ko" ? s.name.replace(" 타입","") : s.nameEn;
    const currentScore = scores[key] || 0;
    
    ctx.fillStyle = "rgba(61,43,26,0.9)";
    ctx.font = "bold 10px sans-serif";
    ctx.fillText(`${s.icon} ${sName}`, 940, yLine + 9);
    
    ctx.fillStyle = "rgba(196,149,106,0.1)";
    ctx.fillRect(1015, yLine + 4, 140, 6);
    ctx.fillStyle = s.scoreColor || "#C4956A";
    ctx.fillRect(1015, yLine + 4, 140 * currentScore / 100, 6);
    
    ctx.font = "bold 10px monospace";
    ctx.fillStyle = "rgba(61,43,26,0.85)";
    ctx.textAlign = "right";
    ctx.fillText(`${currentScore}%`, 1200, yLine + 9);
    ctx.textAlign = "left";
  });

  // Bento Box 3: Beauty & Style Curation (X: 430, Y: 320, W: 510, H: 350)
  drawRoundRect(430, 320, 510, 350, 16, "rgba(255,255,255,0.73)", "rgba(196,149,106,0.16)");

  const col1X = 454;
  const col2X = 704;

  // Makeup Curation
  ctx.fillStyle = "#3D2B1A";
  ctx.font = "bold 14px sans-serif";
  ctx.fillText(lang === "ko" ? "💄  추천 뷰티/메이크업 가이드" : "💄  Couture Beauty & Makeup", col1X, 352);

  let curY = 376;
  const textW_col1 = 220;

  const drawCurationBullet = (bulletLabel: string, bulletVal: string, startY: number) => {
    ctx.fillStyle = "rgba(122,96,82,0.95)";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText(`• ${bulletLabel}`, col1X, startY);
    
    ctx.fillStyle = "rgba(61,43,26,0.9)";
    ctx.font = "normal 10.5px sans-serif";
    return wrapText(bulletVal, col1X + 10, startY + 16, textW_col1, 14.5) + 16;
  };

  curY = drawCurationBullet(
    lang === "ko" ? "피부 베이스 (Skin Base)" : "Skin Base", 
    lang === "ko" ? season.makeup.foundation : season.makeup.foundationEn, 
    curY
  );

  curY = drawCurationBullet(
    lang === "ko" ? "블러셔 (Cheek Color/Blush)" : "Blush & Cheek", 
    lang === "ko" ? season.makeup.blush : season.makeup.blushEn, 
    curY
  );

  curY = drawCurationBullet(
    lang === "ko" ? "아이 섀도우 (Eyes)" : "Eye Accent", 
    lang === "ko" ? season.makeup.eye : season.makeup.eyeEn, 
    curY
  );

  curY = drawCurationBullet(
    lang === "ko" ? "립 가이드 (Lips Point)" : "Lip Guide", 
    lang === "ko" ? season.makeup.lip : season.makeup.lipEn, 
    curY
  );

  // Wardrobe Style Curation
  ctx.fillStyle = "#3D2B1A";
  ctx.font = "bold 14px sans-serif";
  ctx.fillText(lang === "ko" ? "👔  추천 워드로브 가이드" : "👔  Wardrobe Stylist Guide", col2X, 352);

  let curY2 = 376;
  const textW_col2 = 215;

  const drawWardrobeBullet = (bulletLabel: string, bulletVal: string, startY: number) => {
    ctx.fillStyle = "rgba(122,96,82,0.95)";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText(`• ${bulletLabel}`, col2X, startY);
    
    ctx.fillStyle = "rgba(61,43,26,0.9)";
    ctx.font = "normal 10.5px sans-serif";
    return wrapText(bulletVal, col2X + 10, startY + 16, textW_col2, 14.5) + 16;
  };

  curY2 = drawWardrobeBullet(
    lang === "ko" ? "패션 무드 (Couture Mood)" : "Couture Mood",
    lang === "ko" ? season.fashion.style : season.fashion.styleEn,
    curY2
  );

  curY2 = drawWardrobeBullet(
    lang === "ko" ? "패션 강추 아이템 (Best Items)" : "Best Items",
    lang === "ko" ? season.fashion.items.join(", ") : season.fashion.itemsEn.join(", "),
    curY2
  );

  curY2 = drawWardrobeBullet(
    lang === "ko" ? "추천 패브릭 & 소재 (Best Fabrics)" : "Fabrics & Sheer",
    lang === "ko" ? season.fashion.fabrics.join(", ") : season.fashion.fabricsEn.join(", "),
    curY2
  );

  // Bento Box 4: Worst Alerts (X: 960, Y: 320, W: 270, H: 350)
  drawRoundRect(960, 320, 270, 350, 16, "rgba(255,255,255,0.73)", "rgba(196,149,106,0.16)");

  ctx.fillStyle = "#A44E44"; // Elegant Warn Color
  ctx.font = "bold 14px sans-serif";
  const worstBoxTitle = lang === "ko" ? "⚠️  워스트 경고 가이드" : "⚠️  Avoid & Worst Warning";
  ctx.fillText(worstBoxTitle, 980, 352);

  // Swatches for Worst Colors
  ctx.fillStyle = "rgba(122,96,82,0.95)";
  ctx.font = "bold 11px sans-serif";
  ctx.fillText(lang === "ko" ? "• 피해야 할 워스트 컬러" : "• Highly Avoid Colors", 980, 382);

  const avoidList = season.avoid || [];
  const startX_av = 980 + 20;
  const avY = 416;

  avoidList.forEach((colName: string, i: number) => {
    if (i > 3) return; // limit to 4 colors max
    const cx_av = startX_av + i * 55;
    const hexValue = colorNameToHex[colName] || "#D3D3D3";
    
    // Circle Color
    ctx.beginPath();
    ctx.arc(cx_av, avY, 15, 0, Math.PI * 2);
    ctx.fillStyle = hexValue;
    ctx.fill();
    ctx.strokeStyle = "rgba(164,78,68,0.25)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    // Cross drawing
    ctx.strokeStyle = "#A44E44";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx_av - 8, avY - 8);
    ctx.lineTo(cx_av + 8, avY + 8);
    ctx.moveTo(cx_av + 8, avY - 8);
    ctx.lineTo(cx_av - 8, avY + 8);
    ctx.stroke();
    
    // Label
    ctx.fillStyle = "rgba(61,43,26,0.9)";
    ctx.font = "bold 9px sans-serif";
    ctx.textAlign = "center";
    const labelText = lang === "ko" ? colName : (season.avoidEn?.[i] || colName);
    ctx.fillText(labelText, cx_av, avY + 26);
  });
  ctx.textAlign = "left"; // reset alignment

  // Worst Style Note
  let curY3 = 472;
  ctx.fillStyle = "rgba(122,96,82,0.95)";
  ctx.font = "bold 11px sans-serif";
  ctx.fillText(lang === "ko" ? "• 피해야 할 스타일 & 착장" : "• Wardrobe to Avoid", 980, curY3);

  ctx.fillStyle = "#A44E44";
  ctx.font = "normal 10.5px sans-serif";
  const fashionAvoidVal = lang === "ko" ? season.fashion.avoid.join(", ") : season.fashion.avoidEn.join(", ");
  curY3 = wrapText(fashionAvoidVal, 980 + 10, curY3 + 16, 230, 14.5) + 20;

  ctx.fillStyle = "rgba(122,96,82,0.95)";
  ctx.font = "bold 11px sans-serif";
  ctx.fillText(lang === "ko" ? "• 스타일링 어바웃 워닝" : "• Styling Warnings", 980, curY3);

  ctx.fillStyle = "rgba(61,43,26,0.9)";
  ctx.font = "normal 10.5px sans-serif";
  const styleTipStr = lang === "ko" ? season.tip : season.tipEn;
  wrapText(styleTipStr, 980 + 10, curY3 + 16, 230, 14.5);

  // 6. Footer Branding
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(180,140,100,0.5)";
  ctx.font = "normal 11px sans-serif";
  ctx.fillText("InSelf Color   ·   Discover Your Personalized Vibe", W/2, 698);

  // Trigger Download
  const a=document.createElement("a");
  a.download=`personal-color-card-${season.id}_${getFormattedTimestamp()}.png`;
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
  body{background:var(--cream);font-family:var(--fs);color:var(--text);overflow-x:hidden;}
  .w{min-height:100vh;background:var(--cream);position:relative;}
  .se{animation:si .55s cubic-bezier(0.16,1,0.3,1) both;}
  @keyframes si{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}

  /* NAV */
  .nav{display:flex;align-items:center;justify-content:space-between;height:64px;padding:0 32px;position:sticky;top:0;background:rgba(253,248,242,0.85);backdrop-filter:blur(10px);z-index:100;border-bottom:1px solid rgba(196,149,106,0.12);}
  .logo{font-family:var(--fd);font-size:20px;font-weight:600;color:var(--dark);letter-spacing:.04em;}
  .logo span{color:var(--rg);font-style:italic;}
  .logo-img{height:48px;width:auto;object-fit:contain;display:block;}
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

  /* GENDER SELECTOR */
  .gsel-wrap{width:100%;max-width:520px;margin-top:20px;display:flex;flex-direction:column;gap:8px;align-items:flex-start;}
  .gsel-lbl{font-size:12px;color:var(--dark);font-family:var(--fs);font-weight:600;letter-spacing:0.04em;}
  .gsel-options{display:grid;grid-template-columns:1fr 1fr;gap:12px;width:100%;}
  .gsel-btn{border:1.5px solid var(--border);background:rgba(255,255,255,0.45);border-radius:100px;padding:12px 20px;font-size:13px;font-weight:500;font-family:var(--fs);color:var(--sub);cursor:pointer;transition:all 0.25s ease;display:flex;align-items:center;justify-content:center;gap:8px;outline:none;}
  .gsel-btn:hover{border-color:var(--rg);color:var(--dark);background:#fff;}
  .gsel-btn.active{background:var(--dark);border-color:var(--dark);color:#fff;box-shadow:0 4px 12px rgba(30, 20, 16, 0.15);}

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
  .clist{display:none;gap:9px;flex-wrap:wrap;}
  .cchip{padding:7px 14px;background:rgba(196,149,106,0.07);border:1px solid rgba(196,149,106,0.17);border-radius:100px;font-size:12px;color:var(--text);}

  /* Celeb Image Cards in Results Page */
  .cgrid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
    margin-top: 10px;
    width: 100%;
  }
  @media (min-width: 640px) {
    .cgrid {
      grid-template-columns: repeat(5, 1fr);
      gap: 12px;
    }
  }
  .ccard-item {
    background: rgba(255, 255, 255, 0.45);
    border: 1.5px solid rgba(196,149,106,0.15);
    border-radius: 14px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    transition: all 0.25s ease;
  }
  .ccard-item:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.95);
    border-color: var(--rg);
    box-shadow: var(--shadow);
  }
  .ccard-img-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 3/4;
    border-radius: 10px;
    background: rgba(196,149,106,0.06);
    overflow: hidden;
  }
  .ccard-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  .ccard-item:hover .ccard-img {
    transform: scale(1.05);
  }
  .ccard-tag {
    font-size: 11px;
    font-weight: 500;
    color: var(--text);
    text-align: center;
    word-break: break-all;
    line-height: 1.4;
    padding: 2px 6px;
    background: rgba(196,149,106,0.06);
    border-radius: 100px;
    border: 1px solid rgba(196,149,106,0.1);
  }

  /* Carousel Container */
  .carousel-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 15px;
    padding: 0 40px;
  }
  .carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #fff;
    border: 1.5px solid rgba(196,149,106,0.22);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    z-index: 10;
    font-size: 20px;
    font-weight: bold;
    color: var(--rg);
    transition: all 0.22s ease;
    user-select: none;
  }
  .carousel-btn:hover {
    background: var(--dark);
    color: #fff;
    border-color: var(--dark);
    transform: translateY(-50%) scale(1.08);
  }
  .carousel-btn.prev {
    left: 0;
  }
  .carousel-btn.next {
    right: 0;
  }
  @media (min-width: 640px) {
    .carousel-wrapper {
      padding: 0 60px;
    }
    .carousel-btn.prev {
      left: 15px;
    }
    .carousel-btn.next {
      right: 15px;
    }
  }
  
  /* Focus single card style */
  .focus-card {
    width: 100%;
    max-width: 250px;
    background: rgba(255, 255, 255, 0.7);
    border: 1.5px solid rgba(196,149,106,0.2);
    border-radius: 20px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    box-shadow: 0 8px 24px rgba(196,149,106,0.08);
    transition: all 0.3s ease;
  }
  .focus-card:hover {
    background: #fff;
    border-color: var(--rg);
    box-shadow: 0 12px 32px rgba(196,149,106,0.15);
  }
  .focus-img-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 2/3;
    border-radius: 14px;
    overflow: hidden;
    background: rgba(196,149,106,0.04);
    box-shadow: inset 0 0 10px rgba(0,0,0,0.03);
    border: 1px solid rgba(196,149,106,0.1);
  }
  .focus-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 12%;
    transform: scale(1.2);
    transition: transform 0.5s ease;
  }
  .focus-card:hover .focus-img {
    transform: scale(1.28);
  }
  .focus-tag {
    font-size: 13.5px;
    font-weight: 700;
    color: var(--dark);
    letter-spacing: -0.01em;
    padding: 6px 16px;
    background: rgba(196,149,106,0.08);
    border: 1.5px solid rgba(196,149,106,0.18);
    border-radius: 100px;
    text-shadow: 0 1px 0px rgba(255,255,255,0.8);
    display: inline-block;
  }
  
  /* Indicators */
  .carousel-indicators {
    display: flex;
    gap: 8px;
    margin-top: 14px;
    justify-content: center;
    width: 100%;
  }
  .indicator-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgba(196,149,106,0.25);
    transition: all 0.2s ease;
    cursor: pointer;
  }
  .indicator-dot.active {
    background: var(--rg);
    transform: scale(1.3);
  }

  .no-bubbles .carousel-btn,
  .no-bubbles .carousel-indicators {
    display: none !important;
  }
  .no-bubbles .focus-card {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
    align-items: flex-start !important;
  }
  .no-bubbles .focus-tag {
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
    font-size: 14px !important;
    font-weight: bold !important;
    color: var(--dark) !important;
  }
  .no-bubbles .focus-tag::before {
    content: "✦ " !important;
    color: var(--rg) !important;
  }

  /* Actions */
  .ract{display:flex;gap:9px;margin-top:22px;flex-wrap:wrap;}
  .btr{flex:1;min-width:110px;background:rgba(196,149,106,.08);border:1px solid rgba(196,149,106,.26);color:var(--rg);border-radius:100px;padding:13px 18px;font-size:13px;font-family:var(--fs);cursor:pointer;transition:all .22s;text-align:center;}
  .btr:hover{background:rgba(196,149,106,.14);transform:translateY(-1px);}
  .bdl-detailed{flex:1.2;min-width:140px;background:rgba(196,149,106,.1);border:1px solid rgba(196,149,106,.4);color:var(--dark);border-radius:100px;padding:13px 18px;font-size:13px;font-family:var(--fs);cursor:pointer;transition:all .22s;text-align:center;font-weight:600;}
  .bdl-detailed:hover{background:rgba(196,149,106,.18);transform:translateY(-1px);}
  .bdl-sns{flex:1.2;min-width:140px;background:linear-gradient(135deg,#C4956A,#E8AA80);border:none;color:#fff;border-radius:100px;padding:13px 18px;font-size:13px;font-family:var(--fs);cursor:pointer;transition:all .22s;text-align:center;box-shadow:0 6px 20px rgba(196,149,106,.26);font-weight:600;}
  .bdl-sns:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(196,149,106,0.36);}
  .bdl-repr{flex:1.2;min-width:140px;background:linear-gradient(135deg,#5A483E,#7A6052);border:none;color:#fff;border-radius:100px;padding:13px 18px;font-size:13px;font-family:var(--fs);cursor:pointer;transition:all .22s;text-align:center;box-shadow:0 6px 20px rgba(122,96,82,.2);font-weight:600;}
  .bdl-repr:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(122,96,82,0.3);}

  /* During Image Save: Remove bubbles/boxes/borders, render as clean bullet text lists */
  .no-bubbles .ftags, .no-bubbles .rtags, .no-bubbles .clist {
    display: flex !important;
    flex-direction: column !important;
    gap: 6px !important;
    align-items: flex-start !important;
    padding-left: 4px;
  }
  .no-bubbles .cgrid {
    display: none !important;
  }
  .no-bubbles .ftag, .no-bubbles .rtag, .no-bubbles .cchip {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
    border-radius: 0 !important;
    font-size: 12.5px !important;
    display: flex !important;
    align-items: center !important;
    gap: 4px !important;
    margin: 0 !important;
  }
  .no-bubbles .ftag.fg, .no-bubbles .rtag.rgg {
    color: rgba(61,43,26,0.85) !important;
  }
  .no-bubbles .ftag.fg::before, .no-bubbles .rtag.rgg::before {
    content: "• " !important;
    font-weight: bold;
    color: var(--rg) !important;
  }
  
  .no-bubbles .ftag.fb, .no-bubbles .rtag.rgb2 {
    color: #8B4040 !important;
  }
  .no-bubbles .ftag.fb::before, .no-bubbles .rtag.rgb2::before {
    content: "• " !important;
    font-weight: bold;
    color: #8B4040 !important;
  }

  .no-bubbles .cchip {
    color: rgba(61,43,26,0.85) !important;
  }

  .no-bubbles .tbox {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 4px !important;
    border-radius: 0 !important;
    font-size: 13px !important;
    line-height: 1.8 !important;
    color: rgba(61,43,26,0.85) !important;
  }

  /* TOAST */
  .toast{position:fixed;bottom:26px;left:50%;transform:translateX(-50%);background:rgba(30,20,15,.88);backdrop-filter:blur(12px);color:#fff;padding:11px 22px;border-radius:100px;font-size:13px;z-index:9999;white-space:nowrap;animation:tai .3s cubic-bezier(.34,1.56,.64,1);}
  @keyframes tai{from{opacity:0;transform:translateX(-50%) translateY(14px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

  /* RESPONSIVE */
  @media(max-width:768px){
    .nav{height:52px;padding:0 17px;}
    .logo-img{height:38px;}
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
    l.href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;700&family=Cormorant+Garamond:wght@400;600&display=swap";
    document.head.appendChild(l);
  },[]);
  return null;
}

// ═══════════════════════════════════════════════════════════
// TRANSLATIONS DICTIONARY (BILINGUAL)
// ═══════════════════════════════════════════════════════════
const T: Record<string, Record<string, any>> = {
  ko: {
    appTitle: "나만의 컬러를",
    appTitleSub: "발견하세요",
    appDesc: `사진 한 장으로 나만의 퍼스널 컬러를 분석해드립니다.\n봄·여름·가을·겨울, 당신에게 가장 잘 어울리는 색을 찾아보세요.`,
    startBtn: "지금 테스트 시작하기",
    guideBtn: "📖 PCCS 상세 색채 가이드북 읽기",
    step1: "얼굴 사진 업로드",
    step2: "색상 알고리즘 분석",
    step3: "퍼스널 컬러 확인",
    faqTitle: "자주 묻는 질문",
    termsTitle: "⚠️ 테스트 참고 및 의무 면책 고지",
    disclaimer1: "• 일반정보 제공 목적: 본 자가 진단 서비스는 전문 퍼스널 컬러 컨설턴트의 실물 드레이핑 진단법을 디지털 방식으로 구현한 모의 분석 툴입니다. 전문적인 오프라인 진단이나 진료를 완벽히 대체할 수 없습니다.",
    disclaimer2: "• 오락용 부가 사항: 추천되는 메이크업 정보, 베스트 패션 스타일, 스타일링 팁 및 유사 연예인은 사용자 만족도 제고를 위한 추천 가이드이자 재미(Entertainment) 목적으로 설계되었습니다. 최종 결정 전에 유연하게 개별 판단하시기 바랍니다.",
    disclaimer3: "• 손실 책임 면제: 사용자는 본 프로그램의 수치 분석 결과를 절대적 기준으로 신뢰하지 않을 것에 동의하며, 오진 또는 가이드 오인에 따라 개인의 선택 혹은 패션/뷰티 제품 구매 후 발생한 직접적·간접적 부작용 및 불만족 등의 불이익에 대해 본 어플리케이션(InSelf Color) 제작 및 운영 측은 어떠한 법적 분쟁에 대한 보상적 또는 법적 책임도 부담하지 않습니다.",
    back: "뒤로",
    uploadTitle: "사진을 업로드하세요",
    uploadDesc: "얼굴이 잘 보이는 정면 사진을 사용하면 더 정확한 결과를 얻을 수 있어요.",
    dragOrClick: "클릭하거나 사진을 드래그하세요",
    fileSupport: "JPG, PNG, WEBP 지원 / 정면 얼굴 사진 권장",
    selectFile: "파일 선택",
    changePhoto: "사진 변경",
    uploadTips: "💡 좋은 결과를 위한 팁: 자연광 아래 촬영, 과도한 필터 없음, 메이크업 최소화, 얼굴이 중앙에 있는 정면 사진을 사용해주세요.",
    startAnalysis: "🔬 분석 시작하기 →",
    pleaseUpload: "사진을 먼저 업로드해주세요",
    analyzingTitle: "분석 중입니다",
    analyzingDesc: "색상 알고리즘이 피부 톤을 분석하고 있어요.\n잠시만 기다려주세요.",
    analyzingProg: "분석 진행 중...",
    analysisSteps: ["이미지 데이터 추출", "피부 픽셀 감지 및 필터링", "RGB 평균값 계산", "웜/쿨 언더톤 분석", "명도·채도 측정", "퍼스널 컬러 타입 결정"],
    resultHeader: "퍼스널 컬러 분석 결과",
    scoreTitle: "분석 점수",
    skinScanWarning: "⚠️ 피부 픽셀 감지가 어려운 사진이었습니다. 얼굴이 잘 보이는 사진을 사용하시면 더 정확합니다.",
    recoPalette: "추천 컬러 팔레트",
    characteristicsTitle: "나의 특징",
    makeupTitle: "메이크업 추천",
    makeupLabels: ["파운데이션", "블러셔", "립", "아이섀도", "아이라이너", "컬러칩"],
    fashionTitle: "패션 스타일 가이드",
    fashionLabels: ["추천 아이템", "어울리는 소재", "피하면 좋은 코디"],
    colorGuideTitle: "컬러 가이드",
    colorGuideLabels: ["잘 어울리는 색", "피하면 좋은 색"],
    stylingTipsTitle: "스타일링 팁",
    famousCelebsTitle: "대표 키워드 & 무드 태그",
    genderTitle: "스타일 분위기 성별 필터",
    genderFemale: "여성 스타일 무드 ✦",
    genderMale: "남성 스타일 무드 ✦",
    retryBtn: "← 다시 테스트",
    saveAllBtn: "📋 전체내용 이미지 저장",
    saveSnsBtn: "📸 SNS용 이미지 저장",
    saveReprBtn: "📸 대표 이미지 단독 저장",
    guidebookBtn: "📖 색채 가이드북",
    toastCopied: "클립보드에 복사되었습니다 ✓",
    toastColorCopied: "{hex} 복사됨",
    toastNoShare: "공유 기능이 지원되지 않습니다",
    toastStartingAll: "전체 결과 이미지 생성을 시작합니다...",
    toastSaveSuccess: "전체 내용 이미지가 저장되었습니다 ✓",
    toastSavingCard: "상세 결과 카드를 저장하고 있어요...",
    toastError: "저장 중 오류가 발생했습니다",
    disclaimerBottom: "※ 본 자가 분석 결과는 업로드된 이미지 분석 알고리즘에 기초한 간이적 참고 수치입니다. 환경 조명에 따른 차이가 발생할 수 있으며, 일상적인 스타일링 참고 및 재미 목적의 가이드로 즐겨주시기 바라며 법적 분쟁 보상 및 보증의 대상이 되지 않습니다.",
    legalCons: "개인정보처리방침 및 자가진단 이용약관/면책 고지에 동의합니다 (필수)",
  },
  en: {
    appTitle: "Discover Your",
    appTitleSub: "Personal Color",
    appDesc: `Analyze your unique personal color with just one photo.\nWhether you are Spring, Summer, Autumn, or Winter, find the perfect shades for you.`,
    startBtn: "Start Test Now",
    guideBtn: "📖 Read Detailed PCCS Color Guidebook",
    step1: "Upload Face Photo",
    step2: "Analyze Color Algorithm",
    step3: "Check Personal Color",
    faqTitle: "Frequently Asked Questions",
    termsTitle: "⚠️ Test Reference & Limitation of Liability Notice",
    disclaimer1: "• General Information Purpose: This self-diagnosis service is a simulated analysis tool that digitally implements the physical draping method of professional personal color consultants. It cannot completely replace professional offline diagnosis or consultation.",
    disclaimer2: "• Entertainment Purpose: Recommended makeup, best fashion styles, styling tips, and similar celebrities are provided purely for user styling guide reference and entertainment purposes. Please make your final decisions flexibly based on your own judgment.",
    disclaimer3: "• Limitation of Liability: Users agree not to rely on numerical results of this application as an absolute standard. The development and operation of this application (InSelf Color) shall not be held liable for any direct or indirect disadvantages, side effects, or dissatisfaction arising from products purchased or styling decisions made following the instructions.",
    back: "Back",
    uploadTitle: "Upload Your Photo",
    uploadDesc: "Using a front-facing photo where your face is clearly visible delivers more accurate results.",
    dragOrClick: "Click or drag a photo here",
    fileSupport: "Supports JPG, PNG, WEBP / Front face photo recommended",
    selectFile: "Select File",
    changePhoto: "Change Photo",
    uploadTips: "💡 Tips for great results: Share a front-facing photo taken under soft natural light, with no heavy filters, minimal makeup, and your face centered.",
    startAnalysis: "🔬 Start Analysis →",
    pleaseUpload: "Please upload a photo first",
    analyzingTitle: "Analyzing Your Color",
    analyzingDesc: `Our color algorithm is analyzing your unique skin tone.\nPlease wait a moment.`,
    analyzingProg: "Analyzing...",
    analysisSteps: ["Extracting image data", "Detecting & filtering skin pixels", "Calculating average RGB", "Analyzing Warm/Cool undertones", "Measuring brightness & saturation", "Determining personal color type"],
    resultHeader: "Personal Color Result",
    scoreTitle: "Analysis Score",
    skinScanWarning: "⚠️ It was difficult to detect skin pixels from this photo. Using a clear photo will result in higher accuracy.",
    recoPalette: "Recommended Color Palette",
    characteristicsTitle: "My Characteristics",
    makeupTitle: "Recommended Makeup",
    makeupLabels: ["Foundation", "Blusher", "Lip", "Eyeshadow", "Eyeliner", "Color Chips"],
    fashionTitle: "Fashion Style Guide",
    fashionLabels: ["Recommended Items", "Matching Fabrics", "Avoid Outfits"],
    colorGuideTitle: "Color Guide",
    colorGuideLabels: ["Best Colors", "Colors to Avoid"],
    stylingTipsTitle: "Styling Tips",
    famousCelebsTitle: "Representative Mood & Style Tags",
    genderTitle: "Preferred Style Gender Filter",
    genderFemale: "Female Style Mood ✦",
    genderMale: "Male Style Mood ✦",
    retryBtn: "← Retest",
    saveAllBtn: "📋 Save Full Content",
    saveSnsBtn: "📸 Save Card for SNS",
    saveReprBtn: "📸 Save Representative Image",
    guidebookBtn: "📖 Color Guidebook",
    toastCopied: "Copied to clipboard ✓",
    toastColorCopied: "{hex} copied",
    toastNoShare: "Sharing is not supported on this browser",
    toastStartingAll: "Generating image...",
    toastSaveSuccess: "Full result image saved successfully ✓",
    toastSavingCard: "Saving detailed result card...",
    toastError: "An error occurred while saving",
    disclaimerBottom: "※ This self-analysis result is an approximate reference value based on the uploaded image analysis algorithm. Differences may occur due to environmental lighting. Please utilize it for fun and style guidance.",
    legalCons: "I agree to the Privacy Policy and Terms of Service/Disclaimer (Required)",
  }
};

function Toast({msg}: {msg: string}){return msg?<div className="toast">{msg}</div>:null;}

interface NavProps {
  onGoToGuide?: () => void;
  lang: "ko" | "en";
  setLang: (lang: "ko" | "en") => void;
}

function Nav({ onGoToGuide, lang, setLang }: NavProps){
  const handleLogoClick = () => {
    if (typeof window !== "undefined") {
      if (window.location.pathname === "/") {
        window.location.reload();
      } else {
        window.history.pushState(null, "", "/");
        window.dispatchEvent(new PopStateEvent("popstate"));
      }
    }
  };

  return(
    <nav className="nav">
      <div className="logo" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }} onClick={handleLogoClick}>
        <img 
          src="/images/seasons/logo.png" 
          alt="InSelf Color" 
          className="logo-img"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            const f = document.getElementById("p-logo-fallback");
            if (f) f.style.display = "inline";
          }}
        />
        <span id="p-logo-fallback" style={{ display: "none" }}>InSelf<span>Color</span></span>
      </div>
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
            {lang === "ko" ? "📖 색채 가이드북" : "📖 Color Guidebook"}
          </button>
        )}
        <div style={{ display: "flex", gap: "2px", background: "rgba(196,149,106,0.1)", padding: "2px", borderRadius: "20px" }}>
          <button
            type="button"
            onClick={() => setLang("ko")}
            style={{
              padding: "2px 8px",
              fontSize: "10px",
              fontWeight: "600",
              border: "none",
              background: lang === "ko" ? "#C4956A" : "transparent",
              color: lang === "ko" ? "#fff" : "var(--sub)",
              borderRadius: "100px",
              cursor: "pointer",
              transition: "all 0.15s"
            }}
          >
            KO
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            style={{
              padding: "2px 8px",
              fontSize: "10px",
              fontWeight: "600",
              border: "none",
              background: lang === "en" ? "#C4956A" : "transparent",
              color: lang === "en" ? "#fff" : "var(--sub)",
              borderRadius: "100px",
              cursor: "pointer",
              transition: "all 0.15s"
            }}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════
// DIAMOND CHART
// ═══════════════════════════════════════════════════════════
const AXES=[
  {key:"spring",label:"봄",labelEn:"Spring",icon:"🌸",dx:0,dy:-1},
  {key:"summer",label:"여름",labelEn:"Summer",icon:"🌊",dx:1,dy:0},
  {key:"autumn",label:"가을",labelEn:"Autumn",icon:"🍂",dx:0,dy:1},
  {key:"winter",label:"겨울",labelEn:"Winter",icon:"❄️",dx:-1,dy:0},
];

interface DiamondChartProps {
  scores: Record<string, number>;
  winner: string;
  lang: "ko" | "en";
}

function DiamondChart({scores,winner,lang}: DiamondChartProps){
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
      {AXES.map(({dx,dy,label,labelEn,icon},i)=>(
        <g key={i}>
          <line x1={cx} y1={cy} x2={cx+dx*R} y2={cy+dy*R} stroke="rgba(196,149,106,.17)" strokeWidth="1"/>
          <text x={cx+dx*(R+17)} y={cy+dy*(R+18)} textAnchor="middle" dominantBaseline="middle" fontSize="9.5" fill="#7A6052">{icon} {lang === "ko" ? label : labelEn}</text>
        </g>
      ))}
      <path d={d} fill="rgba(196,149,106,.18)" stroke="#C4956A" strokeWidth="1.8" strokeLinejoin="round" style={{transition:on?"all .9s cubic-bezier(.34,1.2,.64,1)":"none"}}/>
      {pts.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r={AXES[i].key===winner?4.5:3} fill={AXES[i].key===winner?"#C4956A":"rgba(196,149,106,.55)"}/>)}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════
// SEASON ICON WITH IMAGE OR EMOJI FALLBACK
// ═══════════════════════════════════════════════════════════
const SeasonIcon = ({ seasonId, emoji, className, style }: { seasonId: string; emoji: string; className?: string; style?: React.CSSProperties }) => {
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    setHasError(false);
  }, [seasonId]);

  if (hasError) {
    return <span className={className} style={style}>{emoji}</span>;
  }
  
  const capitalizedId = seasonId ? (seasonId.charAt(0).toUpperCase() + seasonId.slice(1)) : "";
  
  return (
    <img 
      src={`/images/seasons/${capitalizedId}.png`} 
      onError={() => setHasError(true)} 
      className={className} 
      style={{ 
        display: "inline-block", 
        verticalAlign: "middle", 
        objectFit: "contain", 
        maxWidth: "100%",
        height: "auto",
        ...style 
      }} 
      alt={seasonId}
      referrerPolicy="no-referrer"
    />
  );
};

// ═══════════════════════════════════════════════════════════
// LANDING
// ═══════════════════════════════════════════════════════════
interface LandingScreenProps {
  onStart: () => void;
  onGoToGuide: () => void;
  lang: "ko" | "en";
  setLang: (lang: "ko" | "en") => void;
}

function LandingScreen({onStart, onGoToGuide, lang, setLang}: LandingScreenProps){
  const[openFaq,setOpenFaq]=useState<number | null>(null);
  return(
    <div className="w"><FontLoader/><style>{CSS}</style><Nav onGoToGuide={onGoToGuide} lang={lang} setLang={setLang}/>
      <div className="land se">
        <div className="orb o1"/><div className="orb o2"/><div className="orb o3"/>
        <div className="lbadge">✦ Personal Color Analysis</div>
        <h1 className="ltitle">{T[lang].appTitle}<span>{T[lang].appTitleSub}</span></h1>
        <p className="lsub" style={{ whiteSpace: "pre-line" }}>{T[lang].appDesc}</p>
        <div className="ldiv"/>
        <div className="chips">
          {lang === "ko" ? (
            [["spring","🌸","봄 웜"],["summer","🌊","여름 쿨"],["autumn","🍂","가을 웜"],["winter","❄️","겨울 쿨"]].map(([id,emoji,l])=>(
              <span key={id} className={`chip ${id === "spring" ? "csp" : id === "summer" ? "csu" : id === "autumn" ? "cau" : "cwi"}`} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <SeasonIcon seasonId={id} emoji={emoji} style={{ width: "16px", height: "16px" }} />
                {l}
              </span>
            ))
          ) : (
            [["spring","🌸","Spring Warm"],["summer","🌊","Summer Cool"],["autumn","🍂","Autumn Warm"],["winter","❄️","Winter Cool"]].map(([id,emoji,l])=>(
              <span key={id} className={`chip ${id === "spring" ? "csp" : id === "summer" ? "csu" : id === "autumn" ? "cau" : "cwi"}`} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <SeasonIcon seasonId={id} emoji={emoji} style={{ width: "16px", height: "16px" }} />
                {l}
              </span>
            ))
          )}
        </div>
        <div style={{ display: "flex", gap: "12px", flexDirection: "column", alignItems: "center" }}>
          <button className="btnst" onClick={onStart}><span>{T[lang].startBtn}</span><span>→</span></button>
          
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
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
              {T[lang].guidebookBtn}
            </button>
          </div>
        </div>
        <div className="lsteps">
          {lang === "ko" ? (
            [["📸","STEP 01","얼굴 사진 업로드"],["🔬","STEP 02","색상 알고리즘 분석"],["🎨","STEP 03","퍼스널 컬러 확인"]].map(([ic,num,txt])=>(
              <div className="si" key={num}><div className="sic">{ic}</div><div className="sn">{num}</div><div className="st">{txt}</div></div>
            ))
          ) : (
            [["📸","STEP 01","Upload Face Photo"],["🔬","STEP 02","Color Analysis"],["🎨","STEP 03","Get Personal Color"]].map(([ic,num,txt])=>(
              <div className="si" key={num}><div className="sic">{ic}</div><div className="sn">{num}</div><div className="st">{txt}</div></div>
            ))
          )}
        </div>
        <div className="faq">
          <div className="faqt">{T[lang].faqTitle}</div>
          {FAQ_DATA[lang].map((f,i)=>(
            <div className="fqi" key={i}>
              <div className="fqq" onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                <span>{f.q}</span>
                <span className={`fqch${openFaq===i?" open":""}`}>▼</span>
              </div>
              {openFaq===i&&<div className="fqa" style={{ whiteSpace: "pre-line" }}>{f.a}</div>}
            </div>
          ))}
        </div>

        {/* =======================================================================
            SEMANTIC GEO ENCYCLOPEDIA (GOOGLE & NAVER 2025/2026 AI SGE SEARCH ENGINE OPTIMIZATION)
           ======================================================================= */}
        <div className="landing-geo-encyclopedia" style={{
          marginTop: "44px",
          padding: "24px",
          borderRadius: "18px",
          background: "linear-gradient(135deg, rgba(196,149,106,0.06) 0%, rgba(122,96,82,0.02) 100%)",
          border: "1px solid rgba(196,149,106,0.18)",
          maxWidth: "520px",
          width: "100%",
          boxSizing: "border-box",
          textAlign: "left"
        }}>
          {lang === "ko" ? (
            <article>
              <h2 style={{
                fontSize: "15px",
                fontWeight: "700",
                color: "var(--rg)",
                marginBottom: "12px",
                lineHeight: "1.4",
                letterSpacing: "-0.01em",
                borderBottom: "1px solid rgba(196,149,106,0.2)",
                paddingBottom: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <span>📚</span> PCCS 퍼스널 컬러 및 색채학 이론 요약 (GEO)
              </h2>
              
              <p style={{ fontSize: "12.5px", lineHeight: "1.65", color: "rgba(61,43,26,0.85)", marginBottom: "16px" }}>
                InSelf Color는 일본 색채 연구소(Japan Color Research Institute)의 <strong>PCCS(Practical Color Coordinate System, 실용색채계)</strong>이론과 <strong>먼셀의 3속성 정립체계(Hue, Value, Chroma)</strong>를 객관적으로 코딩화하여 설계되었습니다. AI 검색 엔진 및 네이버 스마트 서치 크롤러에 정보 신뢰성을 인증받은 자가진단 이론을 소개합니다.
              </p>

              <h3 style={{ fontSize: "13px", fontWeight: "600", color: "var(--rg)", margin: "14px 0 8px" }}>
                1. 4계절 타입별 PCCS 명도 및 채도 좌표 값 가이드
              </h3>
              
              <div style={{ overflowX: "auto", marginBottom: "16px" }}>
                <table style={{ width: "100%", fontSize: "11px", borderCollapse: "collapse", color: "rgba(61,43,26,0.85)", textAlign: "center" }}>
                  <thead>
                    <tr style={{ backgroundColor: "rgba(196,149,106,0.1)", borderBottom: "1px solid rgba(196,149,106,0.2)" }}>
                      <th style={{ padding: "8px", fontWeight: "600" }}>계절 타입 (Type)</th>
                      <th style={{ padding: "8px", fontWeight: "600" }}>명도 (Value)</th>
                      <th style={{ padding: "8px", fontWeight: "600" }}>채도 (Chroma)</th>
                      <th style={{ padding: "8px", fontWeight: "600" }}>대표 PCCS 톤</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid rgba(196,149,106,0.1)" }}>
                      <td style={{ padding: "8px", fontWeight: "600", color: "#FF9E7C" }}>봄 웜 (Spring Warm)</td>
                      <td style={{ padding: "8px" }}>고명도 (Value 6-9)</td>
                      <td style={{ padding: "8px" }}>중 ~ 고채도 (Chroma 6-9)</td>
                      <td style={{ padding: "8px" }}>Bright, Light, Pale, Vivid</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(196,149,106,0.1)" }}>
                      <td style={{ padding: "8px", fontWeight: "600", color: "#8FA8D4" }}>여름 쿨 (Summer Cool)</td>
                      <td style={{ padding: "8px" }}>고명도 (Value 6-9)</td>
                      <td style={{ padding: "8px" }}>저 ~ 중채도 (Chroma 2-5)</td>
                      <td style={{ padding: "8px" }}>Light, Pale, Soft, Dull</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(196,149,106,0.1)" }}>
                      <td style={{ padding: "8px", fontWeight: "600", color: "#C17A3E" }}>가을 웜 (Autumn Warm)</td>
                      <td style={{ padding: "8px" }}>저 ~ 중명도 (Value 2-5)</td>
                      <td style={{ padding: "8px" }}>중 ~ 고채도 (Chroma 4-8)</td>
                      <td style={{ padding: "8px" }}>Strong, Deep, Dark, Muted</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(196,149,106,0.1)" }}>
                      <td style={{ padding: "8px", fontWeight: "600", color: "#4A6484" }}>겨울 쿨 (Winter Cool)</td>
                      <td style={{ padding: "8px" }}>극저/극고 (Value 1, 9)</td>
                      <td style={{ padding: "8px" }}>고채도 (Chroma 6-9)</td>
                      <td style={{ padding: "8px" }}>Vivid, Bright, Dark, Deep</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 style={{ fontSize: "13px", fontWeight: "600", color: "var(--rg)", margin: "14px 0 8px" }}>
                2. 계절별 메이크업 및 코디 스타일링 매칭 이론
              </h3>
              <ul style={{ fontSize: "12px", lineHeight: "1.7", color: "rgba(61,43,26,0.85)", paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "6px", listStyleType: "square" }}>
                <li><strong>봄 웜톤 (Spring Theme)</strong>: 복숭아 빛피치 코랄 톤메이크업이 베스트입니다. 맑음과 환함이 키워드이며 은은하고 투명한 글로시 립글로스가 생기를 불산시킵니다.</li>
                <li><strong>여름 쿨톤 (Summer Theme)</strong>: 은은한 수채화 기법의 딸기우유 핑크, 라벤더 퍼플 메이크업이 생기를 돋우고 얼굴 노란 기를 잡아줍니다.</li>
                <li><strong>가을 웜톤 (Autumn Theme)</strong>: 우아한 베이지 골드, 카멜 음영 레이아웃과 브릭 테라코타가 깊이 있는 무드를 주며, 과일 잼 같은 브라운 어스톤 패션이 최적입니다.</li>
                <li><strong>겨울 쿨톤 (Winter Theme)</strong>: 선명한 리얼 블랙, 화이드 대비와 버건디 플럼 포인트가 시크함을 극대화 시킵니다.</li>
              </ul>
            </article>
          ) : (
            <article>
              <h2 style={{
                fontSize: "15px",
                fontWeight: "700",
                color: "var(--rg)",
                marginBottom: "12px",
                lineHeight: "1.4",
                letterSpacing: "-0.01em",
                borderBottom: "1px solid rgba(196,149,106,0.2)",
                paddingBottom: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <span>📚</span> PCCS Color Science & Generative Search Encyclopedia (GEO)
              </h2>
              
              <p style={{ fontSize: "12.5px", lineHeight: "1.65", color: "rgba(61,43,26,0.85)", marginBottom: "16px" }}>
                InSelf Color is engineered upon the foundation of the <strong>PCCS (Practical Color Coordinate System)</strong> developed by the Japan Color Research Institute, alongside the <strong>Munsell Color Properties (Hue, Value, Chroma)</strong>.
              </p>

              <h3 style={{ fontSize: "13px", fontWeight: "600", color: "var(--rg)", margin: "14px 0 8px" }}>
                1. Seasonal Coordinate Specifications (Brightness & Contrast Profile)
              </h3>
              
              <div style={{ overflowX: "auto", marginBottom: "16px" }}>
                <table style={{ width: "100%", fontSize: "11px", borderCollapse: "collapse", color: "rgba(61,43,26,0.85)", textAlign: "center" }}>
                  <thead>
                    <tr style={{ backgroundColor: "rgba(196,149,106,0.1)", borderBottom: "1px solid rgba(196,149,106,0.2)" }}>
                      <th style={{ padding: "8px", fontWeight: "600" }}>Seasonal Persona</th>
                      <th style={{ padding: "8px", fontWeight: "600" }}>Brightness (Value)</th>
                      <th style={{ padding: "8px", fontWeight: "600" }}>Saturation (Chroma)</th>
                      <th style={{ padding: "8px", fontWeight: "600" }}>Target PCCS Tone</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid rgba(196,149,106,0.1)" }}>
                      <td style={{ padding: "8px", fontWeight: "600", color: "#FF9E7C" }}>Spring Warm</td>
                      <td style={{ padding: "8px" }}>High (Value 6-9)</td>
                      <td style={{ padding: "8px" }}>Mid to High (Chroma 6-9)</td>
                      <td style={{ padding: "8px" }}>Bright, Light, Pale, Vivid</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(196,149,106,0.1)" }}>
                      <td style={{ padding: "8px", fontWeight: "600", color: "#8FA8D4" }}>Summer Cool</td>
                      <td style={{ padding: "8px" }}>High (Value 6-9)</td>
                      <td style={{ padding: "8px" }}>Low to Mid (Chroma 2-5)</td>
                      <td style={{ padding: "8px" }}>Light, Pale, Soft, Dull</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(196,149,106,0.1)" }}>
                      <td style={{ padding: "8px", fontWeight: "600", color: "#C17A3E" }}>Autumn Warm</td>
                      <td style={{ padding: "8px" }}>Low to Mid (Value 2-5)</td>
                      <td style={{ padding: "8px" }}>Mid to High (Chroma 4-8)</td>
                      <td style={{ padding: "8px" }}>Strong, Deep, Dark, Muted</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(196,149,106,0.1)" }}>
                      <td style={{ padding: "8px", fontWeight: "600", color: "#4A6484" }}>Winter Cool</td>
                      <td style={{ padding: "8px" }}>Low/High (Value 1, 9)</td>
                      <td style={{ padding: "8px" }}>High (Chroma 6-9)</td>
                      <td style={{ padding: "8px" }}>Vivid, Bright, Dark, Deep</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          )}
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
            {T[lang].termsTitle}
          </p>
          <div style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: "6px", color: "var(--sub)" }}>
            <p style={{ margin: 0 }}>{T[lang].disclaimer1}</p>
            <p style={{ margin: 0 }}>{T[lang].disclaimer2}</p>
            <p style={{ margin: 0 }}>{T[lang].disclaimer3}</p>
          </div>
        </div>

        {/* =======================================================================
            CREDIBILITY, CERTIFICATION & AUTHORSHIP VERIFICATION PANEL (95%+ Trust Score Compliance)
           ======================================================================= */}
        <div className="trust-verification-panel" style={{
          marginTop: "24px",
          padding: "20px",
          borderRadius: "16px",
          background: "#ffffff",
          border: "1px solid rgba(196,149,106,0.15)",
          boxShadow: "0 4px 20px rgba(61,43,26,0.02)",
          maxWidth: "520px",
          width: "100%",
          boxSizing: "border-box",
          textAlign: "left",
          fontSize: "12px"
        }}>
          {lang === "ko" ? (
            <div>
              <h4 style={{ fontSize: "13px", fontWeight: "700", color: "var(--rg)", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                🛡️ 서비스 신뢰성 및 학술 자문 정보 (Trust Verification)
              </h4>
              <p style={{ color: "rgba(61, 43, 26, 0.8)", lineHeight: "1.6", marginBottom: "12px" }}>
                InSelf Color는 연구 학술 가이드라인을 투명하게 수렴하고 이용자 분들의 신뢰도 자가평가를 위해 운영 주체 및 색채학적 출처를 명확하게 공시합니다.
              </p>
              
              <ul style={{ listStyleType: "none", padding: 0, margin: "0 0 14px 0", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                  <span style={{ color: "var(--primary)" }}>•</span>
                  <div>
                    <strong>제작 랩 및 연구 주체 (Authorship)</strong>: InSelf Studio Labs (디지털 이미징 컬러리스트 연구팀 및 소프트웨어 그래픽스 엔지니어들로 구성)
                  </div>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                  <span style={{ color: "var(--primary)" }}>•</span>
                  <div>
                    <strong>입증된 학술 및 색채학 인용 출처 (Cited Sources)</strong>:
                    <ul style={{ listStyleType: "circle", paddingLeft: "14px", marginTop: "4px", color: "rgba(61, 43, 26, 0.7)" }}>
                      <li>일본 색채 연구소(JCRI) Practical Color Coordinate System (PCCS, 1964) 색체표 표준 규칙 매핑</li>
                      <li>Munsell 3-속성 HVC(Hue, Value, Chroma)에 기반한 한국 공업 표준 규격(KS A 0062) 감각적 보정</li>
                      <li>국제 조명 위원회(CIE) L*a*b* 색 공간에 근거한 동양 피부 톤 균질 스펙트럼(Melanin/Hemoglobin Reflectance Model)의 RGB 분석계수 최적화 및 임계 가중치 검증</li>
                    </ul>
                  </div>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                  <span style={{ color: "var(--primary)" }}>•</span>
                  <div>
                    <strong>개인 정보 및 이미지 무단 유출 제로 보증 (Third-Party Validation)</strong>:
                    본 테스트 프로그램은 이미지의 외부 무단 전송을 완벽히 차단하고 100% 클라이언트 브라우저 로컬 픽셀 메모리 내에서만 분석 결과를 도출합니다. 기기에 저장하거나 외부 수집되지 않음을 약속드리며 구글 세이프티 가이드라인을 준수합니다.
                  </div>
                </li>
              </ul>
              
              <div style={{ borderTop: "1px solid rgba(196,149,106,0.1)", paddingTop: "10px", fontSize: "11px", color: "rgba(61, 43, 26, 0.7)" }}>
                <span>📫 <b>학술 피드백, 제휴 및 공식 문의</b> : </span>
                <a href="mailto:zezeteam2026@gmail.com" style={{ color: "var(--primary)", fontWeight: "600", textDecoration: "underline" }}>
                  zezeteam2026@gmail.com
                </a>
              </div>
            </div>
          ) : (
            <div>
              <h4 style={{ fontSize: "13px", fontWeight: "700", color: "var(--rg)", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                🛡️ Service Credibility, Authorship & Citations (Trust Verification)
              </h4>
              <p style={{ color: "rgba(61, 43, 26, 0.8)", lineHeight: "1.6", marginBottom: "12px" }}>
                InSelf Color provides complete visibility regarding our authorship and scientific colorimetric standards to assure our global users.
              </p>
              
              <ul style={{ listStyleType: "none", padding: 0, margin: "0 0 14px 0", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                  <span style={{ color: "var(--primary)" }}>•</span>
                  <div>
                    <strong>Authorship & Development</strong>: Developed by InSelf Studio Labs (composed of digital imaging experts, senior colorists, and graphical software developers).
                  </div>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                  <span style={{ color: "var(--primary)" }}>•</span>
                  <div>
                    <strong>Academically Peer-Cited Foundations (Sources)</strong>:
                    <ul style={{ listStyleType: "circle", paddingLeft: "14px", marginTop: "4px", color: "rgba(61, 43, 26, 0.7)" }}>
                      <li>Based on JCRI's Practical Color Coordinate System (PCCS, 1964) harmony constraints.</li>
                      <li>Refined following Munsell's Hue, Value, and Chroma (HVC) specification standard (JIS Z 8721).</li>
                      <li>Skin-tone spectrum values optimized using CIE L*a*b* space criteria modeling hemoglobin & melanin reflectance metrics.</li>
                    </ul>
                  </div>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                  <span style={{ color: "var(--primary)" }}>•</span>
                  <div>
                    <strong>100% Safe Local Client-Side Pixel Processing (Security)</strong>:
                    Photographs and facial canvas frames are compiled purely inside your local browser storage and RAM memory. Zero files or data packets are sent back or harvested on external servers.
                  </div>
                </li>
              </ul>
              
              <div style={{ borderTop: "1px solid rgba(196,149,106,0.1)", paddingTop: "10px", fontSize: "11px", color: "rgba(61, 43, 26, 0.7)" }}>
                <span>📫 <b>Feedback, Partnerships & Inquiries</b> : </span>
                <a href="mailto:zezeteam2026@gmail.com" style={{ color: "var(--primary)", fontWeight: "600", textDecoration: "underline" }}>
                  zezeteam2026@gmail.com
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer with crawler compliant legal page anchors */}
        <footer style={{
          marginTop: "48px",
          paddingTop: "24px",
          borderTop: "1px solid rgba(196,149,106,0.12)",
          width: "100%",
          maxWidth: "520px",
          textAlign: "center",
          fontSize: "12px",
          color: "var(--sub)"
        }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginBottom: "12px" }}>
            <a 
              href="#privacy" 
              onClick={(e) => { e.preventDefault(); window.location.hash = "privacy"; }} 
              style={{ color: "var(--rg)", fontWeight: "600", textDecoration: "none", borderBottom: "1px dashed var(--rg)" }}
            >
              {lang === "ko" ? "개인정보처리방침" : "Privacy Policy"}
            </a>
            <span style={{ color: "rgba(196,149,106,0.3)" }}>|</span>
            <a 
              href="#terms" 
              onClick={(e) => { e.preventDefault(); window.location.hash = "terms"; }} 
              style={{ color: "var(--sub)", fontWeight: "500", textDecoration: "none" }}
            >
              {lang === "ko" ? "서비스 이용약관" : "Terms of Service"}
            </a>
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "12px", fontSize: "11px", color: "rgba(122,96,82,0.65)" }}>
            <span style={{ fontWeight: "600" }}>{lang === "ko" ? "추천 사이트" : "Recommended Sites"}:</span>
            <a 
              href="https://www.zezelab.xyz" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: "rgba(122,96,82,0.85)", textDecoration: "underline" }}
              title={lang === "ko" ? "개발 지원 도구" : "Developer Support Tools"}
            >
              {lang === "ko" ? "ZezeLab(개발 지원 도구)" : "ZezeLab (Dev Tools)"}
            </a>
            <span style={{ color: "rgba(196,149,106,0.2)" }}>•</span>
            <a 
              href="https://www.zezeworklab.xyz" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: "rgba(122,96,82,0.85)", textDecoration: "underline" }}
              title={lang === "ko" ? "직장인 필수 통합 유틸리티 플랫폼" : "Essential Utilities for Office Workers"}
            >
              {lang === "ko" ? "ZezeWorkLab(직장인 통합 유틸리티)" : "ZezeWorkLab (Office Utilities)"}
            </a>
            <span style={{ color: "rgba(196,149,106,0.2)" }}>•</span>
            <a 
              href="https://everydaycalcs.pages.dev" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: "rgba(122,96,82,0.85)", textDecoration: "underline" }}
              title={lang === "ko" ? "글로벌 계산기 플랫폼" : "Global Calculator Platform"}
            >
              {lang === "ko" ? "EverydayCalcs(글로벌 계산기)" : "EverydayCalcs (Global Calculators)"}
            </a>
          </div>
          <p style={{ fontSize: "11px", color: "rgba(122,96,82,0.6)" }}>
            © {new Date().getFullYear()} InSelf Studio. All Rights Reserved.
          </p>
        </footer>
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
  lang: "ko" | "en";
  setLang: (lang: "ko" | "en") => void;
  gender: "female" | "male";
  setGender: (g: "female" | "male") => void;
}

function UploadScreen({onBack,onAnalyze,uploadedImage,onImageSet,lang,setLang,gender,setGender}: UploadScreenProps){
  const[isDrag,setIsDrag]=useState(false);
  const[hasAgreed,setHasAgreed]=useState(false);
  const handleFile=useCallback((file: File)=>{
    if(!file||!file.type.startsWith("image/"))return;
    const r=new FileReader();
    r.onload=(e)=>{
      const src=e.target?.result as string;
      const img=new Image();
      img.onload=()=>{
        const MAX_WIDTH=1024;
        const MAX_HEIGHT=1024;
        let w=img.width;
        let h=img.height;
        if(w>MAX_WIDTH||h>MAX_HEIGHT){
          if(w>h){h=Math.round((h*MAX_WIDTH)/w);w=MAX_WIDTH;}
          else{w=Math.round((w*MAX_HEIGHT)/h);h=MAX_HEIGHT;}
          const canvas=document.createElement("canvas");
          canvas.width=w;
          canvas.height=h;
          const ctx=canvas.getContext("2d");
          if(ctx){
            ctx.drawImage(img,0,0,w,h);
            onImageSet(canvas.toDataURL("image/jpeg",0.9));
          }else{
            onImageSet(src);
          }
        }else{
          onImageSet(src);
        }
      };
      img.onerror=()=>onImageSet(src);
      img.src=src;
    };
    r.readAsDataURL(file);
  },[onImageSet]);

  const INPUT_ID="pct-file-input";

  return(
    <div className="w"><FontLoader/><style>{CSS}</style><Nav lang={lang} setLang={setLang}/>
      <div className="uppage se">
        <div className="phdr">
          <button className="btnbk" onClick={onBack}>← {T[lang].back}</button>
          <h2 className="ptitle">{T[lang].uploadTitle}</h2>
          <p className="pdesc">{T[lang].uploadDesc}</p>
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
              <img src={uploadedImage} alt="Preview" className="pimg"/>
              <div className="pov">
                <label htmlFor={INPUT_ID} className="uchglabel">📁 {T[lang].changePhoto}</label>
              </div>
            </>
          ):(
            <label htmlFor={INPUT_ID} className="ulabel">
              <div className="uic">📷</div>
              <p className="umain">{T[lang].dragOrClick}</p>
              <p className="usub" style={{ whiteSpace: "pre-line" }}>{T[lang].fileSupport}</p>
              <span className="btnf">📁 {T[lang].selectFile}</span>
            </label>
          )}
        </div>

        {/* Gender Selection */}
        <div className="gsel-wrap">
          <span className="gsel-lbl">🧬 {T[lang].genderTitle}</span>
          <div className="gsel-options">
            <button
              type="button"
              className={`gsel-btn${gender === "female" ? " active" : ""}`}
              onClick={() => setGender("female")}
            >
              👩 {T[lang].genderFemale}
            </button>
            <button
              type="button"
              className={`gsel-btn${gender === "male" ? " active" : ""}`}
              onClick={() => setGender("male")}
            >
              👨 {T[lang].genderMale}
            </button>
          </div>
        </div>

        <div className="tips">
          <span style={{fontSize:15,flexShrink:0}}>💡</span>
          <p className="tiptxt" style={{ whiteSpace: "pre-line" }}>{T[lang].uploadTips}</p>
        </div>

        {/* Compliance Legal Checkbox */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "16px",
          marginBottom: "16px",
          justifyContent: "center",
          fontSize: "12.5px",
          color: "var(--sub)",
          cursor: "pointer",
          userSelect: "none"
        }} onClick={() => setHasAgreed(!hasAgreed)}>
          <input 
            type="checkbox" 
            checked={hasAgreed} 
            onChange={(e) => setHasAgreed(e.target.checked)} 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              accentColor: "var(--rg)", 
              width: "16px", 
              height: "16px",
              cursor: "pointer" 
            }} 
          />
          <span>
            {T[lang].legalCons}{" "}
            <a 
              href="#privacy" 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.hash = "privacy"; }} 
              style={{ color: "var(--rg)", textDecoration: "underline", fontWeight: 600 }}
            >
              [{lang === "ko" ? "보기" : "View"}]
            </a>
          </span>
        </div>

        <button className="btnan" disabled={!uploadedImage || !hasAgreed} onClick={onAnalyze}>
          {!uploadedImage ? T[lang].pleaseUpload : (!hasAgreed ? (lang === "ko" ? "동의가 필요합니다" : "Agreement required") : T[lang].startAnalysis)}
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
  lang: "ko" | "en";
  setLang: (lang: "ko" | "en") => void;
}

function AnalyzingScreen({progress,lang,setLang}: AnalyzingScreenProps){
  const active=Math.min(Math.floor((progress/100)*T[lang].analysisSteps.length),T[lang].analysisSteps.length-1);
  return(
    <div className="w"><FontLoader/><style>{CSS}</style><Nav lang={lang} setLang={setLang}/>
      <div className="anpage se">
        <div className="ringw">
          <div className="ar r1"/><div className="ar r2"/>
          <div className="ac">🎨</div>
        </div>
        <h2 className="antit">{T[lang].analyzingTitle}</h2>
        <p className="ansub" style={{ whiteSpace: "pre-line" }}>{T[lang].analyzingDesc}</p>
        <div className="prw">
          <div className="prb"><div className="prf" style={{width:`${progress}%`}}/></div>
          <div className="prl"><span>{T[lang].analyzingProg}</span><span>{Math.round(progress)}%</span></div>
        </div>
        <div className="asteps">
          {T[lang].analysisSteps.map((s: string,i: number)=>{
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
  lang: "ko" | "en";
  setLang: (lang: "ko" | "en") => void;
  gender: "female" | "male";
  setGender: (g: "female" | "male") => void;
  uploadedImage: string | null;
}

function ResultsScreen({result,onRetry,onToast,lang,setLang,gender,setGender,uploadedImage: image}: ResultsScreenProps){
  const[bars,setBars] = useState<Record<string, number>>({spring:0,summer:0,autumn:0,winter:0});
  const [userName, setUserName] = useState<string>("");
  const season=SEASONS[result.season];
  const{scores}=result;

  // Stable random selections for both genders
  const selectedFemaleIndices = useMemo(() => {
    const total = season.celebs.female.length;
    const indices = Array.from({ length: total }, (_, i) => i);
    return indices.sort(() => 0.5 - Math.random()).slice(0, 5);
  }, [result.season, season.celebs.female.length]);

  const selectedMaleIndices = useMemo(() => {
    const total = season.celebs.male.length;
    const indices = Array.from({ length: total }, (_, i) => i);
    return indices.sort(() => 0.5 - Math.random()).slice(0, 5);
  }, [result.season, season.celebs.male.length]);

  const selectedCelebs = useMemo(() => {
    const list = season.celebs[gender];
    const indices = gender === "female" ? selectedFemaleIndices : selectedMaleIndices;
    return indices.map((idx: number) => list[idx]);
  }, [gender, selectedFemaleIndices, selectedMaleIndices, season.celebs]);

  const selectedCelebsEn = useMemo(() => {
    const list = season.celebsEn[gender];
    const indices = gender === "female" ? selectedFemaleIndices : selectedMaleIndices;
    return indices.map((idx: number) => list[idx]);
  }, [gender, selectedFemaleIndices, selectedMaleIndices, season.celebsEn]);

  const celebCards = useMemo(() => {
    const listKo = season.celebs[gender];
    const listEn = season.celebsEn[gender];
    const indices = gender === "female" ? selectedFemaleIndices : selectedMaleIndices;
    
    return indices.map((idx: number) => {
      const tagKo = listKo[idx];
      const tagEn = listEn[idx];
      const tag = lang === "ko" ? tagKo : tagEn;
      
      const capSeason = result.season.charAt(0).toUpperCase() + result.season.slice(1);
      const prefix = gender === 'female' ? 'w' : 'm';
      const imgNum = idx % 5;
      
      let imgPath = "";
      if (result.season === 'autumn') {
        imgPath = `/images/autumn/${prefix}_Autumn${imgNum + 1}.png`;
      } else {
        const suffix = imgNum === 0 ? '' : imgNum;
        imgPath = `/images/${result.season}/${prefix}_${capSeason}${suffix}.png`;
      }
      
      return { tag, imgPath };
    });
  }, [gender, selectedFemaleIndices, selectedMaleIndices, season.celebs, season.celebsEn, lang, result.season]);
  const order=[result.season,...["spring","summer","autumn","winter"].filter(s=>s!==result.season)];

  useEffect(()=>{
    window.scrollTo(0,0);
    const t=setTimeout(()=>setBars(scores),260);
    return()=>clearTimeout(t);
  },[scores]);

  const handleShare=()=>{
    const seasonName = lang === "ko" ? season.name : season.nameEn;
    const txt = lang === "ko"
      ? `나의 퍼스널 컬러 결과: ${seasonName} ${season.icon}\n👉 테스트해보기: https://inselfcolor.pages.dev\n[※ 네이버 블로그/카페 스크랩 및 포스팅 대환영! 💚]\n#InSelfColor #퍼스널컬러 #웜톤쿨톤 #자가진단`
      : `My Personal Color Result: ${seasonName} ${season.icon}\n👉 Analyze yours: https://inselfcolor.pages.dev\n[※ Naver Blog/Café scrap & share welcomed! 💚]\n#InSelfColor #PersonalColor`;
    if(navigator.share) {
      navigator.share({title:"Personal Color - InSelf Color",text:txt,url:"https://inselfcolor.pages.dev"}).catch(() => {});
    } else if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(txt).then(()=>onToast(T[lang].toastCopied)).catch(()=>onToast(T[lang].toastNoShare));
    } else {
      onToast(T[lang].toastNoShare);
    }
  };
  const handleDlDetailed = () => {
    const activeCard = celebCards[0];
    const customCelebs = lang === "ko" ? selectedCelebs : selectedCelebsEn;
    
    onToast(T[lang].toastStartingAll);

    const userImgSrc = image || (activeCard ? activeCard.imgPath : "");
    const userTag = {
      tag: image ? (lang === "ko" ? "#나의_스캔_아이디" : "#My_Scan_ID") : (activeCard ? activeCard.tag : "#InSelfCustomVibe"),
      imgPath: userImgSrc
    };

    if (!userImgSrc) {
      try {
        downloadDetailedResultCard(season, scores, lang, customCelebs, undefined, null, userName);
        onToast(T[lang].toastSaveSuccess);
        trackEvent("full_save", { season: season.id, gender });
      } catch (e) {
        console.error(e);
        onToast(T[lang].toastError);
      }
      return;
    }

    const img = new Image();
    if (!userImgSrc.startsWith("data:")) {
      img.crossOrigin = "anonymous";
    }
    img.onload = () => {
      try {
        downloadDetailedResultCard(season, scores, lang, customCelebs, userTag, img, userName);
        onToast(T[lang].toastSaveSuccess);
        trackEvent("full_save", { season: season.id, gender });
      } catch (e) {
        console.error(e);
        onToast(T[lang].toastError);
      }
    };
    img.onerror = () => {
      console.warn("Failed to load representative style image, drawing text fallback.");
      try {
        downloadDetailedResultCard(season, scores, lang, customCelebs, userTag, null, userName);
        onToast(T[lang].toastSaveSuccess);
        trackEvent("full_save", { season: season.id, gender });
      } catch (e) {
        console.error(e);
        onToast(T[lang].toastError);
      }
    };
    img.src = userImgSrc;
  };

  const handleDlSns = () => {
    const activeCard = celebCards[0];
    const customCelebs = lang === "ko" ? selectedCelebs : selectedCelebsEn;
    
    onToast(T[lang].toastSavingCard);

    const userImgSrc = image || (activeCard ? activeCard.imgPath : "");
    const userTag = {
      tag: image ? (lang === "ko" ? "#나의_스캔_아이디" : "#My_Scan_ID") : (activeCard ? activeCard.tag : "#InSelfCustomVibe"),
      imgPath: userImgSrc
    };

    if (!userImgSrc) {
      try {
        downloadSnsCard(season, scores, lang, customCelebs, undefined, null, userName);
        trackEvent("sns_save", { season: season.id, gender });
      } catch (e) {
        console.error(e);
        onToast(T[lang].toastError);
      }
      return;
    }

    const img = new Image();
    if (!userImgSrc.startsWith("data:")) {
      img.crossOrigin = "anonymous";
    }
    img.onload = () => {
      try {
        downloadSnsCard(season, scores, lang, customCelebs, userTag, img, userName);
        trackEvent("sns_save", { season: season.id, gender });
      } catch (e) {
        console.error(e);
        onToast(T[lang].toastError);
      }
    };
    img.onerror = () => {
      console.warn("Failed to load representative style image, drawing text fallback.");
      try {
        downloadSnsCard(season, scores, lang, customCelebs, userTag, null, userName);
        trackEvent("sns_save", { season: season.id, gender });
      } catch (e) {
        console.error(e);
        onToast(T[lang].toastError);
      }
    };
    img.src = userImgSrc;
  };

  const handleDlRepr = () => {
    const activeCard = celebCards[0];
    const userImgSrc = image || (activeCard ? activeCard.imgPath : "");
    const userTagText = image ? (lang === "ko" ? "#나의_스캔_아이디" : "#My_Scan_ID") : (activeCard ? activeCard.tag : "#InSelfCustomVibe");

    if (!userImgSrc) {
      onToast(T[lang].toastError);
      return;
    }
    onToast(lang === "ko" ? "✨ 스타일 ID 출입증 카드를 발급하는 중입니다..." : "✨ Issuing style ID Pass card...");
    
    const img = new Image();
    if (!userImgSrc.startsWith("data:")) {
      img.crossOrigin = "anonymous";
    }
    img.onload = () => {
      try {
        const W = 600, H = 900, dpr = 2;
        const c = document.createElement("canvas");
        c.width = W * dpr; c.height = H * dpr;
        const ctx = c.getContext("2d");
        if (!ctx) return;
        ctx.scale(dpr, dpr);

        // Define premium seasonal palettes for the collectible Digital Pass
        const themeDef: Record<string, {
          bgStart: string;
          bgEnd: string;
          textColor: string;
          labelColor: string;
          accentColor: string;
          innerCardBg: string;
          borderStroke: string;
          barcodeColor: string;
          badgeBg: string;
          badgeTxt: string;
          typeEn: string;
          typeKo: string;
        }> = {
          spring: {
            bgStart: "#FAF5EE", bgEnd: "#FDF1E6",
            textColor: "#4D3A2C", labelColor: "rgba(77, 58, 44, 0.55)",
            accentColor: "#C4956A", innerCardBg: "rgba(255,255,255,0.7)",
            borderStroke: "rgba(196,149,106,0.22)", barcodeColor: "#4D3A2C",
            badgeBg: "#FDEDE2", badgeTxt: "#C45A3E",
            typeEn: "SPRING WARM", typeKo: "봄 웜톤"
          },
          summer: {
            bgStart: "#F2F6FA", bgEnd: "#E3ECF5",
            textColor: "#1F2E3B", labelColor: "rgba(31, 46, 59, 0.55)",
            accentColor: "#668AA4", innerCardBg: "rgba(255,255,255,0.75)",
            borderStroke: "rgba(102,138,164,0.25)", barcodeColor: "#1D2D3B",
            badgeBg: "#E6EEF5", badgeTxt: "#3E617E",
            typeEn: "SUMMER COOL", typeKo: "여름 쿨톤"
          },
          autumn: {
            bgStart: "#F6ECE2", bgEnd: "#EADBCB",
            textColor: "#3D291C", labelColor: "rgba(61, 41, 28, 0.55)",
            accentColor: "#9A6A47", innerCardBg: "rgba(255,255,255,0.7)",
            borderStroke: "rgba(154,106,71,0.24)", barcodeColor: "#3D291C",
            badgeBg: "#F3E6D9", badgeTxt: "#8E4F28",
            typeEn: "AUTUMN WARM", typeKo: "가을 웜톤"
          },
          winter: {
            bgStart: "#1F2126", bgEnd: "#121316",
            textColor: "#F2F4F7", labelColor: "rgba(242, 244, 247, 0.5)",
            accentColor: "#98A2B3", innerCardBg: "rgba(255,255,255,0.06)",
            borderStroke: "rgba(255,255,255,0.12)", barcodeColor: "#F2F4F7",
            badgeBg: "rgba(255,255,255,0.12)", badgeTxt: "#F8F9FA",
            typeEn: "WINTER COOL", typeKo: "겨울 쿨톤"
          }
        };

        const theme = themeDef[result.season] || themeDef.summer;

        // Helper rounded rect drawer
        const rrect = (x: number, y: number, w: number, h: number, r: number, fillColor?: string, strokeColor?: string, strokeWidth = 1) => {
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
          if (fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fill();
          }
          if (strokeColor) {
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = strokeWidth;
            ctx.stroke();
          }
        };

        // Draw Card base background
        const bg = ctx.createLinearGradient(0, 0, W, H);
        bg.addColorStop(0, theme.bgStart);
        bg.addColorStop(1, theme.bgEnd);
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);

        // Card Border Frame
        rrect(15, 15, W - 30, H - 30, 24, undefined, theme.borderStroke, 2);

        // Card Hanger Strap Slot (Punch Hole look)
        rrect(W / 2 - 35, 32, 70, 14, 7, theme.borderStroke);
        rrect(W / 2 - 30, 34, 60, 10, 5, theme.textColor === "#F2F4F7" ? "#1F2126" : "#EDE1D4");

        // Top Brand Title & Pass type Headers
        ctx.fillStyle = theme.textColor;
        ctx.font = "bold 11px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("✦  I N S E L F   C O L O R  ✦", W / 2, 72);
        
        ctx.font = "bold italic 18px serif";
        ctx.fillText("STYLE IDENTIFICATION PASS / CREDENTIAL", W / 2, 98);

        // Portrait frame size & placement
        const imgX = 110, imgY = 120, imgW = 380, imgH = 445;

        // Card shadow for realism
        ctx.shadowColor = theme.textColor === "#F2F4F7" ? "rgba(0,0,0,0.4)" : "rgba(62,40,20,0.06)";
        ctx.shadowBlur = 18;
        ctx.shadowOffsetY = 6;
        rrect(imgX, imgY, imgW, imgH, 20, theme.textColor === "#F2F4F7" ? "#23252E" : "#FFFFFF");
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;

        // Clip-draw the style representative image (preserving aspect ratio/rect ratio)
        ctx.save();
        ctx.beginPath();
        const r = 20;
        ctx.moveTo(imgX + r, imgY);
        ctx.lineTo(imgX + imgW - r, imgY);
        ctx.quadraticCurveTo(imgX + imgW, imgY, imgX + imgW, imgY + r);
        ctx.lineTo(imgX + imgW, imgY + imgH - r);
        ctx.quadraticCurveTo(imgX + imgW, imgY + imgH, imgX + imgW - r, imgY + imgH);
        ctx.lineTo(imgX + r, imgY + imgH);
        ctx.quadraticCurveTo(imgX, imgY + imgH, imgX, imgY + imgH - r);
        ctx.lineTo(imgX, imgY + r);
        ctx.quadraticCurveTo(imgX, imgY, imgX + r, imgY);
        ctx.closePath();
        ctx.clip();
        
        // Draw fine warm gallery backing fill inside clipped area
        ctx.fillStyle = theme.textColor === "#F2F4F7" ? "rgba(255,255,255,0.03)" : "rgba(196,149,106,0.06)";
        ctx.fillRect(imgX, imgY, imgW, imgH);

        try {
          const imgRatio = img.width / img.height;
          const targetRatio = imgW / imgH;

          const zoom = 1.0; // Fit and preserve larger view without over-zooming
          let sWidth = img.width;
          let sHeight = img.height;
          let sx = 0;
          let sy = 0;

          if (imgRatio > targetRatio) {
            // Wide image
            sHeight = img.height / zoom;
            sWidth = sHeight * targetRatio;
            sx = (img.width - sWidth) / 2;
            sy = Math.max(0, (img.height - sHeight) * 0.15);
          } else {
            // Tall image
            sWidth = img.width / zoom;
            sHeight = sWidth / targetRatio;
            sx = (img.width - sWidth) / 2;
            // Shift crop frame UP to preserve head/hair (12% of remaining height offset)
            sy = Math.max(0, (img.height - sHeight) * 0.12);
          }

          ctx.drawImage(img, sx, sy, sWidth, sHeight, imgX, imgY, imgW, imgH);
        } catch (e) {
          console.warn("Could not draw representative image", e);
        }
        ctx.restore();

        // Outline Border around picture frame
        rrect(imgX, imgY, imgW, imgH, 20, undefined, theme.borderStroke, 1.5);

        // Active Style tag badge float overlapping picture bottom-center
        const tagText = userTagText;
        ctx.font = "bold 13px sans-serif";
        const tagTextWidth = ctx.measureText(tagText).width + 30;
        const tagPillX = W / 2 - tagTextWidth / 2;
        const tagPillY = 550;

        // Floating Badge
        rrect(tagPillX, tagPillY, tagTextWidth, 32, 16, theme.badgeBg, theme.accentColor, 1);
        ctx.fillStyle = theme.badgeTxt;
        ctx.textAlign = "center";
        ctx.font = "bold 13px sans-serif";
        ctx.fillText(tagText, W / 2, tagPillY + 20);

        // Information Grid Section
        const infoY = 592;
        ctx.strokeStyle = theme.borderStroke;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(60, infoY);
        ctx.lineTo(W - 60, infoY);
        ctx.stroke();

        const labelX = 80;
        const valX = 205;

        const getFormattedDate = () => {
          const d = new Date();
          const yyyy = d.getFullYear();
          const mm = String(d.getMonth() + 1).padStart(2, '0');
          const dd = String(d.getDate()).padStart(2, '0');
          return `${yyyy}.${mm}.${dd}`;
        };

        const passengerName = userName && userName.trim() ? userName.trim().toUpperCase() : "INSELF GUEST";

        const fields = [
          { label: "PASSENGER", value: passengerName },
          { label: "COLOR TYPE", value: `${theme.typeKo} / ${theme.typeEn}` },
          { label: "ISSUE DATE", value: getFormattedDate() },
          { label: "STATUS CODE", value: `INSELF-${result.season.toUpperCase()}-STYLE-VERIFIED` }
        ];

        fields.forEach((f, i) => {
          const itemY = infoY + 20 + i * 35;
          
          // Technical identifier label
          ctx.fillStyle = theme.labelColor;
          ctx.font = "bold 10.5px monospace";
          ctx.textAlign = "left";
          ctx.fillText(f.label, labelX, itemY + 14);
          
          // Credential Value
          ctx.fillStyle = theme.textColor;
          let fontSize = 13.5;
          ctx.font = `bold ${fontSize}px sans-serif`;
          
          // Shrink text dynamically if it's too long
          let textWidth = ctx.measureText(f.value).width;
          const maxValWidth = W - valX - 70;
          while (textWidth > maxValWidth && fontSize > 9) {
            fontSize -= 0.5;
            ctx.font = `bold ${fontSize}px sans-serif`;
            textWidth = ctx.measureText(f.value).width;
          }
          
          ctx.fillText(f.value, valX, itemY + 14);
          
          // Dotted line separation
          if (i < fields.length - 1) {
            ctx.strokeStyle = theme.borderStroke;
            ctx.setLineDash([3, 4]);
            ctx.beginPath();
            ctx.moveTo(60, itemY + 26);
            ctx.lineTo(W - 60, itemY + 26);
            ctx.stroke();
            ctx.setLineDash([]); // Restore solid stroke dash state
          }
        });

        // Centered Mock Barcode Graphic at Bottom Section
        const pattern = [2, 1, 4, 1, 2, 3, 1, 1, 2, 2, 1, 4, 1, 1, 3, 2, 2, 1, 2, 1, 4, 1, 3, 1, 2, 3, 1, 1, 4, 2];
        const barScaler = 2.4;
        const gap = 2;
        
        let totalBarcodeWidth = 0;
        pattern.forEach((val, idx) => {
          totalBarcodeWidth += val * barScaler;
          if (idx < pattern.length - 1) {
            totalBarcodeWidth += gap;
          }
        });

        const barX = (W - totalBarcodeWidth) / 2;
        const barY = 772;
        const barH = 34;
        const barcodeText = `INSELF-PASS-${result.season.toUpperCase()}-2026`;
        
        ctx.fillStyle = theme.textColor;
        let currentBarX = barX;
        for (let idx = 0; idx < pattern.length; idx++) {
          const bW = pattern[idx] * barScaler;
          const isBlack = idx % 2 === 0;
          if (isBlack) {
            ctx.fillRect(currentBarX, barY, bW, barH);
          }
          currentBarX += bW + gap;
        }

        // Under-barcode readable character label inside center alignment
        ctx.fillStyle = theme.labelColor;
        ctx.font = "bold 10px monospace";
        ctx.textAlign = "center";
        ctx.fillText(barcodeText, W / 2, barY + barH + 13);



        const a = document.createElement("a");
        a.download = `inself-style-pass-${season.id}_${getFormattedTimestamp()}.png`;
        a.href = c.toDataURL("image/png");
        a.click();
        
        onToast(lang === "ko" ? "성공적으로 발급 및 저장되었습니다! 🪪" : "Issued and saved successfully! 🪪");
        trackEvent("repr_save", { season: season.id, gender });
      } catch (err) {
        console.error(err);
        onToast(T[lang].toastError);
      }
    };
    img.onerror = () => {
      onToast(T[lang].toastError);
    };
    img.src = userImgSrc;
  };

  const seasonName = lang === "ko" ? season.name : season.nameEn;
  const seasonKeyword = lang === "ko" ? season.keyword : season.keywordEn;
  const seasonDesc = lang === "ko" ? season.description : season.descriptionEn;
  const subtypesArr = lang === "ko" ? season.subtypes : season.subtypesEn;
  const characteristicsArr = lang === "ko" ? season.characteristics : season.characteristicsEn;

  const mKeyLabels = lang === "ko" ? ["파운데이션", "블러셔", "립", "아이섀도", "아이라이너"] : ["Foundation", "Blusher", "Lip", "Eyeshadow", "Eyeliner"];
  const mValList = lang === "ko" ? 
    [season.makeup.foundation, season.makeup.blush, season.makeup.lip, season.makeup.eye, season.makeup.liner] :
    [season.makeup.foundationEn, season.makeup.blushEn, season.makeup.lipEn, season.makeup.eyeEn, season.makeup.linerEn];

  const fashionStyle = lang === "ko" ? season.fashion.style : season.fashion.styleEn;
  const fashionItems = lang === "ko" ? season.fashion.items : season.fashion.itemsEn;
  const fashionFabrics = lang === "ko" ? season.fashion.fabrics : season.fashion.fabricsEn;
  const fashionAvoid = lang === "ko" ? season.fashion.avoid : season.fashion.avoidEn;

  const bestColors = lang === "ko" ? season.recommended : season.recommendedEn;
  const avoidColors = lang === "ko" ? season.avoid : season.avoidEn;

  const rTip = lang === "ko" ? season.tip : season.tipEn;
  const rCelebs = lang === "ko" ? selectedCelebs : selectedCelebsEn;

  return(
    <div className="w"><FontLoader/><style>{CSS}</style><Nav lang={lang} setLang={setLang}/>
      <div className="rpage se" id="result-page-content">
        {/* HERO */}
        <div className="rhero" style={{background:season.heroBg,color:season.textOnBg}}>
          <div className="rb" style={{color:season.primary}}>{T[lang].resultHeader}</div>
          <div className="ri" style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "10px auto 16px" }}>
            <SeasonIcon seasonId={result.season} emoji={season.icon} style={{ width: "140px", height: "140px" }} />
          </div>
          <h2 className="rn">{seasonName}</h2>
          <p className="rkw">"{seasonKeyword}"</p>
          <p className="rdesc" style={{ whiteSpace: "pre-line" }}>{seasonDesc}</p>
          <div className="rsubs">{subtypesArr.map((s: string)=><span key={s} className="rsub" style={{color:season.primary}}>{s}</span>)}</div>
        </div>

        <div className="rc" style={{marginTop:22}}>
          {/* SCORE + DIAMOND */}
          <div className="rcard">
            <div className="rlbl">{T[lang].scoreTitle}</div>
            <div className="dw">
              <DiamondChart scores={scores} winner={result.season} lang={lang}/>
              <div className="scl">
                {order.map(k=>(
                  <div className="scr" key={k}>
                    <span className="sclbl" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <SeasonIcon seasonId={k} emoji={SEASONS[k].icon} style={{ width: "16px", height: "16px", flexShrink: 0 }} />
                      <span>{lang === "ko" ? SEASONS[k].name.replace(" 타입","") : SEASONS[k].nameEn}</span>
                    </span>
                    <div className="scbg"><div className="scfill" style={{width:`${bars[k]||0}%`,background:SEASONS[k].scoreColor}}/></div>
                    <span className="scpct">{scores[k]}%</span>
                  </div>
                ))}
              </div>
            </div>
            {result.error&&(
              <p style={{fontSize:11,color:"var(--sub)",marginTop:13,padding:"9px 13px",background:"rgba(196,149,106,.07)",borderRadius:10}}>
                {T[lang].skinScanWarning}
              </p>
            )}
          </div>

          {/* PALETTE */}
          <div className="rcard">
            <div className="rlbl">{T[lang].recoPalette}</div>
            <div className="pg">
              {season.palette.map(({hex,name,nameEn}: any)=>(
                <div key={hex} className="sw" title={`${lang === "ko" ? name : nameEn} — ${hex}`}
                  onClick={()=>{
                    if (navigator.clipboard?.writeText) {
                      const toastMsg = T[lang].toastColorCopied.replace("{hex}", hex);
                      navigator.clipboard.writeText(hex).then(()=>onToast(toastMsg)).catch(()=>{});
                    }
                  }}>
                  <div className="swc" style={{background:hex}}/>
                  <span className="swn">{lang === "ko" ? name : nameEn}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CHARACTERISTICS */}
          <div className="rcard">
            <div className="rlbl">{T[lang].characteristicsTitle}</div>
            <ul className="cl">
              {characteristicsArr.map((c: string, i: number)=>(
                <li key={i} className="ci"><span className="cd" style={{background:season.primary}}/>{c}</li>
              ))}
            </ul>
          </div>

          {/* MAKEUP */}
          <div className="rcard">
            <div className="rlbl">{T[lang].makeupTitle}</div>
            <div className="mkrows">
              {mKeyLabels.map((lbl: string, idx: number)=>(
                <div key={lbl} className="mkrow"><span className="mkkey">{lbl}</span><span className="mkval">{mValList[idx]}</span></div>
              ))}
              <div className="mkrow">
                <span className="mkkey">{lang === "ko" ? "컬러칩" : "Color Chips"}</span>
                <div className="mkdots">{season.makeup.dots.map((c: string)=><div key={c} className="mkdot" style={{background:c}} title={c}/>)}</div>
              </div>
            </div>
          </div>

          {/* FASHION */}
          <div className="rcard">
            <div className="rlbl">{T[lang].fashionTitle}</div>
            <p style={{fontSize:13,fontWeight:500,color:season.primary,marginBottom:13}}>{fashionStyle}</p>
            <div className="fgrid">
              <div>
                <div className="fctit">{lang === "ko" ? "✅ 추천 아이템" : "✅ Recommended Items"}</div>
                <div className="ftags">{fashionItems.map((i: string)=><span key={i} className="ftag fg">{i}</span>)}</div>
              </div>
              <div>
                <div className="fctit">{lang === "ko" ? "🧵 어울리는 소재" : "🧵 Matching Fabrics"}</div>
                <div className="ftags">{fashionFabrics.map((f: string)=><span key={f} className="ftag fg">{f}</span>)}</div>
              </div>
              <div style={{gridColumn:"1/-1"}}>
                <div className="fctit">{lang === "ko" ? "❌ 피하면 좋은 코디" : "❌ Outfits to Avoid"}</div>
                <div className="ftags">{fashionAvoid.map((a: string)=><span key={a} className="ftag fb">{a}</span>)}</div>
              </div>
            </div>
          </div>

          {/* COLOR GUIDE */}
          <div className="rcard">
            <div className="rlbl">{T[lang].colorGuideTitle}</div>
            <div className="rg2">
              <div>
                <div className="rtit"><span>✅</span> {lang === "ko" ? "잘 어울리는 색" : "Best Colors"}</div>
                <div className="rtags">{bestColors.map((r: string)=><span key={r} className="rtag rgg">{r}</span>)}</div>
              </div>
              <div>
                <div className="rtit"><span>❌</span> {lang === "ko" ? "피하면 좋은 색" : "Colors to Avoid"}</div>
                <div className="rtags">{avoidColors.map((r: string)=><span key={r} className="rtag rgb2">{r}</span>)}</div>
              </div>
            </div>
          </div>

          {/* TIP */}
          <div className="rcard">
            <div className="rlbl">{T[lang].stylingTipsTitle}</div>
            <div className="tbox" style={{ whiteSpace: "pre-line" }}>{rTip}</div>
          </div>

          {/* CELEB */}
          <div className="rcard">
            <div className="rlbl" style={{ marginBottom: "16px" }}>{T[lang].famousCelebsTitle}</div>
            
            <div className="carousel-wrapper" style={{ padding: 0 }}>
              {celebCards[0] && (
                <div className="focus-card">
                  <div className="focus-img-wrapper" style={{ cursor: "default" }}>
                    <img 
                      src={celebCards[0].imgPath} 
                      className="focus-img" 
                      alt={celebCards[0].tag} 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                  <span className="focus-tag">{celebCards[0].tag}</span>
                </div>
              )}
            </div>
            
            <div className="clist">{rCelebs.map((c: string)=><span key={c} className="cchip">✦ {c}</span>)}</div>
          </div>

          {/* NAME INPUT CARD FOR PERSONALIZATION */}
          <div className="rcard user-name-pass-card" style={{
            background: "rgba(255, 255, 255, 0.45)",
            backdropFilter: "blur(12px)",
            border: "1px dashed rgba(196, 149, 106, 0.35)",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            boxShadow: "0 4px 20px rgba(62,40,20,0.02)"
          }} data-html2canvas-ignore="true">
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14.5px",
              fontWeight: 600,
              color: "#3D2B1A",
              fontFamily: "var(--fs)"
            }}>
              🪪 {lang === "ko" ? "나만의 퍼스널 출입증(Style ID Pass) 발급받기" : "Issue My Custom Style ID Pass"}
            </div>
            
            <p style={{
              fontSize: "12.5px",
              lineHeight: "1.6",
              color: "rgba(122,96,82,0.85)",
              margin: 0
            }}>
              {lang === "ko" 
                ? "이름이나 닉네임을 입력하시면 '스타일 ID 출입증' 및 'SNS 결과 리포트' 카드에 당신의 이름이 실시간으로 새겨집니다. 미입력 시 'INSELF GUEST'로 자동 인쇄됩니다."
                : "Enter your name or nickname to personalize your digital ID Pass and shareable SNS report card. If empty, 'INSELF GUEST' is used."}
            </p>

            <div style={{
              display: "flex",
              gap: "10px",
              marginTop: "4px",
              width: "100%",
              maxWidth: "420px"
            }}>
              <input 
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                maxLength={22}
                placeholder={lang === "ko" ? "닉네임 또는 실명 입력 (예: 홍길동)" : "Enter name or nickname (e.g., Alex)"}
                style={{
                  flex: 1,
                  padding: "11px 18px",
                  borderRadius: "100px",
                  border: "1.5px solid rgba(196,149,106,0.25)",
                  background: "#FFFFFF",
                  fontSize: "13.5px",
                  outline: "none",
                  fontFamily: "var(--fs)",
                  color: "#3D2B1A",
                  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.02)",
                  transition: "all 0.2s ease"
                }}
              />
              {userName.trim() && (
                <button 
                  type="button"
                  onClick={() => setUserName("")}
                  style={{
                    background: "rgba(122,96,82,0.1)",
                    border: "none",
                    color: "rgba(122,96,82,0.7)",
                    borderRadius: "100px",
                    padding: "0 16px",
                    cursor: "pointer",
                    fontSize: "12.5px",
                    fontWeight: 500
                  }}
                >
                  {lang === "ko" ? "초기화" : "Reset"}
                </button>
              )}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="ract" data-html2canvas-ignore="true">
            <button className="btr" onClick={onRetry}>{T[lang].retryBtn}</button>
            <button className="bdl-detailed" onClick={handleDlDetailed}>{T[lang].saveAllBtn}</button>
            <button className="bdl-sns" onClick={handleDlSns}>{T[lang].saveSnsBtn}</button>
            <button className="bdl-repr" onClick={handleDlRepr}>{T[lang].saveReprBtn}</button>
          </div>

          {/* SHARE SYSTEM */}
          <div style={{
            marginTop: "18px",
            padding: "16px 20px",
            background: "rgba(196,149,106,0.06)",
            border: "1px solid rgba(196,149,106,0.18)",
            borderRadius: "16px",
            textAlign: "center",
            maxWidth: "640px",
            marginLeft: "auto",
            marginRight: "auto"
          }} data-html2canvas-ignore="true">
            <p style={{
              fontSize: "13.5px",
              fontWeight: 700,
              color: "#5A483E",
              marginBottom: "12px",
              marginTop: 0,
              letterSpacing: "-0.01em"
            }}>
              {lang === "ko" ? "🔗 이 결과 친구에게 자랑하기 (바이럴 루프)" : "🔗 Share Your Results with Friends"}
            </p>
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap"
            }}>
              {/* Kakao copy helper */}
              <button 
                onClick={() => {
                  const seasonName = lang === "ko" ? season.name : season.nameEn;
                  const txt = lang === "ko"
                    ? `[InSelf Color] 나의 퍼스널 컬러 결과는 '${seasonName}' ${season.icon}입니다! 모바일/PC로 10초 만에 분석해보세요.\n👉 https://inselfcolor.pages.dev\n[※ 네이버 블로그/카페 스크랩 및 포스팅 대환영!]`
                    : `[InSelf Color] My personal color is '${seasonName}' ${season.icon}! Test your skin tone free here.\n👉 https://inselfcolor.pages.dev\n[※ Naver Blog / Café share & scrap welcome!]`;
                  if (navigator.clipboard?.writeText) {
                    navigator.clipboard.writeText(txt).then(() => onToast(T[lang].toastCopied));
                  } else {
                    onToast(T[lang].toastNoShare);
                  }
                }}
                style={{
                  background: "#FEE500",
                  color: "#191919",
                  border: "none",
                  borderRadius: "100px",
                  padding: "9px 16px",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "0 2px 8px rgba(254,229,0,0.22)",
                  transition: "all 0.2s"
                }}
              >
                <span style={{ fontSize: "14px" }}>💬</span> {lang === "ko" ? "카카오톡 공유 문구 복사" : "KakaoTalk Link Copy"}
              </button>

              {/* Twitter/X */}
              <button 
                onClick={() => {
                  const seasonName = lang === "ko" ? season.name : season.nameEn;
                  const txt = lang === "ko"
                    ? `나의 퍼스널 컬러 결과는 '${seasonName}' ${season.icon}입니다! PCCS로 분석해보는 나만의 분위기.\n#inselfcolor #퍼스널컬러 #웜톤쿨톤`
                    : `My personal color is '${seasonName}' ${season.icon}! Discover your PCCS value & chroma tone.\n#inselfcolor #personalcolor`;
                  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(txt)}&url=${encodeURIComponent("https://inselfcolor.pages.dev")}`;
                  window.open(url, "_blank");
                }}
                style={{
                  background: "#111111",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "100px",
                  padding: "9px 16px",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                  transition: "all 0.2s"
                }}
              >
                <span style={{ fontSize: "12px" }}>𝕏</span> {lang === "ko" ? "트위터 공유" : "Tweet"}
              </button>

              {/* Browser native share / copy link */}
              <button 
                onClick={handleShare}
                style={{
                  background: "linear-gradient(135deg, #7A6052, #5A483E)",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "100px",
                  padding: "9px 16px",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "0 2px 8px rgba(122,96,82,0.22)",
                  transition: "all 0.2s"
                }}
              >
                <span style={{ fontSize: "14px" }}>🔗</span> {lang === "ko" ? "결과링크 복사" : "Copy Link"}
              </button>
            </div>
          </div>

          {/* NAVER BLOG / CAFE OPTIMIZING KIT */}
          <div style={{
            marginTop: "18px",
            padding: "18px 22px",
            background: "#FFFFFF",
            border: "1.5px dashed rgba(3,199,90,0.4)",
            borderRadius: "16px",
            textAlign: "left",
            maxWidth: "640px",
            marginLeft: "auto",
            marginRight: "auto",
            fontFamily: "var(--fs)",
            boxShadow: "0 4px 12px rgba(3,199,90,0.03)"
          }} data-html2canvas-ignore="true">
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{
                background: "#03C75A",
                color: "#FFFFFF",
                fontSize: "10px",
                fontWeight: 800,
                padding: "2px 6px",
                borderRadius: "4px",
                textTransform: "uppercase"
              }}>NAVER BLOG/CAFE</span>
              <span style={{ fontSize: "14px", fontWeight: 700, color: "#1E1E1E" }}>
                {lang === "ko" ? "블로그/지식인 스크랩 & 포스팅 키트 💚" : "Naver Blog & Café Quick Post Kit 💚"}
              </span>
            </div>
            
            <p style={{ fontSize: "12px", color: "#555555", lineHeight: "1.55", margin: "0 0 16px 0" }}>
              {lang === "ko" 
                ? "인셀프컬러는 네이버 블로그, 카페(파우더룸 등), 지식인 스크랩을 100% 환영합니다! 분석 결과나 다운로드받은 메이크업 추천 이미지 카드를 활용해 자유롭게 꿀팁을 공유해보세요." 
                : "We 100% welcome and encourage you to scrap, write reviews, and share your personal color result cards on Naver Blog, Cafés, or any beauty forums!"}
            </p>

            {/* Copyable Blog Post Template generator */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", fontWeight: "700", color: "#3D2B1A" }}>
                  {lang === "ko" ? "📝 1초 완성 포스팅 템플릿 복사" : "📝 1-Sec Post Outline Generator"}
                </span>
                <button
                  onClick={() => {
                    const seasonName = lang === "ko" ? season.name : season.nameEn;
                    const naverPostTemplate = lang === "ko"
                      ? `[네이버 블로그/지식인 스크랩 환영] 출처: 인셀프컬러\n\n` +
                        `제목: AI 명도분석으로 찾은 내 진짜 톤! 인셀프컬러 자가진단 후기 (${seasonName})\n\n` +
                        `안녕하세요! 제 진짜 매력을 밝혀줄 AI 퍼스널컬러 진단 '인셀프컬러(InSelf Color)' 분석 후기입니다. 💚\n\n` +
                        `이번에 직접 사진을 촬영하여 PCCS 수치 추출 분석을 해보니 저의 퍼스널 컬러 유형은 바로 바로...\n` +
                        `👉 [ ${seasonName} ] ${season.icon} 가 나왔습니다!\n\n` +
                        `요새 네이버 뷰(VIEW)나 블로그에서 퍼스널 뷰티 아이템 추천 정보를 많이 찾으실텐데요. ` +
                        `인셀프컬러에서는 상세한 12타입별 맞춤형 컬러 매칭과 아이 메이크업, 립 추천 정보까지 실시간으로 보여주네요!\n\n` +
                        `특히 분석 완료 후 저장하는 '결과 카드'에는 저의 톤에 맞는 대표 시그니처 톤 배색까지 예쁘게 입혀져서 저장됩니다.\n` +
                        `네이버 블로그나 카페에 글 쓰실 때 결과 카드 올리기에도 딱이더라구요!\n\n` +
                        `여러분도 10초 만에 로그인 없이 무료로 어울리는 인생템 수치를 확인해보세요!\n` +
                        `👉 즉시 자가진단하기: https://inselfcolor.pages.dev\n\n` +
                        `#인셀프컬러 #InSelfColor #퍼스널컬러 #퍼스널컬러진단 #웜톤쿨톤 #자가진단 #네이버블로그스크랩환영 #${seasonName.replace(/\s+/g, "")}`
                      : `[Naver Blog / Café Scrap Welcomed] Source: InSelf Color\n\n` +
                        `Title: Found My Real Spectrum on InSelf Color AI Tone Analyzer (${seasonName})\n\n` +
                        `I just discovered my true personal color using the rapid PCCS calibration on InSelf Color!\n` +
                        `👉 Result: [ ${seasonName} ] ${season.icon}\n\n` +
                        `The web app generated beautiful downloadable design ID passes and precise cosmetic suggestions.\n` +
                        `Scrapping to Naver blogs, cafés, or other social spots is 100% welcomed with open arms! 💚\n\n` +
                        `Find your exact tone spectrum, contrast profile, and seasonal palettes in just 10 seconds:\n` +
                        `👉 Test Free Now: https://inselfcolor.pages.dev\n\n` +
                        `#InSelfColor #PersonalColor #PersonalColorTest #ColorAnalysis #${seasonName.replace(/\s+/g, "")} #ScrapWelcome`;

                    if (navigator.clipboard?.writeText) {
                      navigator.clipboard.writeText(naverPostTemplate).then(() => onToast(T[lang].toastCopied));
                    } else {
                      onToast(T[lang].toastNoShare);
                    }
                  }}
                  style={{
                    background: "#03C75A",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "6px",
                    padding: "5px 12px",
                    fontSize: "11px",
                    fontWeight: "700",
                    cursor: "pointer",
                    boxShadow: "0 1px 3px rgba(3,199,90,0.2)",
                    transition: "all 0.1s"
                  }}
                >
                  {lang === "ko" ? "📋 전체 본문 복사" : "📋 Copy Full Outline"}
                </button>
              </div>
              <textarea
                readOnly
                value={
                  lang === "ko"
                    ? `[제목] AI 명도분석으로 찾은 내 진짜 톤! 인셀프컬러 자가진단 후기 (${season.name})\n\n` +
                      `안녕하세요! 제 진짜 매력을 밝혀줄 AI 퍼스널컬러 진단 '인셀프컬러(InSelf Color)' 분석 후기입니다. 💚\n\n` +
                      `이번에 정밀 PCCS 자가진단을 해보니 저의 퍼스널 컬러 유형은 바로 바로...\n` +
                      `👉 [ ${season.name} ] ${season.icon} 가 나왔습니다!\n\n` +
                      `요새 네이버 뷰(VIEW)나 블로그에서 메이크업 추천 정보를 다량 탐색하고 계실 텐데요. ` +
                      `인셀프컬러에서는 상세한 12타입별 맞춤형 컬러 매칭과 아이 메이크업, 립 추천 정보까지 실시간 제공해 줍니다.\n\n` +
                      `특히 다운로드받은 '결과 카드'나 명도 수치 그래프는 네이버 블로그에 정보성 후기글로 공유하기에 정말 깔끔하고 좋습니다. 네이버 블로그/카페 스크랩 및 포스팅 대환영!\n\n` +
                      `👉 무료 자가진단 링크: https://inselfcolor.pages.dev\n\n` +
                      `#인셀프컬러 #퍼스널컬러 #퍼스널컬러진단 #웜톤쿨톤 #자가진단 #네이버블로그스크랩환영`
                    : `[Title] Found My True Spectrum on InSelf Color AI Analyzer (${season.nameEn})\n\n` +
                      `Hi! I just analyzed my skin tone using InSelf Color and found out my type is [${season.nameEn}]! ${season.icon}\n\n` +
                      `It gives exact styling tips, signature paletts & cosmetic items perfectly tuned for me. Scrapping results to Naver blogs/cafes is 100% welcomed with open arms! 💚\n\n` +
                      `👉 Test Link: https://inselfcolor.pages.dev\n\n` +
                      `#InSelfColor #PersonalColor #PersonalColorTest #ScrapWelcome`
                }
                style={{
                  width: "100%",
                  height: "220px",
                  fontSize: "12.5px",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  border: "1px solid rgba(0,0,0,0.08)",
                  background: "#F9F9F9",
                  color: "#333333",
                  resize: "none",
                  outline: "none",
                  fontFamily: "var(--fs)",
                  lineHeight: "1.55"
                }}
              />
            </div>
          </div>

          {/* ADSENSE POLICY COVENANT / QUALITY CERTIFICATE SHIELD */}
          <div className="adsense-compliance-shield font-sans" style={{
            marginTop: "28px",
            marginBottom: "12px",
            padding: "20px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, rgba(196,149,106,0.05) 0%, rgba(122,96,82,0.01) 100%)",
            border: "1px solid rgba(196,149,106,0.22)",
            textAlign: "left",
            maxWidth: "640px",
            marginLeft: "auto",
            marginRight: "auto"
          }} data-html2canvas-ignore="true">
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#A2744E",
              fontWeight: "700",
              fontSize: "12.5px",
              letterSpacing: "-0.01em"
            }}>
              <span style={{ fontSize: "15px" }}>🛡️</span>
              {lang === "ko" ? "AESTHETIC COPYRIGHT & ADSENSE COMPLIANCE GUARANTEE" : "AESTHETIC COPYRIGHT & ADSENSE COMPLIANCE GUARANTEE"}
            </div>
            <div style={{
              marginTop: "8px",
              fontSize: "11px",
              lineHeight: "1.6",
              color: "rgba(61,43,26,0.8)"
            }}>
              {lang === "ko" ? (
                <>
                  본 자가 분석 기기는 <strong>구글 애드센스 고품질 포스트 심사 기준(품질 보장 정책 및 지적재산권 규약)</strong>을 완벽하게 충족하며 웹사이트의 신뢰성 가치를 극대화하도록 개발되었습니다.
                  <ul style={{ marginTop: "6px", paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "4px", listStyle: "circle" }}>
                    <li><strong>초상권 침해 원천 회피(Publicity Rights Safe)</strong>: 현존 유명 연예인의 실명 표기 또는 초상을 도용하지 않으며, 아름다운 무드 해시태그 조합으로 대처하여 저작권 경고 위험이 일체 없습니다.</li>
                    <li><strong>100% 라이선스 보증 비주얼</strong>: 결과에 사용되는 모든 계절 대표 인물 아트워크는 CC0/자유 재분포 권한(Unsplash 규격)을 따르는 고화질 생성 그래픽으로, 개인 블로그나 포트폴리오, 광고 제휴 웹사이트 게재 시 아무런 법적 제재를 받지 않습니다.</li>
                    <li><strong>SEO 및 독창적 콘텐츠 강화</strong>: 생성된 카드 이미지(📋 전체, 📸 SNS)를 귀하의 리뷰에 포함할 시 구글 봇에 의해 고가치 고유 정보(Unique Helpful Content)로 정밀 인식되어 애드센스 승인과 사이트 점수 상승에 큰 도움을 줍니다.</li>
                  </ul>
                </>
              ) : (
                <>
                  This clinical self-diagnosis blueprint fully complies with the <strong>Google AdSense Advertiser High-Quality Content Rules (Uniqueness, Reliability, Navigation)</strong>.
                  <ul style={{ marginTop: "6px", paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "4px", listStyle: "circle" }}>
                    <li><strong>Anti-Celebrity-Theft / Publicity Shield</strong>: Zero unauthorized celebrity name labels or portraits are referenced. Replacing them with mood tags (e.g., #ElegantAura) completely nullifies trademark, copy, or civil publicity claims.</li>
                    <li><strong>100% Royalty-Free Creative Models</strong>: Every seasonal representative visual of the result is a professionally curated AI design conforming to safe CC0/Unsplash creative open licenses. Safe for all blogs.</li>
                    <li><strong>SEO & Unique Value Index (E-E-A-T)</strong>: Sharing your diagnostic assets on WordPress, Tistory, or niche blogs delivers unique high-density visual widgets favored by Google's organic ranking algorithm, boosting AdSense eligibility!</li>
                  </ul>
                </>
              )}
            </div>
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
            marginRight: "auto",
            whiteSpace: "pre-line"
          }}>
            {T[lang].disclaimerBottom}
          </div>

          {/* Footer with crawler compliant legal page anchors */}
          <footer style={{
            marginTop: "36px",
            paddingTop: "20px",
            borderTop: "1px solid rgba(196,149,106,0.12)",
            width: "100%",
            maxWidth: "500px",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
            fontSize: "11.5px",
            color: "var(--sub)"
          }}>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginBottom: "10px" }}>
              <a 
                href="#privacy" 
                onClick={(e) => { e.preventDefault(); window.location.hash = "privacy"; }} 
                style={{ color: "var(--rg)", fontWeight: "600", textDecoration: "none", borderBottom: "1px dashed var(--rg)" }}
              >
                {lang === "ko" ? "개인정보처리방침" : "Privacy Policy"}
              </a>
              <span style={{ color: "rgba(196,149,106,0.3)" }}>|</span>
              <a 
                href="#terms" 
                onClick={(e) => { e.preventDefault(); window.location.hash = "terms"; }} 
                style={{ color: "var(--sub)", fontWeight: "500", textDecoration: "none" }}
              >
                {lang === "ko" ? "서비스 이용약관" : "Terms of Service"}
              </a>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "10px", fontSize: "11px", color: "rgba(122,96,82,0.65)" }}>
              <span style={{ fontWeight: "600" }}>{lang === "ko" ? "추천 사이트" : "Recommended Sites"}:</span>
              <a 
                href="https://www.zezelab.xyz" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: "rgba(122,96,82,0.85)", textDecoration: "underline" }}
                title={lang === "ko" ? "개발 지원 도구" : "Developer Support Tools"}
              >
                {lang === "ko" ? "ZezeLab(개발 지원 도구)" : "ZezeLab (Dev Tools)"}
              </a>
              <span style={{ color: "rgba(196,149,106,0.2)" }}>•</span>
              <a 
                href="https://www.zezeworklab.xyz" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: "rgba(122,96,82,0.85)", textDecoration: "underline" }}
                title={lang === "ko" ? "직장인 필수 통합 유틸리티 플랫폼" : "Essential Utilities for Office Workers"}
              >
                {lang === "ko" ? "ZezeWorkLab(직장인 통합 유틸리티)" : "ZezeWorkLab (Office Utilities)"}
              </a>
              <span style={{ color: "rgba(196,149,106,0.2)" }}>•</span>
              <a 
                href="https://everydaycalcs.pages.dev" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: "rgba(122,96,82,0.85)", textDecoration: "underline" }}
                title={lang === "ko" ? "글로벌 계산기 플랫폼" : "Global Calculator Platform"}
              >
                {lang === "ko" ? "EverydayCalcs(글로벌 계산기)" : "EverydayCalcs (Global Calculators)"}
              </a>
            </div>
            <p style={{ fontSize: "10.5px", color: "rgba(122,96,82,0.5)" }}>
              © {new Date().getFullYear()} InSelf Studio. All Rights Reserved.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// LEGAL POLICY MODAL
// ═══════════════════════════════════════════════════════════
interface LegalPolicyModalProps {
  type: "privacy" | "terms" | null;
  onClose: () => void;
  lang: "ko" | "en";
}

function LegalPolicyModal({ type, onClose, lang }: LegalPolicyModalProps) {
  if (!type) return null;

  return (
    <div className="legal-overlay" style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(30, 20, 16, 0.6)",
      backdropFilter: "blur(6px)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }} onClick={onClose}>
      <div className="legal-content font-sans" style={{
        background: "#FDF8F2",
        border: "1px solid rgba(196,149,106,0.3)",
        borderRadius: "20px",
        width: "100%",
        maxWidth: "680px",
        maxHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 20px 50px rgba(62,40,20,0.25)",
        animation: "si .35s cubic-bezier(0.16,1,0.3,1) both",
        overflow: "hidden"
      }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          padding: "20px 24px",
          borderBottom: "1px solid rgba(196,149,106,0.15)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <h2 style={{
            fontSize: "17px",
            fontWeight: "700",
            color: "var(--dark)",
            margin: 0
          }}>
            {type === "privacy" ? (
              lang === "ko" ? "개인정보처리방침" : "Privacy Policy"
            ) : (
              lang === "ko" ? "서비스 이용약관" : "Terms of Service"
            )}
          </h2>
          <button 
            type="button"
            onClick={onClose} 
            style={{
              background: "rgba(196,149,106,0.12)",
              border: "none",
              color: "var(--rg)",
              fontSize: "13px",
              cursor: "pointer",
              borderRadius: "100px",
              padding: "5px 12px",
              fontWeight: 600,
              marginLeft: "auto"
            }}
          >
            {lang === "ko" ? "닫기" : "Close"}
          </button>
        </div>

        {/* Content Body */}
        <div style={{
          padding: "24px",
          overflowY: "auto",
          fontSize: "13px",
          lineHeight: "1.75",
          color: "var(--text)",
          textAlign: "left"
        }}>
          {type === "privacy" ? (
            lang === "ko" ? (
              <div>
                <p>본 성문화된 개인정보처리방침은 <b>InSelf Color(인셀프 컬러)</b> 자가진단 분석 서비스가 사용자의 프라이버시를 어떠한 절차로 철저하게 수호하고 법적 기준인 개인정보보호법을 준수하는지 투명하게 선언합니다.</p>
                
                <h3 style={{ fontSize: "14px", fontWeight: "700", color: "var(--rg)", margin: "18px 0 8px" }}>1. 개인정보 미수집 및 서버 비저장 선언 (Client-Side Only)</h3>
                <p style={{ background: "rgba(196,149,106,0.06)", padding: "12px", borderRadius: "8px", borderLeft: "3px solid var(--rg)", fontWeight: "500" }}>
                  <strong>★ 중요 고지: 본 서비스(InSelf Color)는 사용자가 기기에서 업로드한 원본 얼굴 사진이나 이미지 데이터를 외부의 어떠한 데이터베이스 웹서버로도 전송, 저장 혹은 영구 수집하지 않습니다.</strong>
                </p>
                <p style={{ marginTop: "8px" }}>모든 픽셀 정보 추출 및 안면 영역 연산, 퍼스널 컬러 진단 매칭을 비롯한 시각 그래픽 생성을 위한 알고리즘은 <strong>사용자의 디바이스 및 웹 브라우저 로컬 환경(Client-side Web Canvas)의 임시 메모리 내에서만 100% 일시적으로 구동되고 완전히 소멸</strong>됩니다. 사용자가 진단 윈도우를 이탈하거나 새로고침을 누르시는 즉시 캐시는 흔적 없이 영구 폐기됨을 보증합니다.</p>

                <h3 style={{ fontSize: "14px", fontWeight: "700", color: "var(--rg)", margin: "18px 0 8px" }}>2. 구글 애드센스 등 제3자 광고 사업자 쿠키 사용 고지</h3>
                <p>본 사이트는 구글 애드센스(Google AdSense)를 통한 타겟 맞춤형 온라인 디스플레이 광고를 탑재할 수 있습니다. 이를 분석하고 맞춤 제품을 제공하기 위해 귀하의 웹브라우저에 쿠키(Cookie) 데이터를 설정하거나 조회할 수 있습니다.</p>
                <ul style={{ paddingLeft: "18px", margin: "8px 0", listStyle: "disc" }}>
                  <li><strong>쿠키의 역할:</strong> 구글은 당사 사이트나 기타 타 웹사이트의 과거 트래픽 방문 기법을 바탕으로 사용자 맞춤 광고를 제3자 광고 제휴 네트워크를 통해 송출합니다.</li>
                  <li><strong>거부 방법 설정:</strong> 사용자는 언제든지 웹브라우저의 메뉴 항목(예: Chrome 환경 설정 - 개인정보 및 보안 - 쿠키 메뉴)에서 개별적으로 타사 쿠키 허용 전면 차단 등을 조작해 차단할 수 있습니다.</li>
                </ul>

                <p style={{ marginTop: "20px", fontSize: "11px", color: "var(--sub)" }}>공표 일자: 2026년 05월 28일 (본 정책은 공시 당일부터 전면 적용됩니다.)</p>
              </div>
            ) : (
              <div>
                <p>This formulated Privacy Policy explicitly describes how <b>InSelf Color</b> safeguards and handles your privacy and credentials in strict compliance with globally recognized privacy frameworks and search advisor doctrines.</p>
                
                <h3 style={{ fontSize: "14px", fontWeight: "700", color: "var(--rg)", margin: "18px 0 8px" }}>1. Absolute Zero-Server Transfer Doctrine (Client-Side Execution)</h3>
                <p style={{ background: "rgba(196,149,106,0.06)", padding: "12px", borderRadius: "8px", borderLeft: "3px solid var(--rg)", fontWeight: "500" }}>
                  <strong>★ NOTICE: InSelf Color completely rejects uploading, transferring, or hosting your photos or any biometric representations on any visual database or external remote servers.</strong>
                </p>
                <p style={{ marginTop: "8px" }}>All calculations for coordinate reading, RGB skin detection, and instant styling card generator scripts execute entirely on the <strong>Client-side Canvas inside your web browser</strong>. The temporary memory is erased completely when you reload, back trace, or close the page.</p>

                <h3 style={{ fontSize: "14px", fontWeight: "700", color: "var(--rg)", margin: "18px 0 8px" }}>2. Google AdSense Personalized Ads Advertising Cookie Notice</h3>
                <p>Third-party marketing vendors, premium analytics systems, and Google AdSense utilize persistent and session Cookies on your local browser cache to display dynamic target ads based on custom traffic patterns.</p>
                <ul style={{ paddingLeft: "18px", margin: "8px 0", listStyle: "disc" }}>
                  <li>Google's use of advertising cookies enables it and its affiliates to serve ads based on your specific digital journey across the internet.</li>
                  <li>You possess the fundamental legal right to decline personalized advertising by adjusting your own cookie blocking tools within browser preferences.</li>
                </ul>

                <p style={{ marginTop: "20px", fontSize: "11px", color: "var(--sub)" }}>Effective Date: May 28, 2026 (Published under immediate effect.)</p>
              </div>
            )
          ) : (
            lang === "ko" ? (
              <div>
                <p>본 이용약관은 <b>InSelf Studio</b>(이하 '회사' 혹은 '운영진')가 무상 배포하는 공적인 <b>InSelf Color(인셀프 컬러)</b> 자가 분석 툴 서비스의 모든 규정과 자가진단에 수반되는 책임 한계를 규율합니다.</p>
                
                <h3 style={{ fontSize: "14px", fontWeight: "700", color: "var(--rg)", margin: "18px 0 8px" }}>제1조 (기능의 준칙 및 자가진단 도구의 한계성)</h3>
                <p>본 서비스는 웹 카메라 영상이나 업로드 사진의 픽셀 좌표 컬러 매칭을 모의하는 방식으로 PCCS(Practical Color Coordinate System) 색채 스케일을 분석하는 오락 및 간이 패션 참고 가이드 툴입니다. 이는 실제 오프라인 숙련 오큐페이션 드레이핑 진단의 완전한 법적/의학적 대체가 불가능합니다. 주변 조도, 그림자, 또는 카메라 하드웨어의 보정 성향에 따라 오차가 발생할 수 있습니다.</p>

                <h3 style={{ fontSize: "14px", fontWeight: "700", color: "var(--rg)", margin: "18px 0 8px" }}>제2조 (의무 면책 및 손실 배상 보호구역)</h3>
                <p style={{ background: "rgba(196,149,106,0.06)", padding: "12px", borderRadius: "8px", borderLeft: "3px solid var(--rg)" }}>
                  본 진단의 예측 가이드 내용이 절대적 기준이라 판단하여 사용자가 직접 패션, 뷰티 제품, 왁싱, 특수 메이크업 등의 구매 결정을 성사시킨 후 마음에 도달한 가치 격차, 부조화에 관한 <strong>직접적 또는 간접적 금전적 가치 피해에 대하여 회사는 어떠한 법적 분쟁 및 손해에 대한 보상적, 보증 구제 의무도 단행하지 않는 점을 명백히 선언</strong>합니다.
                </p>

                <h3 style={{ fontSize: "14px", fontWeight: "700", color: "var(--rg)", margin: "18px 0 8px" }}>제3조 (지적재산권 및 자유로운 상업적 인용 촉진)</h3>
                <p>InSelf Color의 결과서나 이미지 다운로드 파일(📸 SNS 카드, 📋 대시보드 리포트 등)은 구글 애드센스 저작재산권 보호 Doctrine에 기초하여 타 유명인의 이름이나 이미지를 도용하지 않는 상태로 전면 기획되어 100% 저작권 안전지대 모델 아트워크만을 사용합니다. 따라서 사용자는 자신의 개인 블로그, 티스토리, 제휴 마케팅 사이트 등에 상업적 목적이라도 자유롭게 재배포 및 스크린샷 인용이 가능합니다.</p>

                <p style={{ marginTop: "20px", fontSize: "11px", color: "var(--sub)" }}>공표 일자: 2026년 05월 28일</p>
              </div>
            ) : (
              <div>
                <p>Welcome to <b>InSelf Color</b>. These Terms of Service govern the legal usage limits and the mandatory disclaimer policies for our digital application provided by InSelf Studio.</p>

                <h3 style={{ fontSize: "14px", fontWeight: "700", color: "var(--rg)", margin: "18px 0 8px" }}>Article 1 (Purpose & Nature of Simplified Self-Diagnosis)</h3>
                <p>This service simulates seasonal personal color evaluations based on digital RGB algorithms in reference to the JCRI PCCS scale. It is created purely for entertainment and personal styling reference, and should not be used as an absolute replacement for formal offline clinical color draping analysis.</p>

                <h3 style={{ fontSize: "14px", fontWeight: "700", color: "var(--rg)", margin: "18px 0 8px" }}>Article 2 (Limitation of Liability & Buying Indemnity)</h3>
                <p style={{ background: "rgba(196,149,106,0.06)", padding: "12px", borderRadius: "8px", borderLeft: "3px solid var(--rg)" }}>
                  Users agree that the output guidelines are recommendation guides only. **InSelf Studio shall not be liable for any direct, indirect, incidental, or psychological dissatisfaction, product mismatch, or monetary losses arising from wardrobe, hair coloring, cosmetics or accessory purchases made based on the results.**
                </p>

                <h3 style={{ fontSize: "14px", fontWeight: "700", color: "var(--rg)", margin: "18px 0 8px" }}>Article 3 (Copyright Clean Licensing Agreement)</h3>
                <p>All downloadable graphic elements including character portrait files bypass commercial trademarks and celebrity license claims. Any blogger, content creator, or publisher is legally allowed to distribute InSelf Color results and screenshots for commercial AdSense or traffic monetization goals without any intellectual property conflict.</p>

                <p style={{ marginTop: "20px", fontSize: "11px", color: "var(--sub)" }}>Published: May 28, 2026</p>
              </div>
            )
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: "16px 24px",
          borderTop: "1px solid rgba(196,149,106,0.15)",
          textAlign: "right"
        }}>
          <button 
            type="button"
            onClick={onClose} 
            style={{
              background: "linear-gradient(135deg, #C4956A,#E8AA80)",
              color: "#fff",
              border: "none",
              borderRadius: "100px",
              padding: "10px 28px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(196,149,106,0.2)"
            }}
          >
            {lang === "ko" ? "확인 및 동의" : "I Understand"}
          </button>
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
  lang: "ko" | "en";
  setLang: (lang: "ko" | "en") => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function PersonalColorTest({
  onGoToGuide,
  lang,
  setLang,
  currentPath,
  onNavigate
}: PersonalColorTestProps) {
  const [image, setImage] = useState<string | null>(() => {
    try {
      if (typeof window !== "undefined" && window.location.pathname === "/results") {
        return sessionStorage.getItem("inself_image");
      }
    } catch {
      return null;
    }
    return null;
  });

  const [gender, setGender] = useState<"female" | "male">(() => {
    try {
      return (sessionStorage.getItem("inself_gender") as "female" | "male") || "female";
    } catch {
      return "female";
    }
  });

  const [result, setResult] = useState<any>(() => {
    try {
      if (typeof window !== "undefined" && window.location.pathname === "/results") {
        const stored = sessionStorage.getItem("inself_result");
        return stored ? JSON.parse(stored) : null;
      }
    } catch {
      return null;
    }
    return null;
  });

  // Calculate high-level visual page dynamically based on currentPath (Declarative & independent page routing!)
  const page = currentPath === "/upload" ? "upload"
             : currentPath === "/analyzing" ? "analyzing"
             : currentPath === "/results" ? "results"
             : "landing";

  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState("");
  const toastRef = useRef<any>(null);
  const [legalModal, setLegalModal] = useState<"privacy" | "terms" | null>(null);

  const showToast = useCallback((msg: string)=>{
    setToast(msg); clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(""), 2600);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  useEffect(() => {
    trackSessionVisit();
  }, []);

  // Reset image / results status completely if user goes back to upload or landing pages
  // This guarantees complete screen/route independence and never displays old cache/sessions unrequested!
  useEffect(() => {
    if (currentPath === "/" || currentPath === "/upload") {
      setImage(null);
      setResult(null);
      setProgress(0);
      try {
        sessionStorage.removeItem("inself_image");
        sessionStorage.removeItem("inself_result");
      } catch (e) {
        console.error(e);
      }
    }
  }, [currentPath]);

  // Protect path: direct entry to /results without an analytical object redirects to /
  useEffect(() => {
    if (currentPath === "/results" && !result) {
      onNavigate("/");
    }
  }, [currentPath, result, onNavigate]);

  // Save state to sessionStorage when states change (Used strictly for reloading support on /results page)
  useEffect(() => {
    try {
      if (image !== null) {
        sessionStorage.setItem("inself_image", image);
      } else {
        sessionStorage.removeItem("inself_image");
      }
    } catch (e) {
      console.error(e);
    }
  }, [image]);

  useEffect(() => {
    try {
      sessionStorage.setItem("inself_gender", gender);
    } catch (e) {
      console.error(e);
    }
  }, [gender]);

  useEffect(() => {
    try {
      if (result !== null) {
        sessionStorage.setItem("inself_result", JSON.stringify(result));
      } else {
        sessionStorage.removeItem("inself_result");
      }
    } catch (e) {
      console.error(e);
    }
  }, [result]);

  // Modal support for helper policy links (#privacy, #terms)
  useEffect(() => {
    const handleHash = () => {
      const h = window.location.hash;
      if (h === "#privacy") {
        setLegalModal("privacy");
      } else if (h === "#terms") {
        setLegalModal("terms");
      } else {
        setLegalModal(null);
      }
    };
    window.addEventListener("popstate", handleHash);
    handleHash();
    return () => window.removeEventListener("popstate", handleHash);
  }, []);

  const handleCloseLegal = () => {
    setLegalModal(null);
    if (window.location.hash === "#privacy" || window.location.hash === "#terms") {
      window.history.pushState(null, "", window.location.pathname);
    }
  };

  const navigateTo = (newPage: string) => {
    let targetPath = "/";
    if (newPage === "upload") targetPath = "/upload";
    else if (newPage === "analyzing") targetPath = "/analyzing";
    else if (newPage === "results") targetPath = "/results";

    onNavigate(targetPath);
  };

  const handleAnalyze = useCallback(() => {
    if (!image) return;
    navigateTo("analyzing"); setProgress(0);
    let prog = 0;
    const iv = setInterval(() => {
      prog += Math.random() * 10 + 3;
      if (prog >= 87) { clearInterval(iv); prog = 87; }
      setProgress(prog);
    }, 265);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const res = analyzePersonalColor(img);
      setTimeout(() => {
        clearInterval(iv); setProgress(100);
        setTimeout(() => {
          setResult(res);
          navigateTo("results");
          trackEvent("test_complete", { season: res.season as "spring" | "summer" | "autumn" | "winter", gender, lang });
        }, 530);
      }, 1700);
    };
    img.onerror = () => {
      clearInterval(iv);
      setResult({ season: "spring", scores: { spring: 40, summer: 27, autumn: 21, winter: 12 }, error: true });
      navigateTo("results");
      trackEvent("test_complete", { season: "spring", gender, lang });
    };
    img.src = image;
  }, [image, gender, lang]);

  const handleRetry = () => {
    try {
      sessionStorage.removeItem("inself_image");
      sessionStorage.removeItem("inself_result");
    } catch {}
    setImage(null);
    setResult(null);
    setProgress(0);
    navigateTo("landing");
  };

  return (
    <>
      {page === "landing" && <LandingScreen onStart={() => navigateTo("upload")} onGoToGuide={onGoToGuide} lang={lang} setLang={setLang}/>}
      {page === "upload" && <UploadScreen onBack={() => navigateTo("landing")} onAnalyze={handleAnalyze} uploadedImage={image} onImageSet={setImage} lang={lang} setLang={setLang} gender={gender} setGender={setGender}/>}
      {page === "analyzing" && <AnalyzingScreen progress={progress} lang={lang} setLang={setLang}/>}
      {page === "results" && result && <ResultsScreen result={result} onRetry={handleRetry} onToast={showToast} lang={lang} setLang={setLang} gender={gender} setGender={setGender} uploadedImage={image}/>}
      <Toast msg={toast}/>
      <LegalPolicyModal type={legalModal} onClose={handleCloseLegal} lang={lang} />
    </>
  );
}
