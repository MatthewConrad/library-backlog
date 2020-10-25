export type GBooksSearchResult = {
    title: string;
    authors: string[];
    pageCount: number;
    categories?: string[];
    coverImageUrl?: string;
};
