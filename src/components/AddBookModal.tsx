import React, { useEffect, useRef } from "react";

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
        console.log(event);
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
                        <span>I was passed {content}.</span>
                        <button onClick={() => onCloseClick()}>X</button>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};
