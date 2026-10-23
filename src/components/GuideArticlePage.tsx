import { useEffect, useState } from "react";
import HeaderNavbar from "./HeaderNavbar";
import { KakaoTopBanner, KakaoMiddleBanner } from "./KakaoAdBanner";
import { ArrowLeft, Clock, Calendar, User, Share2, Sparkles, BookOpen, ChevronRight, CheckCircle2 } from "lucide-react";

export interface ColumnArticle {
  slug: string;
  category: string;
  categoryEn: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  readTime: string;
  date: string;
  contentKo: string[];
  contentEn: string[];
}

export const GUIDE_ARTICLES: Record<string, ColumnArticle> = {
  "pccs-color-system": {
    slug: "pccs-color-system",
    category: "색채학 이론",
    categoryEn: "Color Science",
    title: "PCCS 24색상환과 12톤 좌표계 완벽 해설: 퍼스널컬러 과학의 원리",
    titleEn: "Mastering the PCCS 24-Hue Wheel and 12-Tone Coordinates",
    summary: "일본 색채 연구소(JCRI)의 Practical Color Coordinate System이 현대 디지털 퍼스널컬러 진단의 표준이 된 이유와 24색상환, 12가지 톤의 명도·채도 결합 원리를 알기 쉽게 설명합니다.",
    summaryEn: "Discover why the Practical Color Coordinate System (PCCS) by JCRI serves as the gold standard for personal color diagnosis.",
    readTime: "5분",
    date: "2026-10-15",
    contentKo: [
      "## 1. PCCS(Practical Color Coordinate System)란 무엇인가?",
      "퍼스널 컬러는 단순히 '빨간색이 어울린다, 파란색이 어울린다'의 문제가 아닙니다. 빨간색 안에서도 '맑은 앵두빛 빨강', '차분한 벽돌 빨강', '차가운 와인빛 빨강'처럼 톤(Tone)에 따라 인상이 180도 달라집니다. 이를 과학적으로 체계화한 도구가 바로 1964년 일본 색채 연구소(Japan Color Research Institute)에서 개발한 **PCCS(Practical Color Coordinate System, 실용색채계)**입니다.",
      "PCCS는 명도(Value/Lightness)와 채도(Chroma/Saturation)를 결합하여 하나의 '톤(Tone)'이라는 복합 개념으로 정리했습니다. 즉, 색상의 순수한 느낌뿐만 아니라 '밝고 어두움', '선명함과 탁함'을 직관적인 12가지 감성 영역으로 구분해 줍니다.",
      "## 2. 24색상환의 구조와 웜·쿨 언더톤",
      "PCCS 색상환은 심리 4원색(빨강, 노랑, 녹색, 파랑)을 기초로 하여 지각적 등간격으로 배치된 총 24개 색상으로 구성됩니다.",
      "• **1번~8번(자주빨강~노랑)**: 옐로우 베이스(Yellow-base)의 따뜻한 에너지를 지닌 **웜톤(Warm tone)** 구역입니다.",
      "• **9번~11번 및 24번**: 중립적인 경계 영역으로 조화로운 전환을 이룹니다.",
      "• **12번~23번(녹색~빨강자주)**: 블루 베이스(Blue-base)의 시원하고 깨끗한 **쿨톤(Cool tone)** 구역입니다.",
      "이 24색상환은 피부의 멜라닌과 헤모글로빈 분포에 따라 황색 기와 붉은 기를 중화하거나 돋보이게 하는 기준선 역할을 합니다.",
      "## 3. 12가지 톤(Tone)의 사분면 분석",
      "PCCS 톤은 명도 축(세로)과 채도 축(가로)의 2차원 평면상에 배치됩니다:",
      "1. **v(비비드 - Vivid)**: 최고 채도의 원색. 겨울 브라이트, 봄 비비드의 대표 톤입니다.",
      "2. **b(브라이트 - Bright)**: 밝고 화사하며 채도가 높은 봄 웜톤의 상징입니다.",
      "3. **lt(라이트 - Light) & p(페일 - Pale)**: 고명도 저~중채도의 파스텔톤. 봄 라이트와 여름 라이트의 영역입니다.",
      "4. **sf(소프트 - Soft) & d(덜 - Dull)**: 회색빛이 가미된 중간 명도의 차분한 톤. 여름 뮤트, 가을 뮤트의 정석입니다.",
      "5. **dp(딥 - Deep) & dk(다크 - Dark)**: 중~저명도의 짙고 중후한 컬러. 가을 딥과 겨울 딥을 빛나게 합니다.",
      "## 4. 진단 알고리즘에서 PCCS가 중요한 이유",
      "InSelf Color 분석 알고리즘은 사용자의 얼굴 피부 영역 픽셀을 채취한 뒤 RGB 값을 PCCS 좌표 공간(L*, S*, H*)으로 맵핑합니다. 이를 통해 단순히 계절 하나를 짚어주는 것을 넘어, '라이트-브라이트-뮤트-딥' 중 어느 세부 톤에 걸쳐 있는지 정밀한 수치로 진단할 수 있습니다."
    ],
    contentEn: [
      "## 1. What is the PCCS System?",
      "Personal color analysis is not just about choosing red or blue. Within red alone, there are bright cherry reds, muted brick reds, and deep cool wines. The Practical Color Coordinate System (PCCS), developed by JCRI in 1964, provides a scientific framework combining value and chroma into intuitive 'tones'.",
      "## 2. 24-Hue Wheel & Undertone Axes",
      "The 24 hues are spaced at perceptual intervals based on psychological primary colors. Hues 1-8 form the warm yellow-base quadrant, while hues 12-23 form the cool blue-base quadrant.",
      "## 3. 12 Systematic Tones",
      "From Vivid (pure high saturation) to Pale (ethereal pastels) and Dark (regal depth), PCCS classifies seasonal aesthetics with mathematical clarity.",
      "## 4. Algorithmic Precision",
      "InSelf Color maps sampled skin pixels directly into PCCS coordinates, ensuring objective and reproducible results without subjective consultant bias."
    ]
  },
  "warm-vs-cool": {
    slug: "warm-vs-cool",
    category: "자가 진단",
    categoryEn: "Self Diagnosis",
    title: "웜톤 vs 쿨톤 구별법: 피부 혈색, 헤어, 핏줄 색으로 확인하는 자가 진단 노하우",
    titleEn: "Warm vs. Cool Undertones: Veins, Hair, and Complexion Guide",
    summary: "손목 안쪽 혈관 색상부터 골드/실버 액세서리 반응, 햇볕에 탔을 때의 피부 변화까지, 웜톤과 쿨톤을 집에서 3분 만에 구별하는 5가지 실전 테스트 방법입니다.",
    summaryEn: "Learn the 5 definitive checks to distinguish warm and cool skin undertones from the comfort of your home.",
    readTime: "4분",
    date: "2026-10-16",
    contentKo: [
      "## 1. 웜톤과 쿨톤, 피부 겉색이 아닌 '언더톤'의 차이",
      "많은 분들이 '피부가 하얗거나 밝으면 쿨톤, 까무잡잡하거나 노라면 웜톤'이라고 오해합니다. 하지만 이는 피부 표면의 명도(Skin Tone)일 뿐, 진정한 퍼스널컬러는 피부 진피층의 혈류량과 멜라닌/카로틴 색소 비율이 결정하는 **언더톤(Undertone)**에 의해 결정됩니다. 밝은 피부를 가진 웜톤도 많고, 어두운 피부를 가진 쿨톤도 존재합니다.",
      "## 2. 웜톤 vs 쿨톤 판별 5가지 자가 진단 체크리스트",
      "### 체크 1: 손목 안쪽 핏줄 색상 관찰",
      "자연광 아래에서 손목 안쪽의 정맥 혈관을 살펴보세요.",
      "• **초록색 또는 올리브빛**으로 보인다 → **웜톤(Warm)**",
      "• **파란색 또는 보라색/자줏빛**으로 보인다 → **쿨톤(Cool)**",
      "• 파란색과 초록색이 섞여 뚜렷하지 않다 → **뉴트럴톤(Neutral)**",
      "### 체크 2: 골드 vs 실버 액세서리 비교",
      "• **옐로우 골드 주얼리**를 착용했을 때 피부가 화사해 보인다 → **웜톤**",
      "• **백금, 실버 주얼리**를 얹었을 때 피부가 깨끗하고 맑아 보인다 → **쿨톤**",
      "### 체크 3: 여름철 자외선 태닝 반응",
      "• 햇볕에 노출되면 빨갛게 익기보다는 **자연스럽게 갈색으로 그을린다** → **웜톤**",
      "• 햇볕에 타면 갈색이 되지 않고 **빨갛게 달아오르며 통증이 생긴다** → **쿨톤**",
      "### 체크 4: 흰 티셔츠 배색 테스트",
      "• **크림색, 아이보리 티셔츠**를 입었을 때 안색이 부드럽다 → **웜톤**",
      "• **순백색(A4용지 같은 퓨어 화이트)**을 입었을 때 이목구비가 살아난다 → **쿨톤**",
      "### 체크 5: 립스틱 컬러 반응",
      "• **살구 코랄, 오렌지 레드**가 착 달라붙는다 → **웜톤**",
      "• **체리 핑크, 라즈베리, 플럼 로즈**가 세련되게 어울린다 → **쿨톤**",
      "## 3. 언더톤을 찾았다면, 다음 단계는 '명도와 채도'",
      "웜톤/쿨톤을 알게 되었다면 절반은 성공입니다. 이제 봄/가을(웜톤) 중 나에게 맞는 명도를 찾거나, 여름/겨울(쿨톤) 중 나에게 맞는 대비감을 찾아 12타입 중 최적의 타입을 완성해보세요."
    ],
    contentEn: [
      "## 1. Undertone vs. Surface Skin Tone",
      "Undertone is determined beneath the skin by blood flow, hemoglobin, and carotene ratios—not by whether you look pale or tanned.",
      "## 2. 5 Self-Checks for Warm vs. Cool",
      "1. Wrist Vein Color: Green/olive means Warm; Blue/purple indicates Cool.",
      "2. Gold vs. Silver Jewelry reaction.",
      "3. Sun exposure: Tanning brown vs. burning red.",
      "4. Pure white vs. Ivory cream shirt contrast.",
      "5. Coral peach vs. Berry magenta lipstick test.",
      "## 3. Finding Value and Contrast",
      "Once you identify your warm or cool baseline, explore brightness and chroma to finalize your season."
    ]
  },
  "skin-tone-reflectance": {
    slug: "skin-tone-reflectance",
    category: "광학 & 알고리즘",
    categoryEn: "Optics & Algorithms",
    title: "CIE L*a*b* 색공간과 멜라닌/헤모글로빈 반사율: 피부 톤 알고리즘의 비밀",
    titleEn: "CIE L*a*b* Space & Hemoglobin/Melanin Spectral Reflectance",
    summary: "디지털 카메라 RGB의 왜곡을 극복하고 피부 속 멜라닌 및 옥시헤모글로빈 스펙트럼 흡광도를 정밀하게 추정하는 InSelf Color의 독자적 광학 보정 알고리즘 원리를 공개합니다.",
    summaryEn: "Explore how InSelf Color corrects lighting variations and estimates skin reflectance through CIE L*a*b* transformations.",
    readTime: "6분",
    date: "2026-10-17",
    contentKo: [
      "## 1. 디지털 카메라의 한계: 왜 사진마다 피부색이 다를까?",
      "스마트폰 카메라로 사진을 찍으면 실내 형광등 아래에서는 노랗게, 그늘에서는 푸르스름하게 촬영됩니다. 이는 카메라 센서가 감지하는 RGB 값이 조명의 색온도(Kelvin)와 카메라 ISP의 자동 화이트밸런스(AWB)에 강하게 왜곡되기 때문입니다.",
      "따라서 단순한 RGB 평균값만으로는 정확한 퍼스널 컬러 진단을 내릴 수 없습니다. InSelf Color는 이를 해결하기 위해 국제 조명 위원회의 **CIE L*a*b* 색 공간 변환**과 생체 광학 반사 모델을 도입했습니다.",
      "## 2. CIE L*a*b* 색 공간의 3차원 축",
      "CIE L*a*b* 공간은 인간의 시각 수용체(망막 추상체)의 감각에 가장 가깝도록 설계된 균등 색 공간입니다.",
      "• **L* (명도)**: 0(검정)부터 100(흰색)까지의 밝기 레벨.",
      "• **a* (빨강-초록 축)**: 양수(+)는 붉은 기(헤모글로빈 혈색), 음수(-)는 녹색 기를 나타냅니다.",
      "• **b* (노랑-파랑 축)**: 양수(+)는 황색 기(멜라닌 및 카로틴), 음수(-)는 푸른 기를 나타냅니다.",
      "피부의 웜/쿨 언더톤은 주로 `b*` 좌표와 `a*` 좌표의 황금 분할 비율에서 결정됩니다. 동양인의 경우 b*가 일정 수준 이상이면서 a*와의 상관계수가 양의 방향일 때 안정적인 웜톤 스펙트럼이 형성됩니다.",
      "## 3. 멜라닌 & 헤모글로빈 2-계수 역산 알고리즘",
      "인체 피부의 반사 스펙트럼은 주로 두 가지 핵심 생체 색소에 의해 결정됩니다:",
      "1. **멜라닌(Melanin)**: 자외선 흡수 및 피부 명도 결정 색소",
      "2. **헤모글로빈(Oxy-hemoglobin)**: 모세혈관의 혈색과 붉은 생기를 나타내는 색소",
      "InSelf Color는 얼굴 영역에서 눈, 눈썹, 입술을 분리한 순수 피부 픽셀군(약 5만~10만 픽셀)을 샘플링한 후 가우시안 필터링과 조명 하이라이트 보정을 거쳐 피부 고유의 흡광 계수를 역산합니다.",
      "## 4. 100% 온디바이스(On-Device) 로컬 처리의 가치",
      "이 모든 복잡한 행렬 연산과 색 공간 변환은 사용자의 스마트폰/PC 웹브라우저 메모리 내부(HTML5 Canvas API)에서 실시간으로 완결됩니다. 소중한 얼굴 사진이 원격 서버로 전송되지 않으므로, 완벽한 보안과 프라이버시 속에서 연구급 알고리즘을 누릴 수 있습니다."
    ],
    contentEn: [
      "## 1. Limitations of Standard RGB Imaging",
      "Camera sensors are heavily influenced by ambient color temperature and auto white balance, distorting true undertones.",
      "## 2. The CIE L*a*b* Architecture",
      "CIE L*a*b* models human color perception. L* measures lightness, while a* and b* measure red-green and yellow-blue chromatic axes.",
      "## 3. Two-Pigment Reflectance Estimation",
      "Our software samples 50,000+ facial pixels and computes spectral indices corresponding to melanin and hemoglobin absorption.",
      "## 4. 100% On-Device Safety",
      "Every matrix calculation runs locally in browser RAM without server uploads, guaranteeing total biometric privacy."
    ]
  },
  "makeup-matching": {
    slug: "makeup-matching",
    category: "메이크업 팁",
    categoryEn: "Makeup Tips",
    title: "퍼스널컬러 계절별 찰떡 메이크업 공식: 립, 섀도우, 블러셔 추천 조합",
    titleEn: "Seasonal Makeup Matching Guide: Lips, Eyes, and Blush Combos",
    summary: "내 톤에 맞지 않는 화장품으로 인해 얼굴이 동동 뜨거나 칙칙해진 경험이 있으신가요? 4계절 12타입별 가장 실패 없는 베스트 메이크업 배색 공식을 공개합니다.",
    summaryEn: "Never buy the wrong lipstick again. Master color harmony with our seasonal beauty formula.",
    readTime: "5분",
    date: "2026-10-18",
    contentKo: [
      "## 1. 톤에 맞지 않는 메이크업이 주는 역효과",
      "아무리 유행하는 신상 립스틱이나 백화점 베스트셀러 섀도우라도, 내 퍼스널컬러와 부조화를 이루면 다음과 같은 현상이 일어납니다:",
      "• 쿨톤이 웜 오렌지 립을 바르면 → 입술만 누렇게 도드라지고 치아가 누래 보임",
      "• 웜톤이 푸른 플럼 립을 바르면 → 혈색이 죽고 입술에 멍이 든 것처럼 보임",
      "• 라이트 톤이 진한 스모키 음영을 넣으면 → 눈가에 피로와 다크서클이 부각됨",
      "• 딥 톤이 너무 연한 딸기우유 립을 바르면 → 얼굴이 붓고 흐리멍덩해 보임",
      "## 2. 계절별 베스트 메이크업 컬러 공식",
      "### 🌸 봄 웜톤 (Spring Warm) - 과즙미 & 맑은 투명 광택",
      "• **베이스**: 노란 기를 자연스럽게 살려주는 피치 베이지 쿠션",
      "• **립**: 맑은 코랄 레드, 살구 피치, 자몽 워터 틴트 (유리알 광택 필수)",
      "• **블러셔**: 크리니크 멜론팝 스타일의 살구 코랄빛 수채화 치크",
      "• **아이**: 골드 글리터, 바닐라 아이보리 베이스, 연한 카라멜 브라운",
      "### 🌊 여름 쿨톤 (Summer Cool) - 청순 수채화 & 모브 라벤더",
      "• **베이스**: 핑크 베이스의 맑고 뽀송한 뉴트럴 쿠션",
      "• **립**: 베어 그레이프, 모브 핑크, 맑은 체리 베리 (매트 또는 은은한 글로우)",
      "• **블러셔**: 크리니크 팬지팝 같은 라벤더 퍼플, 페일 핑크 치크",
      "• **아이**: 롬앤 말린 라벤더 섀도우, 회갈색 애쉬 브라운 음영",
      "### 🍂 가을 웜톤 (Autumn Warm) - 그윽한 분위기 & 벨벳 음영",
      "• **베이스**: 따스한 골든 베이지 쿠션, 세미 매트 피니시",
      "• **립**: 맥 칠리, 브릭 레드, 톤다운된 테라코타 오렌지 (벨벳/매트 텍스처)",
      "• **블러셔**: 3CE 로즈 베이지, 로라메르시에 진저 누드 치크",
      "• **아이**: 카퍼 브라운, 단풍 브릭, 올리브 카키 음영 팔레트",
      "### ❄️ 겨울 쿨톤 (Winter Cool) - 선명한 원포인트 & 카리스마",
      "• **베이스**: 맑고 깨끗한 포셀린 핑크 베이지, 결점 없는 커버",
      "• **립**: 맥 루비우, 딥 플럼 버건디, 푸시아 마젠타 (풀립 또는 또렷한 라인)",
      "• **블러셔**: 생략하거나 아주 은은한 쿨 플럼 펄로 윤곽만 정리",
      "• **아이**: 깔끔한 제트 블랙 아이라이너, 라벤더 실버 펄"
    ],
    contentEn: [
      "## 1. Why Mismatched Makeup Clashes",
      "Warm tones wearing purple tones look bruised, while cool tones wearing orange look yellow and fatigued.",
      "## 2. Seasonal Formulas",
      "• Spring Warm: Coral reds, juicy peach water glosses, melon blush.",
      "• Summer Cool: Lavender purple blush, mauve roses, ash brown shading.",
      "• Autumn Warm: Terracotta brick lips, ginger blush, rich copper shadows.",
      "• Winter Cool: Ruby Woo cherry red lips, razor-sharp black liner, icy silver."
    ]
  },
  "fashion-contrast": {
    slug: "fashion-contrast",
    category: "패션 스타일링",
    categoryEn: "Fashion Styling",
    title: "명도 대비(Contrast)와 소재(Texture)로 완성하는 퍼스널컬러 패션 스타일링",
    titleEn: "Mastering Contrast and Fabric Texture in Personal Styling",
    summary: "색상만 맞춘다고 완벽한 코디가 되는 것은 아닙니다. 얼굴 이목구비의 선명도에 따른 명도 대비감과 패브릭 질감(실크, 리넨, 가죽 등)의 조화 비법을 정리했습니다.",
    summaryEn: "Color is only half the equation. Learn how value contrast and fabric sheen elevate your styling.",
    readTime: "4분",
    date: "2026-10-19",
    contentKo: [
      "## 1. 색상만큼 중요한 '명도 대비(Contrast)'의 비밀",
      "패션을 완성할 때 상의와 하의, 이너와 아우터의 밝기 차이를 **대비감(Contrast)**이라고 합니다. 내 이목구비가 요구하는 대비감에 맞추지 않으면 옷에 얼굴이 묻히거나 반대로 밋밋해 보입니다.",
      "• **고대비감(High Contrast)**: 블랙 & 화이트의 강렬한 배색. 겨울 쿨톤과 봄 비비드가 가장 화려하게 소화합니다.",
      "• **저대비감(Low Contrast / 톤온톤)**: 베이지 & 오트밀, 라벤더 & 스카이블루처럼 밝기 차이가 적은 부드러운 배색. 여름 라이트, 가을 뮤트가 입었을 때 극상의 우아함을 띱니다.",
      "## 2. 텍스처(Texture)와 패브릭 소재의 퍼스널 컬러 조화",
      "동일한 색상이라도 원단의 질감에 따라 반사광이 달라집니다:",
      "• **매끄럽고 광택 있는 소재(새틴, 에나멜, 가죽)**: 겨울 쿨톤의 시크한 카리스마와 봄 브라이트의 맑은 생기를 극대화합니다.",
      "• **가볍고 하늘하늘한 소재(쉬폰, 얇은 코튼, 오간자)**: 여름 라이트의 청초함과 봄 라이트의 사랑스러움을 돋보이게 합니다.",
      "• **도톰하고 결이 살아있는 소재(스웨이드, 코듀로이, 트위드, 울 니트)**: 가을 웜톤의 따뜻하고 포근한 깊이를 가장 아름답게 살립니다.",
      "## 3. 액세서리와 금속(Metal)의 시너지",
      "피부의 붉은 기가 신경 쓰일 때는 쿨톤의 실버 주얼리로 열감을 식혀주고, 안색이 창백하고 핏기가 없을 때는 웜톤의 로즈골드나 옐로우 골드로 부드러운 생기를 불어넣어 보세요."
    ],
    contentEn: [
      "## 1. The Role of Value Contrast",
      "High contrast (black & white pairs) flatters Winter and Bright types, while tonal low contrast suits Mute and Light seasons.",
      "## 2. Fabric Textures",
      "Glossy satins and leathers highlight clear, high-chroma tones, while textured tweeds, suedes, and knitted wools enhance autumn hues.",
      "## 3. Metal Harmonization",
      "Pair cool skin with platinum silver, and warm tones with brushed brass or radiant yellow gold."
    ]
  },
  "worst-color-solution": {
    slug: "worst-color-solution",
    category: "스타일 솔루션",
    categoryEn: "Style Solutions",
    title: "워스트 컬러 심폐소생술: 안 어울리는 옷과 립스틱 버리지 않고 입는 꿀팁",
    titleEn: "Saving Your Worst Colors: How to Wear Colors That Don't Flatter You",
    summary: "좋아해서 샀는데 알고 보니 워스트 컬러였던 코트나 립스틱이 옷장에 잠들어 있나요? 넥라인 거리두기, 레이어드, 믹스매치로 예쁘게 소화하는 4가지 구원 공식을 소개합니다.",
    summaryEn: "Don't discard unflattering outfits. Discover 4 styling hacks to revive and wear your worst colors.",
    readTime: "4분",
    date: "2026-10-20",
    contentKo: [
      "## 1. 퍼스널컬러는 '감옥'이 아니라 '무기'입니다",
      "퍼스널 컬러 진단을 받고 나면 '이제 내 옷장의 절반은 못 입는 것인가?' 하고 좌절하시는 분들이 많습니다. 하지만 퍼스널 컬러는 내가 좋아하는 색을 금지하는 규칙이 아닙니다. 내가 좋아하는 색을 얼굴을 해치지 않고 영리하게 입는 테크닉을 익히면 충분합니다.",
      "## 2. 워스트 컬러를 살려내는 4가지 심폐소생 기술",
      "### 비법 1: 얼굴(목선)과 물리적 거리 두기",
      "퍼스널 컬러의 영향력은 **얼굴 반경 30cm 이내(목, 쇄골, 상의 넥라인)**에서 90% 이상 발생합니다.",
      "• 워스트 컬러는 **하의(바지, 스커트), 가방, 신발**로 멀리 보내세요.",
      "• 만약 워스트 컬러 자켓이나 코트를 입고 싶다면, **이너 티셔츠나 목도리를 베스트 컬러(아이보리 or 화이트)**로 받쳐 입어 얼굴과 자켓 사이에 '완충 지대'를 만들어 주세요.",
      "### 비법 2: 네크라인을 넓게 파서 스킨 면적 확보하기",
      "목을 꽉 조이는 터틀넥은 워스트 컬러의 반사광을 턱과 볼에 직격으로 비춥니다. 대신 V넥이나 스퀘어넥처럼 목선과 쇄골이 드러나는 옷을 선택하면, 피부 본연의 색이 시선을 분산시켜 워스트 색의 부정적 영향이 대폭 감소합니다.",
      "### 비법 3: 립스틱 믹스매치 (그라데이션 심폐소생)",
      "너무 차가운 핑크 립이나 너무 노란 오렌지 립이 있다면:",
      "• 베이스로 내 톤에 맞는 **누드 립**을 입술 전체에 얇게 깔아줍니다.",
      "• 안쪽에만 포인트로 워스트 립을 톡톡 두드려 그라데이션하면 독특하고 오묘한 나만의 시그니처 컬러가 완성됩니다.",
      "### 비법 4: 주얼리와 스카프를 조명판으로 활용하기",
      "반짝이는 볼드한 귀걸이나 목걸이, 은은한 스카프는 얼굴 아래에 위치한 '반사판' 역할을 합니다. 쿨톤의 실버 주얼리나 웜톤의 골드 체인이 워스트 옷의 칙칙함을 즉각 반사해 날려줍니다."
    ],
    contentEn: [
      "## 1. Personal Color Is a Tool, Not a Prison",
      "You don't need to throw away clothes you love. With strategic placement, any color can be harmonized.",
      "## 2. 4 Rescue Techniques",
      "1. Distance from the Face: Move worst colors to trousers, shoes, or bags.",
      "2. Open Necklines: V-necks and square necklines prevent reflection onto cheeks.",
      "3. Lip Layering: Neutralize extreme tones with a safe nude base underneath.",
      "4. Reflective Jewelry: Use flattering jewelry to act as a light diffuser."
    ]
  },
  "men-personal-color": {
    slug: "men-personal-color",
    category: "남성 스타일링",
    categoryEn: "Men's Styling",
    title: "남성을 위한 퍼스널컬러 가이드: 슈트, 셔츠, 넥타이 톤온톤 스타일링",
    titleEn: "Men's Personal Color Playbook: Suits, Shirts, and Grooming",
    summary: "면접, 비즈니스 미팅, 데이트에서 신뢰감과 호감을 극대화하는 남성 퍼스널컬러 실전 가이드. 쿨네이비 vs 웜차콜 슈트 선택과 헤어 톤 정리법을 전해드립니다.",
    summaryEn: "Elevate your professional and personal presence with tailored suit, shirt, and tie pairings.",
    readTime: "5분",
    date: "2026-10-21",
    contentKo: [
      "## 1. 남성에게 퍼스널 컬러가 중요한 이유",
      "화장을 거의 하지 않거나 가볍게 하는 남성일수록, 얼굴과 맞닿는 **셔츠 깃, 넥타이, 정장 재킷**의 색상이 안색에 미치는 영향력이 여성보다 2배 이상 큽니다. 잘못된 색상의 셔츠를 입으면 면도 자국(푸르스름한 수염 자국)이 도드라지거나 얼굴이 피곤하고 퀭해 보일 수 있습니다.",
      "반면 나에게 맞는 슈트와 셔츠를 입으면 턱선이 날렵해 보이고, 피부 결이 매끄러우며 자신감 넘치는 인상을 줍니다.",
      "## 2. 슈트 & 셔츠 계절별 매칭 가이드",
      "### 🌸 봄 웜톤 남성 - 부드럽고 다정한 호감형",
      "• **슈트**: 웜 네이비, 라이트 카멜, 밀크 베이지",
      "• **셔츠**: 크림 아이보리, 라이트 웜 피치 셔츠",
      "• **넥타이**: 코랄 오렌지 스트라이프, 골드 옐로우 패턴 타이",
      "• **헤어**: 부드러운 밀크 브라운, 내추럴 웜 브라운 염색",
      "### 🌊 여름 쿨톤 남성 - 지적이고 청량한 댄디 룩",
      "• **슈트**: 슬레이트 그레이, 쿨 네이비, 소프트 차콜",
      "• **셔츠**: 깨끗한 스카이 블루, 파우더 블루, 은은한 페일 라벤더",
      "• **넥타이**: 인디고 블루, 실버 그레이, 딥 마린 솔리드 타이",
      "• **헤어**: 흑갈색, 애쉬 다크 브라운, 붉은 기 없는 자연모",
      "### 🍂 가을 웜톤 남성 - 묵직하고 신뢰감 넘치는 클래식",
      "• **슈트**: 다크 카키 브라운, 올리브 차콜, 클래식 브라운 수트",
      "• **셔츠**: 에크루 아이보리, 웜 베이지 드레스 셔츠",
      "• **넥타이**: 딥 버건디, 번트 오렌지, 앤틱 골드 페이즐리 타이",
      "• **헤어**: 딥 다크 초콜릿, 앤틱 브라운",
      "### ❄️ 겨울 쿨톤 남성 - 압도적인 카리스마와 샤프한 핏",
      "• **슈트**: 제트 블랙, 잉키 네이비, 짙은 차콜 그레이",
      "• **셔츠**: 눈부신 퓨어 화이트(Pure White)",
      "• **넥타이**: 와인 버건디, 로얄 블루, 흑백 모노톤 기하학 타이",
      "• **헤어**: 윤기 나는 흑발(Jet Black), 포마드 가르마 스타일링"
    ],
    contentEn: [
      "## 1. Why Personal Color Matters for Men",
      "Because men often wear minimal makeup, shirts and suit lapels frame the face directly, influencing perceived authority and vitality.",
      "## 2. Suit and Shirt Playbook",
      "• Spring Warm: Warm navy and camel suits with cream ivory shirts.",
      "• Summer Cool: Slate gray and cool navy with crisp sky blue shirts.",
      "• Autumn Warm: Deep chocolate and olive suits with rich burgundy ties.",
      "• Winter Cool: Jet black and inky navy with blinding pure white shirts."
    ]
  },
  "four-seasons-overview": {
    slug: "four-seasons-overview",
    category: "종합 가이드",
    categoryEn: "Comprehensive",
    title: "4계절 12타입 퍼스널컬러 총정리: 나에게 맞는 세부 톤 찾기",
    titleEn: "The 4-Season 12-Subtype Master Guide: Pinpoint Your Exact Palette",
    summary: "봄(라이트/브라이트/웜), 여름(라이트/쿨/뮤트), 가을(뮤트/웜/딥), 겨울(쿨/브라이트/딥)까지 12가지 세부 톤의 핵심 특징과 대표 연예인, 추천 팔레트를 한눈에 비교 정리했습니다.",
    summaryEn: "Compare all 12 subtypes across light, bright, true, mute, and deep spectrums in one master table.",
    readTime: "7분",
    date: "2026-10-21",
    contentKo: [
      "## 1. 4계절 분류에서 12타입 세분화로의 진화",
      "초기 퍼스널 컬러는 단순히 '봄, 여름, 가을, 겨울'의 4가지 계절로만 나뉘었습니다. 하지만 같은 여름 쿨톤이라도 '장원영처럼 뽀얗고 밝은 파스텔이 어울리는 사람(여름 라이트)'과 '김태리처럼 회색빛의 분위기 있는 모브가 어울리는 사람(여름 뮤트)'은 어울리는 옷이 완전히 다릅니다.",
      "현대 퍼스널컬러 진단은 이를 12가지 세부 톤(Subtypes)으로 나누어 개인에게 꼭 맞는 맞춤형 스타일을 제안합니다.",
      "## 2. 12타입 퍼스널 컬러 한눈에 보기",
      "### 🌸 봄 웜톤 (Spring Warm)",
      "1. **봄 라이트 (Spring Light)**: 뽀얗고 여린 복숭아 파스텔. (대표 연예인: 송혜교, 윤아)",
      "2. **봄 브라이트 (Spring Bright)**: 쨍하고 선명한 사과 레드와 오렌지. (대표 연예인: 아이유, 수지)",
      "3. **봄 트루/웜 (Warm Spring)**: 따스한 황금 햇살을 머금은 정통 코랄. (대표 연예인: 웬디, 츄)",
      "### 🌊 여름 쿨톤 (Summer Cool)",
      "4. **여름 라이트 (Summer Light)**: 이슬처럼 투명하고 시원한 페일 라벤더. (대표 연예인: 손예진, 장원영)",
      "5. **여름 트루/쿨 (Cool Summer)**: 블루 언더톤의 청량함과 깨끗한 스카이블루. (대표 연예인: 태연, 이영애)",
      "6. **여름 뮤트 (Summer Mute)**: 그레이시하고 부드러운 모브와 말린 장미. (대표 연예인: 김태리, 전지현)",
      "### 🍂 가을 웜톤 (Autumn Warm)",
      "7. **가을 뮤트 (Autumn Mute)**: 애쉬 베이지와 오트밀, 차분한 시나몬. (대표 연예인: 제니, 신세경)",
      "8. **가을 트루/웜 (Warm Autumn)**: 무르익은 단풍과 풍성한 테라코타. (대표 연예인: 이효리, 수애)",
      "9. **가을 딥 (Autumn Deep)**: 묵직하고 고혹적인 다크 초콜릿과 버건디. (대표 연예인: 화사, 박신혜)",
      "### ❄️ 겨울 쿨톤 (Winter Cool)",
      "10. **겨울 트루/쿨 (Cool Winter)**: 푸른빛의 차가움과 흑백의 높은 대비. (대표 연예인: 김혜수, 서예지)",
      "11. **겨울 브라이트 (Winter Bright)**: 압도적인 포스의 네온 마젠타와 루비 레드. (대표 연예인: 임지연, 현아)",
      "12. **겨울 딥 (Winter Deep)**: 칠흑 같은 밤하늘 블랙과 핏빛 와인. (대표 연예인: 김옥빈, 카리나)",
      "## 3. 내 퍼스널 컬러를 바로 확인하는 방법",
      "InSelf Color의 무료 온라인 사진 분석 툴을 이용하면 10초 만에 12타입 중 내가 어느 위치에 있는지 바로 확인하고 나만의 리포트를 다운로드할 수 있습니다."
    ],
    contentEn: [
      "## 1. Evolution from 4 to 12 Subtypes",
      "Traditional 4-season theory often missed subtle nuances. The modern 12-type system splits each season into Light, Bright, True, Mute, or Deep spectrums.",
      "## 2. 12 Subtype Directory",
      "Covers all 12 types with key characteristics, celebrity inspirations, and primary palettes.",
      "## 3. Instant Diagnosis",
      "Upload your photo to InSelf Color for an instant, scientific 12-season diagnostic report."
    ]
  }
};

