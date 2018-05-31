module.exports = function(app, connection) {
    app.get('/user', (req, res) => {
        connection.query('SELECT * FROM user', (err, rows, fields) => {
            if (err) {
                console.log(err.sqlMessage);
                res.json({sucsess: false});
            } else {
                res.json(rows);
            }
        });

    });
    app.post('/user', (req, res) => {
        connection.query('INSERT INTO user SET name = ?, lastName = ?, email = ?, password = ?, isAdmin = ?',
            [req.body.name, req.body.lastName, req.body.email, req.body.password, req.body.isAdmin],
            (err, rows) => {
            if (err) {
                console.log(err.sqlMessage);
                res.json({sucsess: false});
            } else {
                res.json({sucsess: true, id: rows.insertId});
            }
        });

    });
    app.get('/user/:id', (req, res) => {
        connection.query('SELECT * FROM user WHERE id = ?',
            [req.params.id],
            (err, rows, fields) => {
            if (err) {
                console.log(err.sqlMessage);
                res.json({sucsess: false});
            } else {
                res.json(rows);
            }

        });

    });
    app.delete('/user/:id', (req, res) => {
        connection.query('DELETE FROM user WHERE id = ?',
            [req.params.id],
            (err, rows, fields) => {
            if (err) {
                console.log(err.sqlMessage);
                res.json({sucsess: false});
            } else {
                res.json({sucsess: true});
            }

        });
    });
    app.put ('/user/:id', (req, res) => {
        connection.query('UPDATE user SET name = ?, lastName = ?, email = ?, password = ?, isAdmin = ? WHERE id = ?',
            [req.body.name, req.body.lastName, req.body.email, req.body.password, req.body.isAdmin, req.params.id],
            (err, rows, fields) => {
            if (err) {
                console.log(err.sqlMessage);
                res.json({sucsess: false});
            } else {
                res.json({sucsess: true});
            }
        });
    });
};