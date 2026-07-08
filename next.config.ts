import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Immigration document services were removed for compliance (California
      // immigration-consultant registration + bond required separately from
      // the LDA registration). Permanently redirect the old URL to the
      // services index so any indexed link or ad click lands somewhere useful
      // instead of 404ing.
      {
        source: "/services/immigration-documents",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/es/services/immigration-documents",
        destination: "/es/services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
