//SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.4;

contract Wallet {

    event MoneySent(address indexed _beneficiary, uint _amount);
    event MoneyReceived(address indexed _from, uint _amount);

    address[] donatorsList;
    address private _owner = msg.sender;

    mapping (address => uint) balances;

    modifier onlyOwner() {
        require(_owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    function isOwner() public view returns (bool) {
        return msg.sender == _owner;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getDonationSumByUser(address _who) public view returns (uint) {
        return balances[_who];
    }

    function getDonatorsList() public view returns (address[] memory) {
        return donatorsList;
    }

    function withdrawMoney(address payable _to, uint _amount) public payable onlyOwner {
        require(_amount <= address(this).balance, "Contract doesn't own enough money");
        emit MoneySent(_to, _amount);
        _to.transfer(_amount);
    }

    function donate() public payable {
        if (balances[msg.sender] == 0) {
            donatorsList.push(msg.sender);
        }       
        balances[msg.sender] += msg.value;
    }
}