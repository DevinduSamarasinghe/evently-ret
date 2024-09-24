import { axiosInstance } from "../axios";
import { NextResponse } from "next/server";
import logger from "../logger";

export const getAllCategories = async(userId:string)=>{
    try{
        const response = await axiosInstance(userId).get('/category');
        const data = response.data;
        return NextResponse.json({message: "Success", data:data, status:200});

    }catch(error){
        return NextResponse.json({message: error.message , status:500, data:{}})
    }
}

