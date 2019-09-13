const express = require(`express`);
const debug = require(`debug`)(`router: `);
const path = require(`path`);
const router = express.Router();
const main = require(`./main`);
const create = require(`./create`);
const deleteRepository = require(`./delete`);
const { getCommits } = require(`./commits`);

function mainRout(dir) {
  const rootDir = dir;
  router.post(`/:repositoryId`, async (req, res) => {
    debug(`create start`);
    const { repositoryId } = req.params;
    const { body } = req;
    if (!repositoryId || !body || !body.url) {
      res.statusCode = 400;
      return res.end(`bad request`);
    }
    const msg = await create(repositoryId, body.url, rootDir);
    res.end(msg);
    debug(`create end`);
  });

  router.delete(`/:repositoryId`, async (req, res) => {
    debug(`delete start`);
    const { repositoryId } = req.params;
    if (!repositoryId) {
      res.statusCode = 400;
      return res.end(`bad request`);
    }
    const msg = await deleteRepository(repositoryId, rootDir);
    res.end(msg);
    debug(`delete end`);
  });

  router.get(`/`, main);

  router.get(`/:repositoryId/commits/:commitHash`, async (req, res) => {
    debug(`commit start`);
    const { repositoryId, commitHash } = req.params;
    // res.write(`fist part ${new Date()} \n`);
    const result = await getCommits(
      path.join(rootDir, repositoryId),
      commitHash
    );
    // await new Promise(res => setTimeout(() => res(), 1000));
    await res.json({ msg: result });
    debug(`commit end`);
  });

  return router;
}

module.exports = { router: mainRout };
