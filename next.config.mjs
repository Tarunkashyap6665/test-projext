/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'res.cloudinary.com',
                port:''
            },
            {
                protocol:'https',
                hostname:'images.unsplash.com',
                port:''
            }
        ]
    }
};

export default nextConfig;
