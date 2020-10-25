import React from "react";
import { Sliders } from "react-feather";
import { BookData } from "../types/BookData";

type Props = {
    onAddClick: (content?: BookData) => void;
};

export const Sidebar: React.FC<Props> = ({ onAddClick }) => {
    return (
        <div className="sidebar">
            <div className="user-image">M</div>
            <div className="button-container">
                <button className="action-button action-button--round" onClick={() => onAddClick()}>
                    +
                </button>
            </div>
            <div className="settings">
                <Sliders />
            </div>
        </div>
    );
};
