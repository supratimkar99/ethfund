// We will be using Solidity version 0.5.4
pragma solidity 0.5.4;

// Importing OpenZeppelin's SafeMath Implementation
import 'https://github.com/icherko/openzeppelin-solidity/blob/master/contracts/math/SafeMath.sol';

contract Ethfund {
    
    using SafeMath for uint256;
    
    //List of projects
    Project[] private projects;

    //Event that will be emitted whenever a new project is started
    event ProjectStarted(
        address contractAddrerss,
        address projectStarter,
        string projectTitle
    );    
    
    // Event that will be emitted whenever a new user registers
    event Registered(
        address user
    );
    
    function register() external {
        emit Registered( 
            msg.sender
        );
    }

    
    //Function to start a new project
    function startProject(
        string calldata title
    ) external {
        Project newProject = new Project(msg.sender, title);
        projects.push(newProject);
        emit ProjectStarted(
            address(newProject),
            msg.sender,
            title
        );
    }
    
    
    //Function to get all projects' contract addresses
    function returnAllProjects() external view returns(Project[] memory) {
        return projects;
    }
}

contract Project {
    using SafeMath for uint256;
    
     // State variables
    address payable public creator;
    string public title;
    address addr = address(this);
    mapping (address => uint) public ownership;
    
    constructor
    (
        address payable projectStarter,
        string memory projectTitle
    ) public {
        creator = projectStarter;
        title = projectTitle;
        ownership[creator] = ownership[creator].add(100);
    }
    
    
    
    function purchase(
            uint amount,
            uint stake,
            address payable seller
        ) external payable {
        require(msg.value == amount);
        ownership[msg.sender] = ownership[msg.sender].add(stake);
        ownership[seller] = ownership[seller].sub(stake);
        payOut(seller,msg.value);
    }
    
    function payOut(
        address payable seller,
        uint amount
    ) internal {
        if(!seller.send(amount)) {
            //
        }
        else {
            //
        }
        
    }
    
    function getStakeDetails(
        address user    
    ) public view returns
    (
        uint stake
    ) {
        stake = ownership[user];
    }
    
    function getDetails() public view returns 
    (
        address contractAddress,
        string memory projectTitle
    ) {
        contractAddress = addr;
        projectTitle = title;
    }
    
}