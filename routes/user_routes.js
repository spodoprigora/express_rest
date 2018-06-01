const hashPassword = require('./../helpers/hashPassword');


module.exports = function(app, connection) {
    app.get('/user', (req, res) => {
        if(req.session.userId && req.session.isAdmin === true){
            connection.query('SELECT * FROM user', (err, rows, fields) => {
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
    app.post('/user', (req, res) => {
        hashPassword(req.body.password).then((pass) => {
            connection.query('INSERT INTO user SET name = ?, lastName = ?, email = ?, password = ?',
                [req.body.name, req.body.lastName, req.body.email, pass],
                (err, rows) => {
                    if (err) {
                        console.log(err.sqlMessage);
                        res.json({sucsess: false});
                    } else {
                        res.json({sucsess: true, id: rows.insertId});
                    }
                });
        });
    });
    app.get('/user/:id', (req, res) => {
        if(req.session.userId && req.session.isAdmin === true) {
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
        } else {
            res.json({access: 'deny'});
        }
    });
    app.delete('/user/:id', (req, res) => {
        if(req.session.userId && req.session.isAdmin === true) {
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
        } else {
            res.json({access: 'deny'});
        }

    });
    app.put ('/user/:id', (req, res) => {
        if(req.session.userId && req.session.isAdmin === true) {
            hashPassword(req.body.password).then((pass) => {
                connection.query('UPDATE user SET name = ?, lastName = ?, email = ?, password = ? WHERE id = ?',
                    [req.body.name, req.body.lastName, req.body.email, pass, req.params.id],
                    (err, rows, fields) => {
                        if (err) {
                            console.log(err.sqlMessage);
                            res.json({sucsess: false});
                        } else {
                            res.json({sucsess: true});
                        }
                    });
            });

        } else {
            res.json({access: 'deny'});
        }
    });
};