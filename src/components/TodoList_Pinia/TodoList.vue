<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import TodoItemList from './TodoItemList.vue';
import TodoGridView from './TodoGridView.vue';
import { useTodoStore } from '../../store/todoStore';

const todoStore = useTodoStore();

const showDone = ref(false);
const newTodoText = ref('');
const newTodoPriority = ref('low');
const viewMode = ref('list');
const searchQuery = ref('');
const formErrors = ref({});

const views = {
    list: TodoItemList,
    grid: TodoGridView
};

onMounted(async () => {
    console.log('fetching todos');
    todoStore.fetchTodos();
    console.log('listing todos:', todoStore.filteredTodos())
});

// Debug todos prop when it changes
const toggleViewMode = () => {
    viewMode.value = viewMode.value === 'list' ? 'grid' : 'list';
    console.log('switch view:', viewMode.value);
}

const addNewTodo = () => {
    console.log('calling addNewTodo');
    todoStore.addTodo(newTodoText.value.trim(), newTodoPriority.value.trim());
}

watch(newTodoText, () => {
    console.log('New todo:', newTodoText.value);
});
</script>

<template>
    <h3>To-do List</h3>
    <button @click="showDone = !showDone">
        {{ showDone ? 'Hide' : 'Show' }} done tasks
    </button>
    <button @click="toggleViewMode">
        Switch to {{ viewMode === 'list' ? 'Grid' : 'List'}} View
    </button>
    <div class="search-bar">
      <input v-model="searchQuery" placeholder="Search todos..." />
    </div>
    <div>
        <p>Total tasks: {{ todoStore.totalTasks }}</p>
        <p>Done: {{ todoStore.completedTasks }} / Backlog: {{ todoStore.remainingTasks }}</p>
    </div>
    <form @submit.prevent="addNewTodo">
        <input v-model="newTodoText" placeholder="Add new to-do"/>
        <span v-if="formErrors.text">{{ formErrors.text }}</span>
        <select v-model="newTodoPriority">
            <option value="" disabled>Select priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
        </select>
        <span v-if="formErrors.priority">{{ formErrors.priority }}</span>
        <button type="Submit">Add</button>
    </form>
    <div v-if="todoStore.isLoading" class="loading">Loading todos...</div>
    <Transition name="fade" mode="out-in">
        <component
            :is="views[viewMode]"
            :todos="todoStore.filteredTodos()"
            :show-done="showDone"
        />
    </Transition>
</template>

<style scoped>
button { margin: 10px; padding: 5px 10px; }
ul { list-style-type: none; }
form { margin: 10px 0; }
input, select { padding: 5px; margin-right: 5px; }
.stats { margin: 10px 0; }
.controls { display: flex; gap: 10px; margin-bottom: 10px; }
.form-group { margin-bottom: 10px; }
.error { color: red; font-size: 0.9em; margin-left: 5px; }
.search-bar { margin: 10px 0; }
.loading { text-align: center; padding: 20px; font-size: 1.2em; color: #666; }
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>