import { Pool, QueryResult } from "pg";
import { BookData } from "../types/BookData";

export default class dbClient {
    protected pool: Pool;

    constructor(host: string, name: string, user: string, password: string, port: number) {
        this.pool = new Pool({
            user: user,
            host: host,
            database: name,
            password: password,
            port: port,
        });
    }

    public async getBooks(): Promise<BookData[]> {
        const books: QueryResult<BookData> = await this.pool.query("SELECT * FROM books");
        return books.rows;
    }

    public async createBook(book: BookData): Promise<BookData> {
        const keys: string[] = Object.keys(book);
        let parameterization = "";
        for (let index = 1, length = keys.length; index <= length; index++) {
            parameterization = parameterization.concat(`$${index}`);
            if (index < length) parameterization = parameterization.concat(", ");
        }

        console.log(Object.keys(book).toString());
        console.log(parameterization);
        console.log(...Object.values(book));
        const createdBook: QueryResult<BookData> = await this.pool.query(
            `INSERT INTO books (${Object.keys(book).toString()}) VALUES (${parameterization}) RETURNING *`,
            [...Object.values(book)]
        );

        return createdBook.rows[0];
    }

    public async updateBook(book: Partial<BookData>): Promise<BookData> {
        if (!book.id) {
            throw new Error("Cannot update book without an id.");
        }
        const id: number = book.id;
        delete book.id;
        const keys: string[] = Object.keys(book);
        const length = keys.length;
        let parameterization = "";
        keys.forEach((value: string, index: number) => {
            parameterization = parameterization.concat(`${value} = $${index + 1}`);
            if (index < length - 1) parameterization = parameterization.concat(", ");
        });

        const updatedBook: QueryResult<BookData> = await this.pool.query(
            `UPDATE books SET ${parameterization} WHERE id=$${length + 1} RETURNING *`,
            [...Object.values(book), id]
        );

        return updatedBook.rows[0];
    }

    public async deleteBook(id: number): Promise<void> {
        await this.pool.query("DELETE FROM books WHERE ID=$1", [id]);
    }
}
