function MyQuoteRow(props) 
{
    return (<>
                <br />
                <div className="table-bordered, quoteDiv"> 
                    <p className="quote">{props.quote.text}</p> 
                    <h4>-{props.quote.author}</h4>
                        
                    <button className='btn btn-danger'
                            onClick={ ()=>{ props.deleteQuote(props.quote.id) } }>
                    Delete </button> 
                </div>
            </> );
}

export default MyQuoteRow;