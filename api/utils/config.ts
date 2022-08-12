import { config } from 'dotenv';

config();

export const ENV: ENV = process.env as ENV;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
type ENV = {
  MIDJOURNEY_KEY: string;
};
