import React from "react";
import { Sliders } from "react-feather";

type Props = {
    onButtonClick: () => void;
};

export const Sidebar: React.FC<Props> = ({ onButtonClick }) => {
    return (
        <div className="sidebar">
            <div className="user-image">M</div>
            <div className="button-container">
                <button className="action-button action-button--round" onClick={() => onButtonClick()}>
                    +
                </button>
            </div>
            <div className="settings">
                <Sliders />
            </div>
        </div>
    );
};
