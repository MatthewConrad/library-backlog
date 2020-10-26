import React, { useState } from "react";
import { EMPTY_BOOK } from "../helpers/emptyBook";
import { BookData } from "../types/BookData";
import { AddBookModal } from "./AddBookModal";
import { Library } from "./Library";
import { SearchBookModal } from "./SearchBookModal";
import { Sidebar } from "./Sidebar";

const App: React.FC = () => {
    const [showAddBook, setShowAddBook] = useState(false);
    const [showSearchBook, setShowSearchBook] = useState(false);
    const [content, setContent] = useState<BookData>(EMPTY_BOOK);
    const [edit, setEdit] = useState(false);

    const handleShowAddBook = (bookToShow?: BookData) => {
        if (bookToShow) {
            setContent(bookToShow);
            setEdit(true);
        }
        setShowAddBook(true);
    };

    const handleShowSearchBook = () => {
        setShowSearchBook(true);
    };

    const handleCloseAddBook = () => {
        setShowAddBook(false);
        setContent(EMPTY_BOOK);
        setEdit(false);
    };

    const handleCloseSearchBook = () => {
        setShowSearchBook(false);
    };

    return (
        <div className="App">
            <Sidebar onButtonClick={handleShowSearchBook} />
            <Library onBookClick={handleShowAddBook} />
            <SearchBookModal
                show={showSearchBook}
                onCloseClick={handleCloseSearchBook}
                onAddBookClick={handleShowAddBook}
            />
            <AddBookModal show={showAddBook} content={content} onCloseClick={handleCloseAddBook} edit={edit} />
        </div>
    );
};

export default App;
