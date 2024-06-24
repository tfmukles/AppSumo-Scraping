/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "appsumo2-cdn.appsumo.com",
        port: "",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
