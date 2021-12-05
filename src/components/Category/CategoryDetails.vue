<script setup>
import { CategoryRepository, PostRepository } from '../../repositories';

const props = defineProps({
  categoryId: {
    type: Number,
    required: true
  }
});

const state = reactive({
  postsByCategory: [],
  category: {}
});

onMounted(async () => {
  state.postsByCategory = (await PostRepository.getCategoryPosts(props.categoryId)).data;
  state.category = (await CategoryRepository.getOne(props.categoryId)).data;
});
</script>

<template>
  <div class="container mx-auto px-4 lg:pt-24 lg:pb-64">
    <div class="flex flex-wrap text-center justify-center">
      <div class="w-full lg:w-6/12 px-4">
        <h2 class="text-4xl font-semibold text-black">
          Posts by category
        </h2>
        <p class="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
          Welcome, you'll here find all posts related to {{ state.category.name }}
        </p>
      </div>
    </div>
    <div
      v-for="post in state.postsByCategory"
      :key="post.id"
      class="flex flex-wrap mt-12 justify-center"
    >
      <div class="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md">
        <h3 class="font-semibold text-black">
          <router-link :to="{ name: 'PostDetails', params: { postId: post.id } }">
            {{ post.id }} {{ post.title }}
          </router-link>
        </h3>
        <div class="flex justify-between items-center">
          <router-link
            :to="{ name: 'AuthorDetails', params: { authorId: post.userId } }"
            class="inline-block italic text-black capitalize"
          >
            {{ post.author }}
          </router-link>
          <router-link
            :to="{ name: 'CategoryDetails', params: { categoryId: post.categoryId } }"
            class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
          >
            {{ state.category.name }}
          </router-link>
        </div>
        <p class="mt-3">
          <router-link
            class="mt-3"
            :to="{ name: 'PostDetails', params: { postId: post.id } }"
          >
            {{ post.content }}
          </router-link>
        </p>
        <div class="mt-4 flex items-center">
          <div class="flex mr-2 text-gray-700 text-sm mr-3">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              class="w-4 h-4 mr-1"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>{{ post.likes }}</span>
          </div>
          <div class="flex mr-2 text-gray-700 text-sm mr-8">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              class="w-4 h-4 mr-1"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
            <span>{{ post.totalComment }}</span>
          </div>
        </div>
        <div
          id="action"
          class="space-x-4 mt-4 float-right"
        >
          <router-link
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            :to="{ name: 'EditPost', params: { postId: post.id, post: JSON.stringify(post) } }"
          >
            Edit
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
