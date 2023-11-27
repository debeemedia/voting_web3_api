// async function getResults(req, res, contract) {
//     try {
//       const { electionName } = req.params;
//       const result = await contract.methods.getResults(electionName).call();
//       res.json({ result });
//     } catch (error) {
//       console.error('Error getting results:', error.message);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
// }
  
// module.exports = { getResults };
async function getResults(req, res, contract) {
    try {
        const { electionName } = req.params;
        const result = await contract.getResults(electionName);
        res.json({ result });
    } catch (error) {
        console.error('Error getting results:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getResults };

  