-- 테이블 생성(회원가입)
CREATE TABLE hospuser (
    user_idx UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userid VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE
);

-- 테이블 생성(병원조회)
CREATE TABLE hosp (
    hosp_idx UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hosp_name TEXT NOT NULL,
    hosp_add TEXT NOT NULL,
    hosp_post TEXT NOT NULL,
    hosp_pn TEXT NOT NULL,
    hosp_x TEXT NOT NULL,
    hosp_y TEXT NOT NULL
);

-- 테이블 생성(예약)
CREATE TABLE reserv (
    reserv_idx UUID PRIMARY KEY,
    -- user_idx UUID REFERENCES hospUser(user_idx),
    userid VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    pn TEXT NOT NULL,
    hosp_name TEXT NOT NULL,
    hosp_pn TEXT NOT NULL,
    date DATE NOT NULL,
    dog BOOLEAN NOT NULL DEFAULT false,
    cat BOOLEAN NOT NULL DEFAULT false,
    etc BOOLEAN NOT NULL DEFAULT false,
    descriptionR TEXT NOT NULL
);

-- 테이블 생성(1대1문의)
CREATE TABLE inquiry (
    inq_idx UUID PRIMARY KEY,
    -- user_idx UUID REFERENCES hospUser(user_idx),
    userid VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    pn TEXT NOT NULL,
    hosp_name TEXT NOT NULL,
    hosp_pn TEXT NOT NULL,
    descriptionI TEXT NOT NULL
);

-- -- 테이블 생성(마이페이지-예약정보 조회)
-- CREATE TABLE reservInfo (
--     rInfo_idx UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     user_idx UUID REFERENCES hospUser(user_idx),
--     username VARCHAR(100) NOT NULL,
--     pn TEXT NOT NULL,
--     date DATE NOT NULL,                                   
--     hosp_idx UUID REFERENCES hosp(hosp_idx),
--     dog BOOLEAN NOT NULL DEFAULT false,
--     cat BOOLEAN NOT NULL DEFAULT false,
--     etc BOOLEAN NOT NULL DEFAULT false,
--     descriptionr TEXT NOT NULL
-- );

-- -- 테이블 생성(마이페이지-1대1문의 조회)
-- CREATE TABLE inquiryInfo (
--     iInfo_idx UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     user_idx UUID REFERENCES hospUser(user_idx),
--     username VARCHAR(100) NOT NULL,
--     pn TEXT NOT NULL,
--     hosp_idx UUID REFERENCES hosp(hosp_idx),                
--     descriptioni TEXT NOT NULL
-- );


