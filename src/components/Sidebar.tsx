import React from "react";
import { Sliders } from "react-feather";

export const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <div className="user-image">M</div>
            <div className="button-container">
                <button className="button">+</button>
            </div>
            <div className="settings">
                <Sliders />
            </div>
        </div>
    );
};
