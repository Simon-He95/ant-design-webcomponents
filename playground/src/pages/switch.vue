<script setup lang="ts">
import { registerSwitch } from '../../../src/switch'
registerSwitch()
const checked1 = ref(false)
const checked2 = ref(true)
const handler1 = () => {
  checked1.value = !checked1.value
}
const handler2 = () => {
  console.log('hi')
}
</script>

<template>
  <adw-switch :checked="checked1" @on-change="handler1" />
  <adw-switch :checked="checked2" disabled @on-change="handler2" />
</template>
