class TokopediaLoginService {
  async existCheck(bearer) {
    try {
      const data = JSON.stringify([
        {
          operationName: "UserProfileQuery",
          variables: {},
          query:
            'query UserProfileQuery {\n  user {\n    id\n    isLoggedIn\n    name\n    profilePicture\n    completion\n    phoneVerified: phone_verified\n    phone\n    __typename\n  }\n  wallet {\n    ovoCash: cash_balance\n    ovoPoints: point_balance\n    linked\n    __typename\n  }\n  walletPending: goalPendingBalance {\n    pendingBalance: point_balance_text\n    __typename\n  }\n  balance: saldo(useCache: true) {\n    depositStr: deposit_fmt\n    __typename\n  }\n  tokopoints {\n    status {\n      tier {\n        nameDesc\n        eggImageURL\n        __typename\n      }\n      points {\n        reward\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  tokopointsShortcutList(groupCodes: ["account_page_widget"]) {\n    shortcutGroupList {\n      shortcutList {\n        id\n        cta {\n          text\n          url\n          __typename\n        }\n        description\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  tokopointsSumCoupon {\n    sumCouponStr\n    __typename\n  }\n  tokopointsStatusFiltered(filterKeys: ["points"], pointsExternalCurrency: "IDR", source: "desktop-web-sidebar") {\n    statusFilteredData {\n      points {\n        pointsAmountStr\n        externalCurrencyAmountStr\n        pointsSection {\n          redirectURL\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  walletappGetWalletEligible(partnerCode: "PEMUDA", walletCode: ["PEMUDAPOINTS"]) {\n    code\n    message\n    data {\n      wallet_code\n      is_eligible\n      __typename\n    }\n    __typename\n  }\n}\n',
        },
      ]);

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://gql.tokopedia.com/graphql/UserProfileQuery",
        headers: {
          Host: "gql.tokopedia.com",
          "Accounts-Authorization": "Bearer " + bearer,
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:76.0) Gecko/20100101 Firefox/76.0",
          Accept: "*/*",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br",
          Referer: "https://www.tokopedia.com/",
          "X-Tkpd-Lite-Service": "zeus",
          "X-Version": "79c30d8",
          "Content-Type": "application/json",
          "X-Source": "tokopedia-lite",
          Origin: "https://www.tokopedia.com",
          "Content-Length": "1700",
          Te: "trailers",
        },
        timeout: 3000,
        data: data,
      };

      const response = await axios.request(config);
    } catch (error) {
      throw error;
    }
  }
}
