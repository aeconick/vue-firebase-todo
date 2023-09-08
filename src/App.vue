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

    <div v-for="todo in todos" class="card mb-5" :class="{ 'has-background-success-light': todo.done }">
      <div class="card-content">
        <div class="content">

          <div class="columns is-mobile is-vcentered">
            <div class="column" :class="{ 'has-text-success line-through': todo.done }">
              {{ todo.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button @click="toggleDone(todo.id)" class="button" :class="todo.done ? 'is-success' : 'is-light'">
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
import { ref, onMounted } from 'vue';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';

const todosCollectionReff = collection(db, 'todos');

const todos = ref([]);

onMounted(() => {
  onSnapshot(todosCollectionReff, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done
      };
      fbTodos.push(todo);
    });
    todos.value = fbTodos;
  })
})

const newTodoContent = ref('');

const addTodo = () => {
  addDoc(todosCollectionReff, {
    content: newTodoContent.value,
    done: false
  });

  newTodoContent.value = '';
};

const deleteTodo = (id) => {
  deleteDoc(doc(todosCollectionReff, id));
};

const toggleDone = (id) => {
  const index = todos.value.findIndex(todo => todo.id === id);

  updateDoc(doc(todosCollectionReff, id), {
    done: !todos.value[index].done
  });
}

</script>

<style>
@import 'bulma/css/bulma.min.css';

.todo-app-container {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}

.line-through {
  text-decoration: line-through;
}
</style>