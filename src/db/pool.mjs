import { Pool } from "pg";

export const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'prestamos_db',
    password:'wAYanteRIaPs',
    port:5432
})