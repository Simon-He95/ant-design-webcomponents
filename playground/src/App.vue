<script setup lang="ts">
import { registerButton } from '../../src/button'
import { registerLink } from '../../src/link'
registerButton()
registerLink()
</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <div flex="~ gap-2">
      <adw-link href="/button" target="_self">
        button
      </adw-link>
      <adw-link href="/icon" target="_self">
        icon
      </adw-link>
      <adw-link href="/text" target="_self">
        text
      </adw-link>
    </div>
    <router-view />
    <Footer />
  </main>
</template>
