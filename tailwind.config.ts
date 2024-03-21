import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  darkMode: "class",
  content: ["presets/libs/**/*.{js,vue,ts}"],
  theme: {
    extend: {
      colors: {
        green: {
          50: "#EFFDF5",
          100: "#D9FBE8",
          200: "#B3F5D1",
          300: "#75EDAE",
          400: "#00DC82",
          500: "#00C16A",
          600: "#00A155",
          700: "#007F45",
          800: "#016538",
          900: "#0A5331",
          950: "#052e16",
        },
        indigo: {
          "50": "#faf4ff",
          "100": "#f3e6ff",
          "200": "#ead2ff",
          "300": "#d9aeff",
          "400": "#c27bff",
          "500": "#ab49ff",
          "600": "#9825f8",
          "700": "#8315db",
          "800": "#6f17b2",
          "900": "#5b148f",
          "950": "#4b0082",
        },
      },
    },
  },
};
