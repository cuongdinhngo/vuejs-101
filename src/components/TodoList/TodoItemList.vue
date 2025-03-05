<script setup>
import TodoItem from "./TodoItem.vue";

const props = defineProps({
    todos: Array,
    showDone: Boolean
});

console.log('TodoItemList', props);

defineEmits(['toggle-done', 'delete', 'update-text']);
</script>

<template>
    <ul>
        <TodoItem
            v-for="(todo, index) in todos"
            :key="todo.text"
            :text="todo.text"
            :priority="todo.priority"
            :done="todo.isDone"
            :show-done="showDone"
            :can-delete="todo.canDelete ?? false"
            @delete="$emit('delete', index)"
            @toggle-done="$emit('toggle-done', index)"
            @update-text="console.log('Received update-text with $event:', $event); $emit('update-text', $event, index)"
        />
    </ul>
</template>