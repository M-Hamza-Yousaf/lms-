/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          dark: '#1E40AF',
        },
        secondary: '#F59E0B',
        bg: '#F9FAFB',
        textDark: '#111827',
        textLight: '#6B7280',
        border: '#E5E7EB',
        success: '#10B981',
        danger: '#EF4444',
      },
    },
  },
  plugins: [],
}