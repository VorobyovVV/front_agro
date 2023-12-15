<template>

    <q-header reveal elevated class="bg-brand text-dark">
      <q-toolbar>
        <q-toolbar-title class="custom-title" style="padding-left: 20px;">
          {{ title }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

</template>

<script>
export default {
name: 'TitleInfo',
props: {
    title: {
      type: String,
      default: 'Default Title'
    }
}
}
</script>

<style>
.bg-brand {
  background-color: #D9D9D9 !important;
  height: 100px !important;
}
.custom-title{
  font-size: 64px !important;
}
</style>