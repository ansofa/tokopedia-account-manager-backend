const TokopediaTransactionService = require("../services/tokopedia-transaction-service");
const tokopediaTransactionService = new TokopediaTransactionService();

class TokopediaTransactionController {
  async fetchTransaction(req, res) {
    try {
      const profile_id = req.params.profileId;
      const owner_id = req.user_id;
      const data = await tokopediaTransactionService.fetchTransaction(owner_id, profile_id);
      res.status(200).json({ status: "SUCCESS", data });
    } catch (error) {
      res.status(500).json({ status: "FAILED", message: error.message });
    }
  }
}

module.exports = TokopediaTransactionController;
