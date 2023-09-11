const express = require('express');
const appFormyquotesadd = express.Router();
const mysql = require('mysql')
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'manager',
    database : 'hackathon'
   });

//POST for INSERT
appFormyquotesadd.post("/", (request, response) => {
    var query = `insert into Quotes (text, author, user_id) values('${request.body.text}', 
                                        '${request.body.author}', ${request.body.user_id})`;
    connection.query(query, (error, result) => {
                                    if (error == null)
                                    {
                                        var data = JSON.stringify(result);
                                        response.setHeader("Content-Type","application/json");
                                        response.write(data);
                                    }
                                    else
                                    {
                                        console.log(error);
                                        response.setHeader("Content-Type","application/json");
                                        response.write(error);
                                    }
                                    response.end();
})
})

module.exports = appFormyquotesadd;