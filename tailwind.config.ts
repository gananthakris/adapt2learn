import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#101418",
        paper: "#f6f4ef",
        ember: "#f5623d",
        moss: "#3f7d58",
        sky: "#1885c9"
      }
    }
  },
  plugins: []
};

export default config;
