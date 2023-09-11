import { useEffect, useState } from "react";
import Header from "./Header";
import FavQuoteRow from "./FavQuoteRow";
import { Link } from "react-router-dom";

function Favourites(props) 
{
    debugger;
    const id = sessionStorage.getItem("user_id");
    const [receivedquotes, setReceivedquotes] = useState([]);
    const [message, setMessage] = useState("");
    const [searchText, setSearchText] = useState("");

    useEffect(()=>{
                    console.log("inside componentDidMount..");
                    select(); 
                    // fetch();
                  }, [])

    useEffect(()=>{ 
                    setTimeout(() => { setMessage(""); }, 3000);  
                  } , [message])

    const onSearch=(args)=>{
                    debugger;
                    setSearchText(args.target.value)
                }

    const select=()=>{
        debugger;
        var helper = new XMLHttpRequest();
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
        helper.open("POST", "http://127.0.0.1:9999/favquotes");
        helper.setRequestHeader("Content-Type", "application/json");
        helper.send(JSON.stringify(data));
    }

    // const fetch=()=>{
    //     debugger;
    //     var helper = new XMLHttpRequest();
    //     var data =  { "user_id": id };
        
    //     helper.onreadystatechange =()=> {
    //         if (helper.readyState == 4 && helper.status == 200)
    //         {
    //             debugger;
    //             var result = JSON.parse(helper.responseText);
    //             setReceivedquotes(result);
    //             console.log("Quotes Received");
    //         }
    //     };
    //     helper.open("POST", "http://127.0.0.1:9999/myquotes");
    //     helper.setRequestHeader("Content-Type", "application/json");
    //     helper.send(JSON.stringify(data));
    // }

    // const unlikeQuote=(qid)=>{
    //     debugger;
    //     var helper = new XMLHttpRequest();
    //     helper.onreadystatechange = ()=>{
    //         if(helper.readyState == 4 && helper.status == 200)
    //             {
    //                 var responseReceived = JSON.parse(helper.responseText);
    //                 if(responseReceived.affectedRows!=undefined && responseReceived.affectedRows>0)
    //                 {
    //                     setMessage("Delete Successfull!")
    //                     select();
    //                 }
    //                 else
    //                 {
    //                     setMessage("Something went wrong!")
    //                 }
    //             }
    //     };
    //     helper.open("DELETE", "http://127.0.0.1:9999/myquotes/" +id);
    //     helper.send(); 
    // }

    // const deleteQuote=(id)=>
    // {
    //     debugger;
    //     var helper = new XMLHttpRequest();
    //     helper.onreadystatechange = ()=>{
    //         if(helper.readyState == 4 && helper.status == 200)
    //             {
    //                 var responseReceived = JSON.parse(helper.responseText);
    //                 if(responseReceived.affectedRows!=undefined && responseReceived.affectedRows>0)
    //                 {
    //                     setMessage("Delete Successfull!")
    //                     select();
    //                 }
    //                 else
    //                 {
    //                     setMessage("Something went wrong!")
    //                 }
    //             }
    //     };
    //     helper.open("DELETE", "http://127.0.0.1:9999/myquotes/" +id);
    //     helper.send();   
    // }

    return (<>
                <Header/>
                    <center><h1> Quotes Around the World </h1></center>
                    <hr />
                    
                    <div style={{float: "right", marginLeft: 300}}>
                    Search:
                        <input type='text' 
                               value={searchText} 
                               onChange={onSearch}/>
                        <br/>
                    </div>
                    <div style={{float: "right", marginLeft: 800}}>
                        <Link to="/home">All</Link>
                        {"      |      "}
                        <Link to="/favourites">Favourites</Link>
                    </div>
                    <hr />
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
                                        return  <FavQuoteRow key={quote.id} quote={quote}/> 
                                                            //  unlikeQuote={unlikeQuote(quote.id)}/>
                                    }
                                    else
                                    {
                                        return;
                                    }
                                
                                }
                                else
                                {
                                    return  <FavQuoteRow key={quote.id} quote={quote}/>
                                                        //  unlikeQuote={unlikeQuote}/>
                                }
                            })
                        }
                    </center>
                </div>
            </> );
}

export default Favourites;