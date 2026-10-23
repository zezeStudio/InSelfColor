import { useState, useEffect } from "react";
import { ArrowLeft, Share2, Sparkles, Check, AlertTriangle, User, Palette, ShoppingBag, Shirt } from "lucide-react";
import { KakaoTopBanner, KakaoMiddleBanner } from "./KakaoAdBanner";

interface LongtailData {
  id: string;
  name: string;
  nameEn: string;
  title: string;
  description: string;
  keywords: string[];
  bannerBg: string; // Gradient or solid color
  accentColor: string;
  paletteColors: { hex: string; name: string }[];
  celebrities: string[];
  bestItems: {
    lip: string[];
    shadow: string[];
    blusher: string[];
  };
  features: string[];
  stylingTips: string[];
  worstTips: string[];
}

export const LONGTAIL_PAGES: Record<string, LongtailData> = {
  "spring-bright": {
    id: "spring-bright",
    name: "봄 브라이트",
    nameEn: "Spring Bright",
    title: "봄 브라이트 (Spring Bright) 최고의 퍼스널 컬러 메이크업 & 의상 코디 가이드",
    description: "생기 있고 선명한 고명도 고채도 웜톤의 대명사, 봄 브라이트! 어울리는 인생립스틱, 아이섀도우부터 워스트를 피하는 분위기 있는 패션 코디법까지 완벽 정리해 드립니다.",
    keywords: ["봄 브라이트", "봄웜 브라이트", "봄 브라이트 립", "봄웜 화장품", "봄 브라이트 코디", "퍼스널컬러"],
    bannerBg: "linear-gradient(135deg, #FF6B35, #FFB347, #FFD0B8)",
    accentColor: "#FF6B35",
    paletteColors: [
      { hex: "#FF6B35", name: "애플 레드" },
      { hex: "#FF7F50", name: "코랄 핑크" },
      { hex: "#FF8C00", name: "다크 오렌지" },
      { hex: "#FFD700", name: "비비드 골드" },
      { hex: "#FFB347", name: "선샤인 옐로우" },
      { hex: "#98FF98", name: "네온 그린" }
    ],
    celebrities: ["아이유", "수지", "조이 (레드벨벳)", "나연 (트와이스)"],
    features: [
      "봄 웜톤 중 가장 채도가 높은 비비드하고 선명한 톤입니다.",
      "회색기(그레이시)가 섞이지 않은 맑고 투명하며 쨍한 컬러가 얼굴빛을 환하게 밝혀줍니다.",
      "투명하고 반짝이는 질감이 매우 잘 어울리며, 대비감이 큰 배색이 아주 조화롭습니다."
    ],
    bestItems: {
      lip: ["맥(MAC) 레이디 데인저 - 맑고 다채로운 다홍빛 오렌지 레드", "헤라 센슈얼 파우더 매트 팜파스 - 화사한 브라이트 피치 코랄", "입생로랑 워터 스테인 618 - 투명하고 촉촉한 애플 오렌지레드"],
      shadow: ["데이지크 섀도우 팔레트 피치 스퀴즈 - 영롱하고 맑은 복숭아 글리터", "롬앤 베러 댄 아이즈 말린 복숭아꽃 - 부드럽고 가벼운 피치 웜 베이지"],
      blusher: ["크리니크 치크팝 피치팝 - 수채화처럼 맑게 올라오는 살구 피치", "어퓨 과즙세팡 무스 블러셔 피치코랄 - 생기 만렙 무스 피치"]
    },
    stylingTips: [
      "블랙 & 화이트보다는 크림 아이보리 배색에 채도 높은 오렌지, 레드, 옐로우 포인트 컬러를 얹어 코디해 보세요.",
      "광택감이 도는 가죽 자켓이나 실크, 새틴 소재가 투명한 봄 브라이트 스킨 톤과 찰떡궁합을 보여줍니다.",
      "골드나 로즈골드 계열의 반짝이는 주얼리를 적극 매치하여 특유의 통통 튀고 고급스러운 에너지를 극대화하세요."
    ],
    worstTips: [
      "탁하고 회색빛이 많이 도는 뮤트 톤(카키, 그레이 배색)은 안색을 칙칙하고 피곤해 보이게 만듭니다.",
      "지나치게 어둡고 딥한 다크 톤(블랙 헤어, 다크 네이비 자켓)은 본연의 투명함을 가려 나이 들어 보일 수 있습니다."
    ]
  },
  "spring-light": {
    id: "spring-light",
    name: "봄 라이트",
    nameEn: "Spring Light",
    title: "봄 라이트 (Spring Light) 복숭아처럼 사랑스럽고 화사한 화장품 추천 & 데일리 룩 북",
    description: "요정 같은 맑고 뽀얀 피부톤의 봄 라이트! 롬앤, 멜론팝 등 필수 소장 인생 화장품 라인업부터 포근하고 부드러운 파스텔 스타일링 비법을 소개합니다.",
    keywords: ["봄 라이트", "봄웜 라이트", "봄 라이트 립", "피치 메이크업", "파스텔 코디", "봄웜톤"],
    bannerBg: "linear-gradient(135deg, #FFE8D6, #FFDAB9, #FFEBCD)",
    accentColor: "#E8905A",
    paletteColors: [
      { hex: "#FFDAB9", name: "피치 파우더" },
      { hex: "#FFE4E1", name: "미스티 로즈" },
      { hex: "#FFF0F5", name: "라벤더 가든" },
      { hex: "#FAF0E6", name: "리넨 아이보리" },
      { hex: "#FFFDD0", name: "파스텔 크림" },
      { hex: "#AFEEEE", name: "밀키 터코이즈" }
    ],
    celebrities: ["윤아 (소녀시대)", "송혜교", "한효주", "사나 (트와이스)"],
    features: [
      "봄 웜톤 중 채도가 중간 정도이며 명도가 매우 높은 파스텔 톤 계열입니다.",
      "복숭아나 사과 속살처럼 뽀얗고 촉촉하며, 맑고 여린 인상이 특징입니다.",
      "어두운 그늘이 없는 가볍고 상큼하며 부드러운 색 배합이 베스트입니다."
    ],
    bestItems: {
      lip: ["크리니크 베이비 대리석 립 - 투명한 핑크빛 코랄", "롬앤 쥬시 래스팅 틴트 누디 피넛 - 은은하고 뽀얀 누드 살구피치", "페리페라 잉크 무드 글로이 틴트 손웜수수 - 여리여리한 물먹 코랄핑크"],
      shadow: ["데이지크 섀도우 팔레트 누드 포션 - 뽀얗고 포근한 실키 아이보리 & 살구 펄", "클리오 프로 아이 팔레트 코랄 토크 - 은은하고 화사한 살구 쉬머 조합"],
      blusher: ["크리니크 치크팝 멜론팝 - 물먹은 듯 맑은 코랄 피치의 정석", "로라메르시에 블러쉬 인퓨전 진저 - 은은하고 고급스러운 요구르트 빛 피치베이지"]
    },
    stylingTips: [
      "파스텔 살구, 피치 핑크, 바닐라 아이보리 등 화사하고 채도가 높지 않은 파스텔 톤을 메인으로 삼으세요.",
      "시폰, 리넨, 면 등 가볍고 바람이 잘 통하는 자연스러운 릴렉싱 핏의 패브릭이 맑은 피부를 잘 돋보이게 합니다.",
      "두꺼운 금속 가죽 장식을 최소화하고 가벼운 진주 귀걸이나 실리콘/로즈골드 레이어드를 가미해 여린 무드를 유지하세요."
    ],
    worstTips: [
      "강렬하고 차가운 리얼 실버, 스모키 스틸 블루, 짙은 마룬 계열은 얼굴에 다크서클을 비춰 어둡게 만듭니다.",
      "너무 쨍한 머스터드나 네온 그린은 스킨을 도드라져 보이게 하여 부자연스러울 수 있으니 피하세요."
    ]
  },
  "summer-light": {
    id: "summer-light",
    name: "여름 라이트",
    nameEn: "Summer Light",
    title: "여름 라이트 (Summer Light) 청량하고 투명한 쿨톤의 인생 섀도우 & 핑크 립스틱 추천",
    description: "라벤더와 부드러운 인디핑크가 가장 완벽하게 스며드는 여름 라이트! 이가리 메이크업 뺨치는 청순 여신 라인업과 쿨톤 최적화 코디 팁을 공개합니다.",
    keywords: ["여름 라이트", "여름쿨 라이트", "여름 라이트 립", "라벤더 블러셔", "여름쿨 패션", "여름 쿨톤"],
    bannerBg: "linear-gradient(135deg, #F5F8FF, #E4ECF8, #D8BFD8)",
    accentColor: "#5274A8",
    paletteColors: [
      { hex: "#E6E6FA", name: "페일 라벤더" },
      { hex: "#FFC0CB", name: "로즈 필로우" },
      { hex: "#B0C4DE", name: "스틸 아이스" },
      { hex: "#F5F5F5", name: "스노우 화이트" },
      { hex: "#D8BFD8", name: "라일락 오키드" },
      { hex: "#ADD8E6", name: "라이트 마린" }
    ],
    celebrities: ["손예진", "태연 (소녀시대)", "장원영 (아이브)", "아이린 (레드벨벳)"],
    features: [
      "여름 쿨톤 중 가장 명도가 높고 붉은 기와 푸른 기가 맑게 조화된 파스텔 톤입니다.",
      "시원하고 맑은 이슬을 머금은 꽃잎처럼 청초하며, 창백하기보다는 깨끗하고 청량한 투명함을 자랑합니다.",
      "매트하고 두꺼운 텍스처보다 얇고 물빛 어린 유리알 광택이 얼굴에 대단한 생기를 줍니다."
    ],
    bestItems: {
      lip: ["입생로랑 워터 스테인 612 - 여리여리하면서 선명한 핑크체리 물광", "롬앤 쥬시 래스팅 베어 그레이프 - 차분하고 뽀얀 물머금은 로즈 플럼", "어뮤즈 듀 틴트 꽃물 - 생기 넘치는 데일리 여름 쿨 핑크"],
      shadow: ["롬앤 베러 댄 아이즈 말린 라벤더 - 깨끗하고 뽀얀 연보라 베이스 섀도우", "웨이크메이크 소프트 블러링 아이 팔레트 생기 블러링 - 여쿨 정석 핑크 그라데이션"],
      blusher: ["선아(SUNA) 라벤더 치크 - 뽀얗고 쿨한 아기피부 라벤더 핑크", "크리니크 치크팝 팬지팝 - 투명하고 화사한 보랏빛 국화 광택블러셔"]
    },
    stylingTips: [
      "그레이시 화이트, 소프트 스카이 블루, 미스티 라벤더처럼 청량하고 먼지 한 줌 얹은 듯 차가운 파스텔 레이어링이 베스트입니다.",
      "새틴이나 린넨보다 올을 촘촘히 짠 소프트 울, 시폰 레이스 스타일이 깨끗한 이목구비를 더욱 세련되게 완성합니다.",
      "화이트 골드와 실버 액세서리는 여름 라이트의 피부 열감을 즉각 내려주는 구원템입니다. 볼드보다 미니멀한 라인을 추천해요."
    ],
    worstTips: [
      "황금빛 골드 골든로드, 웜 베이지 자켓, 올리브 카키색 코트는 여름 라이트의 안색을 누렇게 띄우는 황달 워스트 컬러입니다.",
      "묵직하고 무거운 다크 브라운 헤어 및 가죽 가방은 시원한 쿨톤의 무드를 무겁고 정적으로 보이게 합니다."
    ]
  },
  "summer-mute": {
    id: "summer-mute",
    name: "여름 뮤트",
    nameEn: "Summer Mute",
    title: "여름 뮤트 (Summer Mute) 오묘하고 고급스러운 모브 그레이 & 중명도 매트 메이크업",
    description: "차분하고 분위기 있는 가을 같은 우아함이 돋보이는 여름 뮤트! 말린 장미와 그레이시 올리브, 소장 가치 100% 모브 에디션을 탐구해 보세요.",
    keywords: ["여름 뮤트", "여중뮤", "여름 뮤트 립", "말린장미 틴트", "모브 섀도우", "여름 쿨톤 패션"],
    bannerBg: "linear-gradient(135deg, #E4ECF8, #D8C4D8, #C8B8D8)",
    accentColor: "#7A6052",
    paletteColors: [
      { hex: "#D8C4D8", name: "소프트 모브" },
      { hex: "#C8B8D8", name: "라벤더 미스트" },
      { hex: "#A9A9A9", name: "모스 그레이" },
      { hex: "#DB7093", name: "페일 로즈" },
      { hex: "#708090", name: "스킬 슬레이트" },
      { hex: "#BC8F8F", name: "로지 더스트" }
    ],
    celebrities: ["김태리", "정려원", "한소희", "전지현"],
    features: [
      "여름 쿨톤 중 채도가 가장 낮으며, 그레이시하고 탁한 기운(ash)이 고급스럽게 가미된 차분한 톤입니다.",
      "노란 기가 배제된 이지적인 미디엄 라벤더, 모브그레이, 말린 장미(MLBB)가 본래 스킨처럼 어우러집니다.",
      "쉬머나 글리터 메이크업보다는 보송하고 실키한 매트 질감이 고급스러운 세련미를 이끌어냅니다."
    ],
    bestItems: {
      lip: ["롬앤 제로 매트 립스틱 더스티 핑크 - 보송하고 뮤트한 쿨 핑크 브라운 말린로즈", "페리페라 잉크 더 벨벳 여주공식 - 자연스럽고 자두 빛 스며든 차분한 매트 무스", "라카 프루티 글램 틴트 콜드 - 오묘한 플럼빛 말린 장미"],
      shadow: ["에스쁘아 리얼 아이 팔레트 모브 미 - 뮤트하고 오묘한 인디핑크 & 퍼플 토프", "에뛰드 하우스 플레이 컬러 아이즈 더스티캣 - 다채롭고 부드러운 먼지 낀 묘한 브라운캣"],
      blusher: ["롬앤 베러 댄 치크 블루베리 칩 - 붉은기 없이 뽀얗고 자연스레 분위기를 살리는 뮤티드 퍼플", "로라메르시에 헤더 - 우아하고 고혹적인 모브 퍼플 브라운 베일"]
    },
    stylingTips: [
      "인디 피치핑크, 코코아 브라운, 애쉬 레이 그레이, 소프트 차콜 톤온톤 매칭이 분위기를 배가합니다.",
      "가공되지 않은 듯한 거친 리넨, 고급 실크 혼방 니트, 매트 자무드 가죽 자켓이 시크하고 도시적인 실루엣을 부각합니다.",
      "무광 실버, 화이트 골드, 혹은 조금 빈티지한 골동 느낌의 스모키 진주 스타일이 클래식한 조화를 이룹니다."
    ],
    worstTips: [
      "쨍함의 극치인 네온 핑크, 강렬한 형광 다홍색 립, 순수한 원색 보라는 얼굴 이목구비를 묻히게 만들고 밀려 보입니다.",
      "노란 기가 듬뿍 들어간 카라멜 라이트 브라운 염색모는 부석부석한 피부 결점을 강조할 수 있습니다."
    ]
  },
  "autumn-mute": {
    id: "autumn-mute",
    name: "가을 뮤트",
    nameEn: "Autumn Mute",
    title: "가을 뮤트 (Autumn Mute) 가을의 따스함과 은은한 애쉬베이지의 만남, 추천 템 대방출",
    description: "우아하고 차분한 소프트 웜톤이자 가을 뮤트! 올리브영 품절 사태의 코퍼 및 브라운 누드 립, 분위기 끝판왕 리브 패션 가이드를 추천합니다.",
    keywords: ["가을 뮤트", "갈뮤", "가을 뮤트 립", "베이지 블러셔", "골드 주얼리", "가을 웜톤 코디"],
    bannerBg: "linear-gradient(135deg, #FFF5E8, #F0D5B0, #D4936A)",
    accentColor: "#C4703A",
    paletteColors: [
      { hex: "#D4936A", name: "애쉬 시나몬" },
      { hex: "#F0D5B0", name: "올리브 오트밀" },
      { hex: "#D2B48C", name: "진저 허니" },
      { hex: "#8B8589", name: "웜 토프" },
      { hex: "#A0522D", name: "시에나 어스" },
      { hex: "#8F8FBC", name: "소프트 허브" }
    ],
    celebrities: ["제니 (블랙핑크)", "한효주", "신세경", "수영 (소녀시대)"],
    features: [
      "가을 웜톤 중 명도와 채도가 과하지 않은 미디엄 그레이시(소프트/덜)의 따스하고 우아한 톤입니다.",
      "살구 우유 브라운, 더스티 카멜, 빈티지 베이지, 올리브 카키가 자연스럽게 동화됩니다.",
      "반짝이는 유광 질감보다 벨벳이나 파우더리한 매트 텍스처가 지적인 귀티와 차분함을 선물합니다."
    ],
    bestItems: {
      lip: ["에스쁘아 노웨어 벨벳 카민 - 우아하게 스며드는 무디 로즈브라운", "맥(MAC) 멀잇오버 - 피치 누드 베이지 브라운의 가을 뮤트 교과서 벨벳립", "롬앤 제로 벨벳 틴트 그레인누드 - 누디하고 포근한 어스 베이지"],
      shadow: ["바비브라운 아이섀도우 토스트 - 따스하고 그윽함의 한 끗을 살려주는 진저 피치 베이지", "클리오 프로 아이 팔레트 아늑한 골목길 - 가을 고유의 음영을 부드럽게 레이어링하는 음영섀도우"],
      blusher: ["크리니크 치크팝 누드팝 - 미세한 미세 펄이 피부 윤광을 살려주는 내추럴 브라운살구 블러셔", "쓰리씨이(3CE) 무드레시피 누드 피치 - 텁텁함 일절 없이 보송하게 얹어지는 살구 스킨베이지"]
    },
    stylingTips: [
      "코코아 베이지, 오트밀 그레이, 올리브 그린 자켓을 메인으로 차분하고 부드러운 톤온톤 배색을 완성해 보세요.",
      "리넨 니트, 앙고라 코트, 코듀로이 셔츠 같은 따뜻하고 살짝 요철감이 있는 내추럴 소재가 최고의 아우라를 만듭니다.",
      "광이 없는 브러쉬드 머드 골드, 앤틱 브론즈, 우드 소재 주얼리를 믹스하면 극강의 내추럴 프렌치 시크를 풍길 수 있습니다."
    ],
    worstTips: [
      "푸른 기가 선명히 도는 화이트닝 선크임, 푸른 플럼 퍼플, 청량한 로얄 스카이 블루는 피부가 창백하고 아파 보입니다.",
      "고채도의 레몬 옐로우나 비비드 핫핑크는 옷만 둥둥 떠다니는 이질적인 현상이 발생합니다."
    ]
  },
  "autumn-deep": {
    id: "autumn-deep",
    name: "가을 딥",
    nameEn: "Autumn Deep",
    title: "가을 딥 (Autumn Deep) 매혹적인 버건디와 테라코타, 중후한 정통 가을 웜톤 패션 가이드",
    description: "웅장한 고혹미와 이국적인 다크 브라운이 베스트인 가을 딥(Autumn Deep/Dark)! 칠리 레드 립, 가을 아우터 코디 정보를 완벽 분석 정리 정보 포스팅.",
    keywords: ["가을 딥", "가을 웜톤 딥", "맥 칠리", "버건디 립스틱", "가을 아우터 코디", "웜톤 딥"],
    bannerBg: "linear-gradient(135deg, #FFF5E8, #C4703A, #8B4520)",
    accentColor: "#8B4520",
    paletteColors: [
      { hex: "#8B4520", name: "번트 오렌지" },
      { hex: "#800020", name: "올드 버건디" },
      { hex: "#4A2711", name: "딥 다크 초콜릿" },
      { hex: "#556B2F", name: "올리브 드랩" },
      { hex: "#B8860B", name: "골든 브론즈" },
      { hex: "#9E5B2F", name: "테라코타 클레이" }
    ],
    celebrities: ["효리 (이효리)", "화사 (마마무)", "박신혜", "민효린"],
    features: [
      "가을 웜톤 중 채도와 명도가 극단적으로 낮아 묵직하고 깊은 무드를 자아내는 다크 톤입니다.",
      "그윽하게 로스팅된 커피 브라운, 테라코타, 말린 주홍, 진한 단풍나무 색이 얼굴 윤곽을 잡아줍니다.",
      "음영 메이크업이 누구보다 잘 받으며 눈과 립에 확실한 대비 포인트를 주면 엄청난 퇴폐미와 매혹을 발산합니다."
    ],
    bestItems: {
      lip: ["맥(MAC) 칠리 - 가을 딥의 화룡점정인 톤다운된 가을 고추장 오렌지레드", "에스쁘아 꾸뛰르 립 플루이드 벨벳 문릿 - 딥 브릭 마룬 레드 벨벳 타투", "롬앤 제로 매트 립스틱 딥솔 - 핏빛을 살짝 가미해 오묘함을 내뿜는 딥 초콜릿레드"],
      shadow: ["쓰리씨이(3CE) 무드 레시피 오버테이크 - 붉은 브라운과 골드 쉬머가 가득 찬 정통 딥 팔레트", "에뛰드 매트 하우스 아몬드 라망 - 진득하고 고소한 코코아 아몬드 토스트 음영베이지"],
      blusher: ["나스(NARS) 스릴 - 웜 골드 글리터가 미세하게 박힌 테라코타 올지팝", "쓰리씨이 블러쉬 쿠션 로즈베이지 - 분위기가 우려 나오는 차분한 빈티지 레드 장미"]
    },
    stylingTips: [
      "테라코타 롱코트, 딥 버건디 수트, 머스타드 골드 올 니트 등 중후하고 깊은 색들의 고독한 레이어링을 시도해 보세요.",
      "트위드, 도톰한 가죽 스웨이드, 헤링본 모직 자켓이 가을 딥의 세련되고 고급스러운 부의 아우라를 연출합니다.",
      "매우 화려하고 빈티지한 골드 볼드 체인 주얼리나 황동, 이라 보석 스타일을 매치해도 묻히지 않고 환상적으로 소화합니다."
    ],
    worstTips: [
      "완전 가벼운 스노우 화이트 티셔츠, 파스텔 민트 자켓은 가을 딥의 안색을 둥둥 뜨게 만들어 매우 초라하게 보일 수 있습니다.",
      "은색의 리얼 실버 제품은 피부 위에서 유독 거칠고 차가워 조화를 깨뜨리는 주된 피해야 할 요소입니다."
    ]
  },
  "winter-bright": {
    id: "winter-bright",
    name: "겨울 브라이트",
    nameEn: "Winter Bright",
    title: "겨울 브라이트 (Winter Bright) 압도적 포스, 선명한 플럼 체리 립스틱 & 대비감 있는 페미닌 스타일링",
    description: "겨쿨의 진수, 원색과 플럼이 압도적으로 매력적인 겨울 브라이트! 세련된 실버 포인트 및 쿨톤 흑색 아우라 꿀팁 대방출.",
    keywords: ["겨울 브라이트", "겨쿨 브라이트", "맥 루비우", "겨울 쿨톤 립", "대비감 코디", "겨울 쿨톤 코디"],
    bannerBg: "linear-gradient(135deg, #0D1F3C, #5C0632, #1C0113)",
    accentColor: "#C80065",
    paletteColors: [
      { hex: "#BA0B50", name: "체리 루비" },
      { hex: "#1F005E", name: "로얄 인디고" },
      { hex: "#FF007F", name: "네온 마젠타" },
      { hex: "#000000", name: "인키 블랙" },
      { hex: "#00CCCC", name: "시안 블루" },
      { hex: "#FFFFFF", name: "퓨어 화이트" }
    ],
    celebrities: ["임지연", "김혜수", "지수 (블랙핑크)", "현아"],
    features: [
      "겨울 쿨톤 중 대비감이 뚜렷하며 원색에 가까운 맑고 눈부신 고채도 고명도/저명도 톤입니다.",
      "아이시한 화이트 베이스에 아주 딥한 블랙, 혹은 마젠타 핑크, 루비 레드를 얹었을 때 이목구비가 살아납니다.",
      "글로시하고 번쩍이는 매끄러운 텍스처, 혹은 아예 깔끔하고 미니멀한 가죽 선이 스며든 연출이 아름답습니다."
    ],
    bestItems: {
      lip: ["맥(MAC) 루비우 - 푸른 기가 흐르는 독보적인 정석 체리 아이코닉 레드", "롬앤 제로 매트 립스틱 미드나잇 - 섹시하고 시크한 다크 플럼 로즈", "웨이크메이크 워터 블러링 틴트 필리베리 - 선명하고 화라 가득한 네온 푸시아 핑크"],
      shadow: ["클리오 프로 아이 팔레트 에어 모브 체리 - 푸른 라일락빛과 다크 플럼 체리 그라데이션", "롬앤 베러 댄 아이즈 우유 시리즈 말린 스트로베리 - 뽀얀 아기 핑크 쿨 가이드"],
      blusher: ["크리니크 치크팝 플럼팝 - 쨍하게 빛나는 생기 백배 오키드 핑크 펄", "세잔느 블러셔 14호 라벤더 핑크 - 투명하고 시원한 쿨톤 플럼 보라피치"]
    },
    stylingTips: [
      "가장 극단적인 블랙 & 퓨어 화이트 정장 수트 위에 선명한 마젠타 핑크나 체리 숄더백으로 원 포인트를 주세요.",
      "매끄럽고 광택이 넘치는 실크 쉬폰, 애나멜 에나멜 레더 무스탕 코트, 혹은 아크릴 단조 미니 에디션이 베스트입니다.",
      "리얼 백금 플래티넘, 고광택 다이아몬드, 실버 체인을 화려하게 믹스해도 고급스럽게 본연의 카리스마로 지배합니다."
    ],
    worstTips: [
      "따뜻함을 갈구하는 버터 옐로우, 카라멜 카멜 코트, 구릿빛 브라운은 피부톤을 진흙탕처럼 탁하고 노랗게 만들며 인상을 죽입니다.",
      "애매하게 탁한 회그레이 베이지 배색은 겨울 브라이트 고유의 카리스마를 흐릿하고 아프게 보이도록 바꿉니다."
    ]
  },
  "winter-deep": {
    id: "winter-deep",
    name: "겨울 딥",
    nameEn: "Winter Deep",
    title: "겨울 딥 (Winter Deep) 치명적이고 매혹적인 버건디, 블랙 카리스마 & 시크 뷰티 노하우",
    description: "흑발이 신의 한 수인 백설공주 같은 겨울 딥(Winter Deep)! 분위기를 압도하는 다크 메이크업과 매끄러운 모노톤 슬림 핏 데일리 코디 가이드.",
    keywords: ["겨울 딥", "겨울 쿨톤 딥", "겨쿨 딥", "버건디 립", "블랙 패션", "겨울 쿨톤 인생템"],
    bannerBg: "linear-gradient(135deg, #1C0024, #001224, #1D1D1D)",
    accentColor: "#4A0033",
    paletteColors: [
      { hex: "#4A0033", name: "다크 블랙베리" },
      { hex: "#001A3D", name: "심해 블루" },
      { hex: "#2E0010", name: "루비 핏빛와인" },
      { hex: "#1A1A1A", name: "옵시디언 블랙" },
      { hex: "#EBEBEB", name: "아이시 실버그레이" },
      { hex: "#3B0054", name: "딥 미드나잇 퍼플" }
    ],
    celebrities: ["김옥빈", "아이린 (여름쿨 복합형)", "지효 (트와이스)", "서예지"],
    features: [
      "겨울 쿨톤 중 가장 깊고 무거우며, 검은 기운(Blackish)이 가미된 도시적이고 냉철하며 신비로운 톤입니다.",
      "칠흑 같은 밤하늘 블랙, 아주 어두운 청곤색, 딥 마룬, 플럼 버건디가 얼굴 선을 조각상처럼 또렷하게 조율해 줍니다.",
      "어설픈 그라데이션보다 정교하게 똑떨어지는 풀 립 라인과 깊이 있는 리퀴드 아이라이너 강조 메이크업이 베스트입니다."
    ],
    bestItems: {
      lip: ["샤넬 루쥬 알뤼르 렉스트레 874 - 다크 버건디 와인의 끝판왕", "롬앤 제로 매트 립스틱 비포 선셋 - 차분하고 지적인 다크 베리 로즈브라운", "에스쁘아 매트 무스 틴트 카본 - 압도적인 포스를 내는 핏빛 플럼 레드"],
      shadow: ["데이지크 섀도우 팔레트 베리 스무디 - 딥 오키드 라벤더 쿨 톤 음영 믹스", "바비브라운 모노 섀도우 체호프- 시크한 느낌을 채워주는 고혹적인 그레이 바이올렛"],
      blusher: ["어퓨 파스텔 블러셔 VL03 - 노란 안색을 이지적으로 환히 잡아주는 연보라 블러셔", "나스 Sin (씬) - 골드 코퍼 펄이 함유된 관능적인 자두 모브빛 블러셔"]
    },
    stylingTips: [
      "블랙 터틀넥에 다크 그레이 롱코트를 매치하고 볼드한 리얼 와이드 실버 네크리스로 시크의 극치를 장식해 보세요.",
      "가죽 트렌치 자켓, 탄탄하고 구김 없는 무거운 수트 울 실크 원단, 단단한 핏이 드러나는 울 가디건을 매치하면 우아함이 살아납니다.",
      "리얼 백금 주얼리, 옵시디언 가락지, 에메랄드 그린 포인트 큐빅 링 등 고가형의 냉정하고 클래식한 실버 액세서리를 제안합니다."
    ],
    worstTips: [
      "노란 기가 다분히 도는 따듯한 애쉬 골드, 베이지 염색, 주황 카라멜 가죽 자켓은 가히 겨울 딥에겐 최대치의 스킨 트러블을 도드라져 보이게 합니다.",
      "채도가 높은 파스텔 코랄 핑크나 오렌지 립은 이목구비를 지워버려서 환자 같은 인상으로 전락할 위험이 매우 높습니다."
    ]
  },
  "spring-warm": {
    id: "spring-warm",
    name: "봄 트루 / 웜",
    nameEn: "Warm Spring",
    title: "봄 트루/웜 (Warm Spring) 노란 햇살을 머금은 웜톤의 정석 & 생기발랄 코디 가이드",
    description: "노란 기가 감도는 따스한 황금빛 햇살이 가장 완벽하게 조화되는 봄 트루/웜! PCCS 라이트·브라이트 톤의 인생 코랄 립스틱, 살구 블러셔부터 골드 주얼리 매칭까지 500자 완벽 총정리 가이드입니다.",
    keywords: ["봄 트루", "봄 웜", "Warm Spring", "봄웜 립", "코랄 메이크업", "골드 주얼리", "퍼스널컬러 12타입"],
    bannerBg: "linear-gradient(135deg, #FFF0D6, #FED7AA, #FB923C)",
    accentColor: "#D97706",
    paletteColors: [
      { hex: "#F59E0B", name: "골든 옐로우" },
      { hex: "#FB923C", name: "망고 코랄" },
      { hex: "#F97316", name: "선셋 오렌지" },
      { hex: "#FBBF24", name: "해바라기 노랑" },
      { hex: "#84CC16", name: "스프링 라임" },
      { hex: "#FFFBEB", name: "바닐라 크림" }
    ],
    celebrities: ["아이유", "윤아 (소녀시대)", "웬디 (레드벨벳)", "츄 (CHUU)"],
    features: [
      "봄 웜톤의 중심 축으로, 노란 기(Yellow-base)가 맑고 따뜻하게 감도는 정통 웜톤입니다.",
      "PCCS 색체계에서 light(라이트), bright(브라이트), vivid(비비드) 중 웜한 색상들이 얼굴에 풍부한 생기와 밝은 혈색을 부여합니다.",
      "피부 본연의 황금빛 윤광이 살아있어 매트한 질감보다 촉촉하고 광택 있는 수분 메이크업이 환상적으로 어울립니다."
    ],
    bestItems: {
      lip: ["맥(MAC) 씨 쉬어(See Sheer) - 맑고 촉촉한 자몽 코랄 데일리 립의 교과서", "롬앤 쥬시 래스팅 틴트 쥬쥬브 - 자연스러운 대추 코랄 레드 광택", "페리페라 잉크 무드 글로이 틴트 웜고리즘 - 맑고 생기 넘치는 피치 코랄 틴트"],
      shadow: ["데이지크 섀도우 팔레트 웜 베이직 - 따뜻한 살구 피치와 골드 글리터의 완벽 조합", "클리오 프로 아이 팔레트 인투 레이스 - 부드러운 웜 브라운과 화사한 골드 쉬머"],
      blusher: ["크리니크 치크팝 멜론팝 - 수채화처럼 은은하고 사랑스러운 코랄 핑크", "네이처리퍼블릭 자몽 솜사탕 - 생기 가득한 자몽 살구빛 블러셔"]
    },
    stylingTips: [
      "크림 아이보리, 웜 베이지 바탕에 살구 피치, 망고 오렌지 포인트로 온화하고 사랑스러운 인상을 연출하세요.",
      "골드, 샴페인 골드, 옐로우 골드 주얼리가 피부의 따스한 광채를 극대화해 줍니다.",
      "린넨, 가벼운 니트, 코튼처럼 자연스러운 질감과 부드러운 드레이프 소재가 최고로 잘 어울립니다."
    ],
    worstTips: [
      "푸른 기가 감도는 쿨 핑크, 라벤더, 차가운 실버는 안색을 창백하고 흙빛으로 보이게 합니다.",
      "탁하고 짙은 블랙 모노톤이나 차콜 그레이 착장은 본연의 화사한 생기를 완전히 가려버릴 수 있습니다."
    ]
  },
  "summer-cool": {
    id: "summer-cool",
    name: "여름 트루 / 쿨",
    nameEn: "Cool Summer",
    title: "여름 트루/쿨 (Cool Summer) 푸른빛 청량함과 깨끗한 이슬 감성 & 쿨톤 메이크업 가이드",
    description: "블루 언더톤의 시원함이 피부의 붉은 기와 노란 기를 완벽하게 정돈해 주는 여름 트루/쿨! 스카이블루, 쿨 핑크, 라벤더 팔레트와 실버 주얼리 매칭 팁을 500자 정밀 분석으로 전해드립니다.",
    keywords: ["여름 트루", "여름 쿨", "Cool Summer", "여쿨 립", "쿨핑크 블러셔", "라벤더 섀도우", "여름 쿨톤 코디"],
    bannerBg: "linear-gradient(135deg, #EFF6FF, #DBEAFE, #93C5FD)",
    accentColor: "#2563EB",
    paletteColors: [
      { hex: "#3B82F6", name: "스카이 블루" },
      { hex: "#60A5FA", name: "아이스 블루" },
      { hex: "#A855F7", name: "페일 라벤더" },
      { hex: "#EC4899", name: "쿨 핑크" },
      { hex: "#94A3B8", name: "스틸 그레이" },
      { hex: "#F8FAFC", name: "스노우 화이트" }
    ],
    celebrities: ["손예진", "태연 (소녀시대)", "이영애", "김고은"],
    features: [
      "여름 쿨톤의 정석으로, 푸른 기(Blue-base)의 시원함이 독보적인 청량감을 선사하는 타입입니다.",
      "PCCS 색체계에서 light(라이트), soft(소프트), bright(브라이트) 구간 중 블루와 퍼플 언더톤이 안색을 매우 깨끗하고 투명하게 정돈합니다.",
      "인위적인 두꺼운 커버보다 얇고 투명한 수채화 같은 텍스처와 은은한 유리알 광택이 베스트입니다."
    ],
    bestItems: {
      lip: ["롬앤 쥬시 래스팅 틴트 베어 그레이프 - 차분하고 맑은 쿨 로즈 모브 틴트", "라카 프루티 글램 틴트 콜드 - 청량하고 선명한 쿨 베리 핑크", "디올 어딕트 립 글로우 007 라즈베리 - 이슬 머금은 촉촉한 쿨 라즈베리"],
      shadow: ["롬앤 베러 댄 아이즈 말린 라벤더 - 깨끗하고 뽀얀 쿨 라벤더 음영 팔레트", "웨이크메이크 소프트 블러링 아이 팔레트 생기 블러링 - 여쿨 정석 핑크 그라데이션"],
      blusher: ["크리니크 치크팝 팬지팝 - 노란 기를 한 번에 지워주는 은은한 보랏빛 국화 치크", "롬앤 베러 댄 치크 블루베리 칩 - 뽀얗고 자연스럽게 올라오는 뮤트 라벤더 핑크"]
    },
    stylingTips: [
      "스카이 블루 셔츠, 라벤더 카디건, 소프트 그레이 슬랙스로 시원하고 세련된 도시적 무드를 완성하세요.",
      "반드시 화이트 골드, 플래티넘, 유광 실버 주얼리를 매치하여 맑은 피부 톤을 극대화하세요.",
      "쉬폰, 실크, 소프트 코튼 등 부드럽게 흐르는 섬세한 소재가 여름 트루 쿨톤의 청초함을 살려줍니다."
    ],
    worstTips: [
      "오렌지, 머스타드, 카멜, 골드 등 노란 기 가득한 웜톤 계열은 피부를 누렇게 띄우는 워스트 컬러입니다.",
      "너무 짙은 황동색 헤어 염색이나 브라운 렌즈는 쿨톤 고유의 투명한 인상을 흐려놓습니다."
    ]
  },
  "autumn-warm": {
    id: "autumn-warm",
    name: "가을 트루 / 웜",
    nameEn: "Warm Autumn",
    title: "가을 트루/웜 (Warm Autumn) 풍성한 단풍과 그윽한 테라코타 & 클래식 패션 가이드",
    description: "황금빛 들판과 가을 단풍의 따뜻하고 풍성한 깊이감을 자랑하는 가을 트루/웜! 칠리 레드 립, 호박 카멜 코디, 앤틱 골드 주얼리까지 500자 완벽 총정리 추천 가이드입니다.",
    keywords: ["가을 트루", "가을 웜", "Warm Autumn", "맥 칠리", "테라코타 립", "카멜 코트", "가을 웜톤 코디"],
    bannerBg: "linear-gradient(135deg, #FEF3C7, #FDE68A, #D97706)",
    accentColor: "#B45309",
    paletteColors: [
      { hex: "#B45309", name: "테라코타 오렌지" },
      { hex: "#78350F", name: "골든 초콜릿" },
      { hex: "#D97706", name: "펌킨 옐로우" },
      { hex: "#451A03", name: "딥 브라운" },
      { hex: "#65A30D", name: "웜 카키" },
      { hex: "#9A3412", name: "브릭 버건디" }
    ],
    celebrities: ["이효리", "제니 (블랙핑크)", "신세경", "수애"],
    features: [
      "가을 웜톤의 본류이자 정석으로, 깊고 풍부한 옐로우 언더톤(Yellow-base)이 주는 그윽함이 돋보입니다.",
      "PCCS 색체계에서 strong(스트롱), deep(딥), dull(덜) 영역 중 따스하고 무르익은 컬러들이 우아하고 지적인 분위기를 만듭니다.",
      "광택보다는 벨벳, 파우더리한 매트 텍스처와 자연스러운 음영 메이크업이 고혹적인 아우라를 완성합니다."
    ],
    bestItems: {
      lip: ["맥(MAC) 칠리 - 가을 웜톤의 영원한 베스트셀러 브릭 오렌지레드", "롬앤 제로 매트 립스틱 실루엣 - 포근하고 부드러운 말린 마르살라 로즈", "에스쁘아 꾸뛰르 립 플루이드 벨벳 문릿 - 깊이감 있는 칠리 브라운 무스"],
      shadow: ["3CE 무드 레시피 오버테이크 - 단풍빛 브릭 베이지와 카키 브라운의 정석 음영", "클리오 프로 아이 팔레트 아늑한 골목길 - 은은하고 따뜻한 가을 음영 컬러 조합"],
      blusher: ["3CE 무드 레시피 로즈 베이지 - 차분하고 분위기 있는 빈티지 말린 장미빛 블러셔", "로라메르시에 블러쉬 인퓨전 진저 - 은은하고 고급스러운 요구르트 살구 베이지"]
    },
    stylingTips: [
      "카멜 트렌치코트, 테라코타 니트, 올리브 카키 팬츠 등 자연의 색채를 톤온톤으로 고급스럽게 매칭하세요.",
      "앤틱 골드, 브론즈, 우드 소재의 볼드한 액세서리가 우아한 기품을 더욱 살려줍니다.",
      "스웨이드, 코듀로이, 캐시미어, 트위드 등 질감이 도톰하고 따뜻한 패브릭이 찰떡궁합입니다."
    ],
    worstTips: [
      "형광빛이 도는 네온 핑크, 차가운 아이시 블루, 마젠타 퍼플은 얼굴을 흙빛으로 칙칙하게 만듭니다.",
      "극단적으로 차가운 리얼 실버 주얼리는 피부 위에서 겉돌며 조화를 깨뜨립니다."
    ]
  },
  "winter-cool": {
    id: "winter-cool",
    name: "겨울 트루 / 쿨",
    nameEn: "Cool Winter",
    title: "겨울 트루/쿨 (Cool Winter) 독보적인 냉미녀의 카리스마 & 블랙 & 마젠타 스타일링",
    description: "푸른 기의 극치와 흑백의 높은 대비감이 연출하는 압도적인 도회적 아우라! 겨울 트루/쿨의 체리 루비 레드 립, 퓨어 블랙 정장 수트, 플래티넘 주얼리 500자 정밀 스타일 가이드.",
    keywords: ["겨울 트루", "겨울 쿨", "Cool Winter", "겨쿨 립", "루비우", "블랙 수트", "겨울 쿨톤 메이크업"],
    bannerBg: "linear-gradient(135deg, #1E1B4B, #312E81, #1E3A8A)",
    accentColor: "#1E3A8A",
    paletteColors: [
      { hex: "#1E3A8A", name: "네이비 인디고" },
      { hex: "#831843", name: "마젠타 퍼플" },
      { hex: "#0284C7", name: "아이스 사파이어" },
      { hex: "#000000", name: "피트 블랙" },
      { hex: "#9333EA", name: "바이올렛 글램" },
      { hex: "#F1F5F9", name: "플래티넘 아이스" }
    ],
    celebrities: ["김혜수", "임지연", "서예지", "카리나 (에스파)"],
    features: [
      "겨울 쿨톤의 정석이자 중심으로, 푸른 기(Blue-base)의 차가움과 높은 명도 대비(Contrast)가 이목구비를 또렷하게 강조합니다.",
      "PCCS 색체계에서 vivid(비비드), deep(딥), dark(다크), icy pale(페일) 영역을 아우르며, 피부의 노란 기를 완전히 없애 투명한 도회적 인상을 줍니다.",
      "애매한 그라데이션보다 깔끔하고 정교한 선과 포인트 립을 살리는 원 포인트 메이크업이 압도적인 세련미를 뽐냅니다."
    ],
    bestItems: {
      lip: ["맥(MAC) 루비우 - 푸른 기가 흐르는 독보적인 쿨 체리 레드 립스틱의 정석", "샤넬 루쥬 알뤼르 벨벳 66 - 도도하고 세련된 쿨 딥 베리 레드", "롬앤 제로 매트 립스틱 미드나잇 - 시크한 무드를 연출하는 다크 플럼 와인"],
      shadow: ["롬앤 베러 댄 아이즈 우유 시리즈 말린 스트로베리 - 뽀얗고 쿨한 아이시 핑크 베이스", "클리오 프로 아이 팔레트 에어 모브 체리 - 다크 플럼과 차가운 실버 펄의 환상적인 조화"],
      blusher: ["크리니크 치크팝 플럼팝 - 맑고 화사하게 얼굴빛을 밝히는 푸른기 도는 오키드 핑크", "세잔느 블러셔 14호 라벤더 핑크 - 투명한 유리알 광채의 수채화 쿨 치크"]
    },
    stylingTips: [
      "선명한 제트 블랙과 퓨어 화이트의 극명한 대비 룩에 선명한 마젠타 숄더백이나 스카프로 원 포인트를 주세요.",
      "리얼 백금 플래티넘, 고광택 다이아몬드, 화이트 골드, 은빛 체인이 본연의 카리스마를 극대화합니다.",
      "가죽 재킷, 단단한 수트 울, 매끄러운 새틴 등 라인이 정갈하고 칼각이 잡힌 모던한 실루엣이 베스트입니다."
    ],
    worstTips: [
      "카멜, 오렌지, 골드 브라운, 머스타드 등 노란 기 가득한 웜톤 컬러는 피부를 칙칙하고 흙빛으로 만듭니다.",
      "어중간하게 탁한 회색빛 베이지나 더스티 카키는 고유의 선명한 카리스마를 흐리게 하므로 피하세요."
    ]
  }
};

