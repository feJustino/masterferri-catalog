export const BASIC_AUTH = Buffer.from(
  `${process.env.BLING_CLIENT_ID}:${process.env.BLING_CLIENT_SECRET}`
).toString('base64');
