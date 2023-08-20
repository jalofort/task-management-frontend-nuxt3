// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   devtools: { enabled: true },
   ssr: false,
   app: {
      head: {
         title: "Tasks management",
         charset: "utf-8",
         viewport: "width=device-width, initial-scale=1",
         script: [{ src: "/main.js", tagPosition: "bodyClose" }],
      },
   },
   css: ["@/assets/css/style.css"],
   runtimeConfig: {
      public: {
         baseURL:
            process.env.NODE_ENV !== "production"
               ? process.env.DEV_BASE_URL
               : process.env.PRO_BASE_URL,
      },
   },
   postcss: {
      plugins: {
         tailwindcss: {},
         autoprefixer: {},
      },
   },
});
