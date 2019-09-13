const util = require(`util`);
const childProcess = require(`child_process`);
const execFile = util.promisify(childProcess.execFile);
const { err: errorDebug } = require(`../../debug`);

async function getCommitDiff(directory, commitHash) {
  let res;
  try {
    res = await execFile(`git`, [`diff`,  commitHash, `${commitHash}~`], { cwd: `${directory}.git` });
  } catch (err) {
    if (err.code === `ENOENT`) {
      errorDebug(`no directory`);
      return `no directory`;
    }
    errorDebug(err)
    return `err`;
  }
  return res.stdout.trim();
}

module.exports = getCommitDiff;
