<script setup>
import { PostRepository } from '../repositories/PostRepository';
const posts = ref([]);

onMounted(async () => {
  const { data } = await PostRepository.getPosts();
  posts.value = data;
});
</script>

<template>
  <div
    id="menu"
    class="container mx-auto px-4 lg:pt-24 lg:pb-64"
  >
    <div class="flex flex-wrap text-center justify-center">
      <div class="w-full lg:w-6/12 px-4">
        <h2 class="text-4xl font-semibold text-black">Posts list</h2>
        <p class="text-lg leading-relaxed mt-4 mb-4 text-gray-500">Welcome, you'll here find our fresh content
        </p>
      </div>
    </div>
    <div
      class="flex flex-wrap mt-12 justify-center"
      v-for="post in posts"
      :key="post.id"
    >
      <div class="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-4">
        <div class="col-span-2 sm:col-span-1 xl:col-span-1">
          <img
            alt="..."
            src="https://picsum.photos/200"
            class="h-24 w-24 rounded mx-auto"
          />
        </div>
        <div class="col-span-2 sm:col-span-4 xl:col-span-4">
          <h3 class="font-semibold text-black">
           <router-link :to="{
            path: `/posts/${post.id}`,
            params: { postId: post.id }
           }"
            >{{ post.title }}
            </router-link>
            </h3>
          <p class="mt-3">
           <router-link :to="`/posts/${post.id}`"
            >{{ post.content }}
            </router-link>
          </p>
          <div class="space-x-4 mt-3">
            <p class="inline-block italic text-black">From: {{ post.userId }}</p>
            <p class="inline-block italic text-black">Likes: {{ post.likes }}</p>
            <p class="inline-block italic text-black">Commentaires: {{ post.hits }}</p>
            <p class="inline-block italic text-black">Category: {{ post.categoryId }}</p>
          </div>
          <div
            class="space-x-4 mt-3"
            id="action"
          >
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Edit
            </button>
          </div>
        </div>
        <div class="col-span-2 sm:col-span-1 xl:col-span-1 italic ">N°{{ post.id }}</div>
      </div>
    </div>
  </div>

</template>

<style scoped>
</style>
