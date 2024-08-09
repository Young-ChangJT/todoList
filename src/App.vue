<template>
  <div id="app">
    <div class="container">
      <label for="inputTodo">請輸入待辦事項：</label>
      <input v-model.trim="inputItem" id="inputTodo" type="text"/>
      <button @click="createItem" type="button">加入</button>
      <div class="inputs">
        <input type="radio" id="all" value="all" v-model="todoStatus" />
        <label for="all">All</label>
        <input
          type="radio"
          id="complete"
          value="complete"
          v-model="todoStatus"
        />
        <label for="complete">Complete</label>
        <input
          type="radio"
          id="incomplete"
          value="incomplete"
          v-model="todoStatus"
        />
        <label for="incomplete">Incomplete</label>
      </div>
      <TodoCard
        :todoProps="todo"
        v-for="todo in todos"
        :key="todo.id"
      ></TodoCard>
    </div>
  </div>
</template>

<script>
import TodoCard from "@/components/TodoCard.vue";
import { mapGetters } from "vuex";

export default {
  components: { TodoCard },
  data() {
    return {
      todoStatus: "all",
      inputItem: "",
    };
  },
  computed: {
    ...mapGetters({ allTodos: "getTodos", note: "Note/getNote" }),
    todos() {
      let result;
      switch (this.todoStatus) {
        case "all":
          result = this.allTodos;
          break;
        case "complete":
          result = this.allTodos.filter((todo) => todo.complete);
          break;
        case "incomplete":
          result = this.allTodos.filter((todo) => !todo.complete);
          break;
        // no default
      }
      return result;
    },
  },
  methods: {
    createItem() {
      this.$store.dispatch("createItem", this.inputItem);
      this.inputItem = "";
    },
  },
};
</script>
<style lang="scss">
.inputs {
  margin-bottom: 30px;
}
.container {
  width: 500px;
  margin: 0 auto;
}
</style>
