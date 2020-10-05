import React from "react";
import "../styles/Sidebar.scss";

export const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="user-image"></div>
            <div className="button-container">
                <button className="button">+</button>
            </div>
            <div className="settings"></div>
        </div>
    );
};
