// @unocss-include
<script setup lang="ts">
import { registerButton } from '../../src/button'
registerButton()
</script>

<template>
  <div class="flex gap-2 py4">
    <adw-button type="default">
      default
    </adw-button>
    <adw-button type="default" danger>
      default danger
    </adw-button>
    <adw-button type="default" disabled>
      default disabled
    </adw-button>
    <adw-button type="default" ghost>
      default ghost
    </adw-button>
    <adw-button type="default" shape="round">
      default round
    </adw-button>
    <adw-button type="default" shape="circle">
      default circle
    </adw-button>
  </div>

  <div flex="~ gap-2" py10>
    <adw-button type="primary">
      primary
    </adw-button>
    <adw-button type="primary" size="large">
      primary large
    </adw-button>
    <adw-button type="primary" size="small">
      primary small
    </adw-button>
    <adw-button type="primary" danger>
      primary danger
    </adw-button>
    <adw-button type="primary" disabled>
      primary disabled
    </adw-button>
    <adw-button type="primary" disabled ghost>
      primary ghost disabled
    </adw-button>
    <adw-button type="primary" ghost>
      primary ghost
    </adw-button>
    <adw-button type="primary" shape="round">
      primary round
    </adw-button>
    <adw-button type="primary" shape="circle">
      primary circle
    </adw-button>
  </div>

  <div flex="~ gap-2" py10>
    <adw-button type="dashed">
      dashed
    </adw-button>
    <adw-button type="dashed" size="large">
      dashed large
    </adw-button>
    <adw-button type="dashed" size="small">
      dashed small
    </adw-button>
    <adw-button type="dashed" danger>
      dashed danger
    </adw-button>
    <adw-button type="dashed" disabled>
      dashed disabled
    </adw-button>
    <adw-button type="dashed" disabled ghost>
      dashed ghost disabled
    </adw-button>
    <adw-button type="dashed" ghost>
      dashed ghost
    </adw-button>
    <adw-button type="dashed" shape="round">
      dashed round
    </adw-button>
    <adw-button type="dashed" shape="circle">
      dashed circle
    </adw-button>
  </div>

  <div flex="~ gap-2" py10>
    <adw-button type="link">
      link
    </adw-button>
    <adw-button type="link" size="large">
      link large
    </adw-button>
    <adw-button type="link" size="small">
      link small
    </adw-button>
    <adw-button type="link" danger>
      link danger
    </adw-button>
    <adw-button type="link" disabled>
      link disabled
    </adw-button>
    <adw-button type="link" disabled>
      link ghost disabled
    </adw-button>
    <adw-button type="link" ghost>
      link ghost
    </adw-button>
    <adw-button type="link" shape="round">
      link round
    </adw-button>
    <adw-button type="link" shape="circle">
      link circle
    </adw-button>
  </div>
  <div flex="~ gap-2" py10>
    <adw-button type="text">
      text
    </adw-button>
    <adw-button type="text" size="large">
      text large
    </adw-button>
    <adw-button type="text" size="small">
      text small
    </adw-button>
    <adw-button type="text" danger>
      text danger
    </adw-button>
    <adw-button type="text" disabled>
      text disabled
    </adw-button>
    <adw-button type="text" disabled ghost>
      text ghost disabled
    </adw-button>
    <adw-button type="text" ghost>
      text ghost
    </adw-button>
    <adw-button type="text" shape="round">
      text round
    </adw-button>
    <adw-button type="text" shape="circle">
      text circle
    </adw-button>
  </div>
</template>
