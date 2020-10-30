import React, { useEffect, useRef, useState } from "react";
import { X } from "react-feather";
import { addBook, deleteBook, updateBook } from "../api/apiClient";
import { BookData } from "../types/BookData";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

type Props = {
    show: boolean;
    content: BookData;
    edit?: boolean;
    onCloseClick: () => void;
    onBooksModified: () => void;
};

export const AddBookModal: React.FC<Props> = ({ show, content, edit = false, onCloseClick, onBooksModified }) => {
    const action = edit ? "Update" : "Add to Library";
    const notStarted = !content.completed && !content.current_page;
    const inProgress = !content.completed && content.current_page !== undefined && content.current_page > 0;
    const completed = content.completed;

    const [book, setBook] = useState<BookData>(content);
    const [showPages, setShowPages] = useState(false);
    const [currentPage, setCurrentPage] = useState("");
    const [totalPages, setTotalPages] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);

    const clickCallback = (event: MouseEvent) => {
        if ((event.target as HTMLElement).className === "overlay") {
            setShowConfirm(false);
            onCloseClick();
        }
    };

    const keyCallback = (event: KeyboardEvent) => {
        if (event.code === "Escape") {
            setShowConfirm(false);
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
            case "current_page":
                setCurrentPage(value);
                if (value.length > 0) setBook((prevBook) => ({ ...prevBook, current_page: parseInt(value) }));
                else setBook((prevBook) => ({ ...prevBook, current_page: undefined }));
                break;
            case "total_pages":
                setTotalPages(value);
                if (value.length > 0) setBook((prevBook) => ({ ...prevBook, total_pages: parseInt(value) }));
                else setBook((prevBook) => ({ ...prevBook, total_pages: undefined }));
                break;
        }
    };

    const onRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        switch (event.target.value) {
            case "status-backlog":
                setBook((prevBook) => ({ ...prevBook, completed: false, current_page: 0 }));
                setShowPages(false);
                break;
            case "status-in-progress":
                if (currentPage.length === 0 || parseInt(currentPage) == 0) setCurrentPage("1");
                setBook((prevBook) => ({ ...prevBook, current_page: parseInt(currentPage) || 1, completed: false }));
                setShowPages(true);
                break;
            case "status-completed":
                setBook((prevBook) => ({ ...prevBook, completed: true }));
                setShowPages(false);
                break;
            default:
                setShowPages(false);
                break;
        }
    };

    const onDeleteClick = () => {
        setShowConfirm(true);
    };

    const onConfirmDelete = () => {
        deleteBook(book)
            .then(() => {
                onBooksModified();
                setShowConfirm(false);
                onCloseClick();
            })
            .catch((error) => {
                console.log("Need an error dialog for delete.");
            });
    };

    const onCancelDelete = () => {
        setShowConfirm(false);
    };

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (edit) {
            updateBook(book)
                .then((updatedBook: BookData) => {
                    if (updatedBook.id) {
                        onBooksModified();
                        setShowConfirm(false);
                        onCloseClick();
                    } else {
                        throw new Error("Couldn't edit book.");
                    }
                })
                .catch((error) => {
                    console.log("need to create an error dialog.");
                });
        } else {
            addBook(book)
                .then((addedBook: BookData) => {
                    if (addedBook.id) {
                        onBooksModified();
                        setShowConfirm(false);
                        onCloseClick();
                    } else {
                        throw new Error("Couldn't add book.");
                    }
                })
                .catch((error) => {
                    console.log("need to create an error dialog");
                });
        }
    };

    useEffect(() => {
        if (show && !showConfirm) {
            window.addEventListener("click", clickCallback);
            window.addEventListener("keydown", keyCallback);
            console.log("added event listeners for add modal");
        } else {
            window.removeEventListener("click", clickCallback);
            window.removeEventListener("keydown", keyCallback);
            console.log("removed event listeners for add modal");
        }

        return () => {
            window.removeEventListener("click", clickCallback);
            window.removeEventListener("keydown", keyCallback);
        };
    }, [show, showConfirm]);

    useEffect(() => {
        setBook(content);
        setShowPages(inProgress);
        setCurrentPage(content.current_page?.toString() || "");
        setTotalPages(content.total_pages?.toString() || "");
        setShowConfirm(false);
    }, [content, inProgress]);

    let inlineStyle: React.CSSProperties | undefined = undefined;
    if (book.image_url) {
        inlineStyle = {
            backgroundImage: "url(" + book.image_url + ")",
        };
    }

    return (
        <React.Fragment>
            {show && (
                <React.Fragment>
                    <div className="overlay">
                        <div className="modal">
                            <form id="addBookForm" autoComplete="off" onSubmit={onFormSubmit}>
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
                                            defaultChecked={notStarted}
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
                                            defaultChecked={inProgress}
                                            onChange={onRadioChange}
                                        />
                                        <label className="radio-label" htmlFor="status-in-progress">
                                            In progress
                                        </label>
                                        {showPages && (
                                            <div className="text-group" id="progressGroup">
                                                <input
                                                    type="text"
                                                    name="current_page"
                                                    id="current_page"
                                                    value={currentPage}
                                                    onChange={onTextChange}
                                                    required
                                                ></input>
                                                <span>of</span>
                                                <input
                                                    type="text"
                                                    name="total_pages"
                                                    id="total_pages"
                                                    value={totalPages}
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
                                            defaultChecked={completed}
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
                                            onClick={() => onDeleteClick()}
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
                    <ConfirmDeleteModal
                        show={showConfirm}
                        onDeleteClick={() => onConfirmDelete(book)}
                        onCancelClick={onCancelDelete}
                    />
                </React.Fragment>
            )}
        </React.Fragment>
    );
};
