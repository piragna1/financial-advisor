import { pool } from '../db/pool.js'; // Ajustá el path según tu estructura

export default async () => {
  await pool.end(); // Cerramos el pool una sola vez
};
