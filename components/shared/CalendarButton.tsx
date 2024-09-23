"use client";

import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { IEvent } from "@/lib/database/models/event.model";
import { CreateGoogleCalendarEvent } from "@/types/event";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"; // Assuming you have the custom AlertDialog component

interface CalendarButtonProps {
  event: IEvent;
}

const CalendarButton = ({ event }: CalendarButtonProps) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); // For loading state

  const eventDetails: CreateGoogleCalendarEvent = {
    summary: event.title,
    location: event.location,
    description: event.description,
    start: {
      dateTime: event.startDateTime,
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: event.endDateTime,
      timeZone: "America/Los_Angeles",
    },
    attendees: [{ email: event.organizer.email }],
    reminders: {
        useDefault: false,
        overrides: [
            {
                method: 'email',
                minutes: 24*60
            },
            {
                method: 'popup',
                minutes: 10
            },
        ]
    }
  };

  const addToCalendar = useCallback(async () => {
    setLoading(true); // Start loading
    setSuccess(false);
    setError(false);

    try {
      const response = await fetch("/api/oauth/calendar/create-calendar-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventDetails),
      });

      const data = await response.json();
      setLoading(false); // Stop loading

      if (data.data) {
        setSuccess(true); // Show success alert
      } else {
        setError(true); // Show error alert
      }
    } catch (e) {
      setLoading(false);
      setError(true); // Show error alert
    }
  }, []);

  return (
    <div>
      {/* Add to Calendar Button */}
      <Button
        className="bg-blue-400"
        type="submit"
        onClick={addToCalendar}
        disabled={loading} // Disable the button while loading
      >
        <FaGoogle />
        <span className="ml-2">
          {loading ? "Adding..." : "Add to Calendar"} {/* Show loading text */}
        </span>
      </Button>

      {/* Success Alert Dialog */}
      <AlertDialog open={success || error} onOpenChange={() => setSuccess(false)}>
        <AlertDialogTrigger asChild>
          {/* Hidden trigger, controlled by the success/error state */}
          <button className="hidden"></button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {success ? "Success!" : "Error"} {/* Dynamic title */}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {success
                ? "Event has been successfully added to your calendar."
                : "An error occurred while adding the event. Please try again."}
              {/* Dynamic message */}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="bg-blue-400 text-white my-2"
              onClick={() => {
                setSuccess(false);
                setError(false);
              }}
            >
              Close {/* Single close button */}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CalendarButton;
