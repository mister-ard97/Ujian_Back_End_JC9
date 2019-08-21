const mysql_conn = require('../database');

module.exports = {
    getAllConnectionMovAndCat: (req, res) => {
        let sql = `select 
                    m.nama as Nama_Movie, 
                    c.nama as Nama_Category, 
                    m.tahun as Release_date 
                from movcat as mc 
                join movies as m on mc.idmovie = m.id
                join category as c on mc.idcategory = c.id;`
        
        mysql_conn.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send({ status: err, error: err });
            }

            return res.status(200).send(results);
        })
    },
    deleteMovCat: (req, res) => {
        let sql = `delete from movcat where `
        var data = req.body
        if(data.idmovie) {
            sql += `idmovie = ${data.idmovie} `
        }

        if(data.idmovie && data.idcategory) {
            sql += `and `
        }

        if(data.idcategory) {
            sql += `idcategory = ${data.idcategory} `
        }

        mysql_conn.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send({ status: err, error: err });
            }

            sql = `select 
                    m.nama as Nama_Movie, 
                    c.nama as Nama_Category, 
                    m.tahun as Release_date 
                from movcat as mc 
                join movies as m on mc.idmovie = m.id
                join category as c on mc.idcategory = c.id;`
            
            mysql_conn.query(sql, (err, results) => {
                if (err) {
                    return res.status(500).send({ status: err, error: err });
                }

                return res.status(200).send(results);
            })
        })
    },
    addConnectionMovAndCat: (req, res) => {
        let {idmovie, idcategory} = req.body

        let sql = `select * from movcat where idmovie=${idmovie} and idcategory=${idcategory}`

        mysql_conn.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send({ status: err, error: err });
            }

            if(results.length !== 0) {
                return res.status(200).send({ status: "Duplicate Data", message: "Film dengan category yang sama sudah ada" });
            }

            sql = `insert into movcat values (${idmovie}, ${idcategory})`;

            mysql_conn.query(sql, (err, results) => {
                if (err) {
                    return res.status(500).send({ status: err, error: err });
                }

                sql = `select 
                    m.nama as Nama_Movie, 
                    c.nama as Nama_Category, 
                    m.tahun as Release_date 
                from movcat as mc 
                join movies as m on mc.idmovie = m.id
                join category as c on mc.idcategory = c.id;`

                mysql_conn.query(sql, (err, results) => {
                    if (err) {
                        return res.status(500).send({ status: err, error: err });
                    }

                    return res.status(200).send(results);
                })
            })
        })
    }, 
    getAllMoviesName: (req, res) => {
        let sql = `select id, nama from movies`
        mysql_conn.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send({ status: err, error: err });
            }

            return res.status(200).send(results);
        })
    },
    getAllCategoryName: (req, res) => {
        let sql = `select * from category`
        mysql_conn.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send({ status: err, error: err });
            }

            return res.status(200).send(results);
        })
    }
}