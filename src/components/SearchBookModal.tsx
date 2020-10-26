import React, { useEffect, useState } from "react";
import { X } from "react-feather";
import { BookData } from "../types/BookData";
import { GBooksSearchResult } from "../types/GBooksSearchResult";

type Props = {
    show: boolean;
    onCloseClick: () => void;
    onAddBookClick: (content?: BookData) => void;
};

export const SearchBookModal: React.FC<Props> = ({ show, onCloseClick, onAddBookClick }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [searching, setSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<GBooksSearchResult[]>([]);

    useEffect(() => {
        setTitle("");
        setAuthor("");
        setSearching(false);
        setSearchResults([]);
    }, [show]);

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSearching(true);
        setSearchResults([]);

        let url = `http://localhost:5000/books/search?title=${title}&author=${author}`;
        if (author) url = url.concat(`&author=${author}`);

        fetch(encodeURI(url))
            .then((response) => {
                return response.json();
            })
            .then((results) => {
                setSearching(false);
                setSearchResults(results);
                console.log(results);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onManualAddClick = () => {
        onAddBookClick({
            title: title,
            author: author,
            completed: false,
        });
        onCloseClick();
    };
    return (
        <React.Fragment>
            {show && (
                <div className="overlay">
                    <div className="modal">
                        <form id="searchBookForm" autoComplete="off" onSubmit={onFormSubmit}>
                            <button
                                className="icon-button"
                                id="closeButton"
                                aria-label="Close window"
                                onClick={() => onCloseClick()}
                            >
                                <X />
                            </button>
                            <div className="text-group" id="titleField">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    required
                                    onChange={(event) => setTitle(event.target.value)}
                                    value={title}
                                ></input>
                            </div>
                            <div className="text-group" id="authorField">
                                <label htmlFor="author">Author</label>
                                <input
                                    type="text"
                                    name="author"
                                    id="author"
                                    onChange={(event) => setAuthor(event.target.value)}
                                    value={author}
                                ></input>
                            </div>
                            <div className="button-group" id="buttonGroup">
                                <button className="secondary-button" onClick={() => onCloseClick()}>
                                    Cancel
                                </button>
                                <button className="secondary-button" onClick={() => onManualAddClick()}>
                                    Add Manually
                                </button>
                                <button className="action-button">Search</button>
                            </div>
                        </form>
                        <div>
                            {searching && searchResults.length == 0 && <div>Searching!</div>}
                            {!searching &&
                                searchResults.length > 0 &&
                                searchResults.map((result, index) => {
                                    return <div key={"result" + index}>{result.title}</div>;
                                })}
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};
