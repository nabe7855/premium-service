import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {

    images: {
      
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '', // 明示的に空文字列でもOK
        pathname: '/**', 
      },
    ],
  },



  /* config options here */
  //webpack(config) {
  //  config.resolve.alias['@'] = path.resolve(__dirname, 'src');
  //  return config;
  //},
};

export default nextConfig;


