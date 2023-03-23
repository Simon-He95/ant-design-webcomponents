<script setup lang="ts">
import { registerLayout } from '../../../src/layout'
import { registerHeader } from '../../../src/header'
import { registerContent } from '../../../src/content'
import { registerFooter } from '../../../src/footer'
import { registerSider } from '../../../src/sider'
registerLayout()
registerHeader()
registerContent()
registerFooter()
registerSider()
</script>

<template>
  <adw-layout>
    <adw-header text-white bg="[rgb(125,188,234)]">
      headers
    </adw-header>
    <adw-content text-white bg="[rgb(16,142,233)]" lh="120px">
      content
    </adw-content>
    <adw-footer text-white bg="[rgb(125,188,234)]">
      footer
    </adw-footer>
  </adw-layout>

  <adw-layout mt4>
    <adw-header text-white bg="[rgb(125,188,234)]">
      headers
    </adw-header>
    <adw-layout>
      <adw-sider text-white bg="[rgb(59,160,233)]" lh-50>
        Sider
      </adw-sider>
      <adw-content text-white bg="[rgb(16,142,233)]" min-h-50 lh-50>
        Content
      </adw-content>
    </adw-layout>
    <adw-footer text-white bg="[rgb(125,188,234)]">
      footer
    </adw-footer>
  </adw-layout>

  <adw-layout mt4>
    <adw-header text-white bg="[rgb(125,188,234)]">
      headers
    </adw-header>
    <adw-layout>
      <adw-content text-white bg="[rgb(16,142,233)]" min-h-50 lh-50>
        Content
      </adw-content>
      <adw-sider text-white bg="[rgb(59,160,233)]" lh-50>
        Sider
      </adw-sider>
    </adw-layout>
    <adw-footer text-white bg="[rgb(125,188,234)]">
      footer
    </adw-footer>
  </adw-layout>

  <adw-layout mt4>
    <adw-sider
      text-white
      bg="[rgb(59,160,233)]"
      flex
      items-center
      justify-center
    >
      Sider
    </adw-sider>
    <adw-layout>
      <adw-header text-white bg="[rgb(125,188,234)]">
        headers
      </adw-header>
      <adw-content text-white bg="[rgb(16,142,233)]" min-h-50 lh-50>
        Content
      </adw-content>
      <adw-footer text-white bg="[rgb(125,188,234)]">
        footer
      </adw-footer>
    </adw-layout>
  </adw-layout>
</template>

<style scoped></style>
