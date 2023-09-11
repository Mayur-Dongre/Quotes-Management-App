debugger;
const express = require('express');
const appForLogin = express.Router();
const mysql = require('mysql');
const atob = require('atob');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'manager',
    database : 'hackathon'
   });

//POST for LOGIN
appForLogin.post("/", (request, response) => {
    debugger;
    console.log("Login credentials received from Client");
            console.log("request.body   == " +request.body);
            console.log("request.body.credentials   ==  " +request.body.credentials);
            var decoded = atob(request.body.credentials);
            console.log("decoded    ==  " +decoded);
            var credentials = JSON.parse(decoded);
            console.log("credentials==JSON.parse(decoded)   ==  " +credentials)
    var query = `select * from Users where email='${credentials.email}' 
                 and password='${credentials.password}';`;
    connection.query(query, (error, result) => {
                                if (error == null)
                                {
                                    debugger;
                                    console.log("result.length=="+result.length);
                                    console.log("result=="+result);
                                    console.log("result[0]=="+result[0]);
                                    console.log("result[0].email=="+result[0].email);
                                    console.log("result[0].role=="+result[0].role);
                                    if (result.length==1)
                                    {
                                        response.setHeader("Content-Type", "application/json");
                                        var reply = { "isvalid": "true", "user_id": result[0].id}
                                        response.write(JSON.stringify(reply));
                                    }
                                    else
                                    {
                                        response.setHeader("Content-Type");
                                        var reply = { "isvalid": "false" }
                                        response.write(JSON.stringify(reply));
                                    }
                                    response.end();                                    
                                }
    })
})

module.exports = appForLogin;