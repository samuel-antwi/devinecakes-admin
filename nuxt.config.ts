// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "path";
export default defineNuxtConfig({
  ssr: false,
  modules: ["@nuxt/ui", "@nuxtjs/supabase", "@vueuse/nuxt", "nuxt-primevue"],
  devtools: { enabled: true },
  debug: true,
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_KEY,
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: [],
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
