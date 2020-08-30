import React from "react";
import { Bookshelf } from "./Bookshelf";
import * as sampleData from "../sampleData.json"; 
import { BookData } from "../ts/BookData";

export const Library = () => {
    const books: BookData[] = sampleData.books;
    const inProgress: BookData[] = books.filter((book: BookData) => {
        return book.currentPage;
    });
    const backlog: BookData[] = books.filter((book: BookData) => {
        return !book.completed && !book.currentPage;
    })
    const completed: BookData[] = books.filter((book: BookData) => {
        return book.completed;
    })

    return (
        <div>
            <h1>Library</h1>
            <Bookshelf name="In Progress" books={inProgress} />
            <Bookshelf name="Backlog" books={backlog} />
            <Bookshelf name="Completed" books={completed} />
        </div>
    );
};
