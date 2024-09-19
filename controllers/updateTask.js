const database = require('../database/database');

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
