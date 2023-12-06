class TokopediaDTO {
  async mappingProfileData(dataProfile) {
    const newDataProfile = {
      name: dataProfile.data.user.name,
      isLoggedIn: dataProfile.data.user.isLoggedIn,
      profilePicture: dataProfile.data.user.profilePicture,
      phone: dataProfile.data.user.phone,
      ovoCash: dataProfile.data.wallet.ovoCash,
      saldoTokopedia: dataProfile.data.balance.depositStr,
      statusMember: dataProfile.data.tokopoints.status.tier.nameDesc,
    };
    return newDataProfile;
  }

  async mappingTransactionData(dataTransaction) {
    const newDataTransaction = dataTransaction.map(transaction => ({
      orderUUID: transaction.orderUUID,
      productName: transaction.metadata.products[0].title,
      status: transaction.metadata.status.label,
      transactionDate: transaction.metadata.paymentDateStr,
      totalPrice: transaction.metadata.totalPrice.value
    }));
    return newDataTransaction;
  }
}

module.exports = TokopediaDTO;
