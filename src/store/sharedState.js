import { ref, computed } from 'vue';

const fetchTodos = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { text: 'Learn Vue', priority: 'high', isDone: false, canDelete: true },
                { text: 'Build a project', priority: 'medium', isDone: true, canDelete: true },
                { text: 'Have fun', priority: 'low', isDone: false, canDelete: true }
            ]);
        }, 1000);
    });
};

export const sharedState = {
    todos: ref([]),
    todosCounts: computed(() => sharedState.todos.value.length),
    updateTodos(todos) {
        this.todos.value = todos;
    },

    itemList: ref([]),
    itemCounts: computed(() => sharedState.itemList.value.length),
    updateItemList(itemList) {
        this.itemList.value = itemList;
    },

    totalCount: computed(() => sharedState.todos.value.length + sharedState.itemList.value.length),
    fetchTodos
};