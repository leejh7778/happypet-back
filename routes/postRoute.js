const router = require('express').Router();
const {
  postReserv,
  postInq,
  postUser,
  loginUser,
} = require('../controllers/postTask');

router.post('/post_reserv', postReserv);
router.post('/post_inq', postInq);
router.post('/register', postUser);
router.post('/login', loginUser);

module.exports = router;
