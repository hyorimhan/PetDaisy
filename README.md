

<div align="center">
  <img src="https://github.com/user-attachments/assets/07600da3-9713-4202-8dd4-df77754bf198"
 alt="PetDaisy Logo" width="200">
  
  ### 반려동물의 건강과 일상을 체계적으로 기록하는 스마트 헬스케어 다이어리
  
  <a href="https://pet-daisy.vercel.app">🔗 배포 링크</a> &nbsp; | &nbsp; 
  <a href="https://swanky-find-76e.notion.site/162f0495803c80cba576f4a816e219be?pvs=4">📚 기술 문서</a>
</div>

## 💫 프로젝트 소개
펫데이지는 소중한 반려동물의 건강 여정을 함께하는 똑똑한 건강 관리 플랫폼입니다. 체중 변화부터 병원 진료 기록, 예방접종 일정까지 한눈에 확인할 수 있어 더욱 건강한 반려생활을 도와드립니다.

## 주요 기능 ⚡
| 기능 | 설명 |
|:---:|---|
| 프로필 관리 | 반려동물의 기본 정보를 등록하고 관리 |
| 체중 기록 | 반려동물의 체중 변화를 그래프로 시각화 |
| 진료 기록 | 병원 방문 기록과 진료 내용을 체계적으로 관리 |
| 예방접종 | 예방접종 일정을 등록하고 알림 서비스 제공 |
| 증상 기록 | 특이사항이나 증상을 사진과 함께 기록 |

## 👥 팀원 소개
| <img src="https://avatars.githubusercontent.com/u/123456789" width="130"><br/>**조민수** | <img src="https://avatars.githubusercontent.com/u/987654321" width="130"><br/>**한효림** |
|:---:|:---:|
| 메인 페이지 | 초기 셋팅 |
| 공통 컴포넌트 | 로그인/회원가입 |
| 동물 등록 | 헤더/푸터 |
| 진료 기록 | 증상 기록 |
| 예방 접종 | 몸무게 기록 |

## 개발 일정 ⏰

```mermaid
gantt
    dateFormat  YYYY-MM-DD
    title       PetDaisy 개발 일정
    
    section 기획/디자인
    UI/UX 디자인    :2024-12-02, 1d
    DB 설계        :2024-12-02, 1d
    초기 세팅      :2024-12-03, 1d
    
    section 개발
    기능 개발      :2024-12-04, 16d
    
    section 테스트/개선
    유저 테스트    :2024-12-20, 5d
    피드백 반영    :2024-12-20, 5d
```

## 🛠 기술 스택
| 분류 | 기술 | 선택 이유 |
|:---:|:---:|---|
| 프레임워크 | Next.js | • 서버/클라이언트 컴포넌트 효과적 분리<br>• 직관적인 페이지 라우팅<br>• SSR을 통한 초기 로딩 속도 개선<br>• SEO 최적화 |
| 상태관리 | TanStack Query | • 클라이언트 데이터 캐싱<br>• 자동 데이터 동기화<br>• 백그라운드 업데이트<br>• 직관적인 에러 및 로딩 상태 관리 |
| 상태관리 | Zustand | • 가벼운 전역 상태 관리<br>• 간단한 설정<br>• TypeScript 호환성<br>• Redux 대비 적은 보일러플레이트 |

## User Test 결과 📊
| 항목 | 내용 |
|:---:|---|
| 진행 일시 | 2024.12.20 - 2024.12.21 |
| 참여 인원 | 4명 |
| 테스트 환경 | • iOS (모바일/Safari)<br>• Mac (데스크톱/Chrome)<br>• Windows (데스크톱/Chrome) |
| 전반적 만족도 | 4.25/5 |
| 주요 피드백 | • 깔끔한 디자인<br>• 직관적인 UI<br>• 빠른 반응성 |

## 📱 스크린샷
<div align="center">
  <img src="/api/placeholder/200/400" alt="메인화면" width="200">
  <img src="/api/placeholder/200/400" alt="체중기록" width="200">
  <img src="/api/placeholder/200/400" alt="진료기록" width="200">
</div>

---
*더 나은 반려생활을 위한 우리의 여정은 계속됩니다* 🐾
