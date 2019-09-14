const express = require(`express`);
const debug = require(`debug`)(`router: `);
const path = require(`path`);
const router = express.Router();
const main = require(`./main`);
const create = require(`./create`);
const deleteRepository = require(`./delete`);
const { getCommits } = require(`./commits`);
const { getCommitDiff } = require(`./commitDiff`);
const { getStaff } = require(`./getRepositoryStaff`);
const { getBlob } = require(`./getBlob`);

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
    const result = await getCommits(
      path.join(rootDir, repositoryId),
      commitHash
    );
    await res.json({ msg: result });
    debug(`commit end`);
  });

  router.get(`/:repositoryId/commits/:commitHash/diff`, async (req, res) => {
    debug(`commit diff start`);
    const { repositoryId, commitHash } = req.params;
    const result = await getCommitDiff(
      path.join(rootDir, repositoryId),
      commitHash
    );
    await res.json({ msg: result });
    debug(`commit end`);
  });

  router.get(
    `/:repositoryId/tree/:commitHash?/:pathFromUrl?`,
    async (req, res) => {
      debug(`repository staff start`);
      const { repositoryId, commitHash, pathFromUrl } = req.params;
      const dir = path.join(rootDir, `${repositoryId}.git`);
      const innerPath = pathFromUrl ? `./${pathFromUrl}/` : `.`;
      const hash = commitHash || `master`;
      const result = await getStaff(dir, hash, innerPath);
      await res.json({ msg: result });
      debug(`repository staff end`);
    }
  );

  router.get(
    `/:repositoryId/blob/:commitHash/:pathToFile*`,
    async (req, res) => {
      debug(`get blob start`);

      const { repositoryId, commitHash, pathToFile } = req.params;
      const dir = path.join(rootDir, `${repositoryId}.git`);
      const innerPath = pathToFile ? `${pathToFile}${req.params[0]}` : `.`;
      const hash = commitHash || `master`;
      const result = await getBlob(dir, hash, innerPath);
      await res.json({ msg: result });

      debug(`get blob end`);
    }
  );

  return router;
}

module.exports = { router: mainRout };
