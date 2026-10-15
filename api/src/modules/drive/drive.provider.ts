import { google } from 'googleapis';

export const DRIVE_CLIENT = 'DRIVE_CLIENT';

export const driveProvider = {
  provide: DRIVE_CLIENT,
  useFactory: () => {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
    });

    return google.drive({ version: 'v3', auth: oauth2Client });
  },
};
