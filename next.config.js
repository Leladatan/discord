/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals.push({
          "utf-8-validate": "commonjs utf-8-validate",
            butterutil: "commonjs bufferutil"
        });

        return config;
    },
    images: {
        domains: ["utfs.io", "img.clerk.com"]
    }
}

module.exports = nextConfig
