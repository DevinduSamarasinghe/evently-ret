import { NextResponse } from 'next/server';
import { getGoogleAuthURL } from '@/lib/actions/oauth.actions';

// Handler for the GET request
export async function GET() {
  try {
    // Generate Google OAuth URL
    const googleAuthURL = getGoogleAuthURL();

    // Redirect to Google OAuth
    return NextResponse.redirect(googleAuthURL);
  } catch (error) {
    console.error('Error generating Google OAuth URL:', error);
    return NextResponse.json({ error: 'Failed to generate Google OAuth URL' }, { status: 500 });
  }
}
