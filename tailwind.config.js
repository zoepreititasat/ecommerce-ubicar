export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:              "#004d99",
        "primary-btn":        "#1565c0",
        surface:              "#f8f9fa",
        "surface-low":        "#f3f4f5",
        outline:              "#c2c6d4",
        "on-surface":         "#191c1d",
        "on-surface-variant": "#424752",
        muted:                "#727783",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}