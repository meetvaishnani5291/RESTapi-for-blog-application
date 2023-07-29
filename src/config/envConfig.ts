const config = {
  ENVIRONMENT: process.env.ENVIRONMENT || "devlopment",
  PORT: process.env.SERVER_PORT || 3002,
  HOST: process.env.SERVER_HOST || "localhost",
  DATABASE_HOST: process.env.DATABASE_HOST || "0.0.0.0",
  DATABASE_PORT: +process.env.DATABASE_PORT! || 27017,
  DATABASE_NAME: process.env.DATABASE_NAME || "blog-application-database4",
  JWT_SECRET: process.env.JWT_SECRET || "secret"
};
export default config;