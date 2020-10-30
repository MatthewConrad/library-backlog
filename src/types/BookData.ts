export type BookData = {
    id?: number;
    title: string;
    author: string;
    image_url?: string;
    current_page?: number;
    total_pages?: number;
    completed: boolean;
    date_added?: Date;
    date_finished?: Date;
    last_updated?: Date;
};
