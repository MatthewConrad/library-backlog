import React, { useEffect, useState } from "react";
import { X } from "react-feather";
import { BookData } from "../types/BookData";
import { GBooksSearchResult } from "../types/GBooksSearchResult";

type Props = {
    show: boolean;
    onCloseClick: () => void;
    onAddBookClick: (content?: BookData) => void;
    onError: (message: string) => void;
};

export const SearchBookModal: React.FC<Props> = ({ show, onCloseClick, onAddBookClick, onError }) => {
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

    useEffect(() => {
        const onClick = (event: MouseEvent) => {
            if ((event.target as HTMLElement).className === "overlay") {
                onCloseClick();
            }
        };

        const onKeydown = (event: KeyboardEvent) => {
            if (event.code === "Escape") {
                onCloseClick();
            }
        };

        if (show) {
            window.addEventListener("click", onClick);
            window.addEventListener("keydown", onKeydown);
        } else {
            window.removeEventListener("click", onClick);
            window.removeEventListener("keydown", onKeydown);
        }

        return () => {
            window.removeEventListener("click", onClick);
            window.removeEventListener("keydown", onKeydown);
        };
    }, [show, onCloseClick]);

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
                if (results.length == 0) onError("Your search didn't find any books.");
                else setSearchResults(results);
            })
            .catch((error) => {
                console.log(error);
                onError("Something went wrong during your search.");
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

    const onResultAddClick = (result: GBooksSearchResult) => {
        onAddBookClick({
            title: result.title,
            author: result.authors?.join(", "),
            total_pages: result.pageCount,
            image_url: result.coverImageUrl,
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
                                type="button"
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
                                <button type="button" className="secondary-button" onClick={() => onCloseClick()}>
                                    Cancel
                                </button>
                                <button type="button" className="secondary-button" onClick={() => onManualAddClick()}>
                                    Add Manually
                                </button>
                                <button type="submit" className="action-button">
                                    Search
                                </button>
                            </div>
                        </form>
                        {searching && searchResults.length == 0 && <div className="spinner">Searching...</div>}
                        {!searching && searchResults.length > 0 && (
                            <div className="search-results">
                                {searchResults.map((result, index) => {
                                    let inlineStyle: React.CSSProperties | undefined = undefined;
                                    if (result.coverImageUrl) {
                                        inlineStyle = {
                                            backgroundImage: "url(" + result.coverImageUrl + ")",
                                        };
                                    }
                                    return (
                                        <div className="search-result" key={"result" + index}>
                                            <div className="book-cover" style={inlineStyle}></div>
                                            <div className="search-title">{result.title}</div>
                                            <div className="search-author">{result.authors?.join(", ")}</div>
                                            <button
                                                type="button"
                                                className="action-button"
                                                onClick={() => onResultAddClick(result)}
                                            >
                                                Add
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};
