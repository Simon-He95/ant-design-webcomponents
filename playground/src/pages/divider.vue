<script setup lang="ts">
import { registerDivider } from '../../../src/divider'
registerDivider()
</script>

<template>
  <adw-divider />
  <adw-divider dashed />
  <adw-divider plain>
    Text
  </adw-divider>
  <adw-divider orientation="left" plain>
    Left Text
  </adw-divider>
  <adw-divider orientation="right" plain>
    Right Text
  </adw-divider>
</template>
