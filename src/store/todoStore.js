import {defineStore} from 'pinia';

export const useTodoStore = defineStore('todo', {
    state: () => ({
        todos: [],
        isLoading: false
    }),
    getters: {
        todosCount: (state) => state.todos.length,
        filteredTodos: (state) => (query) => {
            console.log('filtering todos ...', query);
            if(!query) return state.todos;
            return state.todos.filter(todo =>
                todo.text.toLowerCase().includes(query.toLowerCase().trim())
            );
        },
        totalTasks: (state) => state.todos.length,
        completedTasks: (state) => state.todos.filter(todo => todo.isDone).length,
        remainingTasks: (state) => state.todos.filter(todo => !todo.isDone).length
    },
    actions: {
        async fetchTodos() {
            console.log('todoStore: fetching todos');
            this.isLoading = true;
            try {
                const response = await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve([
                            { text: 'Learn Vue', priority: 'high', isDone: false, canDelete: true },
                            { text: 'Build a project', priority: 'medium', isDone: true, canDelete: true },
                            { text: 'Have fun', priority: 'low', isDone: false, canDelete: true }
                        ]);
                    }, 1000);
                });
                this.todos = response;
            } catch (error) {
                console.error('Faield to fetch todos:', error);
            } finally {
                this.isLoading = false;
            }
            console.log('todos are:', this.todos);
        },
        addTodo(text, priority) {
            console.log('add new todo');
            this.todos.push({
                text,
                priority,
                isDone: false,
                canDelete: true
            });
        },
        deleteTodo(index) {
            this.todos.splice(index, 1);
        },
        toggleDone(index) {
            console.log('toggle Done');
            this.todos[index].isDone = !this.todos[index].isDone;
        },
        updateTodoText(newText, index) {
            console.log('updating TodoText', index);
            console.log(this.todos[index]);
            this.todos[index].text = newText;
        }
    }
});