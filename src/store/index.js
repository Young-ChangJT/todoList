import { createStore } from 'vuex'

export default createStore({
  state: {
      todos: [
        {
          title: "Coding",
          complete: true,
          id: 1
        },
        {
          title: "Watch movie",
          complete: false,
          id: 2
        }
      ]
  },
  getters: {
      getTodos(state) {
        return state.todos;
      } 
  },
  mutations: {
      updateComplete(state, payload) {
        const target = state.todos.find((todo) => todo.id === payload.id);
        target.complete = !target.complete;
      },
      addItem(state, payload) {
        state.todos.push(payload.todo);
      },
      removeItem(state, payload) {
        const targetidx = state.todos.findIndex((todo) => todo.id === payload.id);
        state.todos.splice(targetidx, 1);
      }
  },
  actions: {
      toggleComplete(context, id) {
        this.commit("updateComplete", { id });
      },
      createItem(context, title) {
        const todo = {
          title,
          complete: false,
          id: new Date().getTime()
        };
    
        this.commit("addItem", { todo });
      },
      deleteItem(context, id) {
        this.commit("removeItem", { id });
      }   
  },
  modules: {
  }
})
