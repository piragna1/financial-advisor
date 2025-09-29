import { pool } from '../db/pool.mjs'; // Ajustá el path según tu estructura

export default async () => {
  await pool.end(); // Cerramos el pool una sola vez
};
