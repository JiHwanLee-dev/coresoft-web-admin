

const config = require('./DBConfig');
const sql = require('mssql');
const express = require('express');
const app = express();
var port = 4000;                      // 로컬 4000번 포트 사용. 
const cors = require('cors');         // express의 cors모듈 로드
var qs = require('querystring');



// express의 cors 미들웨어를 통한 cross origin 허용 설정
app.use(cors());


// 공지사항 전체목록 보기
app.get('/notice', (req, res) => {
  getNoticeList(res, req);
})

// 공지사항 전체 불러오는 함수
async function getNoticeList(res,req){
  try {
    let pool = await sql.connect(config)
    let result1 = await pool.request()
        .query(`SELECT * FROM TB_NOTICE WHERE use_yn = 'Y' ORDER BY idx DESC`)
        
    //console.log(result1)
    res.send(result1)   // 클라이언트에 결과값 보냄

  } catch (err) {
      // ... error checks
      console.log('err is ', err)
  }
}



// 공지사항 특정 데이터 보기
app.get('/notice/noticeDetail/:index', (req, res) => {
  console.log('req : ', req.params)

  const index = req.params.index
  getNoticeDetail(res, req, index);
})

// 공지사항 상세보기
async function getNoticeDetail(res, req, index){
  try {
  
    let pool = await sql.connect(config)


    // index에 맞는 공지사항 상세정보
    let result1 = await pool.request()
        .query(`SELECT * FROM TB_NOTICE WHERE idx = ${index}`)

    // 조회수 1증가 쿼리
    let result2 = await pool.request()
        .query(`UPDATE TB_NOTICE SET hit = hit + 1 WHERE idx = ${index}`)
        
    res.send(result1)   // 클라이언트에 결과값 보냄

  } catch (err) {
      console.log('err is ', err)
  }
}







// 국내외 개발실적 전체목록 보기
app.get('/archievement', (req, res) => {
  getArchievement(res, req);
})

// 국내외 개발실적 전체 불러오는 함수
async function getArchievement(res,req){
  try {
    let pool = await sql.connect(config)
    let result1 = await pool.request()
        .query(`SELECT idx, (year + '.' + month) AS date, title, content FROM TB_BUSINESS_ARCHIEVEMENTS WHERE use_yn = 'Y' ORDER BY idx DESC`)
        
    res.send(result1)   // 클라이언트에 결과값 보냄

  } catch (err) {
      // ... error checks
      console.log('err is ', err)
  }
}





// 국내외 개발실적 특정 데이터 보기
app.get('/archievement/archievementDetail/:index', (req, res) => {
  console.log('req : ', req.params)

  const index = req.params.index
  getArchievementDetail(res, req, index);
})

// 국내외 개발실적 상세보기
async function getArchievementDetail(res, req, index){
  try {
  
    let pool = await sql.connect(config)

    // index에 맞는 국내외 개발실적 상세정보
    let result1 = await pool.request()
        .query(`SELECT * FROM TB_BUSINESS_ARCHIEVEMENTS WHERE idx = ${index}`)

    res.send(result1)   // 클라이언트에 결과값 보냄

  } catch (err) {
      console.log('err is ', err)
  }
}





// 회사 연혁 전체목록 보기
app.get('/companyHistory', (req, res) => {
  getCompanyHistory(res, req);

})

// 회사 연혁 전체 불러오는 함수
async function getCompanyHistory(res,req){
  try {
    let pool = await sql.connect(config)
    let result1 = await pool.request()
        .query(`SELECT idx, (year + '.' + month) AS date, title, content FROM TB_COMPANY_HISTORY WHERE use_yn = 'Y' ORDER BY idx DESC`)
        
    res.send(result1)   // 클라이언트에 결과값 보냄

  } catch (err) {
      // ... error checks
      console.log('err is ', err)
  }
}




// 회사 연혁 특정 데이터 보기
app.get('/companyHistory/companyHistoryDetail/:index', (req, res) => {
  console.log('req : ', req.params)

  const index = req.params.index
  getCompanyHistoryDetail(res, req, index);
})

// 회사 연혁 상세보기
async function getCompanyHistoryDetail(res, req, index){
  try {
  
    let pool = await sql.connect(config)

    // index에 맞는 회사 연혁 상세정보
    let result1 = await pool.request()
        .query(`SELECT * FROM TB_COMPANY_HISTORY WHERE idx = ${index}`)

    res.send(result1)   // 클라이언트에 결과값 보냄

  } catch (err) {
      // ... error checks
      console.log('err is ', err)
  }
}






// 공지사항, 국내외 개발실적, 회사 연혁 글 등록
app.get('/register/:index', (req, res) => {
  const index = JSON.parse(req.params.index)
  console.log('index : ', index)

  getRegister(res, req, index);
})

// 공지사항,국내외 개발실적, 회사 연혁 글 등록 함수
async function getRegister(res, req, index){
  try {

    let pool = await sql.connect(config)

    if(index.subject == 'notice'){
      console.log('notice')
      let result1 = await pool.request()
          .query(`INSERT INTO TB_NOTICE(title, content, use_yn, rgst_id, rgst_dt, rgst_tm, hit) 
          VALUES('${index.title}', '${index.content}', '${index.use_yn}', '${index.userId}', '${index.rgst_dt}', '${index.rgst_tm}', ${index.hit})`);

    }else if(index.subject == 'archievement'){
      console.log('archievement')
      let result1 = await pool.request()
          .query(`INSERT INTO TB_BUSINESS_ARCHIEVEMENTS(year, month, title, content, use_yn, rgst_id, rgst_dt, rgst_tm) 
          VALUES('${index.select_year}', '${index.select_month}', '${index.title}', '${index.content}', '${index.use_yn}', '${index.userId}', '${index.rgst_dt}', '${index.rgst_tm}')`);

    }else if(index.subject == 'companyHistory'){
      console.log('companyHistory')
      let result1 = await pool.request()
          .query(`INSERT INTO TB_COMPANY_HISTORY(year, month, title, content, use_yn, rgst_id, rgst_dt, rgst_tm) 
          VALUES('${index.select_year}', '${index.select_month}', '${index.title}', '${index.content}', '${index.use_yn}', '${index.userId}', '${index.rgst_dt}', '${index.rgst_tm}')`);
    }
    res.send(index.subject)   // 클라이언트에 결과값 보냄
  } catch (err) {
      // ... error checks
      console.log('err is ', err)
  }
}



