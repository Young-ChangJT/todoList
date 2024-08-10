<template>
    <div class="todo-title">
      <input     
        :checked="todo.complete"
        @change="changeComplete(todo.id)"
        type="checkbox"
        :id="todo.id"
      />
      <label :for="todo.id"> {{ todo.title }} </label>
      <button @click="deleteItem(todo.id)">刪除</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      todoProps: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {
        todo: JSON.parse(JSON.stringify(this.todoProps)),
      };
    },
    methods: {
      changeComplete(id) {
        this.$store.dispatch("toggleComplete", id);
      },
      deleteItem(id) {
        this.$store.dispatch("deleteItem", id);
      },
    },
  };
  </script>
  
  <style>
  .todo-title {
    display: flex;
    justify-content: space-between;
    border-radius: 16px;
    box-shadow: 5px 0 5px rgba(0, 0, 0, 0.5);
    width: 270px;
    padding: 1.5rem 0.8rem;
    margin-top: 0.3rem;
  }
  </style>