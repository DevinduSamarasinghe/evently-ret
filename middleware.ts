// This will be the middleware handling access 

import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({

    //even if theere is no logged in session, these routes will be accessible
    publicRoutes: [
        "/",
    ],

    //these routes will be ignored by middleware 
    ignoredRoutes: [
    ]
})

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
  };
   