const express = require(`express`);
const router = express.Router();
const { main } = require(`./main`);

function mainRout() {
  router.get(`/`, main);

  router.get(`/:repositoryId/commits/:commitHash`, (req, res) => {
    const {repositoryId, commitHash} = req.params;
    return res.end(`${repositoryId} ${commitHash}`);
  });

  return router;
}

module.exports = { router: mainRout() };
