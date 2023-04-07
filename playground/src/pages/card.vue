<script setup lang="ts">
import { registerCard } from '../../../src/card'
import { registerMeta } from '../../../src/meta'
import {
  editOutlined,
  ellipsisOutlined,
  settingOutlined,
} from '../../public/icons'
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

  <adw-card
    style="width: 300px"
    cover="<img alt='example' src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' />"
    :actions="[settingOutlined, editOutlined, ellipsisOutlined]"
    @click-handler="handler"
  >
    <adw-meta
      avatar="<Avatar src='https://joesch.moe/api/v1/random' />"
      title="Card title"
      description="This is the description"
    />
  </adw-card>
</template>
