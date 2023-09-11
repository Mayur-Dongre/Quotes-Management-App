const express = require('express');
const appForfavquotes = express.Router();
const mysql = require('mysql')
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'manager',
    database : 'hackathon'
   });

//POST for FETCH
appForfavquotes.post("/", (request, response) => {
    console.log("---------------------------------------");
    console.log("We Are Reading Quotes liked by user or not");
    console.log("Request.body == " +request.body);
    console.log("Request.body.user_id == " +request.body.user_id);
    console.log("---------------------------------------");
    // var query = `SELECT Quotes.text, Quotes.author, FavoriteQuotes.quote_id 
    // FROM Quotes
    // INNER JOIN FavoriteQuotes ON Quotes.id=FavoriteQuotes.quote_id
    // where FavoriteQuotes.user_id=1;`
    var query = `Select Quotes.text, Quotes.author, Quotes.id from Quotes 
                INNER JOIN FavoriteQuotes ON Quotes.id=FavoriteQuotes.quote_id
                where FavoriteQuotes.user_id = ${request.body.user_id}`;
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

//POST for check-like
appForfavquotes.put("/", (request, response) => {
    console.log("---------------------------------------");
    console.log("We Are Reading Quotes liked by user or not");
    console.log("Request.body == " +request.body);
    console.log("Request.body.user_id == " +request.body.user_id);
    console.log("Request.body.quote_id == " +request.body.quote_id);
    console.log("---------------------------------------");
    var query = `Select * from FavoriteQuotes where user_id = ${request.body.user_id}
                    and quote_id = ${request.body.quote_id}`;
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

//DELETE from DB
appForfavquotes.delete("/:quote_id", (request, response) => {
    var query = `Delete from FavoriteQuotes where quote_id = ${request.params.quote_id}`;
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

module.exports = appForfavquotes;