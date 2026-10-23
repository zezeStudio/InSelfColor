import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.resolve(rootDir, "public");

function ensureDir(p) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
}

// 12 Types Data
const TYPES = [
  {
    id: "spring-light",
    name: "봄 라이트 (Spring Light)",
    nameEn: "Spring Light",
    badge: "SPRING LIGHT",
    color: "#E8905A",
    title: "봄 라이트 (Spring Light) 복숭아처럼 사랑스럽고 화사한 화장품 추천 & 데일리 룩 북",
    desc: "요정 같은 맑고 뽀얀 피부톤의 봄 라이트! 롬앤, 멜론팝 등 필수 소장 인생 화장품 라인업부터 포근하고 부드러운 파스텔 스타일링 비법을 500자 정밀 가이드로 소개합니다.",
    swatches: [
      { hex: "#FFDAB9", name: "피치 파우더" },
      { hex: "#FFE4E1", name: "미스티 로즈" },
      { hex: "#FAF0E6", name: "리넨 아이보리" },
      { hex: "#FFFDD0", name: "파스텔 크림" },
      { hex: "#AFEEEE", name: "밀키 터코이즈" },
      { hex: "#FFF0F5", name: "라벤더 가든" }
    ],
    items: [
      { title: "💄 립: 크리니크 베이비 대리석 & 롬앤 누디 피넛", desc: "투명하고 뽀얀 살구 피치 누드 글로우 틴트가 맑은 혈색을 부여합니다." },
      { title: "👁️ 섀도우: 데이지크 누드 포션 & 클리오 코랄 토크", desc: "포근한 실키 아이보리와 살구 쉬머 펄 조합이 눈가를 밝힙니다." },
      { title: "🌸 블러셔: 크리니크 멜론팝 & 로라메르시에 진저", desc: "물먹은 듯 맑은 복숭아빛 피치 코랄 치크가 필수템입니다." }
    ],
    worst: "차가운 리얼 실버, 스모키 스틸 블루, 짙은 마룬 계열은 얼굴에 다크서클을 비춰 어둡게 만듭니다.",
    styling: "파스텔 살구, 피치 핑크, 바닐라 아이보리 등 채도 낮은 화사한 파스텔 톤 셔츠와 가벼운 로즈골드 주얼리를 매칭하세요."
  },
  {
    id: "spring-bright",
    name: "봄 브라이트 (Spring Bright)",
    nameEn: "Spring Bright",
    badge: "SPRING BRIGHT",
    color: "#FF6B35",
    title: "봄 브라이트 (Spring Bright) 최고의 퍼스널 컬러 메이크업 & 의상 코디 가이드",
    desc: "생기 있고 선명한 고명도 고채도 웜톤의 대명사, 봄 브라이트! 어울리는 인생립스틱, 아이섀도우부터 워스트를 피하는 분위기 있는 패션 코디법까지 완벽 정리해 드립니다.",
    swatches: [
      { hex: "#FF6B35", name: "애플 레드" },
      { hex: "#FF7F50", name: "코랄 핑크" },
      { hex: "#FF8C00", name: "다크 오렌지" },
      { hex: "#FFD700", name: "비비드 골드" },
      { hex: "#FFB347", name: "선샤인 옐로우" },
      { hex: "#98FF98", name: "네온 그린" }
    ],
    items: [
      { title: "💄 립: 맥 레이디 데인저 & 헤라 팜파스", desc: "맑고 다채로운 다홍빛 오렌지 레드와 화사한 피치 코랄이 생기를 폭발시킵니다." },
      { title: "👁️ 섀도우: 데이지크 피치 스퀴즈 & 롬앤 말린 복숭아꽃", desc: "영롱하고 투명한 복숭아 글리터가 눈매를 화사하게 밝힙니다." },
      { title: "🌸 블러셔: 크리니크 피치팝 & 어퓨 피치코랄", desc: "수채화처럼 맑게 올라오는 살구 피치 무스 블러셔가 베스트입니다." }
    ],
    worst: "탁하고 회색빛이 도는 뮤트 톤(카키, 그레이)과 짙은 블랙은 본연의 투명함을 가려 나이 들어 보입니다.",
    styling: "크림 아이보리 바탕에 채도 높은 오렌지, 레드 포인트를 얹고 광택감 있는 새틴이나 가죽 자켓을 매치하세요."
  },
  {
    id: "spring-warm",
    name: "봄 트루 / 웜 (Warm Spring)",
    nameEn: "Warm Spring",
    badge: "WARM SPRING",
    color: "#D97706",
    title: "봄 트루/웜 (Warm Spring) 노란 햇살을 머금은 웜톤의 정석 & 생기발랄 코디 가이드",
    desc: "노란 기가 감도는 따스한 황금빛 햇살이 가장 완벽하게 조화되는 봄 트루/웜! PCCS 라이트·브라이트 톤의 인생 코랄 립스틱, 살구 블러셔부터 골드 주얼리 매칭까지 500자 완벽 총정리 가이드입니다.",
    swatches: [
      { hex: "#F59E0B", name: "골든 옐로우" },
      { hex: "#FB923C", name: "망고 코랄" },
      { hex: "#F97316", name: "선셋 오렌지" },
      { hex: "#FBBF24", name: "해바라기 노랑" },
      { hex: "#84CC16", name: "스프링 라임" },
      { hex: "#FFFBEB", name: "바닐라 크림" }
    ],
    items: [
      { title: "💄 립: 맥 씨 쉬어 & 롬앤 쥬쥬브", desc: "자연스러운 대추 코랄 레드와 자몽 워터 틴트의 촉촉한 광택이 최고입니다." },
      { title: "👁️ 섀도우: 데이지크 웜 베이직 & 클리오 인투 레이스", desc: "따뜻한 살구 피치와 골드 글리터가 피부의 황금빛 윤광과 조화를 이룹니다." },
      { title: "🌸 블러셔: 크리니크 멜론팝 & 네이처리퍼블릭 자몽", desc: "은은하고 사랑스러운 코랄 핑크 수채화 치크가 안색을 밝힙니다." }
    ],
    worst: "푸른 기가 감도는 쿨 핑크, 라벤더, 차가운 실버는 안색을 창백하고 흙빛으로 보이게 합니다.",
    styling: "크림 아이보리, 웜 베이지 바탕에 살구 피치, 망고 오렌지 포인트와 옐로우 골드 주얼리를 매치하세요."
  },
  {
    id: "summer-light",
    name: "여름 라이트 (Summer Light)",
    nameEn: "Summer Light",
    badge: "SUMMER LIGHT",
    color: "#5274A8",
    title: "여름 라이트 (Summer Light) 청량하고 투명한 쿨톤의 인생 섀도우 & 핑크 립스틱 추천",
    desc: "라벤더와 부드러운 인디핑크가 가장 완벽하게 스며드는 여름 라이트! 청순 여신 라인업과 쿨톤 최적화 코디 팁을 500자 정밀 분석으로 공개합니다.",
    swatches: [
      { hex: "#E6E6FA", name: "페일 라벤더" },
      { hex: "#FFC0CB", name: "로즈 필로우" },
      { hex: "#B0C4DE", name: "스틸 아이스" },
      { hex: "#F5F5F5", name: "스노우 화이트" },
      { hex: "#D8BFD8", name: "라일락 오키드" },
      { hex: "#ADD8E6", name: "라이트 마린" }
    ],
    items: [
      { title: "💄 립: 입생로랑 612 & 롬앤 베어 그레이프", desc: "여리여리하고 투명한 핑크 체리 물광과 로즈 플럼이 생기를 줍니다." },
      { title: "👁️ 섀도우: 롬앤 말린 라벤더 & 웨이크메이크 생기 블러링", desc: "깨끗하고 뽀얀 연보라 베이스 섀도우가 눈가를 청초하게 가꿉니다." },
      { title: "🌸 블러셔: 크리니크 팬지팝 & 선아 라벤더 치크", desc: "투명하고 시원한 보랏빛 국화 광택 치크가 노란 기를 잡아줍니다." }
    ],
    worst: "황금빛 골든로드, 웜 베이지 자켓, 올리브 카키는 안색을 누렇게 띄우는 황달 워스트 컬러입니다.",
    styling: "그레이시 화이트, 소프트 스카이 블루, 미스티 라벤더와 미니멀한 화이트 골드/실버 액세서리를 추천합니다."
  },
  {
    id: "summer-cool",
    name: "여름 트루 / 쿨 (Cool Summer)",
    nameEn: "Cool Summer",
    badge: "COOL SUMMER",
    color: "#2563EB",
    title: "여름 트루/쿨 (Cool Summer) 푸른빛 청량함과 깨끗한 이슬 감성 & 쿨톤 메이크업 가이드",
    desc: "블루 언더톤의 시원함이 피부의 붉은 기와 노란 기를 완벽하게 정돈해 주는 여름 트루/쿨! 스카이블루, 쿨 핑크, 라벤더 팔레트와 실버 주얼리 매칭 팁을 500자 정밀 분석으로 전해드립니다.",
    swatches: [
      { hex: "#3B82F6", name: "스카이 블루" },
      { hex: "#60A5FA", name: "아이스 블루" },
      { hex: "#A855F7", name: "페일 라벤더" },
      { hex: "#EC4899", name: "쿨 핑크" },
      { hex: "#94A3B8", name: "스틸 그레이" },
      { hex: "#F8FAFC", name: "스노우 화이트" }
    ],
    items: [
      { title: "💄 립: 롬앤 베어 그레이프 & 라카 콜드", desc: "차분하고 맑은 쿨 로즈 모브 틴트와 청량한 쿨 베리 핑크가 투명함을 극대화합니다." },
      { title: "👁️ 섀도우: 롬앤 말린 라벤더 & 에스쁘아 체리백", desc: "은은한 쿨 라벤더 베이스와 시원한 음영 브라운이 깨끗한 눈매를 만듭니다." },
      { title: "🌸 블러셔: 크리니크 팬지팝 & 롬앤 블루베리 칩", desc: "노란 안색을 한 번에 지워주는 은은한 보랏빛 국화 치크가 인생템입니다." }
    ],
    worst: "오렌지, 머스타드, 카멜, 골드 등 노란 기 가득한 웜톤 계열은 피부를 누렇게 띄우는 워스트 컬러입니다.",
    styling: "스카이 블루 셔츠, 라벤더 가디건, 소프트 그레이 슬랙스에 플래티넘/유광 실버 주얼리를 매칭하세요."
  },
  {
    id: "summer-mute",
    name: "여름 뮤트 (Summer Mute)",
    nameEn: "Summer Mute",
    badge: "SUMMER MUTE",
    color: "#7A6052",
    title: "여름 뮤트 (Summer Mute) 오묘하고 고급스러운 모브 그레이 & 중명도 매트 메이크업",
    desc: "차분하고 분위기 있는 가을 같은 우아함이 돋보이는 여름 뮤트! 말린 장미와 그레이시 올리브, 소장 가치 100% 모브 에디션을 500자 정밀 가이드로 탐구해 보세요.",
    swatches: [
      { hex: "#D8C4D8", name: "소프트 모브" },
      { hex: "#C8B8D8", name: "라벤더 미스트" },
      { hex: "#A9A9A9", name: "모스 그레이" },
      { hex: "#DB7093", name: "페일 로즈" },
      { hex: "#708090", name: "스킬 슬레이트" },
      { hex: "#BC8F8F", name: "로지 더스트" }
    ],
    items: [
      { title: "💄 립: 롬앤 더스티 핑크 & 페리페라 여주공식", desc: "보송하고 뮤트한 쿨 핑크 브라운 말린로즈와 오묘한 플럼 틴트가 찰떡입니다." },
      { title: "👁️ 섀도우: 에스쁘아 모브 미 & 에뛰드 더스티캣", desc: "뮤트하고 오묘한 인디핑크와 먼지 낀 묘한 브라운 조합이 분위기를 살립니다." },
      { title: "🌸 블러셔: 롬앤 블루베리 칩 & 로라메르시에 헤더", desc: "붉은기 없이 뽀얗고 자연스레 분위기를 살리는 뮤티드 퍼플 베일입니다." }
    ],
    worst: "네온 핫핑크, 강렬한 형광 다홍색 립, 순수한 원색 보라는 이목구비를 묻히게 만듭니다.",
    styling: "인디 피치핑크, 코코아 브라운, 애쉬 그레이 톤온톤 매칭과 무광 실버 주얼리가 시크함을 완성합니다."
  },
  {
    id: "autumn-mute",
    name: "가을 뮤트 (Autumn Mute)",
    nameEn: "Autumn Mute",
    badge: "AUTUMN MUTE",
    color: "#C4703A",
    title: "가을 뮤트 (Autumn Mute) 가을의 따스함과 은은한 애쉬베이지의 만남, 추천 템 대방출",
    desc: "우아하고 차분한 소프트 웜톤이자 가을 뮤트! 올리브영 품절 사태의 코퍼 및 브라운 누드 립, 분위기 끝판왕 리브 패션 가이드를 500자 정밀 분석으로 전해드립니다.",
    swatches: [
      { hex: "#D4936A", name: "애쉬 시나몬" },
      { hex: "#F0D5B0", name: "올리브 오트밀" },
      { hex: "#D2B48C", name: "진저 허니" },
      { hex: "#8B8589", name: "웜 토프" },
      { hex: "#A0522D", name: "시에나 어스" },
      { hex: "#8F8FBC", name: "소프트 허브" }
    ],
    items: [
      { title: "💄 립: 맥 멀잇오버 & 에스쁘아 카민", desc: "피치 누드 베이지 브라운의 가을 뮤트 교과서 벨벳 립스틱입니다." },
      { title: "👁️ 섀도우: 바비브라운 토스트 & 클리오 아늑한 골목길", desc: "따스하고 그윽함의 한 끗을 살려주는 진저 피치 베이지 음영입니다." },
      { title: "🌸 블러셔: 크리니크 누드팝 & 3CE 누드 피치", desc: "미세한 윤광이 피부 결을 살려주는 내추럴 브라운살구 블러셔입니다." }
    ],
    worst: "푸른 기가 도는 형광 핑크, 청량한 로얄 스카이블루는 피부가 창백하고 아파 보입니다.",
    styling: "오트밀 그레이, 올리브 그린 자켓을 메인으로 브러쉬드 머드 골드 주얼리와 매칭하세요."
  },
  {
    id: "autumn-warm",
    name: "가을 트루 / 웜 (Warm Autumn)",
    nameEn: "Warm Autumn",
    badge: "WARM AUTUMN",
    color: "#B45309",
    title: "가을 트루/웜 (Warm Autumn) 풍성한 단풍과 그윽한 테라코타 & 클래식 패션 가이드",
    desc: "황금빛 들판과 가을 단풍의 따뜻하고 풍성한 깊이감을 자랑하는 가을 트루/웜! 칠리 레드 립, 호박 카멜 코디, 앤틱 골드 주얼리까지 500자 완벽 총정리 추천 가이드입니다.",
    swatches: [
      { hex: "#B45309", name: "테라코타 오렌지" },
      { hex: "#78350F", name: "골든 초콜릿" },
      { hex: "#D97706", name: "펌킨 옐로우" },
      { hex: "#451A03", name: "딥 브라운" },
      { hex: "#65A30D", name: "웜 카키" },
      { hex: "#9A3412", name: "브릭 버건디" }
    ],
    items: [
      { title: "💄 립: 맥 칠리 & 롬앤 실루엣", desc: "가을 웜톤의 영원한 베스트셀러 브릭 오렌지레드와 말린 마르살라 로즈입니다." },
      { title: "👁️ 섀도우: 3CE 오버테이크 & 클리오 아늑한 골목길", desc: "단풍빛 브릭 베이지와 카키 브라운의 정석 음영이 깊이감을 줍니다." },
      { title: "🌸 블러셔: 3CE 로즈 베이지 & 로라메르시에 진저", desc: "차분하고 분위기 있는 빈티지 말린 장미빛 블러셔가 클래식함을 만듭니다." }
    ],
    worst: "형광 네온 핑크, 차가운 아이시 블루, 마젠타 퍼플은 얼굴을 흙빛으로 칙칙하게 만듭니다.",
    styling: "카멜 트렌치코트, 테라코타 니트, 올리브 카키 팬츠와 앤틱 골드/브론즈 주얼리가 베스트입니다."
  },
  {
    id: "autumn-deep",
    name: "가을 딥 (Autumn Deep)",
    nameEn: "Autumn Deep",
    badge: "AUTUMN DEEP",
    color: "#8B4520",
    title: "가을 딥 (Autumn Deep) 매혹적인 버건디와 테라코타, 중후한 정통 가을 웜톤 패션 가이드",
    desc: "웅장한 고혹미와 이국적인 다크 브라운이 베스트인 가을 딥(Autumn Deep/Dark)! 칠리 레드 립, 가을 아우터 코디 정보를 500자 정밀 분석으로 정리했습니다.",
    swatches: [
      { hex: "#8B4520", name: "번트 오렌지" },
      { hex: "#800020", name: "올드 버건디" },
      { hex: "#4A2711", name: "딥 다크 초콜릿" },
      { hex: "#556B2F", name: "올리브 드랩" },
      { hex: "#B8860B", name: "골든 브론즈" },
      { hex: "#9E5B2F", name: "테라코타 클레이" }
    ],
    items: [
      { title: "💄 립: 맥 칠리 & 에스쁘아 문릿 & 롬앤 딥솔", desc: "핏빛을 살짝 가미한 다크 브릭 마룬과 딥 초콜릿 레드가 압도적입니다." },
      { title: "👁️ 섀도우: 3CE 오버테이크 & 에뛰드 아몬드 라망", desc: "진득하고 고소한 코코아 아몬드 토스트 음영이 깊은 눈매를 연출합니다." },
      { title: "🌸 블러셔: 나스 스릴 & 3CE 로즈베이지", desc: "웜 골드 글리터가 미세하게 박힌 테라코타 치크가 고혹미를 줍니다." }
    ],
    worst: "가벼운 스노우 화이트 티셔츠, 파스텔 민트는 가을 딥의 안색을 초라하고 부자연스럽게 만듭니다.",
    styling: "테라코타 롱코트, 딥 버건디 수트와 볼드한 앤틱 골드 체인 주얼리를 시도해 보세요."
  },
  {
    id: "winter-cool",
    name: "겨울 트루 / 쿨 (Cool Winter)",
    nameEn: "Cool Winter",
    badge: "COOL WINTER",
    color: "#1E3A8A",
    title: "겨울 트루/쿨 (Cool Winter) 독보적인 냉미녀의 카리스마 & 블랙 & 마젠타 스타일링",
    desc: "푸른 기의 극치와 흑백의 높은 대비감이 연출하는 압도적인 도회적 아우라! 겨울 트루/쿨의 체리 루비 레드 립, 퓨어 블랙 정장 수트, 플래티넘 주얼리 500자 정밀 스타일 가이드.",
    swatches: [
      { hex: "#1E3A8A", name: "네이비 인디고" },
      { hex: "#831843", name: "마젠타 퍼플" },
      { hex: "#0284C7", name: "아이스 사파이어" },
      { hex: "#000000", name: "피트 블랙" },
      { hex: "#9333EA", name: "바이올렛 글램" },
      { hex: "#F1F5F9", name: "플래티넘 아이스" }
    ],
    items: [
      { title: "💄 립: 맥 루비우 & 샤넬 874", desc: "푸른 기가 흐르는 독보적인 쿨 체리 레드와 다크 버건디 와인의 끝판왕입니다." },
      { title: "👁️ 섀도우: 롬앤 말린 스트로베리 & 클리오 모브 체리", desc: "다크 플럼과 차가운 실버 펄의 환상적인 조화로 눈매를 또렷하게 합니다." },
      { title: "🌸 블러셔: 크리니크 플럼팝 & 세잔느 라벤더 핑크", desc: "투명하고 시원한 쿨톤 플럼 보라피치 치크가 피부 톤을 밝힙니다." }
    ],
    worst: "카멜, 오렌지, 골드 브라운, 머스타드 등 노란 기 가득한 웜톤 컬러는 피부를 칙칙하게 만듭니다.",
    styling: "블랙 & 퓨어 화이트 정장 수트에 선명한 마젠타 숄더백과 플래티넘 실버 주얼리를 매치하세요."
  },
  {
    id: "winter-bright",
    name: "겨울 브라이트 (Winter Bright)",
    nameEn: "Winter Bright",
    badge: "WINTER BRIGHT",
    color: "#C80065",
    title: "겨울 브라이트 (Winter Bright) 압도적 포스, 선명한 플럼 체리 립스틱 & 대비감 있는 페미닌 스타일링",
    desc: "겨쿨의 진수, 원색과 플럼이 압도적으로 매력적인 겨울 브라이트! 세련된 실버 포인트 및 쿨톤 흑색 아우라 꿀팁을 500자 정밀 가이드로 대방출합니다.",
    swatches: [
      { hex: "#BA0B50", name: "체리 루비" },
      { hex: "#1F005E", name: "로얄 인디고" },
      { hex: "#FF007F", name: "네온 마젠타" },
      { hex: "#000000", name: "인키 블랙" },
      { hex: "#00CCCC", name: "시안 블루" },
      { hex: "#FFFFFF", name: "퓨어 화이트" }
    ],
    items: [
      { title: "💄 립: 맥 루비우 & 롬앤 미드나잇", desc: "푸른 기가 흐르는 독보적인 체리 아이코닉 레드와 섹시한 다크 플럼 로즈입니다." },
      { title: "👁️ 섀도우: 클리오 모브 체리 & 롬앤 말린 스트로베리", desc: "푸른 라일락빛과 다크 플럼 체리 그라데이션이 카리스마를 줍니다." },
      { title: "🌸 블러셔: 크리니크 플럼팝 & 세잔느 라벤더 핑크", desc: "쨍하게 빛나는 생기 백배 오키드 핑크 펄 치크가 필수입니다." }
    ],
    worst: "버터 옐로우, 카라멜 카멜 코트는 피부톤을 진흙탕처럼 탁하고 노랗게 만듭니다.",
    styling: "블랙 & 퓨어 화이트 정장 수트 위에 마젠타 핑크 원 포인트와 고광택 실버 체인을 제안합니다."
  },
  {
    id: "winter-deep",
    name: "겨울 딥 (Winter Deep)",
    nameEn: "Winter Deep",
    badge: "WINTER DEEP",
    color: "#4A0033",
    title: "겨울 딥 (Winter Deep) 치명적이고 매혹적인 버건디, 블랙 카리스마 & 시크 뷰티 노하우",
    desc: "흑발이 신의 한 수인 백설공주 같은 겨울 딥(Winter Deep)! 분위기를 압도하는 다크 메이크업과 모노톤 슬림 핏 데일리 코디 가이드를 500자 정밀 분석으로 정리했습니다.",
    swatches: [
      { hex: "#4A0033", name: "다크 블랙베리" },
      { hex: "#001A3D", name: "심해 블루" },
      { hex: "#2E0010", name: "루비 핏빛와인" },
      { hex: "#1A1A1A", name: "옵시디언 블랙" },
      { hex: "#EBEBEB", name: "아이시 실버그레이" },
      { hex: "#3B0054", name: "딥 미드나잇 퍼플" }
    ],
    items: [
      { title: "💄 립: 샤넬 874 & 롬앤 비포 선셋", desc: "다크 버건디 와인의 끝판왕과 지적인 다크 베리 로즈브라운입니다." },
      { title: "👁️ 섀도우: 데이지크 베리 스무디 & 바비브라운 체호프", desc: "시크한 느낌을 채워주는 고혹적인 그레이 바이올렛 섀도우입니다." },
      { title: "🌸 블러셔: 어퓨 VL03 & 나스 Sin(씬)", desc: "노란 안색을 이지적으로 환히 잡아주는 연보라 및 관능적인 자두 모브 치크입니다." }
    ],
    worst: "따뜻한 애쉬 골드, 베이지 염색, 주황 카라멜 자켓은 최대치의 스킨 트러블을 도드라지게 합니다.",
    styling: "블랙 터틀넥에 다크 그레이 롱코트, 탄탄한 수트 울 원단과 볼드한 리얼 와이드 실버 네크리스를 매칭하세요."
  }
];

