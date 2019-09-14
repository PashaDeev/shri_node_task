const debug = require(`debug`)(`routes: `);

const mainFunc = require(`./main`);

function mainRout(rootDir) {
  return async (req, res) => {
    debug(`start`);
    const result = await mainFunc(rootDir);
    res.send({ msg: result });
    debug(`start`);
  };
}

module.exports = mainRout;
