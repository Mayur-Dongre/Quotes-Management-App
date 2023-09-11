const express = require('express');
const appFormyquotes = express.Router();
const mysql = require('mysql')
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'manager',
    database : 'hackathon'
   });

//GET for SELECT query
// appFormyquotes.get("/", (request, response) => {
//     debugger;
//     console.log("request.body == " +request.body);
//     console.log("request.body.encoded == " +request.body.encoded);
//     // var data = JSON.parse(request.body.uid);
//     // console.log("data == " +data);
//     var query = `Select * from Quotes where id = ${request.params.id}`;
//     connection.query(query, (error, result) => {
//                                     if (error == null)
//                                     {
//                                         var data = JSON.stringify(result);
//                                         response.setHeader("Content-Type","application/json");
//                                         response.write(data);
//                                     }
//                                     else
//                                     {
//                                         console.log(error);
//                                         response.setHeader("Content-Type","application/json");
//                                         response.write(error);
//                                     }
//                                     response.end();
//     })

// })

//POST for INSERT
appFormyquotes.post("/", (request, response) => {
    console.log("Final Post MyQuotes")
    console.log(request.body);
    console.log(request.body.user_id);
    var query = `Select * from Quotes where user_id = ${request.body.user_id}`;
    connection.query(query, (error, result) => {
                                    if (error == null)
                                    {
                                        var data = JSON.stringify(result);
                                        console.log("data == " +data)
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
appFormyquotes.put("/:id", (request, response) => {
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
appFormyquotes.delete("/:id", (request, response) => {
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

module.exports = appFormyquotes;