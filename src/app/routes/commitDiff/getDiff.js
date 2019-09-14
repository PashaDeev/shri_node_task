const util = require(`util`);
const childProcess = require(`child_process`);
const execFile = util.promisify(childProcess.execFile);
const { err: errorDebug } = require(`../../debug`);

async function getCommitDiff(directory, commitHash) {
  let res;
  try {
    res = await execFile(`git`, [`diff`, commitHash, `${commitHash}~`], {
      cwd: `${directory}.git`
    });
  } catch (err) {
    if (err.code === `ENOENT`) {
      errorDebug(`no directory`);
      return { code: 400, msg: `no directory` };
    }
    errorDebug(err);
    return { code: 400, msg: `err` };
  }
  return { code: 200, msg: res.stdout.trim() };
}

module.exports = getCommitDiff;
