import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Gemensam hjälpfunktion för SQL-frågor
export async function query<T>(sql: string, params?: any[]): Promise<T[]> {
    const result = await pool.query(sql, params);
    return result.rows as T[];
}

export default pool;