"use client";
// import { useState, useCallback, useEffect } from "react";
// import { useAuth } from "@clerk/nextjs";

const GoogleDataPage = () => {
//   const { userId } = useAuth();
//   const [googleData, setGoogleData] = useState(null);
//   const [status, setStatus] = useState('');

// const createGoogleCalendar = useCallback(async()=>{
//     if(userId){
//         try {
//             const response = await fetch('/api/oauth/calendar/create-events', {
//                 method: 'POST',
//             })

//             if(!response.ok){
//                 throw new Error('Error creating Google calendar event');
//             }

//             const data = await response.json();
//             setStatus('Event Created Successfully');
//             setGoogleData(data);
//         }catch(error){
//             console.error("Error creating Google calendar event:", error);
//         }
//     }
// },[userId])

// useEffect(()=>{
//     if(!googleData && userId){
//         createGoogleCalendar();
//     }
// },[createGoogleCalendar, userId, googleData])

//console.log("Google Data is:", googleData);
  return (
    <div>
      <h1>Google Data Page</h1>
    </div>
  );
};

export default GoogleDataPage;
