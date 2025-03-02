<script setup>
import { ref } from 'vue';
import TodoItem from  './TodoItem.vue';

const todos = ref([
    {text: 'Create a form', priority: 'high', isDone: true},
    {text: 'Coding a controller', priority: 'medium', isDone: false},
    {text: 'Write unit test', priority: 'low', isDone: false}
]);

const showDone = ref(false);
const newTodoText = ref('');
const newTodoPriority = ref('low');

const addNewTodo = () => {
    console.log('adding new todo ....');
    if (newTodoText.value.trim()) {
        todos.value.push({
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
    todos.value.splice(index, 1);
}

const toggleDone = (index) => {
    console.log('toggle Done ...', index);
    todos.value[index].isDone = !todos.value[index].isDone
}

</script>

<template>
    <h3>To-do List</h3>
    <button @click="showDone = !showDone">
        {{ showDone ? 'Hide' : 'Show' }} done tasks
    </button>
    <form @submit.prevent="addNewTodo">
        <input v-model="newTodoText" placeholder="Add new to-do" required/>
        <select v-model="newTodoPriority">
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
        </select>
        <button type="Submit">Add</button>
    </form>
    <ul>
        <TodoItem
            v-for="(todo, index) in todos"
            :key="todo.text"
            :text="todo.text"
            :priority="todo.priority"
            :done="todo.isDone"
            :show-done="showDone"
            :can-delete="todo.canDelete ?? false"
            @delete="deleteTodo(index)"
            @toggle-done="toggleDone(index)"
        />
    </ul>
</template>

<style scoped>
button { margin: 10px; padding: 5px 10px; }
ul { list-style-type: none; }
form { margin: 10px 0; }
input, select { padding: 5px; margin-right: 5px; }
</style>