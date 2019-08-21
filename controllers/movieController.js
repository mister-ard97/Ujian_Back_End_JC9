const mysql_conn  = require('../database');

module.exports = {
    getAllData : (req, res) => {
        let sql = `select * from movies`

        mysql_conn.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send({status: err, error: err});
            }

            return res.status(200).send(results);
        })
    }, 
    addMovie : (req, res) => {
        let data = req.body
        
        if(!data.nama) {
            data.nama = ''
        }
        
        if(!data.tahun) {
            data.tahun = 0
        }
        
        if(!data.description) {
            data.description = ''
        }

        let sql = `select * from movies where nama='${data.nama}' and tahun=${data.tahun} and description='${data.description}'`;
        
        mysql_conn.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send({ status: err, error: err });
            }

            if (results.length !== 0) {
                return res.status(200).send({ status: "Duplicate Data", message: "Film sudah ada di movies list" });
            }

            sql = `insert into movies set ?`
            mysql_conn.query(sql, data, (err, results) => {
                if (err) {
                    return res.status(500).send({ status: err, error: err });
                }

                sql = `select * from movies`;
                mysql_conn.query(sql, (err, results) => {
                    if (err) {
                        return res.status(500).send({ status: err, error: err });
                    }

                    return res.status(200).send(results);
                })
            })
        })
    },
    editMovie: (req, res) => {
        let data = req.body
        let sql = `update movies set ? where id = ${req.params.id}`;
        mysql_conn.query(sql, data, (err, results) => {
            if (err) {
                return res.status(500).send({ status: err, error: err });
            }

            sql = `select * from movies`;
            mysql_conn.query(sql, (err, results) => {
                if (err) {
                    return res.status(500).send({ status: err, error: err });
                }

                return res.status(200).send(results);
            })
        })
    },
    deleteMovie: (req, res) => {
        let data = req.body
        let sql = `delete from movies where id = ${req.params.id}`;
        mysql_conn.query(sql, data, (err, results) => {
            if (err) {
                return res.status(500).send({ status: err, error: err });
            }

            sql = `select * from movies`;
            mysql_conn.query(sql, (err, results) => {
                if (err) {
                    return res.status(500).send({ status: err, error: err });
                }

                return res.status(200).send(results);
            })
        })
    }
}