<template>
  <div class="body">
    <Nav class="noprint"/>
    <slot />
  </div>
</template>

<script lang="ts" setup>

</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 20px;
  padding: 20px;
  box-sizing: border-box;
}
@media print {
    .noprint {display:none;}
}
</style>