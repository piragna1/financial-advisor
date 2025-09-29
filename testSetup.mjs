import { pool } from "./src/db/pool.mjs";

export default afterAll(async () => {
  await pool.end();
});
