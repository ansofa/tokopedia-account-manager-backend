const express = require("express");
const TokopediaTransactionController = require("../controllers/tokopedia-transaction-controller");
const tokopediaTransactionController = new TokopediaTransactionController();
const verifyToken = require("../middlewares/verify-token");
const tokopediaTransaction = express.Router();

tokopediaTransaction.get("/tokopedia/transaction/:profileId", verifyToken, tokopediaTransactionController.fetchTransaction);

module.exports = tokopediaTransaction;