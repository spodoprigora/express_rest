module.exports = function(app, connection) {
    app.get('/initiative', (req, res) => {
        connection.query('SELECT * FROM initiatives', (err, rows, fields) => {
            if (err) {
                console.log(err.sqlMessage);
                res.json({sucsess: false});
            } else {
                res.json(rows);
            }
        });
    });
    app.post('/initiative', (req, res, next) => {
        if(req.session.userId) {
            connection.query('INSERT INTO initiatives SET ' +
                'userId = ?,' +
                ' title = ?,' +
                ' problem = ?,' +
                ' description = ?,' +
                ' decision = ?,' +
                ' goal = ?,' +
                ' endDate = ?,' +
                ' isConfirmed = ?,' +
                ' votes = ?',
                [
                    req.session.userId,
                    req.body.title,
                    req.body.problem,
                    req.body.description,
                    req.body.decision,
                    req.body.goal,
                    req.body.endDate,
                    req.body.isConfirmed,
                    req.body.votes
                ],
                (err, rows) => {
                    if (err) {
                        console.log(err.sqlMessage);
                        res.json({sucsess: false});
                    } else {
                        res.json({sucsess: true, id: rows.insertId});
                    }
                });
        } else {
            res.json({access: 'deny'});
        }

    });
    app.get('/initiative/:id', (req, res) => {
        connection.query('SELECT * FROM initiatives WHERE id = ?',
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
    app.delete('/initiative/:id', (req, res) => {
        if(req.session.userId && req.session.isAdmin) {
            connection.query('DELETE FROM initiatives WHERE id = ?',
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
    app.put ('/initiative/:id', (req, res) => {
        if(req.session.userId && req.session.isAdmin) {
            connection.query('UPDATE initiatives SET ' +
                'userId = ?,' +
                ' title = ?,' +
                ' problem = ?,' +
                ' description = ?,' +
                ' decision = ?,' +
                ' goal = ?,' +
                ' endDate = ?,' +
                ' isConfirmed = ?,' +
                ' votes = ?' +
                ' WHERE id = ?',
                [
                    req.session.userId,
                    req.body.title,
                    req.body.problem,
                    req.body.description,
                    req.body.decision,
                    req.body.goal,
                    req.body.endDate,
                    req.body.isConfirmed,
                    req.body.votes,
                    req.params.id
                ],
                (err, rows, fields) => {
                    if (err) {
                        console.log(err.sqlMessage);
                        res.json({sucsess: false});
                    } else {
                        res.json({sucsess: true});
                    }
                });
        }else {
            res.json({access: 'deny'});
        }
    });
};