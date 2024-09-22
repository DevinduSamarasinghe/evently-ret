import { NextResponse } from 'next/server';
import { getGoogleTokens } from '@/lib/actions/oauth.actions';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  console.log("CODE IS: ", code);

  if (!code) {
    return NextResponse.json({ error: 'No authorization code found' }, { status: 400 });
  }

  try {
    // Exchange the authorization code for tokens
    const tokens = await getGoogleTokens(code);


    console.log('Google OAuth tokens:', tokens);

    // Store tokens in a session or database if needed
    // Redirect user to the homepage or another page after successful login
    return NextResponse.redirect(new URL('/', request.url));
  } catch (err) {
    console.error('Error during OAuth token exchange:', err);
    return NextResponse.json({ error: 'Failed to complete OAuth flow' }, { status: 500 });
  }
}
