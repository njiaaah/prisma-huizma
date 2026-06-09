export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: config.public.apiUrl as string,
    credentials: "include",
    async onResponseError({ response }) {
      console.log("❗ API Error:", response);
    },
  });

  return {
    provide: {
      api,
    },
  };
});
