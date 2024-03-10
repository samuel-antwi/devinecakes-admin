// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "path";
export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxtjs/supabase", "@vueuse/nuxt", "nuxt-primevue"],
  devtools: { enabled: true },
  
  debug: true,
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: [],
    },
  },
  runtimeConfig: {
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    public: {
      NUXT_PUBLIC_SUPABASE_URL: process.env.SUPABASE_URL,
      NUXT_PUBLIC_SUPABASE_KEY: process.env.SUPABASE_KEY,
    },
  },
  css: ["@/assets/css/main.css"],
  colorMode: {
    preference: "light",
  },
  primevue: {
    options: {
      unstyled: true,
    },
    components: {
      include: [
        "DataTable",
        "Dropdown",
        "Menubar",
        "Toast",
        "TabView",
        "TabPanel",
        "Divider",
        "Accordion",
        "AccordionTab",
        "Dialog",
        "InputText",
        "FloatLabel",
      ],
    },
    importPT: { from: path.resolve(__dirname, "./presets/lara/") },
  },
});
