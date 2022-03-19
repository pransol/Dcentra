import React,{useState} from 'react'
import './App.css';


import {Link} from 'react-router-dom'

function Open({add}) {

   const[state,setState] = useState({
        name:'',
        adr:'',
        city:''
   })
   
   function handleChange(e){
       const value = e.target.value;
       setState({
           ...state,
           [e.target.name] : value
       })
   }

   let pass = <Link to='/' >   <button type='submit' onClick={()=>{
    add(state.name,state.adr,state.city)
}} >Open Account</button></Link>

    return (
        <div id='med'>
        <div id='outer' >
            <h4>Open New Account</h4>
            <input type="text" placeholder='Name' name='name' value={state.name} onChange={handleChange} required />
            <input type="text" placeholder='Address' name='adr' value={state.adr}  onChange={handleChange} required/>
            <input type="text" placeholder='Branch' name='city' value={state.city}  onChange={handleChange} required/>
        {pass}
        </div>
        </div>
    )
}

export default Open
