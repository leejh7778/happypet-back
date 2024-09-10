const database = require('../database/database');

const getItems = async (req, res, column, value) => {
  try {
    const query = `SELECT * FROM task WHERE ${column} = $1 ORDER BY created_at DESC`;
    const result = await database.query(query, [value]);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ msg: `Get Items Fail: ${error.message}` });
  }
};

// 공통된 아이템 조회 함수
const getItemsByUserId = async (req, res, tableName) => {
  const userid = req.user.userid; // JWT에서 추출된 로그인된 사용자의 userid

  try {
    const query = `SELECT * FROM ${tableName} WHERE userid = $1 ORDER BY created_at DESC`;
    const result = await database.query(query, [userid]);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ msg: `Get Items Fail: ${error.message}` });
  }
};

exports.gethosp = async (req, res) => {
  const hosp_idx = req.params.hosp_idx;
  console.log(hosp_idx);
  await getItems(req, res, 'hosp_idx', hosp_idx);
};

// 예약 정보를 가져오는 함수
exports.getReserv = async (req, res) => {
  const userid = req.params.userid; // JWT에서 추출된 로그인된 사용자의 userid

  try {
    const query = `
      SELECT 
        reserv_idx, 
        userid, 
        username, 
        pn, 
        hosp_name, 
        hosp_pn, 
        TO_CHAR(date, 'YYYY-MM-DD') AS date, 
        dog, 
        cat, 
        etc, 
        descriptionR 
      FROM reserv 
      WHERE userid = $1
    `;
    const result = await database.query(query, [userid]);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ msg: `Get Items Fail: ${error.message}` });
  }
};

// 1:1 문의 정보를 가져오는 함수
exports.getInq = async (req, res) => {
  const userid = req.params.userid; // JWT에서 추출된 로그인된 사용자의 userid

  try {
    const query = `
      SELECT 
        inq_idx, 
        userid, 
        username, 
        hosp_name, 
        hosp_pn, 
        pn, 
        descriptionI 
      FROM inquiry
      WHERE userid = $1
    `;
    const result = await database.query(query, [userid]);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ msg: `Get Items Fail: ${error.message}` });
  }
};
