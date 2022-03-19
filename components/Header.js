import React from 'react'
import './Main.css'
import {Link} from 'react-router-dom'
function Header() {
    return (
        <div id='header'>
            <h4> Decentra Bank</h4>
           <div id='btn'>
         <Link to='/open' style={{textDecoration:"none"}}><h3> + New Account</h3></Link>  
         <Link to='/activate' style={{textDecoration:"none"}}> <h3>Activate a/c</h3></Link> 
           </div>
        </div>
    )
}

export default Header
