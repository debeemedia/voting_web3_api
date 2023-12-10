**Smart Contract Address**

`0xDc39Ba2253D3374838a5a5Eb3f9a3af1E3506B41`

**ABI (Application Binary Interface)**

```json
[
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
				"internalType": "string",
				"name": "electionName",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			}
		],
		"name": "ElectionCreated",
		"type": "event"
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
		"name": "getCandidates",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
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
				"components": [
					{
						"internalType": "string",
						"name": "choiceText",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "voteCount",
						"type": "uint256"
					}
				],
				"internalType": "struct Voting.ElectionChoice[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
```

## **Smart Contract Functions**

### **1. `createElection`**

- **Description:** Creates a new election with specified choices.
- **Parameters:**
    - **`_electionName`** (type: string): Name of the election.
    - **`_choiceTexts`** (type: string[]): Array of choice texts.
    - **Errors:**
        - **`Election name cannot be empty`**: If the provided election name is empty.
        - `**Election with this name already exists**`: If the provided election name already exists.
- **Example Usage:**
    
    **`contract.createElection("Election1", ["Choice A", "Choice B", "Choice C"]);`**
    

### 2**. `getCandidates`**

- **Description:** Returns an array of candidate names for a specific election.
- **Parameters:**
    - **`_electionName`** (type: string): Name of the election.
- **Returns:**
    - **`string[]`**: Array of candidate names.
    - **Errors:**
        - **`Election with this name does not exist`**: If the provided election name does not exist.
- **Example Usage:**
    
    **`contract.getCandidates("Election1");`**
    

### 3**. `castVote`**

- **Description:** Casts a vote for a specific election and choice.
- **Parameters:**
    - **`_electionName`** (type: string): Name of the election.
    - **`_voteChoice`** (type: uint256): Chosen vote.
    - **Errors:**
        - **`Election name cannot be empty`**: If the provided election name is empty.
        - **`You have already voted`**: If the voter has already cast a vote.
        - **`Invalid vote choice`**: If the chosen vote is not within the valid range.
- **Example Usage:**
    
    `**contract.castVote("Election1", 1);**`
    

### 4**. `getResults`**

- **Description:** Gets the total vote count for each choice in a specific election.
- **Parameters:**
    - **`_electionName`** (type: string): Name of the election.
- **Returns:**
    - **`ElectionChoice[]`**: Array of structs (objects) containing candidate names and corresponding vote counts.
    - **Errors:**
        - **`Election name cannot be empty`**: If the provided election name is empty.
- **Example Usage:**
    
    **`const results = contract.getResults("Election1");`**
    

## **Events**

### **1. `Voted`**

- **Description:** Event emitted when a vote is cast.
- **Parameters:**
    - **`voter`** (type: address): Address of the voter.
    - **`electionName`** (type: string): Name of the election.
    - **`voteChoice`** (type: uint256): Chosen vote.
    - 

### **2. `ElectionCreated`**

- **Description:** Event emitted when an election is created.
- **Parameters:**
    - **`electionName`** (type: string): Name of the election.
    - **`creator`**(type: address): Address of the creator.
