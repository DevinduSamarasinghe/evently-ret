// This will be the middleware handling access 

import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({

    //even if theere is no logged in session, these routes will be accessible
    publicRoutes: [
        "/",
        '/events/:id',
        '/api/webhook/clerk',
        '/api/webhook/stripe',
        '/api/uploadthing',
        '/api/server/event',
    ],

    //these routes will be ignored by middleware 
    ignoredRoutes: [
        '/api/webhook/clerk',
        '/api/webhook/stripe',
        '/api/uploadthing',
        '/api/internal/hello',
        '/api/server/event'
    ]
})

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
  };
   