function createTypeHtml(t) {
  const swatchesHtml = t.swatches.map(s => 
    `<div class="swatch-item" style="background: ${s.hex};">${s.name}</div>`
  ).join("\n          ");

  const itemsHtml = t.items.map(it => 
    `<div class="product-box">
      <div class="product-title">${it.title}</div>
      <div class="product-desc">${it.desc}</div>
    </div>`
  ).join("\n        ");

  return `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${t.title} | InSelf Color</title>
    <meta name="description" content="${t.desc}" />
    <link rel="canonical" href="https://inselfcolor.pages.dev/types/${t.id}" />
    
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${t.title} | InSelf Color" />
    <meta property="og:description" content="${t.desc}" />
    <meta property="og:url" content="https://inselfcolor.pages.dev/types/${t.id}" />
    <meta property="og:site_name" content="InSelf Color" />
    
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&family=Noto+Sans+KR:wght@400;500;700;900&display=swap" />
    <style>
      :root {
        --color-bg: #FDF8F2;
        --color-card-bg: #FFFFFF;
        --color-primary: ${t.color};
        --color-text-main: #3E2814;
        --color-text-sub: #7A6052;
        --color-border: rgba(196, 149, 106, 0.2);
      }
      body { margin: 0; padding: 0; background-color: var(--color-bg); color: var(--color-text-main); font-family: 'Inter', 'Noto Sans KR', sans-serif; line-height: 1.8; -webkit-font-smoothing: antialiased; }
      .container { max-width: 820px; margin: 40px auto; padding: 0 20px; box-sizing: border-box; }
      header { text-align: center; margin-bottom: 32px; }
      .logo { display: inline-block; font-size: 24px; font-weight: 900; color: #C4956A; text-decoration: none; margin-bottom: 12px; }
      .badge { display: inline-block; background: rgba(196,149,106,0.12); color: var(--color-primary); font-size: 13px; font-weight: 800; padding: 5px 16px; border-radius: 20px; margin-bottom: 10px; }
      .title { font-size: 28px; font-weight: 900; color: var(--color-text-main); margin: 0 0 10px 0; letter-spacing: -0.03em; }
      .subtitle { font-size: 15px; color: var(--color-text-sub); margin-bottom: 24px; }
      .main-card { background-color: var(--color-card-bg); border: 1px solid var(--color-border); border-radius: 24px; padding: 36px; box-shadow: 0 10px 40px rgba(61,43,26,0.03); }
      h2 { font-size: 20px; font-weight: 800; color: var(--color-primary); margin: 32px 0 14px 0; border-bottom: 2px solid rgba(196,149,106,0.15); padding-bottom: 6px; }
      h2:first-of-type { margin-top: 0; }
      p { font-size: 15px; color: var(--color-text-sub); margin: 0 0 16px 0; }
      .swatch-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 10px; margin: 20px 0; }
      .swatch-item { border-radius: 12px; padding: 14px 10px; text-align: center; color: #fff; font-weight: 700; font-size: 12px; text-shadow: 0 1px 2px rgba(0,0,0,0.4); }
      .product-box { background: rgba(196,149,106,0.06); border-left: 4px solid var(--color-primary); border-radius: 10px; padding: 18px; margin-bottom: 14px; }
      .product-title { font-weight: 800; font-size: 15px; color: var(--color-text-main); margin-bottom: 6px; }
      .product-desc { font-size: 13.5px; color: var(--color-text-sub); }
      .worst-box { background: rgba(239, 68, 68, 0.04); border-left: 4px solid #EF4444; border-radius: 10px; padding: 18px; margin: 20px 0; }
      .nav-buttons { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 36px; }
      .btn { display: inline-block; padding: 12px 22px; border-radius: 12px; font-weight: 700; font-size: 14px; text-decoration: none; transition: background 0.2s; }
      .btn-primary { background: #C4956A; color: #fff; }
      .btn-secondary { background: rgba(196,149,106,0.12); color: var(--color-text-main); }
      footer { text-align: center; font-size: 12px; color: rgba(122,96,82,0.6); margin-top: 40px; border-top: 1px solid var(--color-border); padding-top: 20px; }
    </style>

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "${t.title}",
      "description": "${t.desc}",
      "url": "https://inselfcolor.pages.dev/types/${t.id}"
    }
    </script>
  </head>
  <body>
    <div class="container">
      <header>
        <a href="/" class="logo">✨ InSelf Color</a>
        <div><span class="badge">${t.badge}</span></div>
        <h1 class="title">${t.name} 상세 가이드</h1>
        <p class="subtitle">${t.desc}</p>
      </header>

      <main class="main-card">
        <h2>1. 시그니처 컬러 팔레트</h2>
        <div class="swatch-grid">
          ${swatchesHtml}
        </div>

        <h2>2. 베스트 메이크업 추천 인생템</h2>
        ${itemsHtml}

        <h2>3. 피해야 할 워스트(Worst) 색상 & 스타일</h2>
        <div class="worst-box">
          <div style="font-weight: 800; font-size: 15px; color: #EF4444; margin-bottom: 6px;">⚠️ 주의할 점</div>
          <p style="margin: 0; font-size: 14px;">${t.worst}</p>
        </div>

        <h2>4. 패션 & 주얼리 코디 스타일링 노하우</h2>
        <p>${t.styling}</p>

        <div class="nav-buttons">
          <a href="/" class="btn btn-primary">📸 10초 퍼스널컬러 자가진단 시작하기</a>
          <a href="/guide" class="btn btn-secondary">📖 PCCS 색채학 가이드 전체보기</a>
        </div>
      </main>

      <footer>
        <p>© 2026 InSelf Studio Labs. All rights reserved.</p>
      </footer>
    </div>
  </body>
</html>`;
}

