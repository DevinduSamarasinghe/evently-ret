import { axiosInstance } from "../axios";
import { NextResponse } from "next/server";
import logger from "../logger";

export const getAllCategories = async(token:string)=>{
    try{
        const response = await axiosInstance(token).get('/category');
        const data = response.data;
        return NextResponse.json({message: "Success", data:data, status:200});

    }catch(error){
        return NextResponse.json({message: error.message , status:500, data:{}})
    }
}

export const getCategoryByName = async(userId: string, token:string)=>{
    try{
        const response = await axiosInstance(token).get(`/category/${userId}`);
        const data = response.data;
        return NextResponse.json({message: "Success", data:data, status:200});
    }catch(error){
        return NextResponse.json({message: error.message , status:500, data:{}})
    }
}