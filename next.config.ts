import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/residential",
        destination: "/services/residential-curtain-track-installation",
        permanent: true,
      },
      {
        source: "/commercial",
        destination: "/services/commercial-curtain-track-installation",
        permanent: true,
      },
      {
        source: "/gallery",
        destination: "/",
        permanent: true,
      },
      {
        source: "/admin",
        destination: "/",
        permanent: false,
      },
      {
        source: "/customer",
        destination: "/",
        permanent: false,
      },
      {
        source: "/installer",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
