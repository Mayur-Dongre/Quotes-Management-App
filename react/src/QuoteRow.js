import { useEffect, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css'

function QuoteRow(props) 
{
    debugger;
    const id = sessionStorage.getItem("user_id");
    const [islike, setIsLike] = useState();

    useEffect(()=>{
        console.log("inside componentDidMount..");
        userLike(props.quote.id); 
      }, [])

    useEffect(()=>{
        debugger;
        console.log("Component did change")
    }, [islike])

    const userLike=(qid)=>{
        debugger;
        //GET query fetch the quotes liked by user-id(id)
        //set only those quotes as liked...
        var data = { "user_id": id, "quote_id": qid }
        var helper = new XMLHttpRequest();
            helper.onreadystatechange = ()=>{
                if(helper.readyState == 4 && helper.status == 200)
                    {
                        debugger;
                        var responseReceived = JSON.parse(helper.responseText);
                        if(responseReceived.length>0)
                        {
                            debugger;
                            setIsLike(true);
                        }
                        else
                        {
                            debugger;
                            setIsLike(false);
                        }
                    }
            };
            helper.open("PUT","http://127.0.0.1:9999/favquotes");
            helper.setRequestHeader("Content-Type", "application/json")
            helper.send(JSON.stringify(data));        
    }

    const likeBtn =(qid)=>{
        debugger;
        if(islike)
        {
            unLikeQuote(qid);
            // ()=>{props.unLikeQuote(qid)};
        }
        else
        {
            likeQuote(qid);
            // props.likeQuote(qid);
            // ()=>{props.likeQuote(qid)};
        }
        setIsLike(!islike);
    }
    
    const unLikeQuote=(qid)=>{
        debugger;
        var helper = new XMLHttpRequest();
            helper.onreadystatechange = ()=>{
                if(helper.readyState == 4 && helper.status == 200)
                    {
                        debugger;
                        var responseReceived = JSON.parse(helper.responseText);
                        if(responseReceived.affectedRows==1)
                        {
                            // setMessage("User liked Quote" +qid);
                            debugger;
                        }
                        else
                        {
                            debugger;
                            // setMessage("Something went wrong!, Please try again");
                        }
                    }
            };
            helper.open("DELETE","http://127.0.0.1:9999/favquotes/" +qid);
            helper.send();
    }

    const likeQuote=(qid)=>{
        debugger;
        var data = { "user_id": id, "quote_id": qid }
        var helper = new XMLHttpRequest();
            helper.onreadystatechange = ()=>{
                if(helper.readyState == 4 && helper.status == 200)
                    {
                        debugger;
                        var responseReceived = JSON.parse(helper.responseText);
                        if(responseReceived.affectedRows==1)
                        {
                            // setMessage("User liked Quote" +qid);
                            debugger;
                        }
                        else
                        {
                            debugger;
                            // setMessage("Something went wrong!, Please try again");
                        }
                    }
            };
            helper.open("POST","http://127.0.0.1:9999/favquotesadd");
            helper.setRequestHeader("Content-Type", "application/json")
            helper.send(JSON.stringify(data));
    }

    debugger;
    return (<>
                <br />
                <div className="table-bordered, quoteDiv"> 
                    <p className="quote">{props.quote.text}</p> 
                    <h4>-{props.quote.author}</h4>
                        
                    {/* <button className='btn btn-danger'
                            onClick={ ()=>{ props.likeQuote(props.quote.id) } }>
                    Like </button>  */}
                    <p className={"" + (islike ? "text-primary": "")}>
                        <span className={"" +(islike ? "glyphicon glyphicon-heart": "glyphicon glyphicon-heart-empty")}
                                style={{fontSize: "20px"}} aria-hidden="true" 
                                onClick={ ()=>{ likeBtn(props.quote.id)}}>
                        </span>
                    </p>
                </div>
            </> );
}

export default QuoteRow;