const mysql_conn = require('../database');

module.exports = {
    getAllCat: (req, res) => {
        let sql = `select * from categories`

        mysql_conn.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send({ status: err, error: err });
            }

            return res.status(200).send(results);
        })
    },
    addCategory: (req, res) => {
        let data = req.body
        let sql = `select * from categories where nama='${req.body.nama}'`;
        mysql_conn.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send({ status: err, error: err });
            }

            if (results.length !== 0) {
                return res.status(200).send({ status: "Duplicate Data", message: "Category sudah ada" });
            }

            sql = `insert into categories set ?`
            mysql_conn.query(sql, data, (err, results) => {
                if (err) {
                    return res.status(500).send({ status: err, error: err });
                }

                sql = `select * from categories`;
                mysql_conn.query(sql, (err, results) => {
                    if (err) {
                        return res.status(500).send({ status: err, error: err });
                    }

                    return res.status(200).send(results);
                })
            })
        })
    },
    editCategory: (req, res) => {
        let data = req.body
        let sql = `select * from categories where nama = '${data.nama}'`
        mysql_conn.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send({ status: err, error: err });
            }

            if (results.length !== 0) {
                return res.status(200).send({ status: "Duplicate Data", message: "Category sudah ada" });
            }

            sql = `update categories set ? where id = ${req.params.id}`;
            mysql_conn.query(sql, data, (err, results) => {
                if (err) {
                    return res.status(500).send({ status: err, error: err });
                }

                sql = `select * from categories`;
                mysql_conn.query(sql, (err, results) => {
                    if (err) {
                        return res.status(500).send({ status: err, error: err });
                    }

                    return res.status(200).send(results);
                })
            })
        })
    },
    deleteCategory: (req, res) => {
        let data = req.body
        let sql = `delete from categories where id = ${req.params.id}`;
        mysql_conn.query(sql, data, (err, results) => {
            if (err) {
                return res.status(500).send({ status: err, error: err });
            }

            sql = `select * from categories`;
            mysql_conn.query(sql, (err, results) => {
                if (err) {
                    return res.status(500).send({ status: err, error: err });
                }

                return res.status(200).send(results);
            })
        })
    }
}