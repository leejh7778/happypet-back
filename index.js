const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const pool = require('./database/database');
const JWT_SECRET = process.env.JWT_SECRET;
const proj4 = require('proj4');
const bodyParser = require('body-parser');

const PORT = '8080';
const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// 로그인 API 엔드포인트
app.post('/login', async (req, res) => {
  const { userid, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM hospuser WHERE userid = $1',
      [userid]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const token = jwt.sign({ userid: user.userid }, JWT_SECRET, {
          expiresIn: '1h',
        });
        res.json({ success: true, token });
      } else {
        res.json({
          success: false,
          message: '아이디 또는 비밀번호가 일치하지 않습니다.',
        });
      }
    } else {
      res.json({
        success: false,
        message: '아이디 또는 비밀번호가 일치하지 않습니다.',
      });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: '서버 오류가 발생했습니다.' });
  }
});

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

app.get('/', (request, response) => {
  response.send('hello World');
});

// 마이페이지 API 엔드포인트
app.get('/mypage', authenticateToken, async (req, res) => {
  const { userid } = req.user;

  try {
    const result = await pool.query(
      'SELECT * FROM hospuser WHERE userid = $1',
      [userid]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.json({
        success: true,
        user: {
          userid: user.userid,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      res.json({ success: false, message: '사용자 정보를 찾을 수 없습니다.' });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: '서버 오류가 발생했습니다.' });
  }
});
// EPSG:2097 (Bessel 중부원점TM) 좌표계 정의
proj4.defs(
  'EPSG:2097',
  '+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs'
);

// 병원 데이터 가져오기 엔드포인트
app.get('/hospitals', async (req, res) => {
  try {
    console.log('Fetching hospital data...');
    const result = await pool.query(
      'SELECT hosp_name, hosp_add, hosp_post, hosp_pn, hosp_x, hosp_y FROM hosp limit 500'
    );
    console.log(`Fetched ${result.rows.length} hospitals`);

    const hospitals = result.rows.map((hospital) => {
      console.log(`Processing hospital: ${hospital.hosp_name}`);
      const [lng, lat] = proj4('EPSG:2097', 'EPSG:4326', [
        parseFloat(hospital.hosp_x),
        parseFloat(hospital.hosp_y),
      ]);
      return {
        hosp_name: hospital.hosp_name,
        hosp_add: hospital.hosp_add,
        hosp_post: hospital.hosp_post,
        hosp_pn: hospital.hosp_pn,
        hosp_x: lng, // 변환된 경도
        hosp_y: lat, // 변환된 위도
      };
    });
    res.status(200).json(hospitals);
  } catch (error) {
    console.error('Error fetching hospital data:', error);
    res.status(500).json({ message: 'Failed to fetch hospital data.' });
  }
});

// 기타 라우트 설정
app.use(require('./routes/getRoute'));
app.use(require('./routes/postRoute'));
app.use(require('./routes/deleteRoute'));
app.use(require('./routes/updateRoute'));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
