<template>
  <div>
    <h1 class="text-2xl font-bold">Home</h1>
    <Button @click="() => refresh()">Refresh</Button>
    <pre>{{ users }}</pre>
  </div>
</template>

<script setup lang="ts">
const { data: users, refresh } = await $api<User[]>('/users');
</script>