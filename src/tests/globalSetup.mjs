import { resetDatabase } from "./helpers/resetDatabase.js";
export default async () => {
  await resetDatabase();
};
