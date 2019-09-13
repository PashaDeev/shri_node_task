const express = require("express");
const { router } = require(`./routes`);

const app = express();

app.get(`/`, (req, res) => {
  res.end(`hello`);
});

app.get(`/`, (req, res) => {
  res.end(`hello`);
});

app.use(`/api/repos`, router);

module.exports = app;
