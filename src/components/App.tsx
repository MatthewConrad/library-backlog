import React, { useEffect, useState } from "react";
import { getBooks } from "../api/apiClient";
import { EMPTY_BOOK } from "../helpers/emptyBook";
import { BookData } from "../types/BookData";
import { AddBookModal } from "./AddBookModal";
import { InfoModal } from "./InfoModal";
import { Library } from "./Library";
import { SearchBookModal } from "./SearchBookModal";
import { Sidebar } from "./Sidebar";

const App: React.FC = () => {
    const [books, setBooks] = React.useState<BookData[]>([]);
    const [showAddBook, setShowAddBook] = useState(false);
    const [showSearchBook, setShowSearchBook] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [content, setContent] = useState<BookData>(EMPTY_BOOK);
    const [infoMessage, setShowInfoMessage] = useState("");
    const [edit, setEdit] = useState(false);

    const refreshBooks = () => {
        getBooks().then((response: BookData[]) => {
            setBooks(response);
        });
    };

    useEffect(() => {
        refreshBooks();
    }, []);

    const handleShowAddBook = (bookToShow?: BookData, edit = false) => {
        if (bookToShow) {
            setContent(bookToShow);
            setEdit(edit);
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

    const handleShowInfoModal = (message: string) => {
        setShowInfoMessage(message);
        setShowInfoModal(true);
    };

    const handleCloseInfoModal = () => {
        setShowInfoMessage("");
        setShowInfoModal(false);
    };

    return (
        <div className="App">
            <Sidebar onButtonClick={handleShowSearchBook} />
            <Library books={books} onBookClick={handleShowAddBook} />
            <SearchBookModal
                show={showSearchBook}
                onCloseClick={handleCloseSearchBook}
                onAddBookClick={handleShowAddBook}
                onError={handleShowInfoModal}
            />
            <AddBookModal
                show={showAddBook}
                content={content}
                edit={edit}
                onCloseClick={handleCloseAddBook}
                onBooksModified={refreshBooks}
                onError={handleShowInfoModal}
            />
            <InfoModal show={showInfoModal} message={infoMessage} onCloseClick={handleCloseInfoModal} />
        </div>
    );
};

export default App;
