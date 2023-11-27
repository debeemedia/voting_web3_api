const express = require('express')
const { getResults } = require('../controllers/getResults')
const { castVote } = require('../controllers/castVote')
const router = express.Router()

module.exports = (contract) => {
    router.get('/get_results/:electionName', (req, res) => getResults(req, res, contract));
    router.post('/cast_vote/:electionName/:voteChoice', (req, res) => castVote(req, res, contract));
    return router;
};
// module.exports = (contract) => {
//     router.get('/get_results/:electionName', getResults(contract));
//     router.post('/cast_vote/:electionName/:voteChoice', castVote(contract));
//     return router;
// };