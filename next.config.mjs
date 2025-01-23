/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		loader: "custom",
		loaderFile: "./imageloader.ts",
	},
};

export default nextConfig;

// images: {
// 	domains: ["image.tmdb.org"],
// },
