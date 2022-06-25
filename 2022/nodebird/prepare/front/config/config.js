const isProd = process.env.NODE_ENV === "production";

export const backUrl = isProd ? "http://15.164.50.126" : "http://localhost:80";