// 8 Columns Data
const ARTICLES = [
  {
    slug: "pccs-color-system",
    category: "색채학 이론",
    title: "PCCS 24색상환과 12톤 좌표계 완벽 해설: 퍼스널컬러 과학의 원리",
    summary: "일본 색채 연구소(JCRI)의 Practical Color Coordinate System이 현대 디지털 퍼스널컬러 진단의 표준이 된 이유와 24색상환, 12가지 톤의 명도·채도 결합 원리를 알기 쉽게 설명합니다.",
    content: `
      <h2>1. PCCS(Practical Color Coordinate System)란 무엇인가?</h2>
      <p>퍼스널 컬러는 단순히 '빨간색이 어울린다, 파란색이 어울린다'의 문제가 아닙니다. 빨간색 안에서도 톤(Tone)에 따라 인상이 180도 달라집니다. 이를 과학적으로 체계화한 도구가 바로 1964년 일본 색채 연구소에서 개발한 PCCS 실용색채계입니다.</p>
      <h2>2. 24색상환의 구조와 웜·쿨 언더톤</h2>
      <p>PCCS 색상환은 심리 4원색을 기초로 지각적 등간격으로 배치된 24개 색상으로 구성됩니다. 1번~8번은 웜톤 구역이며, 12번~23번은 쿨톤 구역입니다.</p>
      <h2>3. 12가지 톤(Tone)의 사분면 분석</h2>
      <p>v(비비드), b(브라이트), lt(라이트), p(페일), sf(소프트), d(덜), dp(딥), dk(다크) 등 명도와 채도의 체계적 조합으로 12가지 톤을 분류합니다.</p>
    `
  },
  {
    slug: "warm-vs-cool",
    category: "자가 진단",
    title: "웜톤 vs 쿨톤 구별법: 피부 혈색, 헤어, 핏줄 색으로 확인하는 자가 진단 노하우",
    summary: "손목 안쪽 혈관 색상부터 골드/실버 액세서리 반응, 햇볕에 탔을 때의 피부 변화까지, 웜톤과 쿨톤을 집에서 3분 만에 구별하는 5가지 실전 테스트 방법입니다.",
    content: `
      <h2>1. 웜톤과 쿨톤, 피부 겉색이 아닌 '언더톤'의 차이</h2>
      <p>진정한 퍼스널컬러는 피부 진피층의 혈류량과 멜라닌/카로틴 색소 비율이 결정하는 언더톤(Undertone)에 의해 결정됩니다.</p>
      <h2>2. 웜톤 vs 쿨톤 판별 5가지 자가 진단 체크리스트</h2>
      <p>• 손목 안쪽 핏줄 색상: 초록색(웜톤), 파란색/보라색(쿨톤)<br/>• 주얼리: 옐로우 골드(웜톤), 실버/백금(쿨톤)<br/>• 태닝: 갈색으로 그을림(웜톤), 빨갛게 익음(쿨톤)<br/>• 셔츠: 아이보리(웜톤), 퓨어 화이트(쿨톤)</p>
    `
  },
  {
    slug: "skin-tone-reflectance",
    category: "광학 & 알고리즘",
    title: "CIE L*a*b* 색공간과 멜라닌/헤모글로빈 반사율: 피부 톤 알고리즘의 비밀",
    summary: "디지털 카메라 RGB의 왜곡을 극복하고 피부 속 멜라닌 및 옥시헤모글로빈 스펙트럼 흡광도를 정밀하게 추정하는 InSelf Color의 독자적 광학 보정 알고리즘 원리를 공개합니다.",
    content: `
      <h2>1. 디지털 카메라의 한계와 화이트밸런스</h2>
      <p>조명의 색온도와 카메라 ISP의 왜곡을 극복하기 위해 CIE L*a*b* 공간 변환이 필수적입니다.</p>
      <h2>2. CIE L*a*b* 색 공간의 3차원 축</h2>
      <p>L*(명도), a*(빨강-초록), b*(노랑-파랑)의 좌표계를 바탕으로 웜/쿨 언더톤을 정밀하게 수치화합니다.</p>
      <h2>3. 멜라닌 & 헤모글로빈 흡광 계수 역산</h2>
      <p>5만 개 이상의 순수 피부 픽셀을 채취하여 조명 반사를 필터링하고 피부 본연의 색소 분포를 계산합니다.</p>
    `
  },
  {
    slug: "makeup-matching",
    category: "메이크업 팁",
    title: "퍼스널컬러 계절별 찰떡 메이크업 공식: 립, 섀도우, 블러셔 추천 조합",
    summary: "내 톤에 맞지 않는 화장품으로 인해 얼굴이 동동 뜨거나 칙칙해진 경험이 있으신가요? 4계절 12타입별 가장 실패 없는 베스트 메이크업 배색 공식을 공개합니다.",
    content: `
      <h2>1. 톤에 맞지 않는 메이크업의 역효과</h2>
      <p>웜톤이 쿨 플럼 립을 바르면 멍든 것처럼 보이고, 쿨톤이 오렌지 립을 바르면 치아와 피부가 누렇게 보입니다.</p>
      <h2>2. 계절별 베스트 공식</h2>
      <p>• 봄 웜톤: 코랄 레드, 살구 피치, 멜론팝 블러셔<br/>• 여름 쿨톤: 베어 그레이프, 모브 핑크, 팬지팝 연보라 치크<br/>• 가을 웜톤: 맥 칠리, 브릭 레드, 진저 누드 섀도우<br/>• 겨울 쿨톤: 루비우 체리 레드, 제트 블랙 아이라이너</p>
    `
  },
  {
    slug: "fashion-contrast",
    category: "패션 스타일링",
    title: "명도 대비(Contrast)와 소재(Texture)로 완성하는 퍼스널컬러 패션 스타일링",
    summary: "색상만 맞춘다고 완벽한 코디가 되는 것은 아닙니다. 얼굴 이목구비의 선명도에 따른 명도 대비감과 패브릭 질감(실크, 리넨, 가죽 등)의 조화 비법을 정리했습니다.",
    content: `
      <h2>1. 명도 대비(Contrast)의 중요성</h2>
      <p>블랙 & 화이트의 고대비감은 겨울 쿨톤과 봄 비비드에 어울리며, 톤온톤 저대비감은 여름 라이트와 가을 뮤트의 우아함을 극대화합니다.</p>
      <h2>2. 텍스처와 패브릭 소재의 조화</h2>
      <p>새틴과 가죽은 선명한 고채도 톤을 살려주고, 리넨과 트위드는 가을의 깊이감을 더해줍니다.</p>
    `
  },
  {
    slug: "worst-color-solution",
    category: "스타일 솔루션",
    title: "워스트 컬러 심폐소생술: 안 어울리는 옷과 립스틱 버리지 않고 입는 꿀팁",
    summary: "좋아해서 샀는데 알고 보니 워스트 컬러였던 코트나 립스틱이 옷장에 잠들어 있나요? 넥라인 거리두기, 레이어드, 믹스매치로 예쁘게 소화하는 4가지 구원 공식을 소개합니다.",
    content: `
      <h2>1. 얼굴(목선)과 물리적 거리 두기</h2>
      <p>워스트 컬러는 하의나 가방, 신발로 멀리 보내고, 상의 안쪽에 베스트 컬러 이너를 받쳐 완충 지대를 만드세요.</p>
      <h2>2. 립스틱 믹스매치</h2>
      <p>내 톤에 맞는 누드 립을 베이스로 얇게 깐 후, 입술 안쪽에만 워스트 립을 톡톡 얹어 그라데이션하세요.</p>
    `
  },
  {
    slug: "men-personal-color",
    category: "남성 스타일링",
    title: "남성을 위한 퍼스널컬러 가이드: 슈트, 셔츠, 넥타이 톤온톤 스타일링",
    summary: "면접, 비즈니스 미팅, 데이트에서 신뢰감과 호감을 극대화하는 남성 퍼스널컬러 실전 가이드. 쿨네이비 vs 웜차콜 슈트 선택과 헤어 톤 정리법을 전해드립니다.",
    content: `
      <h2>1. 남성에게 퍼스널 컬러가 중요한 이유</h2>
      <p>셔츠 깃과 넥타이가 턱선과 피부 혈색을 직접 규정하므로 남성에게 퍼스널컬러의 영향력은 절대적입니다.</p>
      <h2>2. 계절별 슈트 & 셔츠 매칭</h2>
      <p>• 봄 웜: 웜 네이비, 카멜 슈트, 크림 셔츠<br/>• 여름 쿨: 슬레이트 그레이, 스카이 블루 셔츠<br/>• 가을 웜: 클래식 브라운 수트, 버건디 타이<br/>• 겨울 쿨: 제트 블랙 수트, 눈부신 퓨어 화이트 셔츠</p>
    `
  },
  {
    slug: "four-seasons-overview",
    category: "종합 가이드",
    title: "4계절 12타입 퍼스널컬러 총정리: 나에게 맞는 세부 톤 찾기",
    summary: "봄(라이트/브라이트/웜), 여름(라이트/쿨/뮤트), 가을(뮤트/웜/딥), 겨울(쿨/브라이트/딥)까지 12가지 세부 톤의 핵심 특징과 대표 연예인, 추천 팔레트를 한눈에 비교 정리했습니다.",
    content: `
      <h2>1. 4계절에서 12타입 세분화로의 발전</h2>
      <p>라이트, 브라이트, 트루, 뮤트, 딥으로 세분화된 12타입 디렉토리를 통해 나만의 정확한 톤을 발견할 수 있습니다.</p>
      <h2>2. 12타입 요약 디렉토리</h2>
      <p>12가지 각 타입의 대표 팔레트와 연예인 매칭 데이터를 확인하고 바로 테스트해보세요.</p>
    `
  }
];

