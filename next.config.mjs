/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains:['utfs.io'],
        remotePatterns : [
         {
          protocol : "https",
          hostname : "**",
         },
        ],
       },
       
};

export default nextConfig;
