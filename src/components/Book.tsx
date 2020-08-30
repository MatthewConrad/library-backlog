import React from "react";
import { BookData } from "../ts/BookData";
import "../styles/Book.scss";

type Props = {
    data: BookData;
};

export const Book: React.FC<Props> = ({ data }) => {
    const inlineStyle: React.CSSProperties = {
        backgroundImage: "url(" + data.imageUrl + ")",
    };

    return (
        <div className="book">
            <div className="book-title">{data.title}</div>
            <div className="book-cover" style={inlineStyle}>
                {data.currentPage && 
                <div className="book-progress">
                    <div className="progress-bar"></div>
                </div>}
            </div>
        </div>
    );
};
