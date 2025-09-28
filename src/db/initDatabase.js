import fs from 'fs';
import path from 'path';
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const sqlPath = path.resolve('database', 'schema.sql');
const sql = fs.readFileSync(sqlPath, 'utf8');

const client = new Client({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function initializeDatabase() {
  try {
    await client.connect();
    console.log('✅ Connected to database');

    await client.query(sql);
    console.log('✅ Schema executed successfully');
  } catch (err) {
    console.error('❌ Error initializing database:', err.message);
  } finally {
    await client.end();
    console.log('🔒 Connection closed');
  }
}

initializeDatabase();
