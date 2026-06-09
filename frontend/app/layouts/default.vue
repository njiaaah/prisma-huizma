<template>
  <div class="min-h-screen flex flex-col">
    <header
      class="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 p-4"
    >
      <div class="content-wrap flex justify-between items-center">
        <Button
          variant="outlined"
          label="Logo here"
          severity="secondary"
          icon="pi pi-home"
          aria-label="Home"
        />
        <div>
          <LoginDialog />
        </div>
      </div>
    </header>

    <div class="flex-1">
      <aside class="content-wrap">
        <slot name="aside:left" />
      </aside>
      <main class="content-wrap">
        <slot />
      </main>
      <aside class="content-wrap">
        <slot name="aside:right" />
      </aside>
    </div>

    <footer>
      <div class="content-wrap">
        <slot name="footer" />
        <p class="text-sm text-gray-500">Copyright 2026 My App</p>
      </div>
    </footer>
  </div>
</template>