// 공지사항, 국내외 개발실적, 회사 연혁 글 수정
app.get('/update/:index', (req, res) => {
  const index = JSON.parse(req.params.index)
  console.log('index : ', index)

  getUpdate(res, req, index);
})

// 공지사항,국내외 개발실적, 회사 연혁 글 수정 함수
async function getUpdate(res, req, index){
  try {

    let pool = await sql.connect(config)

    if(index.subject == 'notice'){
      console.log('notice')
      let result1 = await pool.request()
          .query(`UPDATE TB_NOTICE SET title = '${index.title}', content = '${index.content}', mdfy_id = '${index.userId}', mdfy_dt = '${index.mdfy_dt}',mdfy_tm = '${index.mdfy_tm}' 
                WHERE idx = ${index.index}`)

    }else if(index.subject == 'archievement'){
      console.log('archievement')
      let result1 = await pool.request()
          .query(`UPDATE TB_BUSINESS_ARCHIEVEMENTS SET title = '${index.title}', content = '${index.content}', mdfy_id = '${index.userId}', mdfy_dt = '${index.mdfy_dt}',mdfy_tm = '${index.mdfy_tm}' 
                WHERE idx = ${index.index}`)
          
    }else if(index.subject == 'companyHistory'){
      console.log('companyHistory')
      let result1 = await pool.request()
          .query(`UPDATE TB_COMPANY_HISTORY SET title = '${index.title}', content = '${index.content}', mdfy_id = '${index.userId}', mdfy_dt = '${index.mdfy_dt}',mdfy_tm = '${index.mdfy_tm}' 
                WHERE idx = ${index.index}`)   
    }

    res.send(index.subject)   // 클라이언트에 결과값 보냄

  } catch (err) {
      // ... error checks
      console.log('err is ', err)
  }

}






// 공지사항, 국내외 개발실적, 회사 연혁 글 삭제
app.get('/delete/:index', (req, res) => {
  console.log('req : ', req.params)

  const index = JSON.parse(req.params.index)
  console.log('del_index : ', index)

  getDelete(res, req, index);
})

// 공지사항,국내외 개발실적, 회사 연혁 글 삭제 함수
async function getDelete(res, req, index){
  try {

    let pool = await sql.connect(config)

    if(index.subject == 'notice'){
      console.log('notice')
      let result1 = await pool.request()
          .query(`UPDATE TB_NOTICE SET use_yn = '${index.use_yn}', del_id = '${index.userId}', del_dt = '${index.del_dt}', del_tm = '${index.del_tm}' 
                WHERE idx = ${index.index}`)

    }else if(index.subject == 'archievement'){
      console.log('archievement')
      let result1 = await pool.request()
          .query(`UPDATE TB_BUSINESS_ARCHIEVEMENTS SET use_yn = '${index.use_yn}', del_id = '${index.userId}', del_dt = '${index.del_dt}',del_tm = '${index.del_tm}' 
                 WHERE idx = ${index.index}`)

    }else if(index.subject == 'companyHistory'){
      console.log('companyHistory')
      let result1 = await pool.request()
          .query(`UPDATE TB_COMPANY_HISTORY SET use_yn = '${index.use_yn}', del_id = '${index.userId}', del_dt = '${index.del_dt}',del_tm = '${index.del_tm}' 
                 WHERE idx = ${index.index}`)
          
    }
    res.send(index.subject)   // 클라이언트에 결과값 보냄

  } catch (err) {
      // ... error checks
      console.log('err is ', err)
  }
}












// 로그인 정보 확인
app.post('/login_process/:info', (req, res) => {
  console.log('req : ' , req.params.info);

  var jsonParse = JSON.parse(req.params.info); // 문자열을 json으로 파싱
  
  var email = jsonParse.email
  var password = jsonParse.password

  console.log('email : ',email)
  console.log('password : ', password)

  loginProcess(res, email, password);
})






// 로그인 체크
async function loginProcess(res, email, password){
  try {
    console.log('email2 : ', email)
    console.log('password2 : ', password)

    var query = `SELECT * FROM TB_ADMIN_USER WHERE admin_id = '${email}'
    AND pwd = '${password}'`;

    console.log('query : ', query)

    let pool = await sql.connect(config)
    let result1 = await pool.request()
        .query(`SELECT admin_id, name FROM TB_ADMIN_USER WHERE admin_id = '${email}'
                AND pwd = '${password}'`);
      
    console.log(result1.rowsAffected)
    var row = result1.rowsAffected;
    console.log(row[0])

    // 로그인 실패
    if(row[0] == 0){
        console.log('아이디나 비밀번호 틀림')
        res.send('failed') 

    // 로그인 성공
    }else{
      console.log('로그인 성공')
      res.send(result1)
    }

    //res.send(result1)   // 클라이언트에 결과값 보냄

  } catch (err) {
      // ... error checks
      console.log('err is ', err)
  }
}






sql.on('error', err => {
  // ... error handler
  console.log('err is ', err)
})

// localhost:4000 포트 사용
// 배포시 실서버 주소로 ?
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
 })
