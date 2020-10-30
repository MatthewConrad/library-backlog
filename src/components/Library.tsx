import React, { useEffect } from "react";
import { BookData } from "../types/BookData";
import { Book } from "./Book";

type Props = {
    books: BookData[];
    onBookClick: (content?: BookData, edit?: boolean) => void;
};

export const Library: React.FC<Props> = ({ books, onBookClick }) => {
    const inProgress: BookData[] | undefined = books?.filter((book: BookData) => {
        return book.current_page && !book.completed;
    });
    const backlog: BookData[] | undefined = books?.filter((book: BookData) => {
        return !book.completed && !book.current_page;
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
