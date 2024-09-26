// This will be the middleware handling access 
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({

    //even if theere is no logged in session, these routes will be accessible
    publicRoutes: [
        "/",
        '/events/:id',
        '/api/webhook/clerk',
        '/api/uploadthing',	
    ],

    //these routes will be ignored by middleware 
    ignoredRoutes: [
        '/api/webhook/clerk',
        '/api/uploadthing',
    ]
})

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};



