import React, { useEffect, useState } from "react";
import { X } from "react-feather";
import { BookData } from "../types/BookData";

type Props = {
    show: boolean;
    onCloseClick: () => void;
    content: BookData;
    edit?: boolean;
};

export const AddBookModal: React.FC<Props> = ({ show, onCloseClick, content, edit = false }) => {
    const [book, setBook] = useState<BookData>(content);

    const clickCallback = (event: MouseEvent) => {
        if ((event.target as HTMLElement).className === "overlay") {
            onCloseClick();
        }
    };

    const keyCallback = (event: KeyboardEvent) => {
        if (event.code === "Escape") {
            onCloseClick();
        }
    };

    const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        switch (event.target.name) {
            case "title":
                setBook((prevBook) => ({ ...prevBook, title: value }));
                break;
            case "author":
                setBook((prevBook) => ({ ...prevBook, author: value }));
                break;
            case "currentPage":
                if (value.length > 0) setBook((prevBook) => ({ ...prevBook, currentPage: parseInt(value) }));
                break;
            case "totalPages":
                setBook((prevBook) => ({ ...prevBook, totalPages: parseInt(value) }));
                break;
        }
    };

    const onRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        switch (event.target.value) {
            case "status-backlog":
                setBook((prevBook) => ({ ...prevBook, completed: false, currentPage: undefined }));
                break;
            case "status-in-progress":
                setBook((prevBook) => ({ ...prevBook, currentPage: content.currentPage || 1, completed: false }));
                break;
            case "status-completed":
                setBook((prevBook) => ({ ...prevBook, completed: true }));
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        document.addEventListener("click", clickCallback);
        document.addEventListener("keydown", keyCallback);

        return () => {
            document.removeEventListener("click", clickCallback);
            document.removeEventListener("keydown", keyCallback);
        };
    }, []);

    useEffect(() => {
        setBook(content);
    }, [content]);

    const action = content && edit ? "Update" : "Add to Library";
    const notStarted = !book.completed && !book.currentPage;
    const inProgress = !book.completed && book.currentPage !== undefined && book.currentPage > 0;
    const completed = book.completed;
    let inlineStyle: React.CSSProperties | undefined = undefined;
    if (book.imageUrl) {
        inlineStyle = {
            backgroundImage: "url(" + book.imageUrl + ")",
        };
    }
    return (
        <React.Fragment>
            {show && (
                <div className="overlay">
                    <div className="modal">
                        <form id="addBookForm" autoComplete="off">
                            <button
                                type="button"
                                className="icon-button"
                                id="closeButton"
                                aria-label="Close window"
                                onClick={() => onCloseClick()}
                            >
                                <X />
                            </button>
                            <div className="book-cover" id="cover" style={inlineStyle}>
                                {!inlineStyle && (
                                    <React.Fragment>
                                        <div className="book-cover__title">{book.title}</div>
                                        <div className="book-cover__author">{book.author}</div>
                                    </React.Fragment>
                                )}
                            </div>
                            <div className="text-group" id="titleField">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    required
                                    onChange={onTextChange}
                                    value={book.title}
                                ></input>
                            </div>
                            <div className="text-group" id="authorField">
                                <label htmlFor="author">Author</label>
                                <input
                                    type="text"
                                    name="author"
                                    id="author"
                                    required
                                    onChange={onTextChange}
                                    value={book.author}
                                ></input>
                            </div>
                            <div className="radio-group" role="radiogroup" aria-label="Status" id="statusGroup">
                                <div>
                                    <input
                                        type="radio"
                                        name="status"
                                        id="status-backlog"
                                        value="status-backlog"
                                        checked={notStarted}
                                        onChange={onRadioChange}
                                    />
                                    <label className="radio-label" htmlFor="status-backlog">
                                        Not started
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        name="status"
                                        id="status-in-progress"
                                        value="status-in-progress"
                                        checked={inProgress}
                                        onChange={onRadioChange}
                                    />
                                    <label className="radio-label" htmlFor="status-in-progress">
                                        In progress
                                    </label>
                                    {inProgress && (
                                        <div className="text-group" id="progressGroup">
                                            <input
                                                type="text"
                                                name="currentPage"
                                                id="currentPage"
                                                value={book.currentPage}
                                                onChange={onTextChange}
                                                required
                                            ></input>
                                            <span>of</span>
                                            <input
                                                type="text"
                                                name="totalPages"
                                                id="totalPages"
                                                value={book.totalPages}
                                                onChange={onTextChange}
                                                required
                                            ></input>
                                            <span>pages</span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        name="status"
                                        id="status-completed"
                                        value="status-completed"
                                        checked={completed}
                                        onChange={onRadioChange}
                                    />
                                    <label className="radio-label" htmlFor="status-completed">
                                        Completed
                                    </label>
                                </div>
                            </div>
                            <div className="button-group" id="buttonGroup">
                                <button type="button" className="secondary-button" onClick={() => onCloseClick()}>
                                    Cancel
                                </button>
                                {edit && (
                                    <button
                                        type="button"
                                        className="secondary-button secondary-button--destructive"
                                        onClick={() => onCloseClick()}
                                    >
                                        Delete
                                    </button>
                                )}
                                <button type="submit" className="action-button">
                                    {action}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};
