//nextjs server actions file 
'use server'

import { CreateUserParams, UpdateUserParams } from "@/types/user"
import { connectToDatabase } from "../database"
import User from "../database/models/user.model"
import Event from "../database/models/event.model"
import Order from "../database/models/order.model"
import { revalidatePath } from "next/cache"

import logger from "../logger"


/**
 * functions of the user.actions.ts are used in the route.ts for all the event changes 
 */


let errorMsg:string  = '';

export const createUser = async(user:CreateUserParams)=>{
    try{
        //if we have a cached connection, it does not invoke again and again
        await connectToDatabase();
        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
        
    }catch(error){
        errorMsg = 'Error creating user';
        logger.error(`${errorMsg} ${error}`);
    }
}

export const getUserById = async(userId: string)=>{
    try{
        await connectToDatabase();
        const user = await User.findById(userId);

        if(!user) {
            errorMsg = 'User not found';
            logger.error(errorMsg);
        }

        return JSON.parse(JSON.stringify(user));
    }catch(error){
        errorMsg = 'Error getting user by id';
        logger.error(`${errorMsg} ${error}`);
    }
}

export const updateUser = async(userId: string, user:UpdateUserParams)=>{
    try{

        await connectToDatabase();

        //new: true would return the latest changed updatedInformation
        const updatedUser = await User.findOneAndUpdate({clerkId:userId}, user, {new:true});

        if(!updatedUser) {
            errorMsg = 'User not found';
            logger.error(errorMsg);
        }
        
        return JSON.parse(JSON.stringify(updatedUser));

    }catch(error){
        errorMsg = 'Error updating user';
        logger.error(`${errorMsg} ${error}`);
    }
}

//delete user pending
export const deleteUser = async(userId: string) =>{
    try{
        await connectToDatabase();

        const toBeDeletedUser = await User.findOne({clerkId: userId});
        if(!toBeDeletedUser) {
            errorMsg = 'User not found';
            logger.error(errorMsg);
        }

        //unlink the relationships in Event and Orders

        //Promise represents the completion of an asynchronous task, and .all represents if all the asynchronous tasks are complete
        await Promise.all([
            Event.updateMany(
                {_id: { $in: toBeDeletedUser.events}},
                {$pull: {organizer: toBeDeletedUser._id}}
            ),

            //update the 'orders' collection to remove references to the user
            Order.updateMany(
                { _id: { $in: toBeDeletedUser.orders } }, 
                { $unset: { buyer: 1 } }
            ),
        ]);

        //after the unlink delete the user

        const deletedUser = await User.findByIdAndDelete(toBeDeletedUser._id);
        revalidatePath('/');

        return deletedUser ?  JSON.parse(JSON.stringify(deletedUser)) : null;
        
    }catch(error){
        errorMsg = 'Error deleting user';
        logger.error(`${errorMsg} ${error}`);
    }
}