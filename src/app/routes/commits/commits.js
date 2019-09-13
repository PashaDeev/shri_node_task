const util = require(`util`);
const childProcess = require(`child_process`);
const execFile = util.promisify(childProcess.execFile);
const { err: errorDebug } = require(`../../debug`);

async function getCommits(directory, hash) {
  let res;
  try {
    res = await execFile(`git`, [`rev-list`, hash], { cwd: `${directory}.git` });
  } catch (err) {
    if (err.code === `ENOENT`) {
      errorDebug(`no directory`);
      return `no directory`;
    }
  }
  return res.stdout.trim().split(`\n`);
}

module.exports = getCommits;
