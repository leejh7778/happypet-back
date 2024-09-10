const database = require('../database/database');

// const updateItem = async (req, res, column, value, fields, successMessage) => {
//   const setClause = Object.keys(fields)
//     .map((key, index) => `${key} = $${index + 2}`)
//     .join(', ');

//   const values = [value, ...Object.values(fields)];

//   try {
//     const result = await database.query(
//       `UPDATE task SET ${setClause} WHERE ${column} = $1`,
//       values
//     );

//     if (result.rowCount === 0) {
//       return res.status(404).json({ message: 'Item not found' });
//     }

//     return res.status(200).json({ message: successMessage });
//   } catch (error) {
//     return res.status(500).json({ message: `Update failed: ${error.message}` });
//   }
// };

// exports.updateReserv = async (req, res) => {
//   const reserv_idx = req.params.reserv_idx;
//   const { username, pn, date, dog, cat, etc, descriptionR } = req.body;

//   const fields = { username, pn, date, dog, cat, etc, descriptionR };

//   // 전달된 값만 업데이트
//   const filteredFields = Object.fromEntries(
//     Object.entries(fields).filter(([_, value]) => value !== undefined)
//   );

//   await updateItem(
//     req,
//     res,
//     'reserv_idx',
//     reserv_idx,
//     filteredFields,
//     'Reservation Updated Successfully'
//   );
// };

// exports.updateInq = async (req, res) => {
//   const inq_idx = req.params.inq_idx;
//   const { username, pn, descriptionI } = req.body;

//   const fields = { username, pn, descriptionI };

//   // 전달된 값만 업데이트
//   const filteredFields = Object.fromEntries(
//     Object.entries(fields).filter(([_, value]) => value !== undefined)
//   );

//   await updateItem(
//     req,
//     res,
//     'inq_idx',
//     inq_idx,
//     filteredFields,
//     'Inquiry Updated Successfully'
//   );
// };

// 예약 업데이트 (put)
// exports.updateReserv = async (req, res) => {
//   const reserv_idx = req.params.reserv_idx; // URL에서 reserv_idx를 추출
//   const {
//     username,
//     pn,
//     hosp_name,
//     hosp_pn,
//     date,
//     dog,
//     cat,
//     etc,
//     descriptionR,
//   } = req.body;

//   try {
//     const result = await database.query(
//       'UPDATE reserv SET username = $1, pn = $2, hosp_name = $3, hosp_pn = $4, date = $5, dog = $6, cat = $7, etc = $8, descriptionR = $9 WHERE reserv_idx = $10',
//       [
//         username,
//         pn,
//         hosp_name,
//         hosp_pn,
//         date,
//         dog,
//         cat,
//         etc,
//         descriptionR,
//         reserv_idx,
//       ]
//     );

//     if (result.rowCount === 0) {
//       return res.status(404).json({ message: 'Reservation not found' });
//     }

//     return res
//       .status(200)
//       .json({ message: 'Reservation Updated Successfully' });
//   } catch (error) {
//     return res.status(500).json({ message: `Update Failed: ${error.message}` });
//   }
// };

exports.updateReserv = async (req, res) => {
  const reserv_idx = req.params.reserv_idx;
  const updates = req.body;

  // 동적으로 쿼리와 값을 구성
  const setClause = Object.keys(updates)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(', ');
  const values = Object.values(updates);

  try {
    const result = await database.query(
      `UPDATE reserv SET ${setClause} WHERE reserv_idx = $${values.length + 1}`,
      [...values, reserv_idx]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    return res
      .status(200)
      .json({ message: 'Reservation Updated Successfully' });
  } catch (error) {
    return res.status(500).json({ message: `Update Failed: ${error.message}` });
  }
};

exports.updateInq = async (req, res) => {
  const inq_idx = req.params.inq_idx;
  const updates = req.body;

  // 동적으로 쿼리와 값을 구성
  const setClause = Object.keys(updates)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(', ');
  const values = Object.values(updates);

  try {
    const result = await database.query(
      `UPDATE inquiry SET ${setClause} WHERE inq_idx = $${values.length + 1}`,
      [...values, inq_idx]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    return res.status(200).json({ message: 'Inquiry Updated Successfully' });
  } catch (error) {
    return res.status(500).json({ message: `Update Failed: ${error.message}` });
  }
};
