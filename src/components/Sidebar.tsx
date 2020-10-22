import React from "react";
import { Sliders } from "react-feather";

type Props = {
    onAddClick: (content?: string) => void;
};

export const Sidebar: React.FC<Props> = ({ onAddClick }) => {
    return (
        <div className="sidebar">
            <div className="user-image">M</div>
            <div className="button-container">
                <button className="action-button action-button--round" onClick={() => onAddClick("fake content")}>
                    +
                </button>
            </div>
            <div className="settings">
                <Sliders />
            </div>
        </div>
    );
};
