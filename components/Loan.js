import React,{useState,useEffect} from 'react'

function Loan({availLoan,pin}) {
   
    const[loan,setLoan] = useState({
        capital:'',
        years:'',
        pin:''
    })

    function handleChange (e){
        const value = e.target.value;
        setLoan({
            ...loan,
            [e.target.name] : value
        })
    }

    return (
        <div id='loan' className='head'>
            <h3>Apply For Loan</h3>
            <input type="text" placeholder='Amount' name='capital'   value={loan.capital} onChange={handleChange } />
            <input type="text" placeholder='Years' name='years' value={loan.years} onChange={handleChange  } />
            <input type="text" placeholder='Pin' name='pin'  value={loan.pin} onChange={handleChange  } />
            <button  onClick={()=>{
                if(loan.pin == pin){
                    let finalAmt = loan.capital*10**18
                    availLoan(finalAmt,loan.years)
                }else{
                    alert("Invalid Pin")
                }
                  
            }} >Get Loan</button>

                       

                
        </div>
    )
}

export default Loan
