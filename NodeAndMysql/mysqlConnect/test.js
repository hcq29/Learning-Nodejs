var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'rootroot',
  database : 'users'
});
 
connection.connect();
 
connection.query('SELECT * FROM `user`', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

// connection.query('INSERT INTO user VALUES(null,"Jack","1234")', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results);
//   });
 
connection.end();