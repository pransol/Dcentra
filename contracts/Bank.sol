// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;



   contract Bank {

    struct OpenAccount {
        uint id;
        string name;
        string adr;
        string branch;
    }

    struct Account {
        address account;
        string accountHolder;
        uint balance;
        bool active;
    }

    struct History {
        string transactionType;
        uint amount;
        uint time;
    } 

    struct Loan {
        uint capital;
        uint rate;
        uint time;
        uint totalToPayBack;
    }

   
    mapping(address => Account) public account;
    mapping(address => OpenAccount) public newAccount;
    mapping(address => Loan) public loan;
    mapping(address => uint) public pin;
    mapping(address => History[]) public history;
    mapping(address => bool)  alreadyHaveAccount; 
    mapping(address => bool) public  loanIsActive; 

    uint public accountId = 0;
  
    //  New Account Opening

   function getBalance() public view returns(uint) {
       return address(this).balance;
   }

    receive() external payable {

    }

    function getHistory(address accounts) view public returns(History[] memory){
         return history[accounts];
    }


    function addNewAccount(string memory _name, string memory _adr,string memory _branch) public {
     
       require( alreadyHaveAccount[msg.sender] == false , 'you already have account');
         accountId++;
        newAccount[msg.sender] = OpenAccount(accountId,_name,_adr,_branch);  

       alreadyHaveAccount[msg.sender] = true; 

    }
   
    function activateAccount(uint _pin) public {
      require(account[msg.sender].active == false);
     string memory accountHolder = newAccount[msg.sender].name;

       account[msg.sender].account = msg.sender;
        account[msg.sender].accountHolder = accountHolder;
          pin[msg.sender] = _pin;

        account[msg.sender].active = true;
     }

    function credit() public payable {
    
     require(account[msg.sender].active == true , "your account is not active");
     require(msg.value > 0);

      payable(address(this)).transfer(msg.value);
        account[msg.sender].balance += msg.value;
        history[msg.sender].push(History("Credit",msg.value,block.timestamp));

    }

  function debit(uint amt) public payable {
     require(account[msg.sender].active == true , "your account is not active");
     
      require(amt > 0);

      payable(msg.sender).transfer(amt);
      transfer(amt);
      
   }

 function transfer(uint _amt) internal {
  
       account[msg.sender].balance -= _amt;
     history[msg.sender].push(History("Debit",_amt,block.timestamp));

  }


 function transferToOther(address _to) public payable {
    require(account[_to].active == true , "receiver account is not active");
    require(account[msg.sender].active == true , "your account is not active");
    require(account[msg.sender].balance >= msg.value);
    require(msg.value > 0);

      account[_to].balance += msg.value;
      transfer(msg.value);

      history[_to].push(History("Credit",msg.value,block.timestamp));
  }

  
  function availLoan(uint time) public payable {
 
    require(account[msg.sender].balance >= ( msg.value/100)*10);
     require(loanIsActive[msg.sender] == false,"You already have loan");
     require( msg.value < address(this).balance );

      account[msg.sender].balance += msg.value;

      uint rate = 5;
      uint interestPerYear = (msg.value /100) * rate;
      uint totalInterest = interestPerYear * time;
      uint totalAmount = msg.value + totalInterest;

     loan[msg.sender].capital = msg.value;
     loan[msg.sender].rate = rate;
     loan[msg.sender].time = time;
     loan[msg.sender].totalToPayBack = totalAmount;

    history[msg.sender].push(History("Credit",msg.value,block.timestamp));

    
    loanIsActive[msg.sender] = true;
  }
 
  }