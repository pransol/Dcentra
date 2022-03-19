import React,{useState} from 'react'
import './App.css'
import {Link} from 'react-router-dom'

function Generate({activate}) {

   const[state,setState] = useState('')

    return (
        <div id='med'>
        <div id='outer' >
            <h4>Activate Account By Setting Pin</h4>
            <input placeholder='6 Digit Pin' type="text"  value={state} onChange={(e)=> setState(e.target.value)  }required />
        <Link to='/'>  <button onClick={()=>{
            activate(state)
      }}>Activate</button></Link>  
        </div>
        </div>
    )
}

export default Generate
