import { useEffect, useState } from "react";
import Header from "./Header";
import MyQuoteRow from "./MyQuoteRow";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function MyQuotes() 
{
    debugger;
    const history = useHistory();
    const id = sessionStorage.getItem("user_id");
    const [receivedquotes, setReceivedquotes] = useState([]);
    const [message, setMessage] = useState("");
    const [searchText, setSearchText] = useState("");

    useEffect(()=>{
                    console.log("inside componentDidMount..");
                    select(); 
                  }, [])

    useEffect(()=>{
                    setTimeout(() => 
                    {
                        setMessage("");
                    }, 3000);
    } , [message])

    const onSearch=(args)=>{
                    debugger;
                    setSearchText(args.target.value)
                }

    const select=()=>{
        var helper = new XMLHttpRequest();
        debugger;
        var data =  { "user_id": id };
        
        helper.onreadystatechange =()=> {
            if (helper.readyState == 4 && helper.status == 200)
            {
                debugger;
                var result = JSON.parse(helper.responseText);
                setReceivedquotes(result);
                console.log("Quotes Received");
            }
        };
        helper.open("POST", "http://127.0.0.1:9999/myquotes");
        helper.setRequestHeader("Content-Type", "application/json");
        helper.send(JSON.stringify(data));
    }

    const insertQuote=()=>{
        debugger;
        
    }

    const deleteQuote=(id)=>
    {
        debugger;
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = ()=>{
            if(helper.readyState == 4 && helper.status == 200)
                {
                    var responseReceived = JSON.parse(helper.responseText);
                    if(responseReceived.affectedRows!=undefined && responseReceived.affectedRows>0)
                    {
                    	console.log("deleting "+id);
                        setMessage("Delete Successfull!")
                        select();
                        console.log("showing select");
                    }
                    else
                    {
                        setMessage("Something went wrong!")
                    }
                }
        };
        helper.open("DELETE", "http://127.0.0.1:9999/myquotes/" +id);
        helper.send();   
    }

    return (<>
                <Header/>
                <center><h1> My Quotes </h1></center>
                <hr />
                {message}
                <Link to="/my-quotes-add">
                <button className="btn btn-info" style={{float: "right", marginRight: 500}}>Add Quote</button>
                </Link>
                <div style={{float: "right", marginLeft: 300}}>
                    
                    Search:
                        <input type='text' 
                               value={searchText} 
                               onChange={onSearch}/>
                        <br/>
                </div>
                <br />
                <div>
                    <center>
                        {
                            receivedquotes.map( (quote) =>{
                                if (searchText!="")
                                {
                                    if (quote.author.toLowerCase().
                                            includes(searchText.toLowerCase()) || 
                                            quote.text.toLowerCase().
                                            includes(searchText.toLowerCase()))
                                    {
                                        return  <MyQuoteRow key={quote.id} quote={quote} 
                                                            deleteQuote={deleteQuote(quote.id)}/>
                                    }
                                    else
                                    {
                                        return null;
                                    }
                                
                                }
                                else
                                {
                                    return  <MyQuoteRow key={quote.id} quote={quote} 
                                                        deleteQuote={deleteQuote}/>
                                }
                            })
                        }
                    </center>
                </div>
            </> );
}

export default MyQuotes;
