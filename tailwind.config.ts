import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Paperozi"', 'sans-serif'],
                pretendard: ['"Pretendard"', 'sans-serif'],
                수퍼사이즈: ['"supersize-bk"', 'sans-serif'],
                cafe24: ['"Cafe24LovingU"', 'cursive'],
            },
        },
    },
    plugins: [],
};
export default config;
