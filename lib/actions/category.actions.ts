"use server"

import { connectToDatabase } from "../database"
import Category from "../database/models/category.model"
import logger from "../logger"


let errorMsg: string = '';

export const createCategory = async({categoryName}:{categoryName: string})=>{

    try{
        await connectToDatabase();
        const newCategory = await new Category({name: categoryName}).save();
        return JSON.parse(JSON.stringify(newCategory));
    }catch(error){
        errorMsg = 'Error creating category';
        logger.error(`${errorMsg}: ${error.message}`);
        throw new Error(errorMsg);
    }
}

export const getAllCategories = async()=>{


    try{
        await connectToDatabase();
        const categories = await Category.find();
        return JSON.parse(JSON.stringify(categories));
    }catch(error){
        errorMsg = 'Error getting all categories';
        logger.error(`${errorMsg}: ${error.message}`);
        throw new Error(errorMsg);
    }
}

export const getCategoryById = async(categoryId: string)=>{
    try{
        await connectToDatabase();
        const category = await Category.findById(categoryId);
        return JSON.parse(JSON.stringify(category));
    }catch(error){
        errorMsg = 'Error getting category by id';
        logger.error(`${errorMsg}: ${error.message}`);
        throw new Error(errorMsg);
    }
}

//conditional within the attribute
export const getCategoryByName = async(categoryName: string) =>{
    try{
        await connectToDatabase();
        const categoryByName =await Category.findOne({name: {$regex: categoryName, $options: 'i'}});
        return categoryByName;
    }catch(error){
        errorMsg = 'Error getting category by name';
        logger.error(`${errorMsg}: ${error.message}`);
        throw new Error(errorMsg);
    }
}
