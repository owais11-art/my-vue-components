<script lang="ts" setup>
  import { RouterView } from 'vue-router'
  import Header from './components/Header.vue'
  import Sidebar from './components/Sidebar.vue'
</script>
<template>
  <Header />
  <div class="container">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="view">
      <router-view />
    </div>
  </div>
</template>
<style scoped>
  .container{
    display: flex;
    align-items: stretch;
    & .sidebar{
      flex-basis: 20%;
      border-right: 1.6px solid var(--color-light);
      padding: 10px 0;
    }
    & .view{
      flex-basis: 80%;
    }
  }
</style>