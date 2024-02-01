export const customerService = {
  getData() {
    return [
      {
        id: 1419,
        name: "Golda Kaniecki",
        company: "Calaveras Prospect",
        date: "2019-04-17",
        status: "negotiation",
        verified: true,
        activity: 91,
        balance: 82539,
      },
      {
        id: 1420,
        name: "Catarina Gleich",

        company: "Terk, Robert E Esq",
        date: "2017-01-26",
        status: "unqualified",
        verified: true,
        activity: 12,

        balance: 5619,
      },
      {
        id: 1421,
        name: "Virgie Kiel",

        company: "Cullen, Terrence P Esq",
        date: "2016-06-28",
        status: "renewal",
        verified: true,
        activity: 89,

        balance: 44763,
      },
      {
        id: 1422,
        name: "Jolene Ostolaza",

        company: "Central Die Casting Mfg Co Inc",
        date: "2016-08-08",
        status: "negotiation",
        verified: true,
        activity: 85,

        balance: 97208,
      },
      {
        id: 1423,
        name: "Keneth Borgman",

        company: "Centerline Engineering",
        date: "2019-02-04",
        status: "unqualified",
        verified: true,
        activity: 41,

        balance: 93316,
      },
      {
        id: 1424,
        name: "Rikki Nayar",

        company: "Targan & Kievit Pa",
        date: "2017-03-06",
        status: "negotiation",
        verified: true,
        activity: 47,

        balance: 23786,
      },
      {
        id: 1425,
        name: "Elke Sengbusch",

        company: "Riley Riper Hollin & Colagreco",
        date: "2019-05-28",
        status: "renewal",
        verified: true,
        activity: 76,

        balance: 98367,
      },
      {
        id: 1426,
        name: "Hoa Sarao",

        company: "Kaplan, Joel S Esq",
        date: "2020-08-13",
        status: "negotiation",
        verified: true,
        activity: 0,

        balance: 68683,
      },
    ];
  },

  getCustomersSmall() {
    return Promise.resolve(this.getData().slice(0, 10));
  },

  getCustomersMedium() {
    return Promise.resolve(this.getData().slice(0, 50));
  },

  getCustomersLarge() {
    return Promise.resolve(this.getData().slice(0, 200));
  },

  getCustomersXLarge() {
    return Promise.resolve(this.getData());
  },

  getCustomers(params) {
    const queryParams = params
      ? Object.keys(params)
          .map(
            (k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
          )
          .join("&")
      : "";

    return fetch(
      "https://www.primefaces.org/data/customers?" + queryParams
    ).then((res) => res.json());
  },
};
