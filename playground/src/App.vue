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
      <adw-link href="/divider" target="_self">
        divider
      </adw-link>
      <adw-link href="/title" target="_self">
        title
      </adw-link>
      <adw-link href="/row" target="_self">
        row
      </adw-link>
      <adw-link href="/layout" target="_self">
        layout
      </adw-link>
      <adw-link href="/card" target="_self">
        card
      </adw-link>
      <adw-link href="/switch" target="_self">
        switch
      </adw-link>
      <adw-link href="/checkbox" target="_self">
        checkbox
      </adw-link>
    </div>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <Footer />
  </main>
</template>
