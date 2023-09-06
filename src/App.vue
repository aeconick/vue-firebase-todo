<template>
  <div class="todo-app-container">

    <div class="title has-text-centered">
      Vue Firebase Todo App
    </div>

    <form @submit.prevent="addTodo">
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input v-model="newTodoContent" class="input" type="text" placeholder="Add a todo">
        </p>
        <p class="control">
          <button :disabled="!newTodoContent" class="button is-info">
            Add
          </button>
        </p>
      </div>
    </form>

    <div v-for="todo in todos" class="card mb-5">
      <div class="card-content">
        <div class="content">

          <div class="columns is-mobile is-vcentered">
            <div class="column">
              {{ todo.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button class="button is-light">
                &check;
              </button>
              <button @click="deleteTodo(todo.id)" class="button is-danger ml-2">
                &cross;
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const todos = ref([
  {
    id: '1',
    content: 'Feed the dog',
    done: false,
  },
  {
    id: '2',
    content: 'Feed the cat',
    done: false,
  }
]);

const newTodoContent = ref('');

const addTodo = () => {
  const newTodo = {
    id: uuidv4(),
    content: newTodoContent.value,
    done: false,
  }
  todos.value.unshift(newTodo);
  newTodoContent.value = '';
};

const deleteTodo = (id) => {
  todos.value = todos.value.filter(todo => todo.id !== id);
};

</script>

<style>
@import 'bulma/css/bulma.min.css';

.todo-app-container {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
</style>