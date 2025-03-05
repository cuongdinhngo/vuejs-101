<script setup>
import TodoItem from "./TodoItem.vue";

const props = defineProps({
    todos: Array,
    showDone: Boolean
});

console.log('TodoItemList', props);
</script>

<template>
    <TransitionGroup name="list" tag="ul">
        <TodoItem
            v-for="(todo, index) in todos"
            :key="todo.text"
            :index="index"
            :text="todo.text"
            :priority="todo.priority"
            :done="todo.isDone"
            :show-done="showDone"
            :can-delete="todo.canDelete ?? false"
        />
    </TransitionGroup>
</template>

<style scoped>
ul { list-style-type: none; padding: 0; }

/* List transition for todos */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from, .list-enter-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>