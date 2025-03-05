<script setup>
import { sharedState } from './store/sharedState';
</script>

<template>
  <div class="app-container">
    <header>
      <h1>VueJS 101</h1>
      <p>Total counts: {{ sharedState.totalCount }} (Todos: {{ sharedState.todosCounts }}, Cart: {{ sharedState.itemCounts }})</p>
      <nav>
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/todo" class="nav-link">To-Do List</router-link>
        <router-link to="/cart" class="nav-link">Shopping Cart</router-link>
        <router-link to="/todo-pinia" class="nav-link">To-Do List by Pinia</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
header {
  text-align: center;
  margin-bottom: 30px;
}
nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}
.nav-link {
  text-decoration: none;
  font-size: 1.2rem;
  color: #42b983;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}
.nav-link:hover {
  background-color: #f0f0f0;
}
.router-link-active {
  font-weight: bold;
  background-color: #e0e0e0;
}
main {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
h1 {
  font-size: 2.5rem;
  color: #333;
}
</style>