import React from "react";
import { BookData } from "../types/BookData";

type Props = {
    data: BookData;
};

export const Book: React.FC<Props> = ({ data }) => {
    let inlineStyle: React.CSSProperties | undefined = undefined;
    if (data.imageUrl) {
        inlineStyle = {
            backgroundImage: "url(" + data.imageUrl + ")",
        };
    }

    let progressCompleteStyle: React.CSSProperties | undefined = undefined;
    if (data.currentPage && data.totalPages) {
        progressCompleteStyle = {
            width: (data.currentPage / data.totalPages) * 100 + "%",
        };
    }

    return (
        <div className="book">
            <div className="book-title">{data.title}</div>
            <div className="book-cover" style={inlineStyle}>
                {!inlineStyle && (
                    <React.Fragment>
                        <div className="book-cover__title">{data.title}</div>
                        <div className="book-cover__author">{data.author}</div>
                    </React.Fragment>
                )}
                {progressCompleteStyle && (
                    <div className="book-progress">
                        <div className="pages-complete">{data.currentPage + " / " + data.totalPages}</div>
                        <div className="progress-bar">
                            <div className="progress-complete" style={progressCompleteStyle} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
