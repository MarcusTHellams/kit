var express = require('express');
var fs = require('fs');
var app = express();
var _ = require('lodash');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var userInterface = {
    id: "0000000000",
    first_name: "",
    last_name: "",
    account_types: []
};
var accountInterface = {
    id: "",
    name: ""
};

function generateId() {
    return _.times(10, _.random.bind(0, 9)).join('') + '';
}



app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

app.get('/user', (req, resp) => {
    fs.readFile('./server/users.json', (err, data) => {
        if (err) {
            throw err;
        }
        resp.json(JSON.parse(data.toString()));
    });
});


app.post('/user', (req, resp) => {
    fs.readFile('./server/users.json', (err, data) => {
        if (err) {
            throw err;
        }

        let users = JSON.parse(data.toString());
        let newUser = _.assign({}, userInterface, req.body, { "id": generateId() });
        users = users.concat([newUser]);

        fs.writeFile('./server/users.json', JSON.stringify(users), (err) => {
            if (err) {
                throw err;
            }

            resp.json(newUser);
        });
    });
});


app.put('/user/:id', (req, resp) => {
    fs.readFile('./server/users.json', (err, data) => {
        if (err) {
            throw err;
        }

        let users = JSON.parse(data.toString());
        let updatedUser;

        users = users.map((user) => {
            if (user.id === req.params.id) {
                updatedUser = _.assign({}, user, req.body);
                return updatedUser;
            }
            return user;
        });

        fs.writeFile('./server/users.json', JSON.stringify(users), (err) => {
            if (err) {
                throw err;
            }

            resp.json(updatedUser);
        });
    });
});


app.put('/user', (req, resp) => {
    fs.readFile('./server/users.json', (err, data) => {
        if (err) {
            throw err;
        }

        const updates = req.body;
        let users = JSON.parse(data.toString());

        updates.forEach((update) => {
            let i;
            let user = users.find((user, index) => {
                i = index;
                return user.id === update.id;
            });

            user = _.assign({}, update);
            users[i] = user;

        });

        fs.writeFile('./server/users.json', JSON.stringify(users), (err) => {
            if (err) {
                throw err;
            }

            resp.json(users);
        });
    });
});

app.get('/user/:id', (req, resp) => {
    fs.readFile('./server/users.json', (err, data) => {
        if (err) {
            throw err;
        }
        const users = JSON.parse(data.toString());
        let user = users.filter((user) => {
            return user.id === req.params.id;
        });
        if (user) {
            user = user[0] || {};
        } else {
            user = {};
        }
        resp.json(user);
    });
});

app.delete('/user/:id', (req, resp) => {

    fs.readFile('./server/users.json', (err, data) => {
        if (err) {
            throw err;
        }

        let users = JSON.parse(data.toString());
        users = users.filter((user) => {
            return user.id !== req.params.id;
        });

        fs.writeFile('./server/users.json', JSON.stringify(users), (err) => {
            if (err) {
                throw err;
            }

            resp.json({});
        });

    });


});


app.get('/account_type', (req, resp) => {
    fs.readFile('./server/accounts.json', (err, data) => {
        if (err) {
            throw err;
        }
        resp.json(JSON.parse(data.toString()));
    });
});

app.post('/account_type', (req, resp) => {
    fs.readFile('./server/accounts.json', (err, data) => {
        if (err) {
            throw err;
        }

        let accounts = JSON.parse(data.toString());
        let newAccount = _.assign({}, accountInterface, req.body, { "id": generateId() });
        accounts = accounts.concat([newAccount]);

        fs.writeFile('./server/accounts.json', JSON.stringify(accounts), (err) => {
            if (err) {
                throw err;
            }

            resp.json(newAccount);
        });
    });
});


app.delete('/account_type/:id', (req, resp) => {

    fs.readFile('./server/accounts.json', (err, data) => {
        if (err) {
            throw err;
        }

        let accounts = JSON.parse(data.toString());
        accounts = accounts.filter((account) => {
            return account.id !== req.params.id;
        });

        fs.writeFile('./server/accounts.json', JSON.stringify(accounts), (err) => {
            if (err) {
                throw err;
            }

            resp.json(accounts);
            removeDeletedAccountsFromUsers(req.params.id);
        });

    });
});

function removeDeletedAccountsFromUsers(accountId) {
    fs.readFile('./server/users.json', (err, data) => {
        if (err) {
            throw err;
        }

        let users = JSON.parse(data.toString());
        users = users.map((user) => {
            user.account_types = user.account_types.filter((account) => {
                return account.id !== accountId;
            });

            return user;
        });

        fs.writeFile('./server/users.json', JSON.stringify(users), (err) => {
            if (err) {
                throw err;
            }
        });

    });
}

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});