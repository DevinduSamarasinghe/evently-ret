import { IEvent } from "@/lib/database/models/event.model";

export interface CreateEventParams {
    userId: string;
    event: Pick<
        IEvent,
        'title' | 'description' | 'location' | 'imageUrl' | 'startDateTime' | 'endDateTime' | 'price' | 'isFree' | 'url'
    > & {
        categoryId: string; // Replace category object with just categoryId
    };
    path: string;
}

export interface GetEventParams {
    query: string;
    limit: number; 
    page: number;
    category: string;   
}