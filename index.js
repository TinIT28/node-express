const express = require('express');
const http = require('http');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const nationRouter = require("./routes/nationRouter");

const hostname = "localhost";
const port = 5000;

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.use("/nations", nationRouter);

app.get("/nations/:nationId", (req, res, next) => {
  res.end(
    "Will send details of the nation: " + req.params.nationId + " to you!"
  );
});

app.post("/nations/:nationId", (req, res, next) => {
  res.statusCode = 403;
  res.end("POST operation not supported on /nations/" + req.params.nationId);
});

app.put("/nations/:nationId", (req, res, next) => {
  res.write("Updating the nation: " + req.params.nationId + "\n");
  res.end(
    "Will update the nation: " +
      req.body.name +
      " with details: " +
      req.body.description
  );
});

app.delete("/nations/:nationId", (req, res, next) => {
  res.end("Deleting nation: " + req.params.nationId);
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});