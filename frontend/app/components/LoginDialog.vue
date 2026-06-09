<template>
  <Button
    variant="outlined"
    severity="secondary"
    icon="pi pi-sign-in"
    aria-label="Sign in"
    @click="showLoginDialog = true"
  />

  <LazyDialog
    v-model:visible="showLoginDialog"
    :modal="true"
    class="w-md"
    closeOnEscape
    dismissableMask
    :showHeader="false"
  >
    <Tabs value="0">
      <TabList>
        <div class="">
          <Tab value="0">Sign in (code)</Tab>
          <Tab value="1">Sign in (email)</Tab>
          <Tab value="2">Sign up</Tab>
        </div>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <p class="m-0">to be added later</p>
        </TabPanel>
        <TabPanel value="1">
          <p class="m-0">to be added later</p>
        </TabPanel>
        <TabPanel value="2">
          <div class="flex flex-col gap-4 items-center">
            <p class="text-sm text-gray-500">Sign up with one click</p>
            <Button
              :icon="!!registerHash ? 'pi pi-check' : 'pi pi-user-plus'"
              :label="!!registerHash ? 'Sign up successful' : 'Sign up'"
              size="large"
              class="w-full"
              @click="register"
              :disabled="!!registerHash"
            />
                <div class="flex justify-between items-center w-full gap-2" v-if="registerHash">
              <Message
                severity="info"
                size="small"
                :closable="false"
                class="flex-1"
              >
                <p class="font-mono">{{ registerHash }}</p></Message
              >
              <Button
                icon="pi pi-copy"
                severity="info"
                variant="outlined"
                size="normal"
                class="cursor-pointer h-fit w-fit"
                @click="copyToClipboard(registerHash || '')"
              />
            </div>
            <Message
              severity="success"
              size="small"
              :closable="false"
              class="flex-1"
              v-if="registerHash"
              ><p class="font-mono">
                Save this code, you can use it to sign in later. Also, you now
                can set up your account's email and password to sign in using
                them instead of the code.
              </p></Message
            >
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </LazyDialog>

  <Toast group="login-dialog" />
</template>

<script setup lang="ts">
import { useAuth } from "../composables/useAuth";
import { useToast } from "primevue/usetoast";
const { add } = useToast();

const showLoginDialog = ref(false);

const registerHashCookie = ref<string | null>(useCookie("registerHash").value || null);

const registerHash = ref<string | null>(
  registerHashCookie.value || null,
);

const register = async () => {
  registerHash.value = await useAuth().register();
  if (registerHash.value) {
    registerHashCookie.value = registerHash.value;
  }
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  add({
    severity: "info",
    summary: "Copied to clipboard",
    life: 3000,
    group: "login-dialog",
  });
};
</script>
