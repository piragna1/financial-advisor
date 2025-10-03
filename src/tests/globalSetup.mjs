import { pool } from "../db/pool.mjs";
import { resetDatabase } from "./helpers/resetDatabase";
export default async () => {
  await resetDatabase();
};
