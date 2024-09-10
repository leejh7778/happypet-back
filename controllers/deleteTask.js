const database = require('../database/database');

const deleteReservation = async (req, res, column, value, successMessage) => {
  try {
    const result = await database.query(
      `DELETE FROM reserv WHERE ${column} = $1`,
      [value]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    return res.status(200).json({ message: successMessage });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Deletion failed: ${error.message}` });
  }
};

const deleteInquiry = async (req, res, column, value, successMessage) => {
  try {
    const result = await database.query(
      `DELETE FROM inquiry WHERE ${column} = $1`,
      [value]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    return res.status(200).json({ message: successMessage });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Deletion failed: ${error.message}` });
  }
};

exports.deleteReserv = async (req, res) => {
  const reserv_idx = req.params.reserv_idx;
  await deleteReservation(
    req,
    res,
    'reserv_idx',
    reserv_idx,
    'Reservation Deleted Successfully'
  );
};

exports.deleteInq = async (req, res) => {
  const inq_idx = req.params.inq_idx;
  await deleteInquiry(
    req,
    res,
    'inq_idx',
    inq_idx,
    'Inquiry Deleted Successfully'
  );
};

exports.deleteAccount = async (req, res) => {
  const { userid } = req.user; // 인증된 사용자 정보를 요청 객체에서 추출

  try {
    // 사용자 정보 삭제
    const result = await database.query(
      'DELETE FROM hospuser WHERE userid = $1',
      [userid]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // 성공적으로 삭제된 경우
    return res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete Failed:', error);
    return res.status(500).json({ message: `Delete Failed: ${error.message}` });
  }
};
