const debug = require(`debug`)(`router: `);
const path = require(`path`);
const getCommitDiff = require(`./getDiff`);

function routWrapper(rootDir) {
  return async function(req, res) {
    debug(`commit diff start`);
    const { repositoryId, commitHash } = req.params;
    const result = await getCommitDiff(
      path.join(rootDir, repositoryId),
      commitHash
    );
    await res.json(result);
    debug(`commit end`);
  };
}

module.exports = routWrapper;