// Map aliases for inverted slugs & alternate URLs
LONGTAIL_PAGES["warm-spring"] = LONGTAIL_PAGES["spring-warm"];
LONGTAIL_PAGES["cool-summer"] = LONGTAIL_PAGES["summer-cool"];
LONGTAIL_PAGES["warm-autumn"] = LONGTAIL_PAGES["autumn-warm"];
LONGTAIL_PAGES["cool-winter"] = LONGTAIL_PAGES["winter-cool"];
LONGTAIL_PAGES["light-spring"] = LONGTAIL_PAGES["spring-light"];
LONGTAIL_PAGES["bright-spring"] = LONGTAIL_PAGES["spring-bright"];
LONGTAIL_PAGES["light-summer"] = LONGTAIL_PAGES["summer-light"];
LONGTAIL_PAGES["mute-summer"] = LONGTAIL_PAGES["summer-mute"];
LONGTAIL_PAGES["mute-autumn"] = LONGTAIL_PAGES["autumn-mute"];
LONGTAIL_PAGES["deep-autumn"] = LONGTAIL_PAGES["autumn-deep"];
LONGTAIL_PAGES["bright-winter"] = LONGTAIL_PAGES["winter-bright"];
LONGTAIL_PAGES["deep-winter"] = LONGTAIL_PAGES["winter-deep"];

