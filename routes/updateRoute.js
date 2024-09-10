const router = require('express').Router();
const { updateReserv, updateInq } = require('../controllers/updateTask');

// 예약 항목 업데이트
router.patch('/update_reserv/:reserv_idx', updateReserv);

// 문의 항목 업데이트
router.patch('/update_inq/:inq_idx', updateInq);

module.exports = router;
