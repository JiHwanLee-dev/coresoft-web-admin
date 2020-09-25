

const config = require('./DBConfig');
const sql = require('mssql');
const express = require('express');
const app = express();
var port = 4000;
const cors = require('cors');         // express의 cors모듈 로드
var qs = require('querystring');

// app.get('/api/hello', (req, res) => {


//     res.json({
//         state : 200,
//         message : 'Hello World'
//     })
// })

// app.listen(port, () => {
//     console.log(`http://localhost:${port}`)
// })



// express의 cors 미들웨어를 통한 cross origin 허용 설정
app.use(cors());

// 공지사항 전체목록 보기
app.get('/notice', (req, res) => {
  getNoticeList(res, req);
})

// 공지사항 특정 데이터 보기
// req, res 순서 안바뀌게 주의
app.get('/notice/noticeDetail/:index', (req, res) => {
  console.log('req : ', req.params)

  const index = req.params.index
  // res.send(req)   // 클라이언트에 결과값 보냄
  getNoticeDetail(res, req, index);
})

// 로그인 정보 확인
app.post('/login_process/:info', (req, res) => {
  console.log('req : ' , req.params.info);

  var jsonParse = JSON.parse(req.params.info); // 문자열을 json으로 파싱
  
  var email = jsonParse.email
  var password = jsonParse.password

  console.log('email : ',email)
  console.log('password : ', password)
  //const post = JSON.stringify(req.params);

  //console.log('req22 : ' , post);

  loginProcess(res, email, password);
})






// 로그인 체크
async function loginProcess(res, email, password){
  try {
    console.log('email2 : ', email)
    console.log('password2 : ', password)

    var data1 = 'kony';

    var query = `SELECT * FROM TB_ADMIN_USER WHERE admin_id = '${email}'
    AND pwd = '${password}'`;

    console.log('query : ', query)

    let pool = await sql.connect(config)
    let result1 = await pool.request()
        //.query(`SELECT * FROM TB_NOTICE WHERE idx = 1`);
        //.query(`SELECT * FROM TB_NOTICE WHERE title = '공지사항1'`);
        .query(`SELECT * FROM TB_ADMIN_USER WHERE admin_id = '${email}'
                AND pwd = '${password}'`);
      
    //console.log(result1)
    //console.log(result1.recordsets)
    //console.log(result1.recordset)
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
      res.send('success')
    }

    res.send(result1)   // 클라이언트에 결과값 보냄

  } catch (err) {
      // ... error checks
      console.log('err is ', err)
  }
}







// 공지사항 전체 불러오는 함수
async function getNoticeList(res,req){
  try {
    let pool = await sql.connect(config)
    let result1 = await pool.request()
        .query('SELECT * FROM TB_NOTICE ORDER BY idx DESC')
        
    //console.log(result1)
    res.send(result1)   // 클라이언트에 결과값 보냄

  } catch (err) {
      // ... error checks
      console.log('err is ', err)
  }
}

// 공지사항 특정 데이터 불러오기
async function getNoticeDetail(res, req, index){
  try {
  
    let pool = await sql.connect(config)
    let result1 = await pool.request()
        .query(`SELECT * FROM TB_NOTICE WHERE idx = ${index}`)
        
    //console.log(result1)
    res.send(result1)   // 클라이언트에 결과값 보냄

  } catch (err) {
      // ... error checks
      console.log('err is ', err)
  }
}









sql.on('error', err => {
  // ... error handler
  console.log('err is ', err)
})



app.listen(port, () => {
    console.log(`http://localhost:${port}`)
 })


















// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : '211.206.227.168',
//   port     : '3306',
//   user     : 'jpdtpia',
//   password : '!dtpiajp',
//   database : 'dtpia'
// });

// connection.connect();
 
// connection.query('SELECT * FROM user', function (error, results, fields) {
//   if (error){
//       console.log('error : ', error);
      
//   };
//   console.log('The solution is: ', results);
//   results_data(results);
// });
 
// connection.end();


// function results_data(result){
//     app.get('/api/hello', (req, res) => {
//         // res.send({
//         //     state : 200,
//         //     message : result
//         // })

//         res.send(result)
//     })

//     app.listen(port, () => {
//         console.log(`http://localhost:${port}`)
//     })
// }