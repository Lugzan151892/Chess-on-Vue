<script setup>
import HeaderComponent from './components/header-component.vue';
import BoardComponent from './components/board-component.vue'
import ControlComponent from './components/control-component.vue';
</script>

<template>
  <HeaderComponent></HeaderComponent>
  <main class="main">
    <BoardComponent></BoardComponent>
    <ControlComponent></ControlComponent>
  </main>
</template>

<style scoped>
.main {
  display: flex;  
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 100px);
  align-items: center;
}
</style>