function createArticleHtml(art) {
  return `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${art.title} | InSelf Color 칼럼</title>
    <meta name="description" content="${art.summary}" />
    <link rel="canonical" href="https://inselfcolor.pages.dev/guide/${art.slug}" />
    
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${art.title} | InSelf Color" />
    <meta property="og:description" content="${art.summary}" />
    <meta property="og:url" content="https://inselfcolor.pages.dev/guide/${art.slug}" />
    <meta property="og:site_name" content="InSelf Color" />
    
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&family=Noto+Sans+KR:wght@400;500;700;900&display=swap" />
    <style>
      :root {
        --color-bg: #FDF8F2;
        --color-card-bg: #FFFFFF;
        --color-primary: #C4956A;
        --color-text-main: #3E2814;
        --color-text-sub: #7A6052;
        --color-border: rgba(196, 149, 106, 0.2);
      }
      body { margin: 0; padding: 0; background-color: var(--color-bg); color: var(--color-text-main); font-family: 'Inter', 'Noto Sans KR', sans-serif; line-height: 1.85; -webkit-font-smoothing: antialiased; }
      .container { max-width: 820px; margin: 40px auto; padding: 0 20px; box-sizing: border-box; }
      header { text-align: center; margin-bottom: 32px; }
      .logo { display: inline-block; font-size: 24px; font-weight: 900; color: #C4956A; text-decoration: none; margin-bottom: 12px; }
      .badge { display: inline-block; background: rgba(196,149,106,0.14); color: #A17349; font-size: 12px; font-weight: 800; padding: 4px 14px; border-radius: 20px; margin-bottom: 10px; }
      .title { font-size: 26px; font-weight: 900; color: var(--color-text-main); margin: 0 0 14px 0; letter-spacing: -0.02em; }
      .summary { background: #FAF6F1; border-left: 4px solid var(--color-primary); padding: 16px; border-radius: 10px; font-size: 14.5px; color: #6B5244; margin-bottom: 28px; }
      .main-card { background-color: var(--color-card-bg); border: 1px solid var(--color-border); border-radius: 24px; padding: 36px; box-shadow: 0 10px 40px rgba(61,43,26,0.03); }
      h2 { font-size: 20px; font-weight: 800; color: #A17349; margin: 32px 0 14px 0; border-bottom: 1.5px solid rgba(196,149,106,0.18); padding-bottom: 6px; }
      h2:first-of-type { margin-top: 0; }
      p { font-size: 15px; color: #4A3528; margin: 0 0 16px 0; }
      .nav-buttons { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 36px; }
      .btn { display: inline-block; padding: 12px 22px; border-radius: 12px; font-weight: 700; font-size: 14px; text-decoration: none; transition: background 0.2s; }
      .btn-primary { background: #C4956A; color: #fff; }
      .btn-secondary { background: rgba(196,149,106,0.12); color: var(--color-text-main); }
      footer { text-align: center; font-size: 12px; color: rgba(122,96,82,0.6); margin-top: 40px; border-top: 1px solid var(--color-border); padding-top: 20px; }
    </style>

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "${art.title}",
      "description": "${art.summary}",
      "url": "https://inselfcolor.pages.dev/guide/${art.slug}"
    }
    </script>
  </head>
  <body>
    <div class="container">
      <header>
        <a href="/" class="logo">✨ InSelf Color</a>
        <div><span class="badge">${art.category}</span></div>
        <h1 class="title">${art.title}</h1>
        <div class="summary">${art.summary}</div>
      </header>

      <main class="main-card">
        ${art.content}

        <div class="nav-buttons">
          <a href="/" class="btn btn-primary">📸 무료 10초 퍼스널컬러 진단 시작</a>
          <a href="/guide" class="btn btn-secondary">📖 PCCS 색채학 가이드 전체보기</a>
        </div>
      </main>

      <footer>
        <p>© 2026 InSelf Studio Labs. All rights reserved.</p>
      </footer>
    </div>
  </body>
</html>`;
}

