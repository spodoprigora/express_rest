module.exports = function(app, connection) {
    app.get('/comments', (req, res) => {
        connection.query('SELECT * FROM comments', (err, rows, fields) => {
            if (err) {
                console.log(err.sqlMessage);
                res.json({sucsess: false});
            } else {
                res.json(rows);
            }
        });

    });
    app.post('/comments', (req, res, next) => {
        connection.query('INSERT INTO comments SET userId = ?, initiativeId = ?, comment = ?',
            [req.body.userId, req.body.initiativeId, req.body.comment],
            (err, rows) => {
                if (err) {
                    console.log(err.sqlMessage);
                    res.json({sucsess: false});
                } else {
                    res.json({sucsess: true, id: rows.insertId});
                }
            });

    });
    app.get('/comments/:id', (req, res) => {
        connection.query('SELECT * FROM comments WHERE id = ?',
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
    app.delete('/comments/:id', (req, res) => {
        connection.query('DELETE FROM comments WHERE id = ?',
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
    app.put ('/comments/:id', (req, res) => {
        connection.query('UPDATE comments SET userId = ?, initiativeId = ?, comment = ? WHERE id = ?',
            [req.body.userId, req.body.initiativeId, req.body.comment, req.params.id],
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