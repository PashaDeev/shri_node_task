const util = require(`util`);
const path = require(`path`);
const childProcess = require(`child_process`);
const execFile = util.promisify(childProcess.execFile);
const { err: errorDebug } = require(`../../debug`);

async function main(rootDir) {
  let res;
  try {
    res = await execFile(`ls`, [`-1`], { cwd: rootDir });
  } catch (err) {
    errorDebug(`error for get ${err}`);
  }
  return res.stdout.trim().split(`\n`);
}

module.exports = main;
