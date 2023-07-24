// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract EasyAsset is ERC721, ReentrancyGuard {
    address public owner;
    enum assetStatus {
        OPEN,
        PAID,
        HELD,
        REFUNDED,
        SOLD
    }
     
    struct buyer {
        assetStatus status;
        uint256 id;
        uint256 amountpaid;
        uint256 timestamp;
        bool paid;
        bool checked;
        address owner;
        string credential;
    }

    struct Asset {
        bool probe;
        bool bought;
        assetStatus status;
        uint256 timestamp;
        uint256 price;
        uint256 id;
        address seller;
        string title;
        string description;
        string credential;    
    }
       struct user{
        uint256 age;
        uint256 nationalId;
        string phonenumber;
        string firstName;
    }

     mapping(uint256 => bool) private AssetIdExist;
    mapping(string => bool) private AssetExist;
    mapping(uint256 => buyer) private refundedBuyers;
    mapping(uint256 => buyer) public  buyerMap;
    mapping(uint256 => user) public  usersDetail;
    mapping (address => bool) public  verified;
    Asset[] public  assetArray;


    event assetCreation(
        address owner,
        uint256 indexed id,
        string credential,
        uint256 timestamp,
        uint256 price
    );

    event assetTransfer(
        address from,
        address to,
        uint256 tokenId,
        string credential,
        uint256 timestamp
    );

    event sold(bool confirm, assetStatus status);

     event Action(
        address buyer,
        address seller,
        uint256 timestamp,
        uint256 amount,
        bool paid
    );
    event refundAction(
        assetStatus,
        assetStatus
    );
  
 

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        owner = payable(msg.sender);
    }


    function _registerUser(
    uint256 _age,
    uint256 _nationalId,
    string calldata _phonenumber,
    string calldata _firstName
    ) public  {
    require(!verified[msg.sender], "You are already verified");


    usersDetail[_nationalId] = user({
        age: _age,
        nationalId: _nationalId,
        phonenumber: _phonenumber,
        firstName: _firstName
        
    });

    verified[msg.sender] = false;
}

    function _verifyUser(
        uint256 _age,
        uint256 _nationalId,
        string calldata _phonenumber,
        string calldata _firstName
    ) public   {
    // require(!verified[msg.sender], "You are already verified");


    user storage userdetails = usersDetail[_nationalId]; 

    require(userdetails.nationalId == _nationalId, "User not found or data mismatch");
    require(
        keccak256(bytes(userdetails.phonenumber)) == keccak256(bytes(_phonenumber)) &&
        keccak256(bytes(userdetails.firstName)) == keccak256(bytes(_firstName)) &&
        userdetails.age == _age && userdetails.age >= 18,
        "Verification failed"
    );

    verified[msg.sender] = true;
    }



     modifier isVerified {
        require(verified[msg.sender] == true , "You are noy verified");
        _;
    }

    function createAsset(
        
        string calldata title,
        string calldata description,
        string calldata credential,
        uint256 price
        
    ) public isVerified  returns (bool) {
        require(verified[msg.sender] == true && !AssetExist[credential] , "You are noy verified");

       

        uint256 assetCounter = assetArray.length;
        assetArray.push(Asset(false, false, assetStatus.OPEN, block.timestamp, price, assetCounter, msg.sender, title, description, credential));

        AssetExist[credential] = true;
        AssetIdExist[assetCounter] = true;

        emit assetCreation(msg.sender, assetCounter, credential, block.timestamp, price);
        _safeMint(msg.sender, assetCounter);

        return true;
    }



    function buyAsset (uint256 id) public  payable nonReentrant {
    Asset storage assetToBuy = assetArray[id];

    require( assetToBuy.status == assetStatus.OPEN, " Asset is undergoing Negotiation");
    require(msg.sender != assetToBuy.seller&& msg.value == assetToBuy.price, 
        "You cannot buy your Asset or Incorrect payment amount ");
    require(verified[msg.sender] == true && AssetIdExist[id], "you are not verified");
    // require(msg.value == assetToBuy.price, "Incorrect payment amount");

    buyer memory newBuyer = buyer(assetStatus.PAID,id,  msg.value, block.timestamp, true, false, msg.sender,"");
    buyerMap[id] = newBuyer;
   

    assetToBuy.bought = true;
    assetToBuy.status = assetStatus.PAID;

    emit Action(msg.sender, assetToBuy.seller, block.timestamp, msg.value, true);
}



    function refund(uint256 id) public {
    buyer storage buyerToRefund = buyerMap[id];
    Asset storage assetToRefund = assetArray[id];

    require(msg.sender == buyerToRefund.owner && buyerToRefund.status == assetStatus.PAID, "You are not the buyer of this asset");

    buyerToRefund.status = assetStatus.REFUNDED;
    refundedBuyers[id] = buyerToRefund;

    pay(buyerToRefund.owner, assetToRefund.price);
    assetToRefund.bought = false;
    assetToRefund.status = assetStatus.OPEN;

    emit refundAction(assetToRefund.status, buyerToRefund.status);
}




    function Probe(uint256 id) public {
    require(msg.sender == owner && !assetArray[id].probe, "Only Owner has the authority to probe Asset, Process Reversed");

    Asset storage assetToProbe = assetArray[id];
    assetToProbe.probe = true;

    if (assetToProbe.status == assetStatus.PAID) {
        buyer storage buyerToPay = buyerMap[id];
        pay(buyerToPay.owner, assetToProbe.price);
    }

    assetToProbe.status = assetStatus.HELD;
}
    // function checked(uint id) public {
    //     require(!buyerMap[id].checked && buyerMap[id].owner == msg.sender, "you are not the buyer");
    //     buyerMap[id].checked = true;
    // }

    function releaseAsset(uint256 id) public {
        Asset storage assetToProbe = assetArray[id];
        require(msg.sender == owner && assetToProbe.status == assetStatus.HELD, "only the owner can release Asset");
        assetToProbe.probe = false;
        assetToProbe.status = assetStatus.OPEN;
    }



 

  function confirm(uint256 id) public {
        // check if asset exist
         Asset storage assetToConfirm = assetArray[id];
        buyer storage buyerToConfirm = buyerMap[id];
        
        // //the asset must be set to PAID before approval

        require(
            assetToConfirm.status == assetStatus.PAID && AssetIdExist[id] ,
            "Asset is undergoing Negotiation"
        );
         //only the initial buyer  can call this function
        require(
            msg.sender == buyerToConfirm.owner && !buyerToConfirm.checked,
            "Only the buyer can call this function"
        );

        // change the checking status to true
        buyerToConfirm.checked = true;

        // uint256 fund = assetToConfirm.price;
        //  pay the asset owner
         pay(assetToConfirm.seller, assetToConfirm.price);
        assetToConfirm.status = assetStatus.SOLD;
        // transfer ownership
        _transfer(assetToConfirm.seller, msg.sender, assetToConfirm.id);
        buyerToConfirm.credential = assetToConfirm.credential;
        assetToConfirm.seller = msg.sender;
        

        emit assetTransfer(
            assetToConfirm.seller,
            buyerToConfirm.owner,
            assetToConfirm.id,
            buyerToConfirm.credential,
            block.timestamp
        );
         buyerToConfirm.status = assetStatus.SOLD;

        emit sold(buyerToConfirm.checked, assetToConfirm.status);
    }
    


    function getAssets() public view returns (Asset[] memory) {
        return assetArray;
    }

    function getRefundedBuyers(uint256 _id) public view returns (buyer memory) {
        return refundedBuyers[_id];
    }
    

   

    function pay(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success, "Failed to send Ether");
    }
}
