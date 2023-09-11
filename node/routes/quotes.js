const express = require('express');
const appForquotes = express.Router();
const mysql = require('mysql')
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'manager',
    database : 'hackathon'
   });

//GET for SELECT query
appForquotes.get("/", (request, response) => {
    var query = `Select * from Quotes`;
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

//POST for INSERT
appForquotes.post("/", (request, response) => {
    var query = `insert into Quotes (text, author, user_id) values('${request.body.text}', '${request.body.author}',
                                                                    ${request.body.user_id})`;
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

//PUT for UPDATE
appForquotes.put("/:id", (request, response) => {
    var query = `Update Quotes Set text = '${request.body.text}', author = '${request.body.author}'
                        where id = ${request.params.id}`;
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
appForquotes.delete("/:id", (request, response) => {
    var query = `Delete from Quotes where id = ${request.params.id}`;
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

module.exports = appForquotes;