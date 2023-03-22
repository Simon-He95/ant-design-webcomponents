<script setup lang="ts">
import { registerText } from '../../../src/text'
import { registerLink } from '../../../src/link'

registerText()
registerLink()
</script>

<template>
  <div flex gap-2 py4 flex-col>
    <adw-text>Ant Design (default)</adw-text>
    <adw-text type="secondary">
      Ant Design (secondary)
    </adw-text>
    <adw-text type="success">
      Ant Design (success)
    </adw-text>
    <adw-text type="warning">
      Ant Design (warning)
    </adw-text>
    <adw-text type="danger">
      Ant Design (danger)
    </adw-text>
    <adw-text disabled>
      Ant Design (disabled)
    </adw-text>
    <adw-text mark>
      Ant Design (mark)
    </adw-text>
    <adw-text code>
      Ant Design (code)
    </adw-text>
    <adw-text keyboard>
      Ant Design (keyboard)
    </adw-text>
    <adw-text underline>
      Ant Design (underline)
    </adw-text>
    <adw-text delete>
      Ant Design (delete)
    </adw-text>
    <adw-text strong>
      Ant Design (strong)
    </adw-text>
    <adw-text italic>
      Ant Design (italic)
    </adw-text>
    <adw-link> Ant Design (Link) </adw-link>
  </div>
</template>
