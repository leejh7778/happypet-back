const pool = require('../database/database');
const { v4: uuid4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { body, validationResult } = require('express-validator');

dotenv.config();

const saltRounds = 10;
const isProduction = process.env.NODE_ENV === 'production';

exports.postReserv = async (req, res) => {
  const reserv_idx = uuid4();
  const {
    userid,
    username,
    pn,
    hosp_name,
    hosp_pn,
    date,
    dog,
    cat,
    etc,
    descriptionR,
  } = req.body;

  if (!username || !pn || !date) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  try {
    await pool.query(
      'INSERT INTO reserv (reserv_idx, userid, username, pn, hosp_name, hosp_pn, date, dog, cat, etc, descriptionR) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
      [
        reserv_idx,
        userid,
        username,
        pn,
        hosp_name,
        hosp_pn,
        date,
        dog,
        cat,
        etc,
        descriptionR,
      ]
    );
    return res
      .status(201)
      .json({ message: 'Reservation Created Successfully' });
  } catch (error) {
    console.error(error); // 서버 오류 로그
    return res.status(500).json({ message: 'Failed to create reservation' });
  }
};

exports.postInq = async (req, res) => {
  const inq_idx = uuid4();
  const { userid, username, hosp_name, hosp_pn, pn, descriptionI } = req.body;

  if (!username || !pn || !descriptionI) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  try {
    await pool.query(
      'INSERT INTO inquiry (inq_idx, userid, username, pn, hosp_name, hosp_pn, descriptionI) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [inq_idx, userid, username, pn, hosp_name, hosp_pn, descriptionI]
    );
    return res.status(201).json({ message: 'Inquiry Created Successfully' });
  } catch (error) {
    console.error(error); // 서버 오류 로그
    return res.status(500).json({ message: 'Failed to create inquiry' });
  }
};

exports.postUser = async (req, res) => {
  const { userid, username, email, password } = req.body;

  if (!userid || !username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const values = [userid, hash, username, email];

    await pool.query(
      'INSERT INTO hospuser (userid, password, username, email) VALUES ($1, $2, $3, $4)',
      values
    );
    return res.status(201).json({ message: 'Account Created Successfully' });
  } catch (error) {
    console.error(error); // 서버 오류 로그
    if (error.code === '23505') {
      if (error.detail.includes('userid')) {
        return res.status(409).json({ message: '이미 존재하는 아이디입니다.' });
      } else if (error.detail.includes('email')) {
        return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
      }
    }
    return res.status(500).json({ message: 'Failed to create account' });
  }
};

exports.loginUser = [
  // Validate and sanitize input
  body('userid').trim().escape().notEmpty().withMessage('아이디는 필수입니다.'),
  body('password').trim().notEmpty().withMessage('패스워드는 필수입니다.'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userid, password } = req.body;

    try {
      const { rows } = await pool.query(
        'SELECT * FROM hospuser WHERE userid = $1',
        [userid]
      );

      if (!rows.length) {
        return res.status(404).json({ message: '아이디가 일치하지 않습니다.' });
      }

      const user = rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: '패스워드가 일치하지 않습니다.' });
      }

      const token = jwt.sign(
        { userid: user.userid, username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.cookie('token', token, {
        httpOnly: true,
        sameSite: isProduction ? 'None' : 'Lax',
        secure: isProduction,
      });

      return res.status(200).json({ token });
    } catch (error) {
      console.error('Login error:', error); // 로그인 오류 로그
      return res.status(500).json({ message: '로그인에 실패하였습니다.' });
    }
  },
];
