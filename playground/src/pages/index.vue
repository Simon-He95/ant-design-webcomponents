<script setup lang="ts">
import { registerButton } from '../../../src/button'
registerButton()

</script>

<template>
  <div flex="~ gap-2" py4>
    <adw-button type="default" >default</adw-button>
    <adw-button type="default" danger>default danger</adw-button>
    <adw-button type="default" disabled>default disabled</adw-button>
  </div>
  <div flex="~ gap-2" py4>
    <adw-button type="primary">primary</adw-button>
  <adw-button type="primary" danger>primary danger</adw-button>
  <adw-button type="primary" disabled>primary disabled</adw-button>
</div>

<div flex="~ gap-2" py4>
  <adw-button type="dashed">dashed</adw-button>
  <adw-button type="dashed" danger>dashed danger</adw-button>
  <adw-button type="dashed" disabled>dashed disabled</adw-button>
</div>

<div flex="~ gap-2" py4>
  <adw-button type="link">link</adw-button>
  <adw-button type="link" danger>link danger</adw-button>
  <adw-button type="link" disabled>link disabled</adw-button>
</div>
<div flex="~ gap-2" py4>
  <adw-button type="text">text</adw-button>
  <adw-button type="text" danger>text danger</adw-button>
  <adw-button type="text" disabled>text disabled</adw-button>
</div>

</template>
