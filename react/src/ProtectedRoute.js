import { Route } from "react-router-dom";
import Login from "./Login";
import { useEffect, useState } from "react";

function ProtectedRoute(props) 
{
    debugger;
    if(sessionStorage.getItem("isloggedin")!=null &&
    sessionStorage.getItem("isloggedin")=='true')
    {
        console.log(props)
        return <Route path={props.path} exact component={props.component} 
                      />
    }
    else
    {
        return <Login/>
    }
}
export default ProtectedRoute;