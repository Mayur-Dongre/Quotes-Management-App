import { useState } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.css'

function FavQuoteRow(props) 
{
    debugger;
    // const [islike, setIsLike] = useState(false);

    

    debugger;
    return (<>
                <br />
                <div className="table-bordered, quoteDiv"> 
                    <p className="quote">{props.quote.text}</p> 
                    <h4>-{props.quote.author}</h4>
                    <p>
                    {/* className={"" + (islike ? "text-primary": "")} */}
                        <span className="glyphicon glyphicon-heart"
                                style={{fontSize: "20px"}} aria-hidden="true">
                        </span>
                    </p>

                </div>
            </> );
}

export default FavQuoteRow;