const util = require(`util`);
const childProcess = require(`child_process`);
const execFile = util.promisify(childProcess.execFile);
const { err: errorDebug } = require(`../../debug`);

async function getStaff(dirPath, commitHash, innerPath) {
  let res;
  try {
    res = await execFile(`git`, [`ls-tree`, `--full-tree`, commitHash, innerPath, `--name-only`], { cwd: dirPath });
  } catch (err) {
    if (err.code === `ENOENT`) {
      errorDebug(`no directory`);
      return `no directory`;
    }
    errorDebug(err);
    return `err`;
  }
  return res.stdout.trim().split(`\n`).map((elem) => {
    return elem.split(`/`).pop();
  });
}

module.exports = getStaff;
