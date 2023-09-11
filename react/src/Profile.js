import { useEffect, useState } from "react";
import Header from "./Header";

function Profile(profile) 
{
        debugger;

        const id = sessionStorage.getItem("user_id");
        const [user, setUser] = useState({first_name:"", last_name:"", email:"", password:"", mobile:""});
        const [message, setMessage] = useState("");

        useEffect(()=>{
                console.log("inside componentDidMount..");
                select(); 
        }, [])

        useEffect(()=>{
                        setTimeout(() => { setMessage("");
                                 }, 3000);
                      } , [message])

        const OnTextChange=(args)=>{
                                        var copyOfUser = {...user};
                                        copyOfUser[args.target.name] = args.target.value;
                                        setUser(copyOfUser);
                                   }

        const select=()=>{
                var helper = new XMLHttpRequest();
                debugger;
                helper.onreadystatechange =()=> {
                        if (helper.readyState == 4 && helper.status == 200)
                        {
                                debugger;
                                var result = JSON.parse(helper.responseText);
                                var receivedquotes = result;
                                setUser(receivedquotes[0]);
                        }
                };
                helper.open("POST", "http://127.0.0.1:9999/users");
                helper.setRequestHeader("Content-Type", "application/json");
                var code = { "uid": id };
                helper.send(JSON.stringify(code));
        }

        // const edit=()=>{
        //         debugger;
        //         const OnTextChange=(args)=>{
        //                 var copyOfUser = {...user};
        //                 copyOfUser[args.target.name] = args.target.value;
        //                 setUser(copyOfUser);
        //            }
        // }

        const update=()=>{
                debugger;
                var helper = new XMLHttpRequest();
                helper.onreadystatechange = ()=>{
                if(helper.readyState == 4 && helper.status == 200)
                        {
                                debugger;
                                var responseReceived = JSON.parse(helper.responseText);
                                if(responseReceived.affectedRows!=undefined && responseReceived.affectedRows>0)
                                {
                                        setMessage("Update Successfull!")
                                }
                                else
                                {
                                        setMessage("Something went wrong!")
                                }
                        }
                };
                helper.open("PUT","http://127.0.0.1:9999/users/" +id);
                helper.setRequestHeader("Content-Type", "application/json")
                helper.send(JSON.stringify(user));  
        }

        return (<>
                        <Header/>
                        <center>
                        <h1><center>My Profile</center></h1>
                        <hr />
                        <div className="table-bordered, quote">
                                <br />
                        <div className='form-group input-group-sm'>
                        <input type="text" className='form-control'
                                style={{width: 500}}
                                name="first_name"
                                value={user.first_name}
                                onChange={OnTextChange}/>
                        </div>
                        <div className='form-group input-group-sm'>
                        <input type="text" className='form-control'
                                style={{width: 500}}
                                name="last_name"
                                value={user.last_name}
                                onChange={OnTextChange}/>
                        </div>
                        <div className='form-group'>
                        <input type="text" className='form-control'
                                style={{width: 500}}
                                name="email"
                                value={user.email}
                                onChange={OnTextChange}/>
                        </div>
                        <div className='form-group input-group-sm'>
                        <input type="text" className='form-control'
                                style={{width: 500}}
                                name="password"
                                value={user.password}
                                onChange={OnTextChange}/>
                        </div>
                        <div className='form-group'>
                        <input type="text" className='form-control'
                                style={{width: 500}}
                                name="mobile"
                                value={user.mobile}
                                onChange={OnTextChange}/>
                        </div>
                        {/* <button className='btn btn-primary'
                                onClick={edit}>
                                Edit
                        </button> */}
                        <button className='btn btn-success'
                                onClick={update}>
                                Save changes
                        </button>
                        <br />
                        {message}
                        <br />
                        </div>
                        </center>
                </>);
}

export default Profile;