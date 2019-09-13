const util = require(`util`);
const path = require(`path`);
const childProcess = require(`child_process`);
const execFile = util.promisify(childProcess.execFile);
const { err: errorDebug } = require(`../../debug`);

async function create(repositoryId, url, pathToDir) {
  try {
    await execFile(`git`, [
      `clone`,
      `--bare`,
      url,
      `${path.join(pathToDir, repositoryId)}.git`
    ]);
  } catch (err) {
    errorDebug(`error in cloning`)
  }
  return `created ${repositoryId}`;
}

// git clone --bare hello hello.git

module.exports = create;
