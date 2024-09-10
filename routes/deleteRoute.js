const router = require('express').Router();
const {
  deleteReserv,
  deleteInq,
  deleteAccount,
} = require('../controllers/deleteTask');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// JWT 토큰 인증 미들웨어
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // 토큰이 없으면 인증 실패

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // 토큰 검증 실패
    req.user = user; // 검증된 사용자 정보를 요청 객체에 추가
    next(); // 다음 미들웨어 또는 라우터로 이동
  });
};

router.delete('/delete_reserv/:reserv_idx', deleteReserv);
router.delete('/delete_inq/:inq_idx', deleteInq);
router.delete('/delete_account', authenticateToken, deleteAccount);

module.exports = router;
