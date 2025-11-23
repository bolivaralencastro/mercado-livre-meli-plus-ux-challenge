/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "http2.mlstatic.com",
        pathname:
          "/frontend-assets/ml-web-navigation/ui-navigation/**",
      },
      {
        protocol: "https",
        hostname: "meli-cases.example.com",
        pathname: "/pesquisa/Mercado-Livre-Behance/**",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;