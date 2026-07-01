import { Building, MapPin, MoveHorizontal, Users, Moon, ShieldAlert, Truck } from 'lucide-react';

export const questions = [
  {
    id: "q1_location",
    title: "1. 소방서 접근성 및 입지",
    description: "가장 가까운 119 안전센터(소방서)와의 거리 및 실제 출동 환경은 어떻습니까?",
    options: [
      {
        id: "loc_urban",
        label: "골든타임 확보 가능",
        detail: "도심지에 위치하여 신고 후 5~10분 이내 소방차 도착 및 진입이 원활함",
        icon: "MapPin",
        score: 0
      },
      {
        id: "loc_rural",
        label: "출동 지연 우려 지역",
        detail: "외곽/농어촌에 위치하여 10분 이상 소요되거나, 산림 인접 및 진입로가 협소함",
        icon: "MapPin",
        score: 1
      }
    ]
  },
  {
    id: "q2_building",
    title: "2. 건물 형태 및 주 거주층",
    description: "요양원이 위치한 주 거주층과 지상(피난층)과의 관계는 어떻습니까?",
    options: [
      {
        id: "bld_low",
        label: "저층 구조 (1~2층)",
        detail: "지상과 가깝거나 피난층과 바로 연결되어 수직 이동 부담이 적음",
        icon: "Building",
        meta: { isHorizontalFriendly: true }
      },
      {
        id: "bld_high",
        label: "3층 이상 또는 복합용도",
        detail: "탈출을 위해 반드시 계단이나 승강기를 이용해 아래층으로 내려가야 함",
        icon: "Building",
        meta: { isHorizontalFriendly: false }
      }
    ]
  },
  {
    id: "q3_horizontal",
    title: "3. 수평 피난 설비",
    description: "화재 시 계단으로 가지 않고 층 내에서 연기를 피해 대피할 수 있는 공간이 있습니까?",
    options: [
      {
        id: "horiz_yes",
        label: "수평 대피 공간 보유",
        detail: "방화문으로 완벽히 구획된 전용 대피공간, 인접동 연결 복도, 또는 외부 발코니가 있음",
        icon: "MoveHorizontal",
        meta: { isHorizontalFriendly: true }
      },
      {
        id: "horiz_no",
        label: "수평 대피 공간 없음",
        detail: "해당 층 내에 연기를 피할 공간이 없어 발화 시 무조건 계단실로 진입해야 함",
        icon: "MoveHorizontal",
        meta: { isHorizontalFriendly: false }
      }
    ]
  },
  {
    id: "q4_severity",
    title: "4. 입소자 중증도",
    description: "화재 시 조력자 없이 자력 대피가 불가능한 환자(와상, 중증 치매 등)의 비율은 어느 정도입니까?",
    options: [
      {
        id: "sev_mild",
        label: "경증 위주 (50% 미만)",
        detail: "안내에 따라 스스로 걷거나 부축 시 보행 가능한 환자가 다수여서 그룹 대피가 수월함",
        icon: "Users",
        meta: { severity: "mild" }
      },
      {
        id: "sev_severe",
        label: "중증 위주 (50% 이상)",
        detail: "대부분 침대나 휠체어를 통째로 옮겨야 하거나 통제가 어려운 치매 환자임",
        icon: "Users",
        meta: { severity: "severe" }
      }
    ]
  },
  {
    id: "q5_night_staff",
    title: "5. 취약 시간대 대응력 (야간/휴일)",
    description: "화재 발생 위험이 가장 큰 야간 및 심야 시간대의 인력 상황은 어떻습니까?",
    options: [
      {
        id: "night_good",
        label: "야간 근무자 2인 이상 상주",
        detail: "화재 인지, 119 신고, 초기 진화, 대피 유도를 분담할 수 있는 최소 인력이 있음",
        icon: "Moon",
        score: 0
      },
      {
        id: "night_solo",
        label: "야간 단독 근무 (초고위험)",
        detail: "1명이 모든 조치를 동시에 수행해야 하여 초기 대응이 사실상 마비될 수 있음",
        icon: "Moon",
        score: 2 // Critical failure point
      }
    ]
  },
  {
    id: "q6_training",
    title: "6. 실전 대피 훈련",
    description: "자체적인 화재 대피 훈련은 어떻게 진행되고 있습니까?",
    options: [
      {
        id: "train_good",
        label: "야간 상황 포함 모의 훈련",
        detail: "최소 인원인 야간 상황을 가정하여 연 2회 이상 실전 훈련을 하고 피난 유도자가 지정됨",
        icon: "ShieldAlert",
        score: 0
      },
      {
        id: "train_bad",
        label: "주간 위주 또는 형식적 훈련",
        detail: "주로 주간에 실시하거나, 훈련이 부족하여 실제 상황 발생 시 역할 분담이 안 됨",
        icon: "ShieldAlert",
        score: 1
      }
    ]
  },
  {
    id: "q7_resources",
    title: "7. 외부 이송 자원 확보",
    description: "화재 직후 건물 밖으로 빼낸 환자들을 대피시킬 물적 자원(차량 등) 확보 상태는 어떻습니까?",
    options: [
      {
        id: "res_good",
        label: "자체 완비 또는 민간 연계",
        detail: "자체 보유 휠체어 리프트 차량이 있거나 인근 민간 이송업체/병원과 즉각 연계됨",
        icon: "Truck",
        score: 0
      },
      {
        id: "res_bad",
        label: "즉각적 차량 지원 불가",
        detail: "직원 개인 차량에 의존하거나 화재 시 즉시 동원할 수송 대책이 없음",
        icon: "Truck",
        score: 1
      }
    ]
  }
];

export const iconMap = {
  MapPin,
  Building,
  MoveHorizontal,
  Users,
  Moon,
  ShieldAlert,
  Truck
};
