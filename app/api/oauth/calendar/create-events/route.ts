import {auth} from '@clerk/nextjs/server'; 
import { clerkClient } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest, res:NextRequest) => {

    try{
        const {userId} = auth();

        if(!userId){
            return NextResponse.json({message: 'User not found'});
        }

        const provider = 'oauth_google';
        const clerkResponse = await clerkClient.users.getUserOauthAccessToken(userId, provider);

        if(!clerkResponse || clerkResponse.length === 0){
            return NextResponse.json({message: 'No access token found'});
        }

        const accessToken = clerkResponse[0].token;

        //create events
        const testEvent = {
            summary: 'Sample Event',
            description: 'This is a sample event added via google calendar API',
            start: {
                dateTime: '2024-01-01T10:00:00',
                timeZone: 'America/Los_Angeles',
            },
            end: {
                dateTime: '2024-01-01T10:25:00',
                timeZone: 'America/Los_Angeles',
            },	
            attendees: [{email: 'sample.attendee@gmail.com'}]
        }

        const calendarUrl = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
        const googleResponse = await fetch(calendarUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testEvent)
        });

        if(!googleResponse.ok){
            const errorData = await googleResponse.json();
            return NextResponse.json({message: `Error: ${errorData.error.message}`});
        }

        const calendarData = await googleResponse.json();
        return NextResponse.json({message: "Event Created Successfully", data: calendarData})

    }catch(error){
        return NextResponse.json({message: `Error: ${error.message}`});
    }
};