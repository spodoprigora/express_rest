module.exports = function(app, connection) {
    app.get('/comments', (req, res) => {
        if(req.session.userId && req.session.isAdmin) {
            connection.query('SELECT * FROM comments', (err, rows, fields) => {
                if (err) {
                    console.log(err.sqlMessage);
                    res.json({sucsess: false});
                } else {
                    res.json(rows);
                }
            });
        } else {
            res.json({access: 'deny'});
        }
    });
    app.post('/comments', (req, res, next) => {
        if(req.session.userId) {
            connection.query('INSERT INTO comments SET userId = ?, initiativeId = ?, comment = ?',
                [req.session.userId, req.body.initiativeId, req.body.comment],
                (err, rows) => {
                    if (err) {
                        console.log(err.sqlMessage);
                        res.json({sucsess: false});
                    } else {
                        res.json({sucsess: true, id: rows.insertId});
                    }
                });
        }else {
            res.json({access: 'deny'});
        }
    });
    app.get('/comments/:id', (req, res) => {
        if(req.session.userId && req.session.isAdmin) {
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
        }else {
            res.json({access: 'deny'});
        }
    });
    app.delete('/comments/:id', (req, res) => {
        if(req.session.userId && req.session.isAdmin){
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
        } else {
            res.json({access: 'deny'});
        }
    });
    app.put ('/comments/:id', (req, res) => {
        if(req.session.userId && req.session.isAdmin) {
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
        } else {
            res.json({access: 'deny'});
        }
    });
};