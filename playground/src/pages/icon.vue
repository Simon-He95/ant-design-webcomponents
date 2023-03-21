<script setup lang="ts">
import { spinner } from '../../public/icons'
import { registerIcon } from '../../../src/icon'

registerIcon()
</script>

<template>
  <div flex="~ gap-2" py4>
    <adw-icon :component="spinner" spin />
  </div>
</template>
