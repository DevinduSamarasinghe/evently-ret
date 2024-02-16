"use server"

import { CreateEventParams, GetEventParams } from "@/types/event"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import Event from "../database/models/event.model"
import User from "../database/models/user.model"
import Category from "../database/models/category.model"
import { IEvent } from "../database/models/event.model"
import { getCategoryByName } from "./category.actions"


const populateEvent = (query: any) => {
    return query
      .populate({ path: 'organizer', model: User, select: '_id firstName lastName email' })
      .populate({ path: '', model: Category, select: '_id name' })
  }

//CREATE
export const createEvent = async ({ event, userId, path }: CreateEventParams) => {
        try{
            await connectToDatabase();
            
            //first find the organizer 
            const organizer = await User.findById(userId);
            if(!organizer){
                throw new Error("Organizer not found");
            }

            const newEvent = new Event({
                ...event,
                category: event.categoryId,
                organizer: organizer._id,
            })
            await newEvent.save();
            return JSON.parse(JSON.stringify(newEvent));
        }catch(error){
            console.log(error);
            handleError(error);
        }
}

export const getEventById = async(eventId: string):Promise<IEvent | void> =>{
    try{
        await connectToDatabase();

        /**
         * Better alternative above
         */
        // let event = await Event.findById(eventId).populate('organizer');
        // event = await Category.populate(event, {path: 'category'});

        //no await in findbyId, since we need the query before processing
        const event = await populateEvent(Event.findById(eventId));
        
        if(!event){
            throw new Error("Event not found");
        }

        return JSON.parse(JSON.stringify(event));
    }catch(error){
        handleError(error);
    }
}


//This method requires pagination as well
export const getAllEvents = async({query, limit=6, page,category}:GetEventParams)=>{
    try{
        await connectToDatabase();
        
        //regex option says case insensitive so anything we pass insensitively gets a match 
        const titleCondition = query ? {title: {$regex: query, $options:'i'}} : {}
        const categoryCondition = category ? await getCategoryByName(category) : null
        const conditions = {
            $and: [titleCondition, categoryCondition ? {category: categoryCondition._id} : {}],
        }

        const skipAmount = (Number(page)-1) * limit;
        let events = await Event.find(conditions)
        .sort({createdAt: 'desc'})
        .skip(skipAmount)
        .limit(limit);

        events = await Event.populate(events, {path: 'organizer', model: User, select: '_id firstName lastName email'})
        events = await Event.populate(events, {path: 'category', model: Category, select: '_id name'})
        
        const eventsCount = await Event.countDocuments(conditions);

        return {
            data: JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(eventsCount/limit)
        }

    }catch(error){
        console.log(error);
    }
}