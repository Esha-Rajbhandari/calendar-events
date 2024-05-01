const express = require("express");
const bodyParser = require("body-parser");
const appRoutes = require("./routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/events", appRoutes);

(function startServer() {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server listening in port: ${port}`));
})();
