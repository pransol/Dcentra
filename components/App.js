import React, { Component } from 'react';
import logo from '../logo.png';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import Web3 from 'web3';
import Bank from '../abis/Bank.json'

// components
import Open from './Open';
import Generate from './Generate';
import Main from './Main';
import Header from './Header';


class App extends Component {

  async componentWillMount(){
    await this.loadWeb3();
    await this.loadBlockChainData();
 }

 async   loadBlockChainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts()
    this.setState({account : accounts[0]})
    console.log(this.state.account)

    let networkId = await web3.eth.net.getId();
    let BankData = Bank.networks[networkId]
    let bank = new web3.eth.Contract(Bank.abi, BankData.address);
     this.setState({bank})
     

         let acc= await bank.methods.account(this.state.account).call();
         this.setState({acc:[ acc]})

         let pin= await bank.methods.pin(this.state.account).call();
         this.setState({pin})

        let history= await bank.methods.getHistory(this.state.account).call();
        this.setState({history})

         let loanData= await bank.methods.loan(this.state.account).call();
         this.setState({loanData:[...this.state.loanData , loanData]})

        let isLoanActive = await bank.methods.loanIsActive(this.state.account).call()
        this.setState({isLoanActive})

         this.setState({ loading: false })

  }

  async loadWeb3 () {
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable();
   }else if(window.web3){
     window.web3 = new Web3(window.web3.currentProvider);
   }else{
     alert("please install metamask")
   }
  }

   addNew = (name,adr,city) => {
    this.setState({ loading: true })
       this.state.bank.methods.addNewAccount(name,adr,city).send({from:this.state.account}).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
   }

   generate = (pin) => {
    this.setState({ loading: true })
    this.state.bank.methods.activateAccount(pin).send({from:this.state.account}).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
   }

   
  credit =(amt) => {
    this.setState({ loading: true })
    this.state.bank.methods.credit().send({from:this.state.account, value:amt}).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  debit =(amt) => {
    this.setState({ loading: true })
    this.state.bank.methods.debit(amt).send({from:this.state.account}).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  transferToOther = (address,amt) => {
    this.setState({ loading: true })
    this.state.bank.methods.transferToOther(address).send({from:this.state.account , value:amt}).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  availLoan = (capital,years) => {
    this.setState({ loading: true })
    this.state.bank.methods.availLoan(years).send({from:this.state.account , value:capital}).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

 

  constructor(props) {
    super(props);
    this.state = {
      account:'',
      bank:{},
      acc:[],
      loanData:[],
      history:[],
      pin:'',
      loading: true,
      isLoanActive:''
    }
  }

  render() {

  let content;
  if(this.state.loading) {
    content = <h4 id="loader" className="text-center" style={{marginTop:"5pc",color:'white'}}>Loading...</h4>
  } else {
    content =<Main profile={this.state.acc}
    transferToOther={this.transferToOther} credit={this.credit} debit={this.debit}
    availLoan={this.availLoan} loanData={this.state.loanData} history={this.state.history}
    pin={this.state.pin} loanIsActive={this.state.isLoanActive}
    />
  }
    return (
      <div>
    
       <Router>
         <Header />
     <Routes>
       
  <Route path='/open'  element={ <Open  add={this.addNew}/>} /> 
  <Route path='/activate'  element={<Generate activate={this.generate} />} /> 
  <Route path='/' exact element={ content }
      
  /> 

  

  </Routes>
     </Router>
       {/* <Generate activate={this.generate} />
       <Profile profile={this.state.acc} />
       <Transact transferToOther={this.transferToOther} credit={this.credit} debit={this.debit} />
       <Loan  availLoan={this.availLoan} loanData={this.state.loanData}/> */}
      </div>
    );
  }
}

export default App;
