import { useEffect, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './common.css'
import { Link, useHistory } from 'react-router-dom';

function Login() {
    debugger;
    console.log()
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const [message, setMessage] = useState("");

    const history = useHistory();

    useEffect(()=>{
        if (message!="")
        {
            setTimeout( ()=>{ setMessage("") }, 3000);
        }
    }, [message]);

    useEffect(()=>{
        sessionStorage.removeItem("user_id");
        sessionStorage.removeItem("isloggedin");
        sessionStorage.removeItem("email");
    }, []);

    const OnTextChange=(args)=>{
        debugger;
        var copyOfCred = {...credentials}
        copyOfCred[args.target.name] = args.target.value;
        setCredentials(copyOfCred);
    }

    const SignIn=()=>{
        debugger;
        console.log(credentials);
        var helper = new XMLHttpRequest();
        helper.onreadystatechange=()=>{
            if(helper.readyState == 4 && helper.status == 200)
                {
                    debugger;
                    var responseReceived = JSON.parse( helper.responseText);
                    if(responseReceived.isvalid == 'true')
                    {
                        sessionStorage.setItem("isloggedin", true);
                        sessionStorage.setItem("email",credentials.email);
                        sessionStorage.setItem("user_id",responseReceived.user_id);
                        history.push("/home");
                    }
                    else
                    {
                        setMessage("Credentials are invalid!");
                        setCredentials({email: "", password:""});
                    }
        }
    }
        helper.open("POST", "http://127.0.0.1:9999/login");

        helper.setRequestHeader("Content-Type", "application/json");

        var credentialsInString = JSON.stringify(credentials);
        var credentialsInEncoded = window.btoa(credentialsInString);
        var details ={ "credentials": credentialsInEncoded }

        helper.send(JSON.stringify(details));
    }
    debugger;
    return ( <>
                <hr />
                <h1><center>Log In</center></h1>
                <br/>
                <center>
                <div className="table-bordered, quote" >
                    <table className="table table-bordered table-hover loginTable">
                        <tbody>
                            <tr>
                                <td>User Name</td>
                                <td>
                                    <input type="text" placeholder="Enter Email"
                                           value={credentials.email} name='email'
                                           onChange={OnTextChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td>
                                    <input type="text" placeholder="Enter Password" 
                                           value={credentials.password} name='password'
                                           onChange={OnTextChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   <button onClick={SignIn} className="btn btn-primary">
                                     Log In
                                   </button>
                                </td>
                                <td>
                                   Don't have Account?
                                   <Link to="/register">Register here</Link>
                                </td>
                                   <hr/>
                                   {message}
                            </tr>
                        </tbody>
                    </table>
                </div>
                </center>
             </> );
        }

export default Login;