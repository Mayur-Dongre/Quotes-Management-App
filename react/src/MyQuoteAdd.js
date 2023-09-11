import { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

function MyQuoteAdd() 
{
    debugger;
    const id = sessionStorage.getItem("user_id");
    const [quote, setQuote] = useState({text: "", author: "", user_id: id});
    const [message, setMessage] = useState("");

    const insertQuote=()=>{
        console.log(quote);
        console.log(quote.password);
        // this.state.topicToBeAdded .. hold record's data to be send to Node Server!
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = ()=>{
            if(helper.readyState == 4 && helper.status == 200)
                {
                    debugger;
                    var responseReceived = JSON.parse(helper.responseText);
                    if(responseReceived.affectedRows==1)
                    {
                        setMessage("Quote added Successfully!")
                        setQuote({text: 0, author: "", user_id: ""});
                    }
                    else
                    {
                        setMessage("Something went wrong!, Please try again");
                        setQuote({text: 0, author: "", user_id: ""});
                    }
                }
        };
        helper.open("POST","http://127.0.0.1:9999/myquotesadd");
        helper.setRequestHeader("Content-Type", "application/json")
        helper.send(JSON.stringify(quote));
    }

    const OnTextChange=(args)=>{
        var copyOfQuote = {...quote};
        copyOfQuote[args.target.name] = args.target.value;
        copyOfQuote[quote.user_id] = id;
        setQuote(copyOfQuote);
    }

    return (<>
                <Header/>
                        <center>
                        <h1><center>My Profile</center></h1>
                        <hr />
                        <div className="table-bordered, quote">
                                <br />
                        <div className='form-group input-group-sm'>text
                        <input type="text" className='form-control'
                                style={{width: 500}}
                                name="text"
                                value={quote.text}
                                onChange={OnTextChange}/>
                        </div>
                        <div className='form-group input-group-sm'>author
                        <input type="text" className='form-control'
                                style={{width: 500}}
                                name="author"
                                value={quote.author}
                                onChange={OnTextChange}/>
                        </div><button className="btn btn-info"
                                onClick={insertQuote}>
                                Add
                                </button>
                                {/* <Link to="/favourites"></Link> */}
                        <br />
                        {message}
                        <br />
                        </div>
                        </center>

            </>);
}

export default MyQuoteAdd;