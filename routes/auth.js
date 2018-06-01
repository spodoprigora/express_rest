const checkPassword = require('./../helpers/checkPassword');

module.exports = function(app, connection) {
    app.post('/auth/login', (req, res) => {

        connection.query('SELECT * FROM user WHERE email = ?', [req.body.email], (err, rows, fields) => {
            if (err) {
                console.log(err.sqlMessage);
                res.json({sucsess: false});
            } else {
                const hash = rows[0].password;
                checkPassword(req.body.password, hash).then(function(result) {
                    if(result) {
                        console.log('password true');
                        req.session.userId = rows[0].id;
                        if(rows[0].isAdmin) {
                            req.session.isAdmin = true;
                        }
                        res.json({sucsess: true});
                    } else {
                        console.log('password false');
                        res.json({sucsess: false});
                    }
                });
            }
        });
    });
    app.get('/auth/logout', (req, res) => {
        if(req.session.userId) {
            delete req.session.userId;
            if(req.session.isAdmin) {
                delete req.session.isAdmin;
            }
        }
    })
};