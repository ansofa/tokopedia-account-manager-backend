const axios = require("axios");
let data = JSON.stringify([
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

let config = {
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
    Cookie: "_abck=D81FFFBCF873563294B180030B2EB371~0~YAAQ1uwZuLRShyaMAQAAFqB5PAuu2LBYBJuImTvWyHYKzdpMZyp5+m30nvXY6xzl4ANtj7pgbx4xiQoO/Taa17Pb5OpgzCBnFdRxHewdSeQkbzTb1KwShs3XrORP4ifw/sbegxotV0Fo+/N27cw8UqqBE6FlE/KeOrwVVpp4GMdaCtjqM0Pmhx6pio15NYAW79W3Qb4DuD4+b/YK+8OY7bQ2ptWZHbUm2FWSQR9uG0oVlRfxJO8Soas3xbltgGD1GSwfUJ3doXU1ZmfoHx5/l/dbCFmSVDhQC8SOq+N0NyZy1zQ/43mw3GXFF4HGewX4q0t8XinBERq6pgA8r9paL7hvdU21jGd6VXNTiE0OAv3izBCSpWPnb+hNpefKlnn27xQUwpHrNfMeAZhndIjAJ7ZCeBdqyUHrZv7gMQ==~-1~-1~-1; _ga_70947XW48P=GS1.1.1701821654.1095.0.1701821737.58.0.0; _ga=GA1.2.932246361.1625797295; DID=88046ea496221286e60d078b302bc2340dc24aab4a48ed2aa0075e1168952f4edd639b7f0f7cf1d6cc67362c6c36541b; DID_JS=ODgwNDZlYTQ5NjIyMTI4NmU2MGQwNzhiMzAyYmMyMzQwZGMyNGFhYjRhNDhlZDJhYTAwNzVlMTE2ODk1MmY0ZWRkNjM5YjdmMGY3Y2YxZDZjYzY3MzYyYzZjMzY1NDFi47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=; _UUID_NONLOGIN_=e9d20828fd84cf8b8655ec9fdcfc269a; __auc=6030e14517a891246f2df730700; hfv_banner=true; _UUID_CAS_=3b8944dc-4733-409c-adab-0eb47316fa82; _fbp=fb.1.1687316848853.1093273717; ISID=%7B%22www.tokopedia.com%22%3A%22d3d3LnRva29wZWRpYS5jb20%3D.85c53348d5b5343c2891aaa6737423cd.1687315542824.1681462378294.1701821653757.7%22%7D; _SID_Tokopedia_=ltUwi7lEKJKgFmBFURbDk0a01tG9RGc0O5DQeOKnfxiGjAzNF7YfyjwbJXA5H25jDat_h0JwXpww4PT-CGpBb9OQodWUaaxOg1z2TFSzWMJEyMyvFEOT6E9ar4yLPNVc; webauthn-session=499a0bde-5118-4776-9329-c51b473a25b1; _gcl_au=1.1.1263047053.1698024551; _CASE_=7a23654865233b333336352d23604865233b312d236d636d233b234b606a60737560215174726075232d23624865233b3036372d236d6e6f66233b23232d236d6075233b23232d2371426e233b23232d23764865233b30333330313236342d23724865233b30303432313436322d237255787164233b233369232d23766972233b235a7a5d23726473776862645e757871645d233b5d2333695d232d5d2376607364696e7472645e68655d233b30333330313236347c2d7a5d23726473776862645e757871645d233b5d2330346c5d232d5d2376607364696e7472645e68655d233b317c5c232d236d547165233b23333133322c30332c31375531363b30353b30342a31363b3131237c; l=1; FPF=1; aus=1; tuid=4699036; _gid=GA1.2.1506303588.1701803966; ak_bmsc=53DC10A80D54EE68BF8C7F4235B6F118~000000000000000000000000000000~YAAQ1uwZuMpShyaMAQAASKR5PBaeN/uwiwt0VRFq5lt3OvXlYjZKLNAJBsUuxlRXk5NWKBesscy5ZQzzWLsI81o/k/ewjDu39R18FiIP61oRYil1jJ1EUyQAcbY97hGppQGnIUvJT5UuWeH+s6hnnm1spF/kQwMA8r1BjqTS/v3H+evpwxreZTkVLp2ONN9WBubkLYB9dizjG3tVnZEJL5xR9EhiYpwvQzSVqOkRzR3/nYE3ftNd3osXeEBiLUCr7Ule7H6Q3zPLdzERVv1rfVP19lCIyCuwz/S3ZW8JOrbtsqD/lOoflGrdRGd+T6LSbCa2ZfAL+nXLAN88dguq+yRUf43YChdCtLddKeap0DbFnq6Wbu5OoVdaz6KLXXFl+s292dShOR5MrB/dsog1sGqEae7Cxaja1zompSAO4Tly9H+b6+jDN4uBuro7sZtL1xeofj01nCA9F5Po8foAyIrK3U+rgA+uG7ANlePwxzTKSjP0pHwqfARGDjaGVc9PB72E; bm_sz=468C9C994B3305127FDA1D64AE0FBEA3~YAAQ1uwZuK9ShyaMAQAAHp15PBYC7vEt1j2XOM23XZnWFE/2ZH5JS3yv2FRK+rHKm5eZPhv+JBBzz7etltkBbO3Pfh8nTcqU4BtdSaGSodEOYkbGKAOZSLP2Saej6xu3rgOTaDfNmK9r3JyAf8I9gQAuIaBkcFxYWnLp9fs5i45bXnsHK4MGWLyBSzHYGl+wtnBjAwVOtfdmjaCp/Smhe8Sj5jHh3mXy0MLDMUsTuYGyrKhGSXsKnr/QU5A0g2UV8gygQb0JLmU2oUSR1MzaXZrAuxVvurTYzs9ALr9V3jnJL65/W6A=~3294772~3227952; uide=FGBgXd5c/F/Vet2VrTqCwBvD7X2G3aUAX8lfFiu5EF3pcfc=; uidh=jhmNib+YbKEEB30NmEF0hjUORz8pWPzJFKFa8j3an1Y=; _gat_UA-9801603-1=1"
  },
  data: data,
};

axios
  .request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
