import fs from 'fs';
import path from 'path';
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const schemaPath = path.resolve('src','db', 'schema.sql');
const schemaSQL = fs.readFileSync(schemaPath, 'utf8');

async function setupDatabase() {
  const bootstrapClient = new Client({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: 'postgres',
  });

  try {
    await bootstrapClient.connect();
    console.log('✅ Connected to bootstrap database');

    const res = await bootstrapClient.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [DB_NAME]
    );

    if (res.rowCount === 0) {
      await bootstrapClient.query(`CREATE DATABASE ${DB_NAME}`);
      console.log(`✅ Database '${DB_NAME}' created`);
    } else {
      console.log(`ℹ️ Database '${DB_NAME}' already exists`);
    }
  } catch (err) {
    console.error('❌ Error creating database:', err.message);
    await bootstrapClient.end();
    return;
  }

  await bootstrapClient.end();

  const client = new Client({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });

  try {
    await client.connect();
    console.log(`✅ Connected to '${DB_NAME}'`);

    await client.query(schemaSQL);
    console.log('✅ Schema executed successfully');
  } catch (err) {
    console.error('❌ Error executing schema:', err.message);
  } finally {
    await client.end();
    console.log('🔒 Connection closed');
  }
}

setupDatabase();
