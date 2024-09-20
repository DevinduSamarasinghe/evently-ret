import { getAllCategories, getCategoryByName, createCategory } from "@/lib/backend/category";
import { auth } from "@clerk/nextjs";
import logger from "@/lib/logger";

const TestingCategories = async()=>{
    
    const { getToken, sessionClaims } = auth();

    console.log("Session Claims", sessionClaims.userId);	
    const token = await getToken();
    const userId = sessionClaims?.userId;
    // const response = await getAllCategories(token);
    // const data = await response.json();

    
    //succcess -> All categories
    // const eventByUser = await getAllCategories(token);
    // const data = await eventByUser.json();
     //console.log("Data from backend", data);

    //success -> All categories by name
    // const name = 'Plant'
    // const eventByName = await getCategoryByName(token, name);
    // const dataByName = await eventByName.json();
    //console.log("getCategoryByName:", dataByName);
    
    //creating a new category
    const categoryName = 'Test Category';
    const newCategory = await createCategory(token, {name: categoryName});
    const datanewCategory = await newCategory.json();

    console.log("New Category", datanewCategory);
    return (
        <div>
            <h1>Testing Categories</h1>
        </div>
    )
}

export default TestingCategories;