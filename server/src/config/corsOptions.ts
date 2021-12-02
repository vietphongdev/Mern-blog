import cors from "cors";

const whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:8000",
];

export const corsOptions: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: whitelist,
  preflightContinue: false,
};
