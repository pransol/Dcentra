import React, { useState } from 'react'

function Profile({ profile,loanIsActive, loanData,history }) {

    let cap, rate, time, totalToPayBack, Emi;

    const [alter,setAlter] = useState(false)

    loanData.map(item => {
        cap = item.capital.toString();
        rate = item.rate.toString();
        time = item.time.toString();
        totalToPayBack = item.totalToPayBack.toString()
    })

    Emi = totalToPayBack / (time * 12)
    
    let btn;
    alter? btn = "History" : btn = "Loan"

    function fun() {
        setAlter(!alter)
    }

    console.log(loanIsActive)

    return (
        <div id='profile'>
            <h4>User Info</h4>
            {
                profile.map((item, i) => {
                    return <div key={i} >
                        <h3>AccountHolder : {item.accountHolder}</h3>
                        {/* <h3>AccountNumber : {item.pin.toNumber()}</h3> */}
                        <h3>Account : {item.account}</h3>
                        <h3>Balance : {item.balance.toString()/10**18} Ether</h3>
                    </div>
                })
            }
      
            <button id='change' onClick={fun}>{btn}</button>

        {
            btn == "History" ?  <div id='loanData'>
            <h4>Loan Data</h4>
             {
                 loanIsActive == false ?  <h5>You don't have any Loan Active</h5> 
                 :<>
                 <h3>Loan Amount : {cap/10**18} Ethers</h3>
                 <h3>Interest Rate : {rate}</h3>
                 <h3>Time : {time}</h3>
                 <h3>Emi : {Emi/10**18} Ether</h3>
                 <h3> Total Amount To Pay Back : {totalToPayBack/10**18} Ethers</h3> </> 
             }   
            </div>:
             <div id='history'>
             <h3>Recent Transactions</h3>
                    <table className="table " >
     <thead className="thead" id='thead'>
     <tr>
             <th> Tr.no.</th>
             <th>Date</th>
             <th>Amount</th>
           </tr>
     </thead>
     
       
       <tbody className="tbody table-borderless" id='tbody'>
      { history.map((item,i) =>
         <React.Fragment key={i}>   <tr>
                    <td>{i+1}</td>
                    <td>{new Date(item.time * 1000).toDateString()}</td>
                   { item.transactionType == "Debit" ? 
                      <td>-{item.amount.toString()/10**18} Ether</td>
                    :
                     <td>{item.amount.toString()/10**18} Ether</td>}
                  </tr>
                  </React.Fragment>
           ).reverse()}
                     
      </tbody>
     
   </table>
      
           </div>
        }

           

        </div>
    )
}

export default Profile