interface LongtailProps {
  pageId: string;
  onBack: () => void;
  lang: "ko" | "en";
  setLang: (l: "ko" | "en") => void;
}

export default function PersonalColorLongtail({ pageId, onBack, lang, setLang }: LongtailProps) {
  const pageData = LONGTAIL_PAGES[pageId];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Update Document Title and Meta tags dynamically for SEO discovery in Client-side
    if (pageData) {
      document.title = `${pageData.title} | InSelf Color`;
      // Find or create meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", pageData.description);
      } else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = pageData.description;
        document.head.appendChild(meta);
      }
      
      // Dynamic Keywords for spiders
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", pageData.keywords.join(", "));
      } else {
        const meta = document.createElement("meta");
        meta.name = "keywords";
        meta.content = pageData.keywords.join(", ");
        document.head.appendChild(meta);
      }
    }
  }, [pageId, pageData]);

  if (!pageData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-[#FAF6F0]" id="not-found-section">
        <AlertTriangle className="w-16 h-16 text-yellow-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">페이지를 찾을 수 없습니다</h2>
        <p className="text-gray-500 mb-6 font-sans">요청하신 퍼스널 컬러 롱테일 정보 페이지가 존재하지 않습니다.</p>
        <button onClick={onBack} className="px-6 py-3 bg-[#5A483E] text-white rounded-full font-medium shadow hover:scale-105 transition">
          메인 화면으로 가기
        </button>
      </div>
    );
  }

  const handleShareResult = () => {
    const textMsg = lang === "ko"
      ? `[InSelf Color] ${pageData.name} 스타일링 & 추천 인생템 가이드! 정보가 아주 유용해요.\n👉 https://inselfcolor.pages.dev/${pageData.id}`
      : `[InSelf Color] ${pageData.nameEn} Styling & Life-Makeup Guide is out!\n👉 https://inselfcolor.pages.dev/${pageData.id}`;
    
    if (navigator.share) {
      navigator.share({
        title: pageData.title,
        text: textMsg,
        url: `https://inselfcolor.pages.dev/${pageData.id}`
      }).catch(() => {});
    } else if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(textMsg).then(() => {
        alert(lang === "ko" ? "클립보드에 가이드 주소가 복사되었습니다 ✓" : "Link copied to clipboard ✓");
      });
    } else {
      alert(lang === "ko" ? "공유 기능이 지원되지 않는 브라우저입니다" : "Sharing not supported in this browser");
    }
  };

  const renderCosmeticItem = (item: string, idx: number, prefix: string) => {
    const parts = item.split(" - ");
    const productName = parts[0] || item;
    const description = parts[1] || "";
    // Clean search token for better accuracy on Olive Young search engine
    const cleanSearchQuery = productName.replace(/\s*\(.*?\)\s*/g, " ").replace("맥(MAC)", "맥").trim();
    const oliveYoungSearchUrl = `https://www.oliveyoung.co.kr/store/search/getSearchList.do?query=${encodeURIComponent(cleanSearchQuery)}`;

    return (
      <div 
        key={idx} 
        id={`${prefix}-item-${idx}`}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-neutral-50/75 hover:bg-neutral-100 border border-neutral-100 rounded-xl transition-all duration-150"
      >
        <div className="flex-1">
          <div className="font-bold text-[#3c3029] text-[13px] tracking-tight">{productName}</div>
          {description && (
            <div className="text-gray-500 text-[11.5px] mt-1.5 leading-relaxed font-normal">{description}</div>
          )}
        </div>
        <a
          href={oliveYoungSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-[#03C75A]/8 hover:bg-[#03C75A]/15 text-[#028C3E] rounded-lg text-[11px] font-black transition shrink-0 active:scale-95"
          title={`${productName} 올리브영 실시간 가격 및 구매평 확인 💚`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{lang === "ko" ? "올리브영 쇼핑" : "Olive Young"}</span>
        </a>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-[#3c3029] pb-20 font-sans leading-relaxed" id={`seo-page-${pageData.id}`}>
      {/* Dynamic SEO Top Bar */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-[#FAF0E6] px-4 py-3.5 flex items-center justify-between" id="seo-header">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-xs font-semibold text-[#5A483E] hover:opacity-80 transition"
          id="btn-back-main"
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === "ko" ? "홈으로" : "Home"}
        </button>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setLang(lang === "ko" ? "en" : "ko")}
            className="text-xs px-2.5 py-1 rounded-md border border-[#FAF0E6] font-medium hover:bg-neutral-50 transition"
            id="btn-lang-toggle"
          >
            {lang === "ko" ? "English" : "한국어"}
          </button>
          
          <button 
            onClick={handleShareResult}
            className="flex items-center gap-1 text-xs px-3 py-1.5 bg-[#FAF0E6] text-[#5A483E] rounded-full hover:opacity-90 font-medium transition"
            id="btn-share-longtail"
          >
            <Share2 className="w-3.5 h-3.5" />
            {lang === "ko" ? "공유" : "Share"}
          </button>
        </div>
      </header>

      {/* 320x50 Top Page Banner (DAN-keG6pMHM3YLMdQa4) */}
      <KakaoTopBanner style={{ margin: "12px 0 8px 0" }} />

      {/* Hero Visual Area with Beautiful SEO optimized Headers */}
      <section 
        style={{ background: pageData.bannerBg }} 
        className="w-full text-center py-16 px-6 relative overflow-hidden flex flex-col items-center justify-center text-white"
        id="hero-banner-section"
      >
        <span className="bg-white/25 backdrop-blur-md text-[11px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3 inline-block">
          {lang === "ko" ? "12타입 퍼스널 컬러 디렉토리" : "12-Type Personal Color directory"}
        </span>
        <h1 className="text-3xl md:text-4xl font-black mb-4 select-none tracking-tight leading-tight max-w-4xl" id="seo-main-h1">
          {lang === "ko" ? pageData.title : `${pageData.nameEn} Ultimate Styling & Cosmetic Guide`}
        </h1>
        <p className="text-sm md:text-base opacity-95 max-w-2xl font-light leading-relaxed mb-6" id="seo-hero-p">
          {pageData.description}
        </p>

        {/* Diagnostic CTA Box - Extremely high conversion element to get visitors to use the tool */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl text-[#3c3029] max-w-md w-full flex flex-col items-center transform scale-100 hover:scale-102 transition duration-300" id="diagnosis-cta-card">
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">InSelf Color AI</span>
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-1">
            {lang === "ko" ? "실제 내 얼굴로 퍼스널 컬러 진단하기" : "Analyze Your Actual Face in 10s"}
          </h3>
          <p className="text-xs text-center text-gray-500 mb-4 max-w-xs leading-normal">
            {lang === "ko" ? "무설치 / 노로그인! 스피디 인공지능 PCCS 기술 기반 분석기" : "Privacy first, instant scan. No registration required."}
          </p>
          <button 
            onClick={onBack} 
            className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl text-xs font-black tracking-wide shadow-md hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            id="btn-cta-go-test"
          >
            {lang === "ko" ? "👉 10초 만에 인공지능 무료 자가진단 시작" : "👉 Run Free AI Self Tone Scan Now"}
          </button>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-5 py-12 grid grid-cols-1 md:grid-cols-3 gap-8" id="seo-main-content">
        {/* Left Column - Characteristics & Palette Colors */}
        <div className="md:col-span-1 space-y-6" id="seo-left-column">
          {/* Key Color Swatches */}
          <div className="bg-white border border-[#FAF0E6] rounded-2xl p-5 shadow-sm" id="palette-card">
            <h3 className="text-sm font-extrabold text-[#5A483E] uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-[#FAF0E6] pb-2">
              <Palette className="w-4 h-4 text-amber-600" />
              {lang === "ko" ? "🎨 대표 시그니처 컬러" : "🎨 Signature Swatches"}
            </h3>
            <div className="grid grid-cols-2 gap-3" id="swatch-grid">
              {pageData.paletteColors.map((color, idx) => (
                <div key={idx} className="flex flex-col items-center text-center" id={`swatch-${idx}`}>
                  <div 
                    style={{ backgroundColor: color.hex }} 
                    className="w-full aspect-square rounded-xl shadow-inner border border-black/5"
                  />
                  <span className="text-[11px] font-bold mt-1.5 text-gray-700 truncate w-full px-1">{color.name}</span>
                  <span className="text-[9px] font-mono text-gray-400 select-all uppercase">{color.hex}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Celebrity Fit Info */}
          <div className="bg-white border border-[#FAF0E6] rounded-2xl p-5 shadow-sm" id="celebrity-card">
            <h3 className="text-sm font-extrabold text-[#5A483E] uppercase tracking-wider mb-3 flex items-center gap-2 border-b border-[#FAF0E6] pb-2">
              <User className="w-4 h-4 text-amber-600" />
              {lang === "ko" ? "✨ 대표 시즌 연예인" : "✨ Celeb Inspiration"}
            </h3>
            <ul className="space-y-2 text-xs font-medium text-gray-700" id="celeb-list">
              {pageData.celebrities.map((celeb, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-[#FAF6F0] p-2.5 rounded-lg" id={`celeb-item-${idx}`}>
                  <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  {celeb}
                </li>
              ))}
            </ul>
            <p className="text-[10px] text-gray-400 text-center mt-3 leading-normal">
              {lang === "ko" ? "※ 이미지 유추 분석 및 공식 발표 등을 토대로 가공된 대표 참고 모델입니다." : "Based on verified visual tone characteristics."}
            </p>
          </div>
        </div>

        {/* Right Columns - Styling, Cosmetics, Best & Worst deep dive */}
        <div className="md:col-span-2 space-y-6" id="seo-right-column">
          {/* Key Characteristics */}
          <div className="bg-white border border-[#FAF0E6] rounded-2xl p-6 shadow-sm" id="key-characteristics-box">
            <h2 className="text-lg font-extrabold text-gray-900 border-b border-[#FAF0E6] pb-3 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              {lang === "ko" ? `${pageData.name} 타입의 독보적 매력 분석` : `Unique Visual Charm of ${pageData.nameEn}`}
            </h2>
            <ul className="space-y-3.5 text-xs text-gray-600 font-medium" id="features-list">
              {pageData.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 leading-relaxed" id={`feature-item-${idx}`}>
                  <div className="w-5 h-5 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 font-bold shrink-0 text-xs shadow-inner">
                    💡
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 300x250 Middle Page Banner (DAN-yIR46FWNSqGqGUfK) */}
          <KakaoMiddleBanner style={{ margin: "20px 0" }} />

          {/* Cosmetic Recommendations */}
          <div className="bg-white border border-[#FAF0E6] rounded-2xl p-6 shadow-sm" id="cosmetics-box">
            <h2 className="text-lg font-extrabold text-gray-900 border-b border-[#FAF0E6] pb-3 mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-600" />
              {lang === "ko" ? "💄 인생 화장품 추천 (립/아이섀도우/블러셔)" : "💄 Makeup Cabinet Life Items"}
            </h2>
            
            <div className="space-y-6" id="cosmetics-list">
              {/* LIP */}
              <div id="cosmetic-lip">
                <h4 className="text-xs font-black text-amber-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  💄 {lang === "ko" ? "베스트 리퀴드 립 / 립스틱" : "Best Lips & Tints"}
                </h4>
                <div className="space-y-2" id="lip-items">
                  {pageData.bestItems.lip.map((item, idx) => renderCosmeticItem(item, idx, "lip"))}
                </div>
              </div>

              {/* EYELASH / SHADOW */}
              <div id="cosmetic-shadow">
                <h4 className="text-xs font-black text-amber-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  👁️ {lang === "ko" ? "아이섀도우 & 글리터 팔레트" : "Eye Shadow & Glitters"}
                </h4>
                <div className="space-y-2" id="shadow-items">
                  {pageData.bestItems.shadow.map((item, idx) => renderCosmeticItem(item, idx, "shadow"))}
                </div>
              </div>

              {/* BLUSHER */}
              <div id="cosmetic-blusher">
                <h4 className="text-xs font-black text-amber-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  🌸 {lang === "ko" ? "블러셔 (치크팝 에디션 등)" : "Cheeks & Blushers"}
                </h4>
                <div className="space-y-2" id="blusher-items">
                  {pageData.bestItems.blusher.map((item, idx) => renderCosmeticItem(item, idx, "blusher"))}
                </div>
              </div>
            </div>
          </div>

          {/* Styling & Coordination */}
          <div className="bg-white border border-[#FAF0E6] rounded-2xl p-6 shadow-sm" id="styling-box">
            <h2 className="text-lg font-extrabold text-gray-900 border-b border-[#FAF0E6] pb-3 mb-4 flex items-center gap-2">
              <Shirt className="w-5 h-5 text-amber-600" />
              {lang === "ko" ? "👗 스타일 코디 및 워드로브 가이드" : "👗 Fashion Styling & Wardrobe Rules"}
            </h2>
            
            <div className="space-y-4" id="styling-list">
              <div>
                <h4 className="text-xs font-black text-[#5A483E] mb-2 flex items-center gap-1">
                  <Check className="w-4 h-4 text-green-600" />
                  {lang === "ko" ? "어울리는 코디 연출 요령" : "Best Coordination Secrets"}
                </h4>
                <ul className="space-y-2 text-xs text-gray-600" id="best-style-list">
                  {pageData.stylingTips.map((tip, idx) => (
                    <li key={idx} className="flex gap-2" id={`best-style-item-${idx}`}>
                      <span className="text-emerald-500 font-extrabold">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-4 border-t border-[#FAF0E6]" id="worst-style-section">
                <h4 className="text-xs font-black text-red-800 mb-2 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  {lang === "ko" ? "피해가야 할 가해자(워스트) 컬러 스타일" : "Worst Colors & Traps to Avoid"}
                </h4>
                <ul className="space-y-2 text-xs text-gray-600" id="worst-style-list">
                  {pageData.worstTips.map((tip, idx) => (
                    <li key={idx} className="flex gap-2" id={`worst-style-item-${idx}`}>
                      <span className="text-red-500 font-extrabold">✕</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 12-Type Directory Quick Navigation Grid */}
          <div className="bg-white border border-[#FAF0E6] rounded-2xl p-6 shadow-sm" id="all-12-types-directory">
            <h3 className="text-base font-extrabold text-[#3c3029] mb-3 flex items-center gap-2">
              <span>🌈</span>
              {lang === "ko" ? "12가지 전체 퍼스널 컬러 타입 탐색하기" : "Explore All 12 Personal Color Types"}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              {lang === "ko"
                ? "각 타입별 500자 상세 분석 가이드, 시그니처 팔레트, 메이크업 인생템 및 워스트 색상을 확인해 보세요."
                : "Browse detailed 500-character guides, signature palettes, life items, and styling tips for each type."}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {[
                { id: "spring-light", label: "봄 라이트", labelEn: "Spring Light", color: "#FFDAB9" },
                { id: "spring-bright", label: "봄 브라이트", labelEn: "Spring Bright", color: "#FF6B35" },
                { id: "spring-warm", label: "봄 트루/웜", labelEn: "Warm Spring", color: "#D97706" },
                { id: "summer-light", label: "여름 라이트", labelEn: "Summer Light", color: "#93C5FD" },
                { id: "summer-cool", label: "여름 트루/쿨", labelEn: "Cool Summer", color: "#2563EB" },
                { id: "summer-mute", label: "여름 뮤트", labelEn: "Summer Mute", color: "#A89088" },
                { id: "autumn-mute", label: "가을 뮤트", labelEn: "Autumn Mute", color: "#C4703A" },
                { id: "autumn-warm", label: "가을 트루/웜", labelEn: "Warm Autumn", color: "#B45309" },
                { id: "autumn-deep", label: "가을 딥", labelEn: "Autumn Deep", color: "#8B4520" },
                { id: "winter-cool", label: "겨울 트루/쿨", labelEn: "Cool Winter", color: "#1E3A8A" },
                { id: "winter-bright", label: "겨울 브라이트", labelEn: "Winter Bright", color: "#C80065" },
                { id: "winter-deep", label: "겨울 딥", labelEn: "Winter Deep", color: "#4A0033" },
              ].map((t) => {
                const isActive = pageData.id === t.id;
                return (
                  <a
                    key={t.id}
                    href={`/types/${t.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      window.history.pushState(null, "", `/types/${t.id}`);
                      window.dispatchEvent(new PopStateEvent("popstate"));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition ${
                      isActive
                        ? "bg-[#FAF0E6] border-[#D97706] text-[#3c3029] shadow-sm ring-1 ring-[#D97706]"
                        : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 shadow-inner"
                      style={{ backgroundColor: t.color }}
                    />
                    <span className="truncate">{lang === "ko" ? t.label : t.labelEn}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Extra Bottom Diagnostic CTA */}
          <div className="bg-gradient-to-r from-[#FAF0E6] to-[#FFEBCD] rounded-2xl p-6 text-center shadow-inner" id="concluding-analysis-cta">
            <h3 className="text-base font-black text-[#5A483E] mb-2">
              {lang === "ko" ? "지금, 내 퍼스널 컬러도 정밀 진단해 보고 싶다면?" : "Want to know your exact color tone?"}
            </h3>
            <p className="text-xs text-[#7A6052] mb-4 max-w-xl mx-auto leading-relaxed">
              {lang === "ko" 
                ? "InSelf Color 웹카메라 및 사진 파일 인공지능 분석기는 독보적인 PCCS 수치 추출 및 인공지능 피부 명도 검증 알고리즘으로 단 10초 만에 완벽한 카드를 생성해 드립니다."
                : "Our AI scanner leverages unique lighting calibration & facial skin analysis with Japanese PCCS specifications to curate your real-time aesthetic ID report."}
            </p>
            <button 
              onClick={onBack} 
              className="px-8 py-3.5 bg-[#5A483E] text-white hover:bg-[#45362E] text-xs font-bold font-sans rounded-full shadow hover:scale-102 transition"
              id="btn-bottom-test-cta"
            >
              {lang === "ko" ? "👉 무료 10초 퍼스널 컬러 진단 기계 켜기" : "👉 Deploy Free AI Cam Scanner"}
            </button>
          </div>
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="w-full text-center text-[10px] text-gray-400 border-t border-[#FAF0E6] pt-8 mt-5" id="seo-footer-credit">
        <p>© 2026 InSelf Color AI Indexer. All style recommendations are curating by visual spectrum analytics.</p>
      </footer>
    </div>
  );
}
