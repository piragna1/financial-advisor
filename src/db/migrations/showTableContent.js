import { pool } from "../pool.js";

const result = await pool.query(`SELECT * FROM loans`);
console.log('loans table content:', result.rows);

await pool.end();