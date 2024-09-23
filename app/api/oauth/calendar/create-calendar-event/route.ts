import {auth} from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { createEventInGoogle } from '@/lib/actions/auth.action';
import { CreateGoogleCalendarEvent } from '@/types/event';
import logger from '@/lib/logger';

export const POST = async (req: NextRequest, res:NextRequest) => {
    try {
        
        const {userId} = auth();
        const event:any = await req.json();


        console.log("This is the event", event);
        if(!userId){
            logger.error('User not found');
            return NextResponse.json({message: 'User not found'});
        }

        const {data, status, message} = await createEventInGoogle(event, userId);
        
        if(status !== 200){
            logger.error(`Error in creating Google calendar event: ${message}`);
            return NextResponse.json({message: `Error: ${message}`});
        }

        logger.info('Event Created Successfully');
        return NextResponse.json({message: "Event Created Successfully", data: data});
    }catch(error){

    }
}

  