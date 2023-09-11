const express = require('express');
const appForRegister = express.Router();
const mysql = require('mysql');
const atob = require('atob');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'manager',
    database : 'hackathon'
   });

//POST for INSERT
appForRegister.post("/", (request, response) => {
    console.log("Registration credentials received from User");
            console.log("request.body==" +request.body);
            
            var query = `insert into Users (first_name, last_name, email, password, mobile) values('${request.body.first_name}', 
                        '${request.body.last_name}','${request.body.email}', '${request.body.password}', '${request.body.mobile}')`;
    connection.query(query, (error, result) => {
                                    if (error == null)
                                    {
                                        debugger;
                                        var data = JSON.stringify(result);
                                        response.setHeader("Content-Type","application/json");
                                        response.write(data);
                                        console.log("User Registered Successfully")
                                    }
                                    else
                                    {
                                        console.log(error);
                                        response.setHeader("Content-Type","application/json");
                                        // var reply = { "error": "true" }
                                        response.write(JSON.stringify(error));
                                    }
                                    response.end();
    })
})

module.exports = appForRegister;