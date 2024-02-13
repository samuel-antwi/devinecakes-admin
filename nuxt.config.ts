// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "path";
export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxtjs/supabase", "@vueuse/nuxt", "nuxt-primevue"],
  devtools: { enabled: true },
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
    preference: "dark",
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
      ],
    },
    importPT: { from: path.resolve(__dirname, "./presets/lara/") },
  },
});
