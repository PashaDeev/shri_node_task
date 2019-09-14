const util = require(`util`);
const path = require(`path`);
const childProcess = require(`child_process`);
const execFile = util.promisify(childProcess.execFile);
const { err: errorDebug } = require(`../../debug`);

async function create(repositoryId, url, pathToDir) {
  try {
    await execFile(`git`, [`clone`, `--bare`, url, repositoryId]);
  } catch (err) {
    if (err.code === 128) {
      return { code: 400, msg: `already exist` };
    }
    errorDebug(`error in cloning ${err}`);
    return { code: 500, msg: `error` };
  }
  return { code: 200 };
}

module.exports = create;
