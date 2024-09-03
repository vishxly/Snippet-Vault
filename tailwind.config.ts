import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        vault: "#abf62d",
        yellowish: "#fecd45",
        greyish: "#deb992",
        yellow1: "#fdee30",
        purple1: "#7d3780",
        purple2: "#9E81FE",
        white1: "#6C72B9",
        Black1: "#F3F3F3",
        smoky: "#100C08"
      },
    },
  },
};
export default config;
