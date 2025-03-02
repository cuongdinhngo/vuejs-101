<script setup>
defineProps({
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

const emit = defineEmits(['delete', 'toggle-done']);
</script>

<template>
    <li :class="[priority, {'completed': done}]" v-if="!done || showDone">
        Task: {{ text }}
        <button v-if="canDelete" @click="$emit('delete')">Delete</button>
        <button @click="$emit('toggleDone')">
            {{ done ? "Undo" : "Complete" }}
        </button>
    </li>
</template>

<style scoped>
.high { color: red; }
.medium { color: orange; }
.low { color: green; }
.completed { text-decoration: line-through; opacity: 0.6; }
</style>

