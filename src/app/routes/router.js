const express = require(`express`);
const debug = require(`debug`)(`router: `)
const router = express.Router();
const { main } = require(`./main`);

function mainRout() {
  router.get(`/`, main);

  router.get(`/:repositoryId/commits/:commitHash`, async (req, res) => {
    debug(`commit start`);
    const {repositoryId, commitHash} = req.params;
    res.write(`fist part ${new Date()} \n`);
    await new Promise(res => setTimeout(() => res(), 1000))
    res.end(`end part ${repositoryId} ${commitHash} ${new Date()}`);
    debug(`commit end`);
  });

  return router;
}

module.exports = { router: mainRout() };
