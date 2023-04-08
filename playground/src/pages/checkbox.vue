<script setup lang="ts">
import { registerCheckbox } from '../../../src/checkbox'
registerCheckbox()

const checked = ref(false)
const handler = () => {
  console.log('22')
  checked.value = !checked.value
}
</script>

<template>
  <div flex gap-5 mt8>
    <adw-checkbox :checked="checked" @click-handler="handler">
      checkbox
    </adw-checkbox>
    <adw-checkbox :checked="checked" disabled @click-handler="handler">
      disabled
    </adw-checkbox>
  </div>
</template>
