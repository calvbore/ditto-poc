pragma solidity >=0.6.0 <0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestCoin2 is ERC20 {


    constructor() public ERC20("Testing Coin", "TSTC") {

    }

    function faucet(uint256 _amount) public {
        _mint(msg.sender, _amount);
    }


}
