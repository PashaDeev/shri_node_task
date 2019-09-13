const util = require(`util`);
const childProcess = require(`child_process`);
const execFile = util.promisify(childProcess.execFile);
const { err: errorDebug } = require(`../../debug`);

async function getCommits(directory, hash) {
  let res;
  try {
    res = await execFile(`git`, [`log`,  `--pretty=format:%H|%ad|%s`, `--date=short`, hash], { cwd: `${directory}.git` });
  } catch (err) {
    if (err.code === `ENOENT`) {
      errorDebug(`no directory`);
      return `no directory`;
    }
    console.log(`-------------------------`);
    console.log(`err`, err);
    console.log(`-------------------------`);
    return `err`;
  }
  return res.stdout.trim().split(`\n`).map((commit) => {
    const [commitHash, date, name] = commit.split(`|`);
    return {
      hash: commitHash,
      date,
      commitMsg: name
    }
  });
}

module.exports = getCommits;
