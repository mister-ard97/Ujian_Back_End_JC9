var mysql = require('mysql');

var mysql_conn = mysql.createConnection({
    host: 'localhost',
    user: 'rezadb',
    password: 'rezadb10071997',
    database: 'moviepurwadhika',
    port: 3306
})


module.exports = mysql_conn;