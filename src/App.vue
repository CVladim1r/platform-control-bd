<template>
  <div id="app">
    <DatabaseManager />
  </div>
</template>

<script>
import DatabaseManager from './components/DatabaseManager.vue'

export default {
  name: 'App',
  components: {
    DatabaseManager
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
