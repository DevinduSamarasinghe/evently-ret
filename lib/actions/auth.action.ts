import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { CreateGoogleCalendarEvent } from '@/types/event';

export const getAccessToken =async()=> {
  const { userId } = auth();
  console.log("UserID from auth is:", userId);


  if (!userId) {
    return NextResponse.json({ message: 'User not found' });
  }

  // Specify the OAuth provider (Google in this case)
  const provider = 'oauth_google';

  try {
    // Get the Google OAuth access token for the user
    const clerkResponse = await clerkClient.users.getUserOauthAccessToken(userId, provider);

    // Extract the access token
    const accessToken = clerkResponse[0].token;

    // Now use the access token to interact with Google APIs
    const googlePeopleUrl = 'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses';

    // Make a request to Google's API
    const googleResponse = await fetch(googlePeopleUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    // Handle the response from Google's API
    const googleData = await googleResponse.json();

    // Return the response in your app
    return NextResponse.json({ message: googleData });

  } catch (error) {
    return NextResponse.json({ message: `Error: ${error.message}` });
  }
}

//passing any as the object for now
export const createEventInGoogle = async(event, userId:string):Promise<{data: null | any, status: number, message: string}>=>{
  
  try {
    if(!userId){
      return {message: 'User not found', data: {}, status: 404};
    }

    const provider = 'oauth_google';
    const clerkResponse = await clerkClient.users.getUserOauthAccessToken(userId, provider);

    if(!clerkResponse || clerkResponse.length === 0){
      return {message: 'No access token found', data: {},  status: 404};
    }

    //This will be the passing token
    const accessToken = clerkResponse[0].token;
    
    const calendarURL = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
    const googleResponse = await fetch(calendarURL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`, 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    });

    if(!googleResponse.ok){
      const errorData = await googleResponse.json();
      return {message: `Error: ${errorData.error.message}`, data:{}, status: 500};
    }

    const calendarData = await googleResponse.json();
    return { message: "Event Created Successfully", data: calendarData, status: 200};
    
  }catch(error){  
    return {message: `Error: ${error.message}`, data: {},status: 500};
  }
}
