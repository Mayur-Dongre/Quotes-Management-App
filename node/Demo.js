const express = require('express');
const config = require('config');

const quotesRelatedRoutes = require('./routes/quotes');
const myquotesRelatedRoutes = require('./routes/myquotes');
const myquotesaddRelatedRoutes = require('./routes/myquotesadd');
const favquotesRelatedRoutes = require('./routes/favquotes');
const favquotesaddRelatedRoutes = require('./routes/favquotesadd');
const loginRelatedRoutes = require('./routes/login');
const registerRelatedRoutes = require('./routes/register');
const usersRelatedRoutes = require('./routes/users');

const app = express();

app.use( (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', "*");
    response.setHeader('Access-Control-Allow-Headers', "*");
    response.setHeader('Access-Control-Allow-Methods', "*");
    next();
})

app.use(express.json());

app.use('/quotes',quotesRelatedRoutes)
app.use('/myquotes',myquotesRelatedRoutes)
app.use('/myquotesadd',myquotesaddRelatedRoutes)
app.use('/favquotes',favquotesRelatedRoutes)
app.use('/favquotesadd',favquotesaddRelatedRoutes)
app.use('/login',loginRelatedRoutes)
app.use('/register',registerRelatedRoutes)
app.use('/users',usersRelatedRoutes)

const PortNo = config.get("PORT");
app.listen(PortNo, ()=> {
    console.log("The Server is running at " +PortNo)
})