import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/services", destination: "/", permanent: false },
      { source: "/services/:path*", destination: "/", permanent: false },
      { source: "/expertise", destination: "/", permanent: false },
      { source: "/expertise/:path*", destination: "/", permanent: false },
      { source: "/products", destination: "/#platform", permanent: false },
      { source: "/products/prequaliq-apps", destination: "/#platform", permanent: false },
      { source: "/products/prequaliq-app", destination: "/#platform", permanent: false },
      { source: "/products/enterprise-hub", destination: "https://erp.prequaliq.com", permanent: false },
      { source: "/products/erp-system", destination: "https://erp.prequaliq.com", permanent: false },
      { source: "/products/enterprise-platform", destination: "https://erp.prequaliq.com", permanent: false },
      { source: "/products/:path*", destination: "/", permanent: false },
      { source: "/team", destination: "/about", permanent: false },
    ];
  },
};

export default nextConfig;
