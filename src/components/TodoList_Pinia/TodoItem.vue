<script setup>
import {ref, computed} from 'vue';
import Card from '../Card.vue';
import { useTodoStore } from '../../store/todoStore';

const todoStore = useTodoStore();

const props = defineProps({
    index: Number,
    text: String,
    priority: String,
    done: Boolean,
    showDone: Boolean,
    canDelete: {
        type: Boolean,
        default: false
    }
});

const isEditing = ref(false);
const editedText = ref(props.text);

const saveEdit = () => {
  if (editedText.value.trim()) {
    todoStore.updateTodoText(editedText.value.trim(), props.index)
    isEditing.value = false;
  }
};

const cancelEdit = () => {
  editedText.value = props.text;
  isEditing.value = false;
};

</script>

<template>
    <Card v-if="!done || showDone">
        <template #title>
            <span v-if="!isEditing">{{ text }}</span>
            <form v-else @submit.prevent="saveEdit">
                <input type="text" v-model="editedText" @keyup.escape="cancelEdit">
                <button type="submit">Save</button>
                <button type="button" @click="cancelEdit">Cancel</button>
            </form>
        </template>
        <template #default>
            <span :class="[priority, {'completed': done}]">
                Priority: {{ priority }}
            </span>
        </template>
        <template #actions>
            <button v-if="!isEditing" @click="isEditing = true">Edit</button>
            <button v-if="canDelete && !isEditing" @click="todoStore.deleteTodo(index)">Delete</button>
            <button v-if="!isEditing" @click="todoStore.toggleDone(index)">
                {{ done ? "Undo" : "Complete" }}
            </button>
        </template>
    </Card>
</template>

<style scoped>
.high { color: red; }
.medium { color: orange; }
.low { color: green; }
.completed { text-decoration: line-through; opacity: 0.6; }
button { margin-left: 10px; padding: 2px 5px; font-size: 12px; }
input { padding: 2px; margin-right: 5px; }
</style>

