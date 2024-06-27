/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NODE_ENV == "development"
        ? "http://127.0.0.1:8000"
        : "http://34.19.77.36",
  },
  async headers() {
    return [
      {
        // Define Content-Security-Policy header
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self' https: http: data: ;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
