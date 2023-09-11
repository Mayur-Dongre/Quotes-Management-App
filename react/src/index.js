import React from 'react';
import ReactDOM from 'react-dom/client';
import Launch from './Launch';
import { BrowserRouter } from 'react-router-dom';

debugger;
const root = ReactDOM.createRoot(document.getElementById('root'));
console.log("Inside Index.js");

root.render(<BrowserRouter>
                <Launch/>
            </BrowserRouter>);
