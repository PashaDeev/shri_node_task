const util = require(`util`);
const childProcess = require(`child_process`);
const execFile = util.promisify(childProcess.execFile);
const { err: errorDebug } = require(`../../debug`);

async function getBlob(dir, hash, innerPath) {
  let res;
  try {
    const out = await execFile(`git`, [`show`, `${hash}:${innerPath}`], { cwd: dir });
    res = out.stdout;
  } catch (err) {
    if (err.code === `ENOENT`) {
      errorDebug(`no directory`);
      return `no directory`;
    }
    errorDebug(err);
    return `err`;
  }
  return res.trim();
}

module.exports = getBlob;
