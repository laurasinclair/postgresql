const express = require("express");
const path = require("path");
const cors = require("cors");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

module.exports = (app) => {
  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: [FRONTEND_URL],
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};
