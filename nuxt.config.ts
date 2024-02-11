// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "path";
export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@vueuse/nuxt", "nuxt-primevue", "nuxt-directus"],
  devtools: { enabled: true },
  debug: true,
  // supabase: {
  //   redirectOptions: {
  //     login: "/login",
  //     callback: "/confirm",
  //     exclude: [],
  //   },
  // },
  runtimeConfig: {
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    directus: {
      url: process.env.NUXT_PUBLIC_DIRECTUS_URL,
      autoFetch: true,
      autoRefresh: true,
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
      include: ["DataTable", "Dropdown", "Menubar"],
    },
    importPT: { from: path.resolve(__dirname, "./presets/lara/") },
  },
});
