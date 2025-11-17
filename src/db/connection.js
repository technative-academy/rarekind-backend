import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Testing the connection
pool.getConnection()
    .then(conn => {
        console.log("MySQL connected successfully");
        conn.release();
    })
    .catch(err => {
        console.error("MySQL connection failed:", err);
    });

export default pool;
