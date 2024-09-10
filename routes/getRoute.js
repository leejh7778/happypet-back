const express = require('express');
const router = express.Router(); // api path를 전달해 주는 메서드
const { getReserv, getInq } = require('../controllers/getTask');
const jwt = require('jsonwebtoken');

// JWT 토큰 인증 미들웨어
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // 토큰이 없으면 인증 실패

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // 토큰 검증 실패
    req.user = user; // 검증된 사용자 정보를 요청 객체에 추가
    next(); // 다음 미들웨어 또는 라우터로 이동
  });
};

router.get('/get_reserv/:userid', getReserv); // 예약내역 조회
router.get('/get_inq/:userid', getInq); // 1대1문의내역 조회

module.exports = router; // router 모듈 내보내기
