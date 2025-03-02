<script setup>
defineProps({
    name: String,
    quantity: Number,
    bought: Boolean
});
defineEmits(['toggle-bought','delete' ]);
</script>

<template>
    <li :class="{ 'bought': bought }">
      {{ name }} (Qty: {{ quantity }})
      <button @click="$emit('toggle-bought')">
        {{ bought ? 'Unmark' : 'Mark Bought' }}
      </button>
      <button @click="$emit('delete')">Delete</button>
    </li>
  </template>

<style scoped>
.bought { text-decoration: line-through; opacity: 0.6; }
button { margin-left: 10px; padding: 2px 5px; font-size: 12px; }
</style>