<script setup lang="ts">
import { registerSwitch } from '../../../src/switch'
registerSwitch()
const checked = ref(false)
const handler = () => {
  checked.value = !checked.value
}
</script>

<template>
  <adw-switch :checked="checked" @on-change="handler" />
</template>
