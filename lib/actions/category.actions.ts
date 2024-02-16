"use server"

import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import Category from "../database/models/category.model"

export const createCategory = async({categoryName}:{categoryName: string})=>{
    try{
        await connectToDatabase();
        const newCategory = await new Category({name: categoryName}).save();
        return JSON.parse(JSON.stringify(newCategory));
    }catch(error){
        handleError(error);
    }
}

export const getAllCategories = async()=>{
    try{
        await connectToDatabase();
        const categories = await Category.find();
        return JSON.parse(JSON.stringify(categories));
    }catch(error){
        handleError(error)
    }
}

export const getCategoryById = async(categoryId: string)=>{
    try{
        await connectToDatabase();
        const category = await Category.findById(categoryId);
        return JSON.parse(JSON.stringify(category));
    }catch(error){
        handleError(error)
    }
}

//conditional within the attribute
export const getCategoryByName = async(categoryName: string) =>{
    try{
        await connectToDatabase();
        const categoryByName =await Category.findOne({name: {$regex: categoryName, $options: 'i'}});
        return categoryByName;
    }catch(error){
        handleError(error)
    }
}
