const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const proConfig = 'postgres://ptzdkmegvpxaqh:6c1d6322137ae6d4a791c6ee56d593f5e0f6b6cdfee56e6c34ae762bc6ea5c39@ec2-54-165-90-230.compute-1.amazonaws.com:5432/d1jhlb7hunjslt';



const pool = new Pool({

        connectionString: proConfig,

        ssl: {

          rejectUnauthorized: false,

        },

      })

// const pool = new Pool({
//   user: "postgres",
//   password: "Tech2far",
//   host: "localhost",
//   port: 5432,
//   database: "playerlist"
// });


module.exports = pool;

