<h1 align="center">AICC Project 1 - HappyPet</h1><h3 align="center">동물병원 조회 및 예약문의 서비스</h3>

## 프로젝트 소개

[펫트라슈](https://www.petraschu.com/)
라는 실제 사이트를 참조하여 만들었습니다.

- 이 Repository에서는 백엔드에 관한 내용만 담고 있습니다.
- 개발기간 24.08.20 ~ 24.09.03
- 백엔드 서버: <https://happypetback.aiccchant.com>

## 시작 가이드

- Requirements
  1. node.js 20.15.1
  2. npm 10.7.0
  3. postgreSQL(pgadmin4)

- Installation
```  bash
  1. $ git clone https://github.com/leejh7778/happypet-back.git
  2. $ npm install
  3. $ npm run dev
```

## Stacks 🐈


### Environment
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)
![Node.JS](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white")
![AWS](https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white")

### Config
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

### Development
![Html](https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white")
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white)


## 엔드포인트

- 회원가입: https://happypetback.aiccchant.com/register
- 로그인: https://happypetback.aiccchant.com/login
- 병원 조회: https://happypetback.aiccchant.com/hospitals
- 예약 신청: https://happypetback.aiccchant.com/post_reserv
- 1대1 문의: https://happypetback.aiccchant.com/post_inq
- 예약 신청 내역 조회: https://happypetback.aiccchant.com/get_reserv/:userid
- 1대1 문의 내역 조회: https://happypetback.aiccchant.com/get_inq/:userid
- 예약 신청 내역 수정: https://happypetback.aiccchant.com/update_reserv/:reserv_idx
- 1대1 문의 내역 수정: https://happypetback.aiccchant.com/update_inq/:inq_idx
- 예약 신청 내역 삭제: https://happypetback.aiccchant.com/delete_reserv/:reserv_idx
- 1대1 문의 내역 삭제: https://happypetback.aiccchant.com/delete_inq/:inq_idx
- 회원 탈퇴: https://happypetback.aiccchant.com/delete_account

## 주요기능

- 로그인&회원가입
- 현재 위치 기반 주변 병원조회, 원하는 지역 검색
- 예약 및 1대1문의 신청
- 마이페이지에서 내역 조회/수정/삭제
