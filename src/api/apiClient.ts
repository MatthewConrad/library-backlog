import { BookData } from "../types/BookData";

export const apiHost = "http://localhost:5000";

export async function getBooks(): Promise<BookData[]> {
    const response: Response = await fetch(`${apiHost}/books`);
    const books: BookData[] = await response.json();
    return books;
}

export async function addBook(book: BookData): Promise<BookData> {
    const options: RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
    };

    const response: Response = await fetch(`${apiHost}/books`, options);
    const addedBook: BookData = await response.json();
    return addedBook;
}

export async function updateBook(prevBook: BookData, book: BookData): Promise<BookData> {
    const options: RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
    };

    const response: Response = await fetch(`${apiHost}/books/update`, options);
    const updatedBook: BookData = await response.json();
    return updatedBook;
}

export async function deleteBook(book: BookData): Promise<void> {
    await fetch(`${apiHost}/books/${book.id}`, { method: "DELETE" });
}
