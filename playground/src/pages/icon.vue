<script setup lang="ts">
import {
  homeOutlined,
  loadingOutlined,
  settingFilled,
  smileOutlined,
  syncOutlined,
} from '../../public/icons'
import { registerIcon } from '../../../src/icon'

registerIcon()
</script>

<template>
  <div flex="~ gap-2" py4>
    <adw-icon :component="homeOutlined" />
    <adw-icon :component="settingFilled" />
    <adw-icon :component="smileOutlined" style="color: green" />
    <adw-icon :component="syncOutlined" spin />
    <adw-icon :component="smileOutlined" rotate="180" />
    <adw-icon :component="loadingOutlined" spin />
  </div>
</template>
