import React from "react";
import { Library } from "./Library";
import { Sidebar } from "./Sidebar";

const App: React.FC = () => {
    return (
        <div className="App">
            <Sidebar />
            <Library />
        </div>
    );
};

export default App;
