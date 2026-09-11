import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nexusGreen: {
          DEFAULT: '#00A650',
          dark: '#008a42',
          light: '#e6f7ed',
        },
        nexusBlue: {
          DEFAULT: '#3483FA',
          dark: '#2968c8',
        },
        nexusYellow: '#FFE600',
        nexusGray: '#EBEBEB',
      },
    },
  },
  plugins: [],
};
export default config;
