<script setup lang="ts">
import { registerCard } from '../../../src/card'
import { registerMeta } from '../../../src/meta'
registerCard()
registerMeta()
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

  <adw-card
    mt4
    title="Card"
    extra="More"
    w-60
    cover="<img alt=&quot;example&quot; src=&quot;https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png&quot; />"
    @click-handler="handler"
  >
    <adw-meta title="Europe Street beat" description="www.instagram.com" />
  </adw-card>
</template>
