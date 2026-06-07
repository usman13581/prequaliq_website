import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/products/erp-system",
        destination: "/products/enterprise-hub",
        permanent: true,
      },
      {
        source: "/products/enterprise-platform",
        destination: "/products/enterprise-hub",
        permanent: true,
      },
      {
        source: "/products/prequaliq-app",
        destination: "/products/prequaliq-apps",
        permanent: true,
      },
      {
        source: "/products/ai-command-center",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/services/salesforce",
        destination: "/services/system-integration",
        permanent: true,
      },
      {
        source: "/services/oracle",
        destination: "/services/custom-software",
        permanent: true,
      },
      {
        source: "/services/ruby-on-rails",
        destination: "/services/web-and-mobile-apps",
        permanent: true,
      },
      {
        source: "/services/netsuite",
        destination: "/services/cloud-solutions",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
