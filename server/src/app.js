const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());

require("./config")(app);

const pizzaRoutes = require("./routes/pizzas.routes");
app.use("/pizzas", pizzaRoutes);

module.exports = app;
