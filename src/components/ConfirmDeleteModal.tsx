import React, { useEffect } from "react";

type Props = {
    show: boolean;
    onDeleteClick: () => void;
    onCancelClick: () => void;
};

export const ConfirmDeleteModal: React.FC<Props> = ({ show, onDeleteClick, onCancelClick }) => {
    useEffect(() => {
        const onClick = (event: MouseEvent) => {
            if ((event.target as HTMLElement).className === "overlay") {
                onCancelClick();
            }
        };

        const onKeydown = (event: KeyboardEvent) => {
            if (event.code === "Escape") {
                onCancelClick();
            }
        };

        if (show) {
            window.addEventListener("click", onClick);
            window.addEventListener("keydown", onKeydown);
        } else {
            window.removeEventListener("click", onClick);
            window.removeEventListener("keydown", onKeydown);
        }

        return () => {
            window.removeEventListener("click", onClick);
            window.removeEventListener("keydown", onKeydown);
        };
    }, [show, onCancelClick]);

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
                                onClick={onDeleteClick}
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
