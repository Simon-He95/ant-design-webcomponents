<script setup lang="ts">
import { registerCard } from '../../../src/card'
registerCard()
const handler = (e) => {
  console.log('hi', e)
}
</script>

<template>
  <adw-card
    title="Card"
    size="small"
    extra="More"
    w-100
    @click-handler="handler"
  >
    <p>Card content</p>
    <p>Card content</p>
  </adw-card>
</template>
