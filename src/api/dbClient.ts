import { Pool, QueryResult } from "pg";
import { BookData } from "../types/BookData";

export default class dbClient {
    protected pool: Pool;

    constructor(
        host: string,
        name: string,
        user: string,
        password: string,
        port: number
    ) {
        this.pool = new Pool({
            user: user,
            host: host,
            database: name,
            password: password,
            port: port,
        });
    }

    public async getBooks(): Promise<BookData[]> {
        const books: QueryResult<BookData> = await this.pool.query(
            "SELECT * FROM books"
        );
        return books.rows;
    }
}
