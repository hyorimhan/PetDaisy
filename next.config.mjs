/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ldkycewtchhtokppnajz.supabase.co",
      },
    ],
  },
};

export default nextConfig;
