
const express = require('express');
const app = express();
var port = 4000;

// app.get('/api/hello', (req, res) => {


//     res.json({
//         state : 200,
//         message : 'Hello World'
//     })
// })

// app.listen(port, () => {
//     console.log(`http://localhost:${port}`)
// })



var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '211.206.227.168',
  port     : '3306',
  user     : 'jpdtpia',
  password : '!dtpiajp',
  database : 'dtpia'
});

connection.connect();
 
connection.query('SELECT * FROM user', function (error, results, fields) {
  if (error){
      console.log('error : ', error);
      
  };
  console.log('The solution is: ', results);
  results_data(results);
});
 
connection.end();


function results_data(result){
    app.get('/api/hello', (req, res) => {
        // res.send({
        //     state : 200,
        //     message : result
        // })

        res.send(result)
    })

    app.listen(port, () => {
        console.log(`http://localhost:${port}`)
    })
}