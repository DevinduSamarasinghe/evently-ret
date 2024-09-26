import { getAllCategories, getCategoryByName } from "@/lib/backend/category";
import { auth } from "@clerk/nextjs";
import logger from "@/lib/logger";

const TestingCategories = async()=>{
    
    const { getToken, sessionClaims } = auth();

    console.log("Session Claims", sessionClaims.userId);	
    const token = await getToken();
    const userId = sessionClaims?.userId;
    // const response = await getAllCategories(token);
    // const data = await response.json();

    
    const eventByUser = await getCategoryByName(token, userId as string);
    const data = await eventByUser.json();

    console.log("Data from backend", data);
    return (
        <div>
            <h1>Testing Categories</h1>
        </div>
    )
}

export default TestingCategories;