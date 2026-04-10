const db = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
      rejectUnauthorized: false,
      ca: `-----BEGIN CERTIFICATE-----
        MIIERDCCAqygAwIBAgIUXULv/I3JFX6YyiI7BTUheR8jOSgwDQYJKoZIhvcNAQEM
        BQAwOjE4MDYGA1UEAwwvZDkyYzdmMmUtZDBhMC00YjQ2LTlmMmMtMjdjY2MwOWUz
        OTIzIFByb2plY3QgQ0EwHhcNMjYwNDA5MTEwNjIwWhcNMzYwNDA2MTEwNjIwWjA6
        MTgwNgYDVQQDDC9kOTJjN2YyZS1kMGEwLTRiNDYtOWYyYy0yN2NjYzA5ZTM5MjMg
        UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAIaY3His
        m9KmUi5avqg8C31gUZLpG6Rfa2GG72o6Rq9a9AaW1YxCz/r28ZpmB1ew07FhuO1t
        Fgjv+KuU4/vPItCleiM2+vsbhGZeE313EvbA5AYEOR4GhC9LDowkQjLHbZCqjMn1
        eyfVrzSxjyYhMJiIM002ghKnRPFgenmT0/+2vijccSqE6m6246d6Jyne7xhntWwx
        sX+4ttvFc487R4jCNEUBg6LDjA/ixmctATJZ7AhA3wpCWZ6+B4z6TEMlAgNCaWHc
        GetvPOVha1x10ALcAxVrA5eTZbKQwCHplTMuXKSYihpAyoGda0FWQDYUe7hX5V4i
        fahHvjtig8rDiGmNlkfMOZNmXCko6kjgYYjFwLnELWTVMK/OIJ4vRUp160heYwL9
        K/69HoK8TPDxWfnfSkhriD+x4/sQynV9uJx/9oRcUJQtF+i+q72GeJxD6whjepX5
        wXkN4GS0ZWaOdDpAVonmJhqIdadr+v090IiQ+/CeON2mt9VQKkiJJON6LwIDAQAB
        o0IwQDAdBgNVHQ4EFgQUvATWnjoPONN79FYatRhyo7ZqOWMwEgYDVR0TAQH/BAgw
        BgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAC+HCLXpmbaD
        NQUzFiRxXFl7UrQ1uxgmaT37PR2UvMzfYrzn8KZ3wQNencmDbptfkBeCLNKpTvy1
        mxxV30/lrc8TF5RcE4BPQf4L1AVDcnC8WPR3idwK97YyKLPSKz+dP9rr8yQD7fxK
        0pjpugWkFKfjACqPzBlAf4aKn0W4TW2pMzrvVOsYM6/FQ61COeKnebpk+etGQT5v
        mXUrPNFuZkAQn4DhY2/PZW+zNe9Z8v6VcgVt8F+wkAr7oPZRoe4DgY119qvPryFW
        Z+rJKVb2Ej1O+8kEoS277Fa1jwIDZIXxK8UyFtTuYKrJ6oVm1rmpi3T19KtLNU6P
        ZsiwiKwK2Vg6GHyC7HxoZSH+BAg9hMTOibI3z1eOkNtUAA1TkaPvVsBXWJHvA4bn
        1t6rvAv8gkIJPNfQJVwjT/PSTxRP9Ct6vvbmNnz9AJhkZECt4EAZs4UWfBd1t53X
        mIQmPYA8yDNEpIf9favOjeO8lvmH4Tu+ETxP5/qIhzh58yvgDoexUQ==
        -----END CERTIFICATE-----`
    },
  },
});

module.exports = db;

// const db = knex({
//     // connect to your own database here:
//     client: process.env.CLIENT,
//     // connection: {
//     //   connectionString: process.env.DATABASE_URL,
//       host : process.env.HOST,
//       user : process.env.USER,
//       port: process.env.PORT,
//       password : process.env.PASSWORD,
//       database : process.env.DATA_BASE,
//       ssl: {
//         rejectUnauthorized: false,
//         ca: `-----BEGIN CERTIFICATE-----
//             MIIEUDCCArigAwIBAgIUYtsElJ5XI/F1qQS3ea1lUdyCREgwDQYJKoZIhvcNAQEM
//             BQAwQDE+MDwGA1UEAww1ZWU1NjVjNWUtNzNlZi00MWE2LTk3ZDctNGUyYzJkOTg2
//             ODNiIEdFTiAxIFByb2plY3QgQ0EwHhcNMjUxMTE0MTQzMjAyWhcNMzUxMTEyMTQz
//             MjAyWjBAMT4wPAYDVQQDDDVlZTU2NWM1ZS03M2VmLTQxYTYtOTdkNy00ZTJjMmQ5
//             ODY4M2IgR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
//             AYoCggGBANa0SemmrGoCwQk7lCqgl/ddspvxKDi833n1Ank9GWkEnE0NqFWtgRCt
//             L9r8VwRURsUsjUtTTr7epigTr4GLvL+6fIQegdBFYJzA9P1PnMKMLWzYVtBH61gF
//             Vn0KI+iSdDh0dSvnvw3SksIbLVF3faEGOefMPgFviAHdsK1tUANAfa4xQHEZRWgS
//             7U8oTaUqarFc0vgqMsm/I6t1ZpkOBdejtyAipqz1tws4RBwFsh1flbY6Q73jw50L
//             4TQY2Ehx7Fye0Jn7txiSfLh1oupn/jJk9H4XPUpxewI9tn5e5pRLgxgVhTGKtXvq
//             baAfKQ8FQrZ4D+p/eT3gmuZPzBBZpnGnYrprizj5O6CqjBIyesNsRF5Cw4yfvf5b
//             1mNe5O/42jdEjGsK8ZoH28OUdR33RcyTfjAPfOU6MYlgmawTEeerCYt191UiREx8
//             UUYIkYb0ggqFxtRhLGZK4rxXnX6WlVlMP3+ICpJnULdNabWJIKkp0egL2jYn8eVy
//             wscP5QQ9RQIDAQABo0IwQDAdBgNVHQ4EFgQUE4gRuy+/KFszXkv/zM4DVRc72BEw
//             EgYDVR0TAQH/BAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQAD
//             ggGBAGJyYuNvI3PcWCpEZbzpcuVi4ziLZJnEaLGDfj3arCHtVBkwi6zYvzWH+bZG
//             0r2pSrPJcgmSYe0tTfkIA338HUJJT9llxy+GzIJ8u953cJURes8hfX9CRRPAbQwh
//             rOCoM9oRDaL2jqa8w9VptSSrNYgKsI51q5LxxbkapdyxcRC9QReWRl3Gt7dScJ7i
//             Y/j73YAVr/o2dbHiKNHZgEKRTAwa0+9infW76saln1u+irfZZRI2Q/YVwLNl6WgY
//             Og3/OkUwCTC24p84EF5Sl0+//duAHtHJ44jVlo9pcMULwv2CjTz6+3NdXMVEO6Q/
//             h4m1p9JocC6I3x6qBdURArNFGdSjmqx9/8lVo3MnRp6o59sq27Jhu23kXvF6CIty
//             WWn5Vbd5WelMEdyD/r6F9BQhCPSne8Xcs4hyAcUlKCQUvBTeXq/uo7vw0oblhEIY
//             yehrcF8G9JWe2QFmWwEHITRC9hsch4oQzggdyhDr4skRQkOYxYkTIEYkHU7IpRC9
//             U3kYFw==
//          -----END CERTIFICATE-----`,
//       },
//     }
//   });
