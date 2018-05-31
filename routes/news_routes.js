module.exports = function(app, connection) {
    app.get('/news', (req, res) => {
        connection.query('SELECT * FROM news', (err, rows, fields) => {
            if (err) {
                console.log(err.sqlMessage);
                res.json({sucsess: false});
            } else {
                res.json(rows);
            }
        });

    });
    app.post('/news', (req, res, next) => {
        connection.query('INSERT INTO news SET userId = ?, title = ?, content = ?',
            [req.body.userId, req.body.title, req.body.content],
            (err, rows) => {
                if (err) {
                    console.log(err.sqlMessage);
                    res.json({sucsess: false});
                } else {
                    res.json({sucsess: true, id: rows.insertId});
                }
            });

    });
    app.get('/news/:id', (req, res) => {
        connection.query('SELECT * FROM news WHERE id = ?',
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
    app.delete('/news/:id', (req, res) => {
        connection.query('DELETE FROM news WHERE id = ?',
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
    app.put ('/news/:id', (req, res) => {
        connection.query('UPDATE news SET userId = ?, title = ?, content = ? WHERE id = ?',
            [req.body.userId, req.body.title, req.body.content, req.params.id],
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