const _config = {
  PORT: process.env.PORT,
  ORIGIN: process.env.ORIGIN,
  MONGODB_URI: process.env.MONGODB_URI,
  DB_NAME: process.env.DB_NAME,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  NODE_ENV: process.env.NODE_ENV,
};

export const config = Object.freeze(_config);
