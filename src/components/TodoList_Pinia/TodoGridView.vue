<script setup>
import { watch, computed } from 'vue';
import Card from '../Card.vue';

console.log('Using Grid view ....');
const props = defineProps({
    todos: Array,
    showDone: Boolean
});

const filteredTodos = computed(() => {
    if (!props.todos) return [];
    return props.todos
        .filter(todo => todo !== undefined && todo !== null)
        .filter(todo => !todo.isDone || props.showDone);
});

// Debug todos prop when it changes
watch(() => props.todos, (newTodos) => {
  console.log('Todos updated in TodoGridView:', newTodos);
  // Log each todo item and index
  if (newTodos) {
    newTodos.forEach((todo, index) => {
      console.log('Todo at index', index, ':', todo);
    });
  }
}, { immediate: true });
defineEmits(['toggle-done', 'delete', 'update-text']);
</script>

<template>
    <div class="grid-view" v-if="filteredTodos && filteredTodos.length">
        <Card v-for="(todo, index) in filteredTodos" :key="todo.text" >
            <template #title>
                {{ todo.text }}
            </template>
            <template #default>
                <span :class="[todo.priority, {'completed': todo.isDone}]">
                    Priority: {{ todo.priority }}
                </span>
            </template>
            <template #actions>
                <button @click="$emit('toggle-done', index)">
                    {{ todo.isDone ? 'Undo' : 'Complete' }}
                </button>
                <button @click="$emit('delete', index)">Delete</button>
            </template>
        </Card>
    </div>
</template>

<style scoped>
.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}
.high { color: red; }
.medium { color: orange; }
.low { color: green; }
.completed { text-decoration: line-through; opacity: 0.6; }
button { margin-left: 10px; padding: 2px 5px; font-size: 12px; }
</style>