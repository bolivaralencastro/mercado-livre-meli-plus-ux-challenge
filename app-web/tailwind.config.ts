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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Mercado Livre Brand Colors
        'ml-yellow': '#FFE600',
        'ml-blue': '#3483FA',
        'ml-gray': {
          100: '#F5F5F5',
          200: '#EDEDED',
          300: '#999999',
          400: '#666666',
          900: '#333333',
        },
        // Estados
        'ml-success': '#00A650',
        'ml-error': '#F23D4F',
        'ml-warning': '#F8B01C',
      },
      fontFamily: {
        'andes': ['var(--andes-font-family)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
