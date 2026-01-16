import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${process.env.BACKEND_URL ?? 'http://localhost:4000'}/:path*`,
			},
		];
	},
};

export default nextConfig;
