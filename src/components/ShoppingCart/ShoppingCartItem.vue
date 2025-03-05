<script setup>
import Card from '../Card.vue';
defineProps({
    name: String,
    quantity: Number,
    bought: Boolean
});
defineEmits(['toggle-bought','delete' ]);
</script>

<template>
    <Card>
      <template #title>
        <span :class="{ 'bought': bought }">
          {{ name }}
        </span>
      </template>
      <template #body>
        Qty: {{ quantity }}
      </template>
      <template #actions>
        <button @click="$emit('toggle-bought')">
        {{ bought ? 'Unmark' : 'Mark Bought' }}
        </button>
        <button @click="$emit('delete')">Delete</button>
      </template>
    </Card>
  </template>

<style scoped>
.bought { text-decoration: line-through; opacity: 0.6; }
button { margin-left: 10px; padding: 2px 5px; font-size: 12px; }
</style>