import { google } from 'googleapis';

export const DRIVE_CLIENT = 'DRIVE_CLIENT';

export const driveProvider = {
  provide: DRIVE_CLIENT,
  useFactory: () => {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    return google.drive({ version: 'v3', auth });
  },
};