import React from "react";
import { BookData } from "../types/BookData";

type Props = {
    data: BookData;
    onBookClick: (content?: BookData, edit?: boolean) => void;
};

export const Book: React.FC<Props> = ({ data, onBookClick }) => {
    let inlineStyle: React.CSSProperties | undefined = undefined;
    if (data.image_url) {
        inlineStyle = {
            backgroundImage: "url(" + data.image_url + ")",
        };
    }

    let progressCompleteStyle: React.CSSProperties | undefined = undefined;
    if (data.current_page && data.total_pages && !data.completed) {
        progressCompleteStyle = {
            width: (data.current_page / data.total_pages) * 100 + "%",
        };
    }

    return (
        <div className="book">
            <div className="book-title">{data.title}</div>
            <div
                className="book-cover"
                style={inlineStyle}
                onClick={() => {
                    onBookClick(data, true);
                }}
            >
                {!inlineStyle && (
                    <React.Fragment>
                        <div className="book-cover__title">{data.title}</div>
                        <div className="book-cover__author">{data.author}</div>
                    </React.Fragment>
                )}
                {progressCompleteStyle && (
                    <div className="book-progress">
                        <div className="pages-complete">{data.current_page + " / " + data.total_pages}</div>
                        <div className="progress-bar">
                            <div className="progress-complete" style={progressCompleteStyle} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
