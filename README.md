# 원티드 프론트엔드 코딩 테스트

## 프로젝트 개요

`시바견의, 시바견에 의한, 시바견을 위한` 사이트를 완성하고자 합니다.
시바견 이미지 리스트를 보여주는 페이지를 완성하세요.

### 요구사항

- Buttons.js 컴포넌트의 GET DOGS 버튼과 CLEAR DOGS 버튼을 구현해야합니다.

  - GET DOGS 버튼을 클릭하면 API 호출을 통해 리스트가 나타나야 합니다.
  - 시바견 이미지 리스트는 `GET /data.json`으로 제공 됩니다. js 코드 안에서 직접 `data.json`을 임포트하지 말고 http 리퀘스트를 이용해서 데이터를 받아와야 합니다.
  - CLEAR DOGS 버튼 클릭 시 기존 리스트 데이터가 삭제되어야 합니다.

- List.js 컴포넌트를 구현해아합니다.

  - Desktop view(>= 768px)에서는 한 열당 네 개의 시바견 이미지가 보여야 합니다.
  - Mobile view(< 768px)에서는 한 열당 한 개의 시바견 이미지가 보여야 합니다.
  - 시바견 이미지의 비율을 유지한 채로 보여줘야 합니다. (crop이나 resize 불가능)
  - 스크롤의 끝까지 왔을 때 다시 API를 호출하여 리스트 데이터를 추가하여 페이지네이션을 구현해야 합니다.

- 프로그램은 오류 없이 작동되어야 합니다.
- 문제를 어떻게 해결했는지에 README.md 파일에 설명을 추가해주세요.

### 기타 요구 사항

- 과제를 완료하신 후 메일로 인사 담당자에게 작업하신 github repository url을 알려주세요.
- eslint warning이나 error가 없어야 합니다.
- CSS 관련 라이브러리는 사용하지 않아야 합니다. (ex. 부트스트랩, 매터리얼ui 등)
- 기타 필요한 라이브러리는 자유롭게 사용하신 후 문제 해결 방법 섹션에 설명으로 적어주세요.
- 리스트의 UI 디자인 기본 사항은 아래 그림 참고하세요.
  ![UI example](https://s3.ap-northeast-2.amazonaws.com/wanted-public/sample.jpg)

## Scripts

### `yarn run start` or `npm run start`

해당 명령어를 실행할 경우 [http://localhost:3000](http://localhost:3000) 브라우저에 열립니다.

해당 페이지를 참고하며 프로젝트를 완성해주세요.

### 기타 사항

이 프로젝트는 create-react-app (CRA)에 기초해 있습니다. 되도록 eject를 하지 않고 프로젝트를 진행해주세요.
프로젝트를 확장을 원하실 경우 CRA에 있는 다양한 툴을 사용하셔도 무방합니다.
혹시 질문 사항이 있으신 경우 코딩 과제 메일의 참조 이메일 주소를 통해 질문해주시면 됩니다.

### 참고

- [Wanted news page](https://www.wanted.co.kr/news)
- [Create react app](https://facebook.github.io/create-react-app/)

### 문제 해결 방법

- 이 섹션에 문제를 해결한 방법을 적어주세요.

#### 추가 패키지

```bash
# redux 미들웨어 (외부 데이터 연동)
$ yarn add redux-thunk

# 개발 툴로 redux 디버깅 관련 패키지
$ yarn add redux-devtools-extension

# airbnb 의 js, jsx eslint rule
$ yarn add eslint-config-airbnb --dev

# 매 프로젝트마다 설치하는 것보다 작업자 로컬에 한번 설치 되는 것이 나을 것 같습니다.
$ yarn global add eslint
```

#### todo

- [x] redux-chunk middleware
- [x] action
  - [x] GET_DOGS
  - [x] CLEAR_DOGS
- [x] Button
- [x] List
  - [ ] 스타일
  - [ ] 페이지네이션
- [ ] eslint

#### 설명

- eslint

  - react-app (default)
  - airbnb (https://github.com/airbnb/javascript/tree/master/react)
  - `package.json`에 설정되어있어서 airbnb 추가하였습니다.

- prettier

  - `settings.json` 에서 "eslint.autoFixOnSave": true 설정하여 사용했습니다.

- redux

  - getDogs: redux-chunk 미들웨어 적용하여 `/data.json` fetch 후 dogs state 에 추가
  - clearDogs: image url 이 포함되어있는 dogs state 를 초기화

- Buttons.js

구조는 크게 바꾸지 않고 구현했습니다.  
`GET DOGS` 와 `CLEAR DOGS` 를 보고 redux 를 사용하여 구현하기를 유도하신 거 같아 두 개의 액션을 만들어서 `Buttons.js`에 적용했습니다. API Request 처럼 외부 데이터를 fetch 하여 state 를 관리할 수 있도록 redux-chunk 미들웨어를 적용하였습니다.

- List.js

  - d

- 구현 예정
  - List 스타일: css + javascript
  - List 페이지네이션: debounce 또는 throttle 적용하여 최적화
