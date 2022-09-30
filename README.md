# 식스샵 프론트개발자 채용 과제

- [과제 안내 링크](https://www.notion.so/sixshop/af7f8a9586b648e6ba92a8c24ff0ef66)
- 과제 제출 기한은 과제 메일 발송일로부터 7일 후 자정 12시까지 입니다. 기한을 꼭 지켜주세요.

## 개발 체크 사항

- 각 Page에서 공통적으로 쓰이는 컴포넌트 추출

  - Header
    - ./src/components/Header.tsx

- 상품 목록 이미지 비율 유지
- `localStorage 관리`
  - `localStorage.infiniteScrollData`
    - 무한 스크롤 페이지에서 스크롤 시 요청받는 데이터를 로컬 스토리지에 저장.
      - [무한 스크롤 페이지]에서 스크롤 하여 목록 더 보기 -> 상품 상세 화면으로 이동 -> 다시 이전 페이지(/infinite-scroll)로 돌아오면 기존에 로드한 목록을 보여주기 위함.
      ```
        {
          page: API 요청한 페이지 값,
          totalCount: 총 데이터 길이,
          productItems: 데이터 목록
        }
      ```
  - `localStorage.infiniteScrollPosY`
    - 무한 스크롤 페이지에서 스크롤 시 위치값 저장
