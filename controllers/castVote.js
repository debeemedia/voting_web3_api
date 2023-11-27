// async function castVote (req, res, contract) {
//     try {
//         const { electionName, voteChoice } = req.params;
//         const userAddress = '0x4847c796e04863b80E964e55496Bf1EdFCb81900'; // Replace with the user's Ethereum address
//         const result = await contract.methods.castVote(electionName, parseInt(voteChoice)).send({ from: userAddress });
//         res.json({ result });

//     } catch (error) {
//         console.error('Error casting vote:', error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

// module.exports = {castVote}

async function castVote(req, res, contract) {
    try {
        const { electionName, voteChoice } = req.params;
        const userAddress = '0x4847c796e04863b80E964e55496Bf1EdFCb81900'; // Replace with the user's Ethereum address
        const result = await contract.castVote(electionName, parseInt(voteChoice));
        res.json({ result });
    } catch (error) {
        console.error('Error casting vote:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { castVote };
