<template>
  <div id="app">
    <h1>Todo List</h1>
    <todo-list 
      v-for="(todo, index) in todos" 
      :key="index" 
      :todo="todo" 
      @delete-todo="handleDeleteTodo" 
      @complete-todo="handleCompleteTodo" 
    />
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const todos = ref([
      { title: "Get dressed", isComplete: false },
      { title: "Buy food", isComplete: false },
      { title: "Eat lunch", isComplete: true },
      { title: "Write Article", isComplete: true }
    ]);

    function handleDeleteTodo(index) {
      todos.value.splice(index, 1);
    }

    function handleCompleteTodo(index) {
      todos.value[index].isComplete = !todos.value[index].isComplete;
    }

    return { todos, handleDeleteTodo, handleCompleteTodo };
  },

  components: {
    TodoList: {
      props: {
        todo: { type: Object, required: true }
      },
      emits: ['delete-todo', 'complete-todo'],
      template: `
        <div :class="[todo.isComplete ? 'success' : 'error', 'todo-wrapper']">
          <div class="todo-title">{{ todo.title }}</div>
          <div class="todo-icons">
            <i class="fa fa-check" aria-hidden="true" @click="$emit('complete-todo')"></i>
            <i class="fa fa-trash-alt" aria-hidden="true" @click="$emit('delete-todo')"></i>
          </div>
        </div>
      `
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.fa-trash-alt {
  color: red;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.fa-check {
  color: green;
  margin-right: 5px;
}

.todo-wrapper {
  display: flex;
  justify-content: space-between;
  border-radius: 16px;
  box-shadow: 5px 0 5px rgba(0, 0, 0, 0.5);
  width: 270px;
  padding: 1.5rem 0.8rem;
  margin-top: 0.3rem;
}

.todo-title {
  font-size: 18px;
  font-weight: bold;
}

.todo-icons {
  display: flex;
  cursor: pointer;
}

.success {
  border-left: 40px solid green;
}

.error {
  border-left: 40px solid red;
}
</style>