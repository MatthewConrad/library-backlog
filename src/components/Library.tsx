import React, { useEffect } from "react";
import { BookData } from "../types/BookData";
import { Book } from "./Book";

type Props = {
    onBookClick: (content?: BookData) => void;
};

export const Library: React.FC<Props> = ({ onBookClick }) => {
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
            <div>
                <h2>In Progress</h2>
                <div className="bookshelf">
                    {inProgress &&
                        inProgress.map((bookData: BookData, index: number) => {
                            return <Book data={bookData} key={"book" + index} onBookClick={onBookClick} />;
                        })}
                </div>
            </div>
            <div>
                <h2>Backlog</h2>
                <div className="bookshelf">
                    {backlog &&
                        backlog.map((bookData: BookData, index: number) => {
                            return <Book data={bookData} key={"book" + index} onBookClick={onBookClick} />;
                        })}
                </div>
            </div>
            <div>
                <h2>Completed</h2>
                <div className="bookshelf">
                    {completed &&
                        completed.map((bookData: BookData, index: number) => {
                            return <Book data={bookData} key={"book" + index} onBookClick={onBookClick} />;
                        })}
                </div>
            </div>
        </div>
    );
};
