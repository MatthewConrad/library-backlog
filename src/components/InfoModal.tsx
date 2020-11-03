import React, { useEffect } from "react";

type Props = {
    show: boolean;
    message: string;
    onCloseClick: () => void;
};
export const InfoModal: React.FC<Props> = ({ show, message, onCloseClick }) => {
    useEffect(() => {
        const onClick = (event: MouseEvent) => {
            if ((event.target as HTMLElement).className === "overlay") {
                onCloseClick();
            }
        };

        const onKeydown = (event: KeyboardEvent) => {
            if (event.code === "Escape") {
                onCloseClick();
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
    }, [show, onCloseClick]);

    return (
        <React.Fragment>
            {show && (
                <div className="overlay">
                    <div className="modal" id="infoModal">
                        <div>{message}</div>
                        <div className="button-group">
                            <button type="button" className="action-button" onClick={onCloseClick}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};