interface GuideArticlePageProps {
  slug: string;
  lang: "ko" | "en";
  setLang: (lang: "ko" | "en") => void;
  onNavigate: (path: string) => void;
}

export default function GuideArticlePage({ slug, lang, setLang, onNavigate }: GuideArticlePageProps) {
  const article = GUIDE_ARTICLES[slug];
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (article) {
      document.title = lang === "ko" 
        ? `${article.title} | InSelf Color 칼럼` 
        : `${article.titleEn} | InSelf Color Column`;

      let metaDesc = document.querySelector('meta[name="description"]');
      const desc = lang === "ko" ? article.summary : article.summaryEn;
      if (metaDesc) {
        metaDesc.setAttribute("content", desc);
      }
    }
  }, [slug, article, lang]);

  if (!article) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#FDF8F2", padding: "40px 20px", textAlign: "center" }}>
        <HeaderNavbar currentRoute="/guide" lang={lang} setLang={setLang} onNavigate={onNavigate} />
        <div style={{ maxWidth: "600px", margin: "60px auto" }}>
          <h2>{lang === "ko" ? "칼럼을 찾을 수 없습니다" : "Article Not Found"}</h2>
          <p style={{ color: "#7A6052", marginBottom: "20px" }}>
            {lang === "ko" ? "요청하신 칼럼이 존재하지 않거나 주소가 변경되었습니다." : "The requested guide article does not exist."}
          </p>
          <button
            onClick={() => onNavigate("/guide")}
            style={{
              background: "#C4956A",
              color: "#fff",
              border: "none",
              padding: "10px 24px",
              borderRadius: "100px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {lang === "ko" ? "가이드북 목록으로" : "Back to Guides"}
          </button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const content = lang === "ko" ? article.contentKo : article.contentEn;

  // Filter other articles for related reading
  const otherArticles = Object.values(GUIDE_ARTICLES).filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FDF8F2",
        color: "#3E2814",
        fontFamily: "'Inter', 'Noto Sans KR', -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeaderNavbar currentRoute="/guide" lang={lang} setLang={setLang} onNavigate={onNavigate} />

      <KakaoTopBanner style={{ margin: "14px 0 0 0" }} />

      <main
        style={{
          flex: 1,
          maxWidth: "840px",
          width: "100%",
          margin: "28px auto 60px",
          padding: "0 20px",
          boxSizing: "border-box",
        }}
      >
        {/* Navigation Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <button
            onClick={() => onNavigate("/guide")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "none",
              border: "none",
              color: "#7A6052",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              padding: 0,
            }}
          >
            <ArrowLeft size={16} />
            <span>{lang === "ko" ? "전체 가이드 목록" : "Back to Guides"}</span>
          </button>

          <button
            onClick={handleShare}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(196, 149, 106, 0.12)",
              color: "#3E2814",
              border: "1px solid rgba(196, 149, 106, 0.25)",
              padding: "6px 14px",
              borderRadius: "100px",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            <Share2 size={14} />
            <span>{copied ? (lang === "ko" ? "링크 복사됨 ✓" : "Copied! ✓") : (lang === "ko" ? "공유" : "Share")}</span>
          </button>
        </div>

        {/* Article Header Card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            border: "1px solid rgba(196, 149, 106, 0.2)",
            padding: "36px 32px 28px",
            boxShadow: "0 8px 30px rgba(61, 43, 26, 0.04)",
            marginBottom: "28px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "12px" }}>
            <span
              style={{
                background: "rgba(196, 149, 106, 0.15)",
                color: "#A17349",
                padding: "4px 12px",
                borderRadius: "100px",
                fontSize: "12px",
                fontWeight: 800,
              }}
            >
              {lang === "ko" ? article.category : article.categoryEn}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#7A6052" }}>
              <Clock size={13} />
              <span>{lang === "ko" ? `읽는 시간: ${article.readTime}` : `Read time: ${article.readTime}`}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#7A6052" }}>
              <Calendar size={13} />
              <span>{article.date}</span>
            </div>
          </div>

          <h1
            style={{
              fontSize: "26px",
              fontWeight: 900,
              color: "#3E2814",
              margin: "0 0 16px",
              lineHeight: 1.35,
              letterSpacing: "-0.02em",
            }}
          >
            {lang === "ko" ? article.title : article.titleEn}
          </h1>

          <p
            style={{
              fontSize: "14.5px",
              color: "#6B5244",
              lineHeight: 1.7,
              background: "#FAF6F1",
              borderLeft: "4px solid #C4956A",
              padding: "16px",
              borderRadius: "10px",
              margin: 0,
            }}
          >
            {lang === "ko" ? article.summary : article.summaryEn}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "16px",
              paddingTop: "16px",
              borderTop: "1px solid rgba(196, 149, 106, 0.12)",
              fontSize: "12px",
              color: "#7A6052",
            }}
          >
            <User size={14} color="#C4956A" />
            <span><b>작성:</b> InSelf Studio Labs 디지털 컬러리스트 연구팀</span>
          </div>
        </div>

        {/* Article Body */}
        <article
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            border: "1px solid rgba(196, 149, 106, 0.2)",
            padding: "36px 32px",
            boxShadow: "0 8px 30px rgba(61, 43, 26, 0.04)",
            fontSize: "15px",
            lineHeight: 1.85,
            color: "#3E2814",
          }}
        >
          {content.map((paragraph, idx) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2
                  key={idx}
                  style={{
                    fontSize: "20px",
                    fontWeight: 900,
                    color: "#A17349",
                    margin: idx === 0 ? "0 0 16px" : "36px 0 16px",
                    borderBottom: "1.5px solid rgba(196, 149, 106, 0.18)",
                    paddingBottom: "8px",
                  }}
                >
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("### ")) {
              return (
                <h3
                  key={idx}
                  style={{
                    fontSize: "16.5px",
                    fontWeight: 800,
                    color: "#3E2814",
                    margin: "24px 0 10px",
                  }}
                >
                  {paragraph.replace("### ", "")}
                </h3>
              );
            }
            return (
              <p
                key={idx}
                style={{
                  margin: "0 0 16px",
                  color: "#4A3528",
                }}
              >
                {paragraph}
              </p>
            );
          })}
        </article>

        {/* Middle Banner */}
        <KakaoMiddleBanner style={{ margin: "28px 0" }} />

        {/* Interactive Test CTA */}
        <div
          style={{
            background: "linear-gradient(135deg, #FAF5EF, #F0E6D8)",
            borderRadius: "24px",
            border: "1px solid rgba(196, 149, 106, 0.3)",
            padding: "32px",
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          <Sparkles size={28} color="#C4956A" style={{ marginBottom: "8px" }} />
          <h3 style={{ fontSize: "18px", fontWeight: 900, margin: "0 0 8px", color: "#3E2814" }}>
            {lang === "ko" ? "내 퍼스널컬러는 어떤 계절일까요?" : "Curious About Your Personal Color?"}
          </h3>
          <p style={{ fontSize: "13.5px", color: "#7A6052", margin: "0 0 18px" }}>
            {lang === "ko"
              ? "얼굴 사진 한 장으로 10초 만에 12가지 세부 타입과 어울리는 인생 메이크업 팔레트를 확인해보세요."
              : "Discover your exact seasonal subtype with our free 10-second camera test."}
          </p>
          <button
            onClick={() => onNavigate("/")}
            style={{
              background: "linear-gradient(135deg, #C4956A, #A17349)",
              color: "#ffffff",
              border: "none",
              borderRadius: "100px",
              padding: "12px 28px",
              fontSize: "14px",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(196, 149, 106, 0.4)",
            }}
          >
            {lang === "ko" ? "📸 무료 10초 퍼스널컬러 진단 시작" : "📸 Start Free Color Test"}
          </button>
        </div>

        {/* Related Articles Grid */}
        <div style={{ marginTop: "40px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#3E2814", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <BookOpen size={20} color="#C4956A" />
            <span>{lang === "ko" ? "추천 관련 칼럼 시리즈" : "Recommended Column Articles"}</span>
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
            {otherArticles.map((other) => (
              <a
                key={other.slug}
                href={`/guide/${other.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/guide/${other.slug}`);
                }}
                style={{
                  display: "block",
                  textDecoration: "none",
                  background: "#ffffff",
                  borderRadius: "18px",
                  border: "1px solid rgba(196, 149, 106, 0.2)",
                  padding: "20px",
                  boxShadow: "0 4px 14px rgba(61, 43, 26, 0.03)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
              >
                <div style={{ fontSize: "11px", fontWeight: 800, color: "#C4956A", marginBottom: "6px" }}>
                  {lang === "ko" ? other.category : other.categoryEn}
                </div>
                <div style={{ fontSize: "14.5px", fontWeight: 800, color: "#3E2814", lineHeight: 1.4, marginBottom: "8px" }}>
                  {lang === "ko" ? other.title : other.titleEn}
                </div>
                <div style={{ fontSize: "12.5px", color: "#7A6052", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {lang === "ko" ? other.summary : other.summaryEn}
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(196, 149, 106, 0.15)",
          padding: "24px 20px",
          textAlign: "center",
          fontSize: "12px",
          color: "#7A6052",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginBottom: "8px" }}>
          <a href="/about" onClick={(e) => { e.preventDefault(); onNavigate("/about"); }} style={{ color: "#7A6052", textDecoration: "none" }}>{lang === "ko" ? "서비스 소개" : "About"}</a>
          <span>•</span>
          <a href="/guide" onClick={(e) => { e.preventDefault(); onNavigate("/guide"); }} style={{ color: "#C4956A", fontWeight: 700, textDecoration: "none" }}>{lang === "ko" ? "PCCS 가이드" : "PCCS Guide"}</a>
          <span>•</span>
          <a href="/privacy" onClick={(e) => { e.preventDefault(); onNavigate("/privacy"); }} style={{ color: "#7A6052", textDecoration: "none" }}>{lang === "ko" ? "개인정보처리방침" : "Privacy Policy"}</a>
          <span>•</span>
          <a href="/terms" onClick={(e) => { e.preventDefault(); onNavigate("/terms"); }} style={{ color: "#7A6052", textDecoration: "none" }}>{lang === "ko" ? "이용약관" : "Terms"}</a>
          <span>•</span>
          <a href="/contact" onClick={(e) => { e.preventDefault(); onNavigate("/contact"); }} style={{ color: "#7A6052", textDecoration: "none" }}>{lang === "ko" ? "문의하기" : "Contact"}</a>
        </div>
        <div>© {new Date().getFullYear()} InSelf Studio Labs. All Rights Reserved.</div>
      </footer>
    </div>
  );
}
