export type BookData = {
    title: string,
    author: string,
    imageUrl: string,
    currentPage?: number,
    totalPages?: number,
    completed: boolean,
    dateAdded?: Date,
    dateFinished?: Date,
    lastUpdated?: Date
}