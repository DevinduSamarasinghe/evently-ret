import { getAllCategories } from "@/lib/backend/category";
import { auth } from "@clerk/nextjs";
import logger from "@/lib/logger";

const TestingCategories = async()=>{
    
    const { getToken } = auth();
    const token = await getToken();

    const response = await getAllCategories(token);
    const data = await response.json();
    
    return (
        <div>
            <h1>Testing Categories</h1>
        </div>
    )
}

export default TestingCategories;