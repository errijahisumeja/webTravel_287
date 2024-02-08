import mysql from "mysql2"
import dotenv from 'dotenv';
dotenv.config();

export const db = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "webtravel_287"
})
