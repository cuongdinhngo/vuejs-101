<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import TodoItem from  './TodoItem.vue';
import { sharedState } from '../../store/sharedState';
import TodoItemList from './TodoItemList.vue';
import TodoGridView from './TodoGridView.vue';

const showDone = ref(false);
const newTodoText = ref('');
const newTodoPriority = ref('low');
const viewMode = ref('list');
const searchQuery = ref('');
const formErrors = ref({});
const isLoading = ref(true);

const views = {
    list: TodoItemList,
    grid: TodoGridView
};

onMounted(async () => {
    console.log('fetching todos');
    try {
        const todos = await sharedState.fetchTodos();
        sharedState.updateTodos(todos);
    } catch(error) {
        console.error('Failed to fetch todos:', error);
    } finally {
        isLoading.value = false;
    }
});

const addNewTodo = () => {
    formErrors.value = {};
    if (!newTodoText.value.trim()) {
        formErrors.value.text = 'Task text is required';
    } else if (newTodoText.value.length > 50) {
        formErrors.value.text = 'Task text must be 50 characters or less';
    }
    if (!newTodoPriority.value) {
        formErrors.value.priority = 'Please select a priority';
    }
    console.log(formErrors.value.text);
    if (newTodoText.value.trim()) {
        console.log('adding new todo ....');
        sharedState.todos.value.push({
            text: newTodoText.value.trim(),
            priority: newTodoPriority.value,
            isDone: false,
            canDelete: true
        });
        newTodoText.value = '';
        newTodoPriority.value = 'low'; 
    }
}

const deleteTodo = (index) => {
    console.log('deleting ...', index);
    sharedState.todos.value.splice(index, 1);
}

const toggleDone = (index) => {
    console.log('toggle Done ...', index);
    sharedState.todos.value[index].isDone = !sharedState.todos.value[index].isDone
}

const toggleViewMode = () => {
    console.log('toggling view mode');
    viewMode.value = viewMode.value === 'list' ? 'grid' : 'list';
};

const updateTodoText = (newText, index) => {
    console.log('updating todo at index', index, 'to text', newText);
    sharedState.todos.value[index].text = newText
}

const filteredTodos = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();
    if (!query) {
        return sharedState.todos.value || []
    }

    return sharedState.todos.value.filter((todo) => todo.text.toLowerCase().includes(query) );
});

const totalTasks = computed(() => sharedState.todos.value.length);
const doneCounts = computed(() => sharedState.todos.value.filter(todo => todo.isDone).length);
const todoCounts = computed(() => sharedState.todos.value.filter(todo => !todo.isDone).length);
</script>

<template>
    <h3>To-do List</h3>
    <button @click="showDone = !showDone">
        {{ showDone ? 'Hide' : 'Show' }} done tasks
    </button>
    <button @click="toggleViewMode">
        Switch to {{ viewMode === 'list' ? 'Grid' : 'List' }} View
    </button>
    <div class="search-bar">
      <input v-model="searchQuery" placeholder="Search todos..." />
    </div>
    <div>
        <p>Total tasks: {{ totalTasks }}</p>
        <p>Done: {{ doneCounts }} / Backlog: {{ todoCounts }}</p>
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
    <div v-if="isLoading" class="loading">Loading todos...</div>
    <component
        :is="views[viewMode]"
        :todos="filteredTodos"
        :show-done="showDone"
        @toggle-done="toggleDone"
        @delete="deleteTodo"
        @update-text="updateTodoText"
    />
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
</style>