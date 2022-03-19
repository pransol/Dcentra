import React from 'react'
import './Main.css'

import Profile from './Profile';
import Transact from './Transact';
import Loan from './Loan';

function Main({profile,transferToOther,credit,debit,availLoan,loanData,history,pin,loanIsActive}) {
    
    return (
        <div>
             <Transact  transferToOther={transferToOther} credit={credit} debit={debit} pin={pin} />
            <Profile profile={profile} loanIsActive={loanIsActive}  loanData={loanData} history={history} />
            <Loan availLoan={availLoan}  pin={pin} />
        </div>
    )
}

export default Main
