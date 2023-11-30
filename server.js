require('dotenv').config()
const express = require('express')
// const Web3 = require('web3')
const { ethers } = require('ethers');
const app = express()
const cors = require('cors')
const createRouter = require('./routes/routes')

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 8000

// const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${process.env.PROJECT_ID}`));
// const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.PROJECT_ID}`);
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.PROJECT_ID}`);

const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_electionName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_voteChoice",
				"type": "uint256"
			}
		],
		"name": "castVote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_electionName",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "_choiceTexts",
				"type": "string[]"
			}
		],
		"name": "createElection",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "voter",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "string",
				"name": "electionName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "voteChoice",
				"type": "uint256"
			}
		],
		"name": "Voted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_electionName",
				"type": "string"
			}
		],
		"name": "getResults",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const contractAddress = '0x7D823610BA65733AE2Aa6F504f6B6bA3443f9d40';
// const contract = new web3.eth.Contract(abi, contractAddress);
const contract = new ethers.Contract(contractAddress, abi, provider);

const router = createRouter(contract);

app.use('/api', router)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
