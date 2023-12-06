const axios = require("axios");
const TokopediaService = require("./profile-service");
const TokopediaDTO = require("../DTOs/tokopedia-DTO");
const tokopediaService = new TokopediaService();

class TokopediaTransactionService {
  async transactionQuery(bearer) {
    try {
      const data = JSON.stringify([
        {
          operationName: "GetOrderHistory",
          variables: {
            VerticalCategory: "",
            Status: "",
            SearchableText: "",
            CreateTimeStart: "",
            CreateTimeEnd: "",
            Page: 1,
            Limit: 10,
          },
          query:
            'query GetOrderHistory($VerticalCategory: String!, $Status: String!, $SearchableText: String!, $CreateTimeStart: String!, $CreateTimeEnd: String!, $Page: Int!, $Limit: Int!) {\n  uohOrders(input: {UUID: "", VerticalID: "", VerticalCategory: $VerticalCategory, Status: $Status, SearchableText: $SearchableText, CreateTime: "", CreateTimeStart: $CreateTimeStart, CreateTimeEnd: $CreateTimeEnd, Page: $Page, Limit: $Limit, SortBy: "", IsSortAsc: false}) {\n    orders {\n      orderUUID\n      verticalID\n      verticalCategory\n      userID\n      status\n      verticalStatus\n      searchableText\n      metadata {\n        upstream\n        verticalLogo\n        verticalLabel\n        paymentDate\n        paymentDateStr\n        queryParams\n        listProducts\n        detailURL {\n          webURL\n          webTypeLink\n          __typename\n        }\n        status {\n          label\n          textColor\n          bgColor\n          __typename\n        }\n        products {\n          title\n          imageURL\n          inline1 {\n            label\n            textColor\n            bgColor\n            __typename\n          }\n          inline2 {\n            label\n            textColor\n            bgColor\n            __typename\n          }\n          __typename\n        }\n        otherInfo {\n          actionType\n          appURL\n          webURL\n          label\n          textColor\n          bgColor\n          __typename\n        }\n        totalPrice {\n          value\n          label\n          textColor\n          bgColor\n          __typename\n        }\n        tickers {\n          action {\n            actionType\n            appURL\n            webURL\n            label\n            textColor\n            bgColor\n            __typename\n          }\n          title\n          text\n          type\n          isFull\n          __typename\n        }\n        buttons {\n          Label\n          variantColor\n          type\n          actionType\n          appURL\n          webURL\n          __typename\n        }\n        dotMenus {\n          actionType\n          appURL\n          webURL\n          label\n          textColor\n          bgColor\n          __typename\n        }\n        __typename\n      }\n      createTime\n      createBy\n      updateTime\n      updateBy\n      __typename\n    }\n    totalOrders\n    filtersV2 {\n      label\n      value\n      isPrimary\n      __typename\n    }\n    categories {\n      value\n      label\n      description\n      category_group\n      __typename\n    }\n    dateLimit\n    tickers {\n      action {\n        actionType\n        appURL\n        webURL\n        label\n        textColor\n        bgColor\n        __typename\n      }\n      title\n      text\n      type\n      isFull\n      __typename\n    }\n    __typename\n  }\n}\n',
        },
      ]);

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://gql.tokopedia.com/graphql/GetOrderHistory",
        headers: {
          Host: "gql.tokopedia.com",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:76.0) Gecko/20100101 Firefox/76.0",
          Accept: "*/*",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br",
          Referer: "https://www.tokopedia.com/order-list?page=1",
          "X-Tkpd-Lite-Service": "zeus",
          "X-Version": "f23cd55",
          "Content-Type": "application/json",
          "X-Device": "desktop",
          "X-Source": "tokopedia-lite",
          Origin: "https://www.tokopedia.com",
          "Content-Length": "3034",
          Te: "trailers",
          "Cookie": bearer,
        },
        timeout: 3000,
        data: data,
      };

      const response = await axios.request(config);
      const json = response.data;
      const tokopediaDTO = new TokopediaDTO();
      const mappedData = tokopediaDTO.mappingTransactionData(json[0].data.uohOrders.orders);
      return mappedData;
    } catch (error) {
      throw error;
    }
  }

  async fetchTransaction(owner_id, profile_id) {
    try {
      const profile = await tokopediaService.getProfile(owner_id, profile_id);
      if (!profile) throw new Error("Profile tidak ditemukan");
      const data = await this.transactionQuery(profile.bearer);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TokopediaTransactionService;