// 1. Generate /types/ pages
TYPES.forEach(t => {
  const html = createTypeHtml(t);
  const typeDir = path.join(publicDir, "types", t.id);
  ensureDir(typeDir);
  fs.writeFileSync(path.join(typeDir, "index.html"), html, "utf-8");
  fs.writeFileSync(path.join(publicDir, "types", `${t.id}.html`), html, "utf-8");
});

// 2. Generate /guide/ column articles
ARTICLES.forEach(art => {
  const html = createArticleHtml(art);
  const guideDir = path.join(publicDir, "guide", art.slug);
  ensureDir(guideDir);
  fs.writeFileSync(path.join(guideDir, "index.html"), html, "utf-8");
  fs.writeFileSync(path.join(publicDir, "guide", `${art.slug}.html`), html, "utf-8");
});

// 3. Generate /about and /contact pre-rendered pages
const aboutHtml = `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>서비스 소개 (About Us) | InSelf Color</title>
    <meta name="description" content="InSelf Color는 PCCS 색채학과 CIE L*a*b* 색공간 모델에 기반한 100% 온디바이스 퍼스널컬러 진단 플랫폼입니다." />
    <link rel="canonical" href="https://inselfcolor.pages.dev/about" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&family=Noto+Sans+KR:wght@400;500;700;900&display=swap" />
    <style>
      body { margin: 0; padding: 40px 20px; background-color: #FDF8F2; color: #3E2814; font-family: 'Inter', 'Noto Sans KR', sans-serif; line-height: 1.8; }
      .container { max-width: 820px; margin: 0 auto; background: #fff; padding: 36px; border-radius: 24px; border: 1px solid rgba(196,149,106,0.2); }
      h1 { font-size: 28px; color: #3E2814; font-weight: 900; }
      h2 { font-size: 20px; color: #A17349; font-weight: 800; border-bottom: 2px solid rgba(196,149,106,0.15); padding-bottom: 8px; margin-top: 30px; }
      .btn { display: inline-block; padding: 12px 24px; background: #C4956A; color: #fff; border-radius: 100px; text-decoration: none; font-weight: 700; margin-top: 20px; }
    </style>
  </head>
  <body>
    <div class="container">
      <a href="/" style="color:#C4956A; font-weight:900; text-decoration:none; font-size:22px;">✨ InSelf Color</a>
      <h1>서비스 소개 (About InSelf Color)</h1>
      <p>InSelf Color는 일본 색채 연구소(JCRI)의 PCCS 실용색채계와 국제 조명 위원회(CIE) L*a*b* 색 공간 모델에 기반하여 개발된 100% 온디바이스 퍼스널컬러 진단 플랫폼입니다.</p>
      <h2>1. 개발 미션</h2>
      <p>오프라인 컨설팅의 높은 비용과 주관적 편차를 극복하고, 누구나 10초 만에 사진 한 장으로 객관적인 언더톤·명도·채도 데이터를 직접 측정할 수 있도록 하였습니다.</p>
      <h2>2. 100% 프라이버시 원칙</h2>
      <p>업로드된 얼굴 사진은 외부 원격 서버로 일체 전송되지 않으며, 사용자 기기 브라우저 RAM 메모리 내부에서만 처리된 후 즉시 소멸합니다.</p>
      <h2>3. 연구 개발진</h2>
      <p>디지털 이미징 연구진, 시니어 컬러리스트, 프론트엔드 그래픽스 엔지니어들로 구성된 InSelf Studio Labs에서 연구 개발하고 있습니다. 문의: zezeteam2026@gmail.com</p>
      <a href="/" class="btn">📸 무료 퍼스널컬러 진단하러 가기</a>
    </div>
  </body>
</html>`;

