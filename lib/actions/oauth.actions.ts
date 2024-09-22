import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!
);

// Function to generate Google OAuth URL
export const getGoogleAuthURL = (): string => {
  const scopes = ['https://www.googleapis.com/auth/userinfo.email'];
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
  });
};

// Function to exchange authorization code for tokens
export const getGoogleTokens = async (code: string) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
};
