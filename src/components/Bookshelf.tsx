import React from "react";
import { BookData } from "../ts/BookData";
import { Book } from "./Book";

type Props = {
    name: string;
    books: BookData[];
};

export const Bookshelf: React.FC<Props> = ({ name, books }) => {
    return (
        <div>
            <h2>{name}</h2>
            <div className="bookshelf">
                {books.map((bookData: BookData, index: number) => {
                    return <Book data={bookData} key={"book" + index} />;
                })}
            </div>
        </div>
    );
};
