<script setup lang="ts">
import { registerRow } from '../../../src/row'
import { registerCol } from '../../../src/col'
registerRow()
registerCol()
</script>

<template>
  <adw-row>
    <adw-col span="24" bg-blue:40>
      col
    </adw-col>
  </adw-row>
  <adw-row>
    <adw-col span="12" bg-blue>
      col-12
    </adw-col>
    <adw-col span="12" bg-blue:40>
      col-12
    </adw-col>
  </adw-row>
  <adw-row>
    <adw-col span="8" bg-blue>
      col-8
    </adw-col>
    <adw-col span="8" bg-blue:40>
      col-8
    </adw-col>
    <adw-col span="8" bg-blue>
      col-8
    </adw-col>
  </adw-row>
  <adw-row>
    <adw-col span="6" bg-blue:40>
      col-6
    </adw-col>
    <adw-col span="6" bg-blue>
      col-6
    </adw-col>
    <adw-col span="6" bg-blue:40>
      col-6
    </adw-col>
    <adw-col span="6" bg-blue>
      col-6
    </adw-col>
  </adw-row>
</template>

<style scoped></style>
