import React,{useState} from 'react'

function Transact({transferToOther,credit,debit,pin}) {
   
    const[cr,setCr] = useState({
        amt:'',
        pin:''
    })

    function handleChange(e){
        const value = e.target.value;
        setCr({
            ...cr,
            [e.target.name] : value
        })
    }


    const[dr,setDr] = useState({
        amt:'',
        pin:''
    })

    function handlesChange(e){
        const value = e.target.value;
        setDr({
            ...dr,
            [e.target.name] : value
        })
    }

    const[trans,setTrans] = useState({
        amt:'',
        to:'',
        pin:''
    })

    function transChange(e){
        const value = e.target.value;
        setTrans({
            ...trans,
            [e.target.name] : value
        })
    }

    return (
        <>
       
        <div id='crdr' className='head'>
        <div id='credit'>
            <h3>Credit</h3>
            <input placeholder='Amount' name='amt' type="text"  value={cr.amt} onChange={handleChange} />
            <input placeholder='Pin' name='pin' type="text"  value={cr.pin} onChange={handleChange} />
            <button  onClick={()=>{
                let finalAmt = cr.amt * 10**18
               if(cr.pin == pin){
                credit(finalAmt)
               }else{
                alert('Invalid Pin')
               }
            }} >Credit</button>
        </div>
        <div id='debit'>
            <h3>Withdraw</h3>
            <input type="text" placeholder='Amount' name='amt'   value={dr.amt} onChange={handlesChange } />
            <input type="text" placeholder='Pin' name='pin'    value={dr.pin} onChange={handlesChange } />
            <button  onClick={()=>{
                let finalAmt = dr.amt*10**18
                if(dr.pin == pin){
                    debit(finalAmt.toString())
                }else{
                    alert('Invalid Pin')
                   }
            }} >Withdraw</button>
        </div>
        </div>
        <div id='transfer' className='head'>
            <h3>Transfer</h3>
            <input type="text" placeholder='To'  name='to' value={trans.to} onChange={transChange  } />  
            <input type="text" placeholder='Amount' name='amt'   value={trans.amt} onChange={ transChange  } />
            <input type="text" placeholder='Pin' name='pin'  value={trans.pin} onChange={transChange } />
            <button  onClick={()=>{
                let finalAmt = trans.amt * 10**18
                if(trans.pin == pin){
                    transferToOther(trans.to,finalAmt)
                }else{
                    alert('Invalid Pin')
                   }
                  
            }} >Transfer</button>
        </div>
        </>
    )
}
export default Transact
