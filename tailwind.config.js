module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // Blue
        secondary: "#4b5563", // Gray
        accent: "#f59e0b", // Amber
        light: "#f3f4f6", // Light gray
        dark: "#1f2937", // Dark gray
        success: "#10b981", // Green
        warning: "#f59e0b", // Amber
        error: "#ef4444", // Red
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Montserrat", "sans-serif"],
      },
      spacing: {
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