const contactHtml = `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>문의하기 & 고객 지원 (Contact Us) | InSelf Color</title>
    <meta name="description" content="InSelf Color 제휴, 기술 자문, 학술 피드백, 서비스 오류 신고를 위한 공식 문의 센터입니다." />
    <link rel="canonical" href="https://inselfcolor.pages.dev/contact" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&family=Noto+Sans+KR:wght@400;500;700;900&display=swap" />
    <style>
      body { margin: 0; padding: 40px 20px; background-color: #FDF8F2; color: #3E2814; font-family: 'Inter', 'Noto Sans KR', sans-serif; line-height: 1.8; }
      .container { max-width: 820px; margin: 0 auto; background: #fff; padding: 36px; border-radius: 24px; border: 1px solid rgba(196,149,106,0.2); }
      h1 { font-size: 28px; color: #3E2814; font-weight: 900; }
      h2 { font-size: 20px; color: #A17349; font-weight: 800; border-bottom: 2px solid rgba(196,149,106,0.15); padding-bottom: 8px; margin-top: 30px; }
      .box { background: #FAF5EF; padding: 20px; border-radius: 14px; margin: 20px 0; }
      .btn { display: inline-block; padding: 12px 24px; background: #C4956A; color: #fff; border-radius: 100px; text-decoration: none; font-weight: 700; margin-top: 20px; }
    </style>
  </head>
  <body>
    <div class="container">
      <a href="/" style="color:#C4956A; font-weight:900; text-decoration:none; font-size:22px;">✨ InSelf Color</a>
      <h1>문의하기 & 고객 지원 (Contact Us)</h1>
      <p>InSelf Color 이용 중 궁금하신 점, 기업/브랜드 제휴, 기능 제안, 오류 신고는 언제든 환영합니다.</p>
      <div class="box">
        <div><b>• 공식 문의 이메일:</b> <a href="mailto:zezeteam2026@gmail.com" style="color:#C4956A;">zezeteam2026@gmail.com</a></div>
        <div><b>• 회신 소요 시간:</b> 평일 기준 24~48시간 이내</div>
        <div><b>• 운영팀:</b> InSelf Studio Labs</div>
      </div>
      <a href="/" class="btn">📸 퍼스널컬러 진단 홈으로</a>
    </div>
  </body>
</html>`;

const aboutDir = path.join(publicDir, "about");
ensureDir(aboutDir);
fs.writeFileSync(path.join(aboutDir, "index.html"), aboutHtml, "utf-8");
fs.writeFileSync(path.join(publicDir, "about.html"), aboutHtml, "utf-8");

const contactDir = path.join(publicDir, "contact");
ensureDir(contactDir);
fs.writeFileSync(path.join(contactDir, "index.html"), contactHtml, "utf-8");
fs.writeFileSync(path.join(publicDir, "contact.html"), contactHtml, "utf-8");

console.log("[Prerender] Successfully generated 12 types, 8 column articles, about, and contact static pages.");
