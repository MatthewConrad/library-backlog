// import { response } from "express";
// import { GBooksSearchResult } from "../types/GBooksSearchResult";
import fetch from "node-fetch";
import { GBooksSearchResult } from "../types/GBooksSearchResult";

export default async function searchGoogleBooks(title: string, author?: string): Promise<GBooksSearchResult[]> {
    if (!process.env.BOOKS_API_KEY) {
        throw new Error("Cannot search for book, no API specified.");
    }

    let result: GBooksSearchResult[] = [];
    let url = `https://www.googleapis.com/books/v1/volumes?q=${title}`;
    if (author) url = url.concat(`+inauthor:${author}`);
    url = url.concat(`&key=${process.env.BOOKS_API_KEY}`);

    result = await fetch(url)
        .then((response: any) => {
            return response.json();
        })
        .then((response: any) => {
            return response.items.map((item: any) => {
                const volumeInfo: any = item.volumeInfo;
                const book: GBooksSearchResult = {
                    title: volumeInfo.title,
                    authors: volumeInfo.authors,
                    pageCount: volumeInfo.pageCount,
                    categories: volumeInfo.categories,
                    coverImageUrl: volumeInfo.imageLinks?.thumbnail.replace("&edge=curl", ""),
                };
                return book;
            });
        });

    return result;
}
