const mysql = require("mysql")
const pool  = mysql.createPool({
  connectionLimit : 100,//最多处理多少连接次数
  host     : 'localhost',
  user     : 'root',
  password : 'liit',
  database : 'LLM'
});

exports.pool = pool