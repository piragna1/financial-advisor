import { pool } from "./pool.js";
import {showTableContent} from './migrations/showTableContent.js'

async function listTables() {
  try {
    const result = await pool.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`);
    console.log("📋 Tablas existentes:");
    result.rows.forEach(row => {
        console.log("•", row.table_name)
    });
  } catch (error) {
    console.error("❌ Error al listar tablas:", error);
  } finally {
    await pool.end();
  }
}

listTables();
