import { axiosInstance } from "../axios";
import { NextResponse } from "next/server";

export const getAllCategories = async (token: string) => {
  try {
    // Await the axiosInstance promise before making the GET request
    const axios = await axiosInstance(token);
    const response = await axios.get('/category');
    const data = response.data;
    return NextResponse.json({ message: "Success", data: data, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500, data: {} });
  }
};

export const getCategoryByName = async(token:string, name: string)=>{
    try{
        const axios = await axiosInstance(token);
        const response = await axios.get(`/category/name/${name}`);
        const data = response.data;
        return NextResponse.json({message: "Success", data:data, status:200});
    }catch(error){
        return NextResponse.json({message: error.message , status:500, data:{}})
    }
}

export const createCategory = async(token: string, obj: {name: string})=>{

    try {
        const axios = await axiosInstance(token);
        const response = await axios.post('/category', obj);
        const data = response.data;
    }catch(error){
        return NextResponse.json({message: error.message, status:500, data:{}})
    }
}