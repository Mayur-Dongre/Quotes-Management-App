import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Register() 
{
    debugger;

    const [user, setUser] = useState({first_name: "", last_name:"", email:"", password:"", mobile: ""});
    const [message, setMessage] = useState("");
    const [confirmpass, setConfirmPass] = useState("");

    useEffect(()=>{
        setTimeout(() => 
        {
            setMessage("");
        }, 3000);
    } , [message])

    const insert=()=>
    {
        debugger;

        if (confirmpass == user.password)
        {
            console.log(user);
            console.log(user.password);
            // this.state.topicToBeAdded .. hold record's data to be send to Node Server!
            var helper = new XMLHttpRequest();
            helper.onreadystatechange = ()=>{
                if(helper.readyState == 4 && helper.status == 200)
                    {
                        debugger;
                        var responseReceived = JSON.parse(helper.responseText);
                        if(responseReceived.affectedRows==1)
                        {
                            setMessage("Registration Successfull!")
                            setUser({first_name: "", last_name:"", email:"", password:"", mobile: ""});
                            setConfirmPass("");
                        }
                        else if(responseReceived.code == 'ER_DUP_ENTRY')
                        {
                            setMessage("User Already Exists, Please Log In");
                            setUser({first_name: "", last_name:"", email:"", password:"", mobile: ""});
                            setConfirmPass("");
                        }
                        else
                        {
                            setMessage("Something went wrong!, Please try again");
                            setUser({first_name: "", last_name:"", email:"", password:"", mobile: ""});
                            setConfirmPass("");
                        }
                    }
            };
            helper.open("POST","http://127.0.0.1:9999/register");
            helper.setRequestHeader("Content-Type", "application/json")
            helper.send(JSON.stringify(user));
        }
        else
        {
            setMessage("Incorrect Password, Please enter password again");
            setUser({password:""});
            setConfirmPass("");
        }
           
    }

    const OnTextPassChange=(args)=>{
        var copyOfConfirmpass = {...confirmpass};
        copyOfConfirmpass = args.target.value;
        setConfirmPass(copyOfConfirmpass);
    }

    const OnTextChange=(args)=>{
        var copyOfUser = {...user};
        copyOfUser[args.target.name] = args.target.value;
        setUser(copyOfUser);
    }

    // const edit=(topic_id)=>{
    //     debugger;
    //     // console.log("You need to find record with topic_id = " + topic_id + " from - ");

    //     console.log(user)

    //     topics.map((topicToEdit)=>{
    //         if(topicToEdit.topic_id == topic_id)
    //         {
    //             setMessage("Record Found!!")
    //             var copyOftopicToEditFromArray = {...topicToEdit} 
    //             settopic(copyOftopicToEditFromArray);
    //             return;
    //         }
    //     })
    // }

    // const update=()=>{
    //     debugger;
    //     var helper = new XMLHttpRequest();
    //     helper.onreadystatechange = ()=>{
    //         if(helper.readyState == 4 && helper.status == 200)
    //             {
    //                 var responseReceived = JSON.parse(helper.responseText);
    //                 if(responseReceived.affectedRows!=undefined && responseReceived.affectedRows>0)
    //                 {
    //                     setMessage("Update Successfull!")
    //                     select();
    //                     settopic({topic_id: 0, topic_name : "", description: ""});
    //                 }
    //                 else
    //                 {
    //                     setMessage("Something went wrong!")
    //                 }
    //             }
    //     };
    //     helper.open("PUT","http://127.0.0.1:9999/topics/" +topic.topic_id);
    //     helper.setRequestHeader("Content-Type", "application/json")
    //     helper.send(JSON.stringify(topic));  
    // }

    debugger;
    return (<>
                <hr />
                <div >
                    <center><h2>Register</h2>
                <div className='form-group'>
                <input type="text" className='form-control'
                        style={{width: 300}}
                        name="first_name" placeholder="First Name"
                        value={user.first_name}
                        onChange={OnTextChange}/>
                </div>
                <div className='form-group'>
                <input type="text" className='form-control'
                        style={{width: 300}}
                        name="last_name" placeholder="Last Name"
                        value={user.last_name}
                        onChange={OnTextChange}/>
                </div>
                <div className='form-group'>
                <input type="text" className='form-control'
                        style={{width: 300}}
                        name="email" placeholder="email"
                        value={user.email}
                        onChange={OnTextChange}/>
                </div>
                <div className='form-group'>
                <input type="text" className='form-control'
                        style={{width: 300}}
                        name="mobile" placeholder="mobile"
                        value={user.mobile}
                        onChange={OnTextChange}/>
                </div>
                <div className='form-group'>
                <input type="text" className='form-control'
                        style={{width: 300}}
                        name="password" placeholder="password"
                        value={user.password}
                        onChange={OnTextChange}/>
                </div>
                <div className='form-group'>
                <input type="text" className='form-control'
                        style={{width: 300}}
                        name="confirm password" placeholder="confirm password"
                        value={confirmpass}
                        onChange={OnTextPassChange}/>
                </div>
                Already have Account ? {"   "} <Link to="/login">login here</Link>
                <br />
                <button className='btn btn-primary'
                        onClick={insert}>  
                        Register
                </button>
                <br />
                {message}
                </center>
                </div>
            </> );
}

export default Register;