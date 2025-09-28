export const corsOption = {
  origin: process.env.CLIENT_ORIGIN,
  allowedHeaders: ["X-CSRF-TOKEN", 'Content-Type', 'Authorization'],
  exposedHeaders: ["X-CSRF-TOKEN"],
  credentials: true,
}
