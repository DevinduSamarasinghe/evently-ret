import { IEvent } from "@/lib/database/models/event.model";

export type CreateEventParams = {
    userId: string
    event: {
      title: string
      description: string
      location: string
      imageUrl: string
      startDateTime: Date
      endDateTime: Date
      categoryId: string
      price: string
      isFree: boolean
      url: string
    }
    path: string
  }
export interface GetEventParams {
    query: string;
    limit: number; 
    page: number;
    category: string;   
}

//here the key and the return is the value, meaning there is a key pair value that we dont know of as well
export interface SearchParamsProps {
    params: {id: string},
    searchParams: {[key: string]:string | string[] | undefined}
}

export interface GetAllEventsParams {
    query: string,
    category: string,
    limit: number,
    page: number
}

export type GetRelatedEventsByCategoryParams = {
    categoryId: string
    eventId: string
    limit?: number
    page: number | string
  }

  export type UpdateEventParams = {
    userId: string
    event: {
      _id: string
      title: string
      imageUrl: string
      description: string
      location: string
      startDateTime: Date
      endDateTime: Date
      categoryId: string
      price: string
      isFree: boolean
      url: string
    }
    path: string
  }

