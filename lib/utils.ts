import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * 
 * @param dateString : string 
 * @returns formattedDateTime, formattedDate, formattedTime
 */
export const formatDateTime = (dateString: Date | null ) =>{

  if (!dateString) {
    return { dateTime: "", dateOnly: "", timeOnly: "" }; // Handle null case
  }

  //setting up the options for time, date and datetime formats
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }

  //providing the options
  const formattedDateTime: string = new Date(dateString).toLocaleString('en-US',dateTimeOptions);
  const formattedDate: string = new Date(dateString).toLocaleString('en-US',dateOptions);
  const formattedTime: string = new Date(dateString).toLocaleString('en-US',timeOptions);

  return {dateTime: formattedDateTime, dateOnly: formattedDate, timeOnly: formattedTime};
}

/**
 * 
 * @param file 
 * @returns file url
 */
export const convertFileToURL = (file:File)=> URL.createObjectURL(file);

/**
 * 
 * @param price : string
 * @returns formatted price with USD as currency
 */
export const formatPrice = (price: string)=>{
  const amount = parseFloat(price);
  const formattedPrice = new Intl.NumberFormat('en-US',{
    style: 'currency',
    currency: 'USD'
  }).format(amount);

  return formattedPrice;
}


/**
 * Custom error
 */
export const handleError = (error: any)=>{
  console.error(error);
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}
