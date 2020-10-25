import React, { useState } from "react";
import { EMPTY_BOOK } from "../helpers/emptyBook";
import { BookData } from "../types/BookData";
import { AddBookModal } from "./AddBookModal";
import { Library } from "./Library";
import { Sidebar } from "./Sidebar";

const App: React.FC = () => {
    const [showAddBook, setShowAddBook] = useState(false);
    const [content, setContent] = useState<BookData>(EMPTY_BOOK);

    const handleShow = (content?: BookData) => {
        setShowAddBook(true);
        if (content) setContent(content);
    };

    const handleClose = () => {
        setShowAddBook(false);
        setContent(EMPTY_BOOK);
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
