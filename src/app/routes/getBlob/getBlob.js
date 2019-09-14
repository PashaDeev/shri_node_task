const util = require(`util`);
const childProcess = require(`child_process`);
const execFile = util.promisify(childProcess.execFile);
const { err: errorDebug } = require(`../../debug`);

async function getBlob(dir, hash, innerPath) {
  let res;
  try {
    res = await execFile(`git`, [`show`, `${hash}:${innerPath}`], {
      cwd: dir
    });
  } catch (err) {
    if (err.code === `ENOENT`) {
      errorDebug(`no directory`);
      return { code: 400, msg: `no directory` };
    }

    if (err.code === 128) {
      return { code: 400, msg: err.stderr };
    }

    errorDebug(err);
    return { code: 500, msg: `err` };
  }
  return { code: 200, msg: res.stdout.trim() };
}

module.exports = getBlob;
