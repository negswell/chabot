/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NODE_ENV == "development"
        ? "http://127.0.0.1:8000"
        : "https://chatbot.talent-labs.com",
  },
};

export default nextConfig;
