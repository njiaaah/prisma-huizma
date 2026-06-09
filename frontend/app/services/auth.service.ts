import { useNuxtApp } from "#app";

export const authService = {
  register: async (): Promise<string> =>
    useNuxtApp().$api<string>("/auth/register", { method: "POST", body: {} }),
};
