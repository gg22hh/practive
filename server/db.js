const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "Ca_22zxz",
    host: "localhost",
    port: 5432,
    database: "users_db",
});

module.exports = pool;
