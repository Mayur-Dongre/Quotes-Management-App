debugger;
const express = require('express');
const appForUsers = express.Router();
const mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'manager',
    database : 'hackathon'
   });

//POST for LOGIN
appForUsers.post("/", (request, response) => {
    debugger;
            console.log("Fetching data from Users in Profile");
            console.log("request.body   == " +request.body);
            console.log("request.body.uid   ==  " +request.body.uid);
    var query = `select first_name, last_name, email, password, mobile from Users where id=${request.body.uid}`;
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
appForUsers.put("/:id", (request, response) => {
        // response.send("Emps PUT is called")
        var query = 
        `Update Users Set first_name = '${request.body.first_name}', last_name = '${request.body.last_name}',
                        email = '${request.body.email}', password = '${request.body.password}',
                        mobile='${request.body.mobile}'
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

module.exports = appForUsers;