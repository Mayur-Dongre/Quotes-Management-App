const express = require('express');
const appForfavquotesadd = express.Router();
const mysql = require('mysql')
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'manager',
    database : 'hackathon'
   });

//POST for INSERT
appForfavquotesadd.post("/", (request, response) => {
    var query = `insert into FavoriteQuotes values(${request.body.user_id}, ${request.body.quote_id})`;
    connection.query(query, (error, result) => {
                                    if (error == null)
                                    {
                                        var data = JSON.stringify(result);
                                        console.log("FavQ added data == " +data);
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

module.exports = appForfavquotesadd;