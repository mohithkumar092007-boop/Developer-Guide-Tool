import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  GEMINI_MODEL: 'gemini-3.8-flash',
  NODE_ENV: process.env.NODE_ENV || 'development',
  APP_NAME: 'DevGuide AI',
  APP_VERSION: 'v1.4.2 Hackathon Edition',
};
