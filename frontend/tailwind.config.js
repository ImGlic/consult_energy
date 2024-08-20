/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      primary: 'arial ',
      secondary: 'Trebuchet MS',
      lancelot: 'Lancelot '
    },
    container: {
      padding: {
        DEFAULT: '15px'
      }
    },
    screens: {
      sm: '420px',
      md: '768px',
      lg: '960px',
      xl: '1200px'
    },
    extend: {
      colors: {
        primary: '#2563eb',
        accent: '#B809C3',
        white: '#fafafa'
      }
    }
  },
  plugins: [],
}

