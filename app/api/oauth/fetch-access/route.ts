import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const { userId } = auth();
  //console.log("UserID from auth is:", userId);


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

    console.log(accessToken);

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

    //console.log("In the handler I call", googleData);

    // Return the response in your app
    return NextResponse.json({ message: googleData });

  } catch (error) {
    return NextResponse.json({ message: `Error: ${error.message}` });
  }
}
