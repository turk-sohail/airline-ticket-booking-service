const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { serverConfig } = require("./src/config");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const apiRoutes = require("./src/routes/v1");

/**
 * routes
 */

app.use("/api", apiRoutes);

const start = () => {
  app.listen(serverConfig.PORT, () =>
    console.log(`Server started at ${serverConfig.PORT}`)
  );
};
