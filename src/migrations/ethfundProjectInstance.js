import web3 from './web3';

const abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "creator",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "ownership",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "title",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "stake",
				"type": "uint256"
			},
			{
				"name": "seller",
				"type": "address"
			}
		],
		"name": "purchase",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "user",
				"type": "address"
			}
		],
		"name": "getStakeDetails",
		"outputs": [
			{
				"name": "stake",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getDetails",
		"outputs": [
			{
				"name": "contractAddress",
				"type": "address"
			},
			{
				"name": "projectTitle",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "projectStarter",
				"type": "address"
			},
			{
				"name": "projectTitle",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "ownerStake",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "buyerStake",
				"type": "uint256"
			}
		],
		"name": "PaymentDone",
		"type": "event"
	}
];

export default (address) => {
  const instance = new web3.eth.Contract(abi, address);
  return instance;
};