import React, { useEffect } from "react";
import { Bookshelf } from "./Bookshelf";
import { BookData } from "../types/BookData";

export const Library: React.FC = () => {
    const [books, setBooks] = React.useState<BookData[]>();
    useEffect(() => {
        fetch("http://localhost:5000/books")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setBooks(data);
            });
    }, []);

    const inProgress: BookData[] | undefined = books?.filter((book: BookData) => {
        return book.currentPage;
    });
    const backlog: BookData[] | undefined = books?.filter((book: BookData) => {
        return !book.completed && !book.currentPage;
    });
    const completed: BookData[] | undefined = books?.filter((book: BookData) => {
        return book.completed;
    });

    return (
        <div className="library">
            <h1>Library</h1>
            <Bookshelf name="In Progress" books={inProgress} />
            <Bookshelf name="Backlog" books={backlog} />
            <Bookshelf name="Completed" books={completed} />
        </div>
    );
};
