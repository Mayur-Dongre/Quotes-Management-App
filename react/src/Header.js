import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component 
{
    render() { 
        return (<div className="header">
                    <Link to="/home">Home</Link>
                    {"      |      "}
                    <Link to="/my-quotes" >My Quotes</Link> 
                    {/* quotes={quotes} quote={quote} */}
                    {"      |      "}
                    <Link to="/profile">Profile</Link>
                    {"      |      "}
                    <Link to="/login">Log Out</Link>
                    
                </div>);
    }
}
 
export default Header;