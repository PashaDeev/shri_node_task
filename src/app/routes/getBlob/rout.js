const debug = require(`debug`)(`router: `);
const path = require(`path`);
const getBlob = require(`./getBlob`);

function routWrapper(rootDir) {
  return async function(req, res) {
    debug(`get blob start`);

    const { repositoryId, commitHash, pathToFile } = req.params;
    const dir = path.join(rootDir, `${repositoryId}.git`);
    const innerPath = pathToFile ? `${pathToFile}${req.params[0]}` : `.`;
    const hash = commitHash || `master`;
    const result = await getBlob(dir, hash, innerPath);
    await res.json({ msg: result });

    debug(`get blob end`);
  };
}

module.exports = routWrapper;
