import React, { useEffect, useRef } from "react";
import { X } from "react-feather";

type Props = {
    show: boolean;
    content: string;
    onCloseClick: () => void;
};

export const AddBookModal: React.FC<Props> = ({ show, content, onCloseClick }) => {
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

    useEffect(() => {
        document.addEventListener("click", clickCallback);
        document.addEventListener("keydown", keyCallback);

        return () => {
            document.removeEventListener("click", clickCallback);
            document.removeEventListener("keydown", keyCallback);
        };
    }, []);

    return (
        <React.Fragment>
            {show && (
                <div className="overlay">
                    <div className="modal">
                        <form autoComplete="off">
                            <button className="icon-button" id="closeButton" onClick={() => onCloseClick()}>
                                <X />
                            </button>
                            <div className="book-cover" id="cover">
                                <div className="book-cover__title"></div>
                                <div className="book-cover__author"></div>
                            </div>
                            <div className="text-group" id="titleField">
                                <label htmlFor="title">Title</label>
                                <input type="text" name="title" id="title" required></input>
                            </div>
                            <div className="text-group" id="authorField">
                                <label htmlFor="author">Author</label>
                                <input type="text" name="author" id="author"></input>
                            </div>
                            <div className="radio-group" id="statusGroup">
                                <input type="radio" name="status" id="status-backlog" value="status-backlog" required />
                                <label className="radio-label" htmlFor="status-backlog">
                                    Not started
                                </label>
                                <input type="radio" name="status" id="status-in-progress" value="status-in-progress" />
                                <label className="radio-label" htmlFor="status-in-progress">
                                    In progress
                                </label>
                                <input type="radio" name="status" id="status-completed" value="status-completed" />
                                <label className="radio-label" htmlFor="status-completed">
                                    Completed
                                </label>
                            </div>
                            <div className="button-group" id="buttonGroup">
                                <button className="secondary-button" onClick={() => onCloseClick()}>
                                    Cancel
                                </button>
                                <button className="action-button">Add to Library</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};
