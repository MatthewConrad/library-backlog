import React, { useEffect } from "react";
import { BookData } from "../types/BookData";

type Props = {
    show: boolean;
    onDeleteClick: (book: BookData) => void;
    onCancelClick: () => void;
};

export const ConfirmDeleteModal: React.FC<Props> = ({ show, onDeleteClick, onCancelClick }) => {
    const clickCallback = (event: MouseEvent) => {
        if ((event.target as HTMLElement).className === "overlay") {
            console.log("LISTENER FIRED!");
            onCancelClick();
        }
    };

    const keyCallback = (event: KeyboardEvent) => {
        if (event.code === "Escape") {
            onCancelClick();
        }
    };

    useEffect(() => {
        if (show) {
            window.addEventListener("click", clickCallback);
            window.addEventListener("keydown", keyCallback);
        } else {
            window.removeEventListener("click", clickCallback);
            window.removeEventListener("keydown", keyCallback);
        }

        return () => {
            window.removeEventListener("click", clickCallback);
            window.removeEventListener("keydown", keyCallback);
        };
    }, [show]);

    return (
        <React.Fragment>
            {show && (
                <div className="overlay">
                    <div className="modal" id="confirmDeleteModal">
                        <div>Are you sure you want to delete this book from your Library?</div>
                        <div className="button-group">
                            <button type="button" className="secondary-button" onClick={onCancelClick}>
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="action-button action-button--destructive"
                                onClick={() => onDeleteClick}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};
