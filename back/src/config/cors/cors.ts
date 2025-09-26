export const corsOption = {
  origin: process.env.CLIENT_ORIGIN,
  exposedHeaders: ["X-CSRF-TOKEN"],
  credentials: true,
}
