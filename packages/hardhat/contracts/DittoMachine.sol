pragma solidity >=0.6.0 <0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
//import "@openzeppelin/contracts/access/Ownable.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract DittoMachine is ERC721, IERC721Receiver {

    event Transform(
        address buyer,
        address former,
        uint256 cloneId,
        address ERC721Contract,
        uint256 tokenId,
        address ERC20Contract,
        uint256 amount
    );

    // event


    mapping (uint256 => bytes) public cloneShape;

    constructor() public ERC721("Ditto", "DTO") {
        // what should we do on deploy?
    }

    function transform(address _ERC721Contract, uint256 _tokenId, address _ERC20Contract, uint256 _amount) public {
        require(_amount >= 1000, "Ditto: Amount too low");
        uint256 cloneId = uint256(keccak256(abi.encodePacked(_ERC721Contract, _tokenId, _ERC20Contract)));
        uint256 value = _amount;
        if (_exists(cloneId) != true) {
            cloneShape[cloneId] = abi.encode(_ERC20Contract, value, block.timestamp, uint8(1));

            IERC20(_ERC20Contract).transferFrom(msg.sender, address(this), value); // REENTRANT RISK!!!
            _safeMint(msg.sender, cloneId); // REENTRANT RISK???
        } else {
            (address token, uint256 worth, uint256 notch, uint8 fever) = abi.decode(cloneShape[cloneId], (address, uint256, uint256, uint8));
            require(_amount >= worth, "Ditto: Insuffient funds provided");
            value = _amount - worth;
            require(value >= 1000, "Ditto: Transform adds no value");
            uint256 fee;
            uint256 min = value * fever / 1000;
            if (block.timestamp <= notch + 42000) {
                fever < 255 ? fever += 1 : fever = 255;
                fee = (worth * (42000 - (block.timestamp - notch)) / 42000);
                fee < min ? fee = min : fee = fee;
            } else {
                uint256 chill = (block.timestamp - notch) / 42000;
                fever > chill && chill <= 255 ? fever -= uint8(chill) : chill > 255 ? fever = 255 : fever = 1;
                fee = min;
            }
            require(fee <= value, "Ditto: Fee exeeds funds supplied");
            value -= fee;
            cloneShape[cloneId] = abi.encode(token, worth + value, block.timestamp, fever);

            IERC20(token).transferFrom(msg.sender, ownerOf(cloneId), worth + fee); // REENTRANT RISK!!!
            IERC20(_ERC20Contract).transferFrom(msg.sender, address(this), value); // REENTRANT RISK!!!

            _safeTransfer(ownerOf(cloneId), msg.sender, cloneId, ""); // REENTRANT RISK!!!
            assert(token == _ERC20Contract);
        }
    }

    function dissolve(uint256 _cloneId) public {
        require(
            ownerOf(_cloneId) == msg.sender ||
            getApproved(_cloneId) == msg.sender ||
            isApprovedForAll(ownerOf(_cloneId), msg.sender) == true,
            "Ditto: Caller is not owner or approved"
        );
        address owner = ownerOf(_cloneId);
        (address token, uint256 worth, uint256 notch, uint8 fever) = abi.decode(cloneShape[_cloneId], (address, uint256, uint256, uint8));
        uint256 fee = calcFee(worth, notch, fever);
        delete cloneShape[_cloneId];
        _burn(_cloneId);
        IERC20(token).transfer(owner, worth - fee);
    }

    function onERC721Received(address, address from, uint256 tokenId, bytes memory data) public override returns (bytes4) {
        address _ERC721Contract = msg.sender;
        require(IERC721(_ERC721Contract).ownerOf(tokenId) == address(this), "Ditto: Token not received");

        bytes memory _ERC20Contract = data;
        uint256 cloneId = uint256(keccak256(abi.encodePacked(_ERC721Contract, tokenId, _ERC20Contract)));
        require(_exists(cloneId) == true, "Ditto: Clone does not exist");

        (address token, uint256 worth, uint256 notch, uint8 fever) = abi.decode(cloneShape[cloneId], (address, uint256, uint256, uint8));

        address owner = ownerOf(cloneId);
        _burn(cloneId);

        IERC20(token).transfer(from, worth); // REENTRANT RISK!!!
        IERC721(_ERC721Contract).safeTransferFrom(address(this), owner, tokenId); // REENTRANT RISK!!!

        return this.onERC721Received.selector;
    }

    function calcFee(uint256 worth, uint256 notch, uint256 fever) private view returns(uint256) {
        uint256 fee;
        uint256 min = worth * fever / 1000;
        if (block.timestamp <= notch + 42000) {
            fee = (worth * (42000 - (block.timestamp - notch)) / 42000);
            fee < min ? fee = min : fee = fee;
        } else {
            fee = min;
        }
        return fee;
    }


}
