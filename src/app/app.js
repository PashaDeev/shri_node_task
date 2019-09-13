const express = require("express");
const fs = require(`fs-extra`);
const path = require(`path`);
const bodyParser = require("body-parser");

const app = express();

app.get(`/`, async (req, res) => {
  const fileData = await fs.readFile(path.join(__dirname, `views/main/index.html`));
  res.end(fileData);
});

app.get(`/`, (req, res) => {
  res.end(`hello`);
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());;
const { router } = require(`./routes`);

app.use(`/api/repos`, router);

module.exports = app;
