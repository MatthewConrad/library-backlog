import React, { useState } from "react";
import { AddBookModal } from "./AddBookModal";
import { Library } from "./Library";
import { Sidebar } from "./Sidebar";

const App: React.FC = () => {
    const [showAddBook, setShowAddBook] = useState(false);
    const [content, setContent] = useState("");

    const handleShow = (content?: string) => {
        setShowAddBook(true);
        if (content) setContent(content);
    };

    const handleClose = () => {
        setShowAddBook(false);
        setContent("");
    };

    return (
        <div className="App">
            <Sidebar onAddClick={handleShow} />
            <Library />
            <AddBookModal show={showAddBook} content={content} onCloseClick={handleClose} />
        </div>
    );
};

export default App;
