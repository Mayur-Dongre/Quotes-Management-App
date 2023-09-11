import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './common.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QuoteRow from './QuoteRow';
import Header from './Header';

function Home() 
{
    debugger;
    const id = sessionStorage.getItem("user_id");
    const [quotes, setQuotes] = useState([]);
    const [quote, setQuote] = useState({id: 0, text: 0, author: "", user_id: ""});
    const [message, setMessage] = useState("");
    const [searchText, setSearchText] = useState("");

    useEffect(()=>{
                    setTimeout(() => 
                    {
                        setMessage("");
                    }, 3000);
    } , [message])

    useEffect(()=>{
                    console.log("inside componentDidMount..");
                    select(); 
                    // console.log(user_id)
                    // sessionStorage.setItem("user_id", quote.user_id);

                  }, [])

    useEffect(()=>{
                    console.log("inside ComponentDidUpdate..")
                  }, [quotes, quote, message, searchText])

    const select=()=>{
        var helper = new XMLHttpRequest();
        debugger;
        helper.onreadystatechange =()=> {
            if (helper.readyState == 4 && helper.status == 200)
            {
                debugger;
                var result = JSON.parse(helper.responseText);
                var receivedquotes = result;
                setQuotes(receivedquotes);
            }
        };
        helper.open("GET", "http://127.0.0.1:9999/quotes");
        helper.send();
    }

    // const likeQuote=(qid)=>{
    //     debugger;
    //     var data = { "user_id": id, "quote_id": qid }
    //     var helper = new XMLHttpRequest();
    //         helper.onreadystatechange = ()=>{
    //             if(helper.readyState == 4 && helper.status == 200)
    //                 {
    //                     debugger;
    //                     var responseReceived = JSON.parse(helper.responseText);
    //                     if(responseReceived.affectedRows==1)
    //                     {
    //                         setMessage("User liked Quote" +qid);
    //                     }
    //                     else
    //                     {
    //                         setMessage("Something went wrong!, Please try again");
    //                     }
    //                 }
    //         };
    //         helper.open("POST","http://127.0.0.1:9999/favquotesadd");
    //         helper.setRequestHeader("Content-Type", "application/json")
    //         helper.send(JSON.stringify(data));
    // }

    const onSearch=(args)=>{
        debugger;
        setSearchText(args.target.value)
    }

        debugger;
        console.log("Dashboard render is running...")
        
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
                    {/* Div for SearchText */}
                    <hr />
                    <div className='table table-responsive' style={{alignContent: 'center'}}>
                    <center>
                        <div>
                            {
                                quotes.map( (quote) =>{
                                if (searchText!="")
                                    {
                                        debugger;
                                        if (quote.author.toLowerCase().
                                            includes(searchText.toLowerCase()) || 
                                            quote.text.toLowerCase().
                                            includes(searchText.toLowerCase()))
                                        {
                                            debugger;
                                        return  <QuoteRow key={quote.id}
                                                          quote={quote}/>
                                                        //   likeQuote={()=>{likeQuote(quote.id)}}
                                                        //   unLikeQuote={()=>{unLikeQuote(quote.id)}}/>
                                        }
                                        else
                                        {
                                            debugger;
                                            return; 
                                        }
                                    }
                                    {
                                        debugger;
                                        return  <QuoteRow key={quote.id}
                                                          quote={quote}/>
                                    }
                                })
                            }
                        </div>

                    </center>
                    </div>
                    {/* This is the table */}
                    
                </>);

    }

export default Home;