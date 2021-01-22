pragma solidity >=0.6.0 <0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TestNFT is ERC721 {


    constructor() public ERC721("Testing NFT", "TNFT") {

    }

    function faucet() public {
        _mint(msg.sender, totalSupply());
    }


}
