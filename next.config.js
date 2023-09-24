/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,

    // async rewrites() {
    //     return [
    //         {
    //             source: 'api/google/oauth_return',
    //             destination: '/sign-in/googleLogin'
    //         }
    //     ]
    // }
}

module.exports = nextConfig
