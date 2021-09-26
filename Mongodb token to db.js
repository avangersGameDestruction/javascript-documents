require('dotenv').config()
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const app = express();

cors({ credentials: true, origin: true });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/secure', expressJwt({ secret: process.env.SECRET }));
app.use(require('./server/index'));

app.get('/secure/dashboard') => {
//now you can only access this route with authorization header
//prependending the '/secure/ to new routes should make them return 401 when accessed without authorization token
//accessing this route without returns 401.
//there is no need to validate because express-jwt is handling.
console.log(res.user) //should print current user and pass signed with token
res.render('dashboard.ejs');
});

app.post('/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    //jwt.sign({ user }, process.env.SECRET_KEY, (err, token) => {
    //    res.json({
    //        token
    //    })
    //});
    //shouldn't sign json here, because there is no guarantee this is a valid
    //username and password it can be an impostor

    if (username !== process.env.USER_NAME && password !== process.env.USER_PASSWORD) {
        res.json('Invalid credentials');
    } else {
        const user = {
            username: username,
            password: password
        };
        const tk = {};
        tk.token = 'Bearer ' + jwt.sign(user, process.env.SECRET_KEY, { expiresIn: 1800 }); //expires in 1800 seconds
        res.status(200).json(tk);
    }
});