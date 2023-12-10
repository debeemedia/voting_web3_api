// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

contract Voting {
    // Struct to represent a vote choice
    struct VoteChoice {
        uint256 choiceId;
        string choiceText;
    }

    // Struct to represent an election choice with vote count
    struct ElectionChoice {
        string choiceText;
        uint256 voteCount;
    }

    // Struct to represent an election
    struct Election {
        mapping(uint256 => uint256) voteCounts;
        mapping(address => bool) hasVoted;
        mapping(string => bool) electionExists;
        VoteChoice[] choices;
    }

    // Mapping to store elections by their names
    mapping(string => Election) private elections;

    // Event to be emitted when a vote is cast
    event Voted(address indexed voter, string indexed electionName, uint256 voteChoice);

    // Event to be emitted when an election is created
    event ElectionCreated(string indexed electionName, address indexed creator);

    // Function to create a new election with specified choices
    function createElection(string memory _electionName, string[] memory _choiceTexts) external {
        require(bytes(_electionName).length > 0, "Election name cannot be empty");
        require(!elections[_electionName].electionExists[_electionName], "Election with this name already exists");

        Election storage newElection = elections[_electionName];
        newElection.electionExists[_electionName] = true;

        for (uint256 i = 0; i < _choiceTexts.length; i++) {
            newElection.choices.push(VoteChoice({
                choiceId: i + 1,
                choiceText: _choiceTexts[i]
            }));
        }

        // Emit the ElectionCreated event
        emit ElectionCreated(_electionName, msg.sender);
    }

    // Function to get the names of candidates in a specific election
    function getCandidates(string memory _electionName) external view returns (string[] memory) {
        Election storage election = elections[_electionName];
        require(election.electionExists[_electionName], "Election with this name does not exist");

        string[] memory candidateNames = new string[](election.choices.length);
        for (uint256 i = 0; i < election.choices.length; i++) {
            candidateNames[i] = election.choices[i].choiceText;
        }

        return candidateNames;
    }

    // Function to cast a vote for a specific election and choice
    function castVote(string memory _electionName, uint256 _voteChoice) external {
        Election storage election = elections[_electionName];

        // Ensure the election exists
        require(election.electionExists[_electionName], "Election with this name does not exist");
        require(bytes(_electionName).length > 0, "Election name cannot be empty");

        // Ensure the voter has not voted before
        require(!election.hasVoted[msg.sender], "You have already voted");

        // Ensure the vote choice is valid
        require(_voteChoice >= 1 && _voteChoice <= election.choices.length, "Invalid vote choice");

        // Record the vote
        election.voteCounts[_voteChoice]++;
        election.hasVoted[msg.sender] = true;

        // Emit the Voted event
        emit Voted(msg.sender, _electionName, _voteChoice);
    }

    // Function to get the total vote count for each choice in a specific election
    function getResults(string memory _electionName) external view returns (ElectionChoice[] memory) {
        Election storage election = elections[_electionName];

        // Ensure the election exists
        require(election.electionExists[_electionName], "Election with this name does not exist");
        require(bytes(_electionName).length > 0, "Election name cannot be empty");

        // Create an array to store election choices with vote counts
        ElectionChoice[] memory results = new ElectionChoice[](election.choices.length);

        // Populate the array with election choices and corresponding vote counts
        for (uint256 i = 0; i < election.choices.length; i++) {
            results[i] = ElectionChoice({
                choiceText: election.choices[i].choiceText,
                voteCount: election.voteCounts[i + 1] // Adjust index to match choiceId
            });
        }

        return results;
    }
}
