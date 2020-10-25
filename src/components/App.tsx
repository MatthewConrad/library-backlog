import React, { useState } from "react";
import { EMPTY_BOOK } from "../helpers/emptyBook";
import { BookData } from "../types/BookData";
import { AddBookModal } from "./AddBookModal";
import { Library } from "./Library";
import { Sidebar } from "./Sidebar";

const App: React.FC = () => {
    const [showAddBook, setShowAddBook] = useState(false);
    const [content, setContent] = useState<BookData>(EMPTY_BOOK);
    const [edit, setEdit] = useState(false);

    const handleShow = (bookToShow?: BookData) => {
        if (bookToShow) {
            setContent(bookToShow);
            setEdit(true);
        }
        setShowAddBook(true);
    };

    const handleClose = () => {
        setShowAddBook(false);
        setContent(EMPTY_BOOK);
        setEdit(false);
    };

    return (
        <div className="App">
            <Sidebar onAddClick={handleShow} />
            <Library onBookClick={handleShow} />
            <AddBookModal show={showAddBook} content={content} onCloseClick={handleClose} edit={edit} />
        </div>
    );
};

export default App;
