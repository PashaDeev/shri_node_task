const debug = require(`debug`)(`router: `);
const path = require(`path`);
const getCommits = require(`./commits`);

function routWrapper(rootDir) {
  return async function(req, res) {
    debug(`commit start`);
    const { repositoryId, commitHash } = req.params;
    const result = await getCommits(
      path.join(rootDir, repositoryId),
      commitHash
    );
    res.statusCode = result.code;
    await res.json(result);
    debug(`commit end`);
  };
}

module.exports = routWrapper;
