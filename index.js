const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { serverConfig } = require("./src/config");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const apiRoutes = require("./src/routes");
const db = require("./src/models");

/**
 *
 * routes
 */
app.get("/", (req, res) => {
  res.send("home");
});

app.use("/api", apiRoutes);

const start = () => {
  //db.sequelize.sync({ alter: true });

  app.listen(serverConfig.PORT, () =>
    console.log(`Server started at ${serverConfig.PORT}`)
  );
};

start();
