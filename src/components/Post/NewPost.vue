<script setup>
import { CategoryRepository, PostRepository, UserRepository } from '../../repositories';

const state = reactive({
  users: [],
  categories: [],
  form: {
    categoryId: 'Please select a category', // mandatory field to create this resource
    content: '',
    title: '',
    userId: 'Please select an author', // mandatory field to create this resource
    submitted: false,
  },
});


onMounted(async () => {
  state.users = (await UserRepository.getAll()).data;
  state.categories = (await CategoryRepository.getAll()).data;
});

const submit = () => {
  // todo
  // add alert/popup to inform user that action is OK or not
  PostRepository.create(state.form);
  state.form.categoryId = 'Please select a category';
  state.form.content = '';
  state.form.title = '';
  state.form.userId = 'Please select an author'
}
</script>

<template>
  <div class="heading text-center text-2xl m-5 text-gray-800">
    New Post
  </div>
  <form
    class="editor mx-auto w-10/12 flex flex-col text-gray-800 bg-white rounded-lg shadow-md p-4 shadow-lg max-w-2xl"
    @submit.prevent="submit"
  >
    <input
      v-model="state.form.title"
      class="title bg-white rounded-lg shadow-md p-2 mb-4 outline-none"
      spellcheck="false"
      placeholder="Title"
      type="text"
    >
    <select
      v-model="state.form.userId"
      class="title bg-white rounded-lg shadow-md p-2 mb-4 outline-none"
      name="usernames"
    >
      <option
        value="Please select an author"
        selected
      >
        Please select an author
      </option>
      <option
        v-for="(user, index) in state.users"
        :key="index"
        :value="user.id"
      >
        {{ user.username }}
      </option>
    </select>
    <select
      v-model="state.form.categoryId"
      class="title bg-white rounded-lg shadow-md p-2 mb-4 outline-none"
      name="categories"
    >
      <option
        value="Please select a category"
        selected
      >
        Please select a category
      </option>
      <option
        v-for="(category, index) in state.categories"
        :key="index"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
    <textarea
      v-model="state.form.content"
      class="description bg-white rounded-lg shadow-md sec p-3 h-60 outline-none"
      spellcheck="false"
      placeholder="Describe everything about this post here"
    />
    <div class="buttons flex mt-4">
      <div class="btn hover:bg-white-700 border p-1 px-4 font-semibold cursor-pointer text-gray-500 rounded ml-auto">
        Cancel
      </div>
      <div
        class="btn bg-blue-500 hover:bg-blue-700 border p-1 px-4 font-semibold cursor-pointer text-white font-bold rounded ml-2"
        type="submit"
        @click="submit()"
      >
        Post
      </div>
    </div>
  </form>
</template>

<style scoped>
  body {
    background:white !important;
  }
</style>
