<script setup>
import { CategoryRepository, CommentRepository, PostRepository, UserRepository } from '../../repositories';

const props = defineProps({
  postId: {
    type: String,
    required: true
  }
});

const state = reactive({
  post: [],
  user: [],
  category: [],
  showComments: false
});

const randomDate = () => {
  return new Date(new Date(2019, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2019, 0, 1).getTime()));
};

onMounted(async () => {
  state.post = (await PostRepository.getOne(props.postId)).data;
  state.post.comments = (await CommentRepository.getPostComments(props.postId)).data;
  state.user = (await UserRepository.getOne(state.post.userId)).data;
  state.category = (await CategoryRepository.getOne(state.post.categoryId)).data;
});
</script>

<template>
  <div class="flex justify-center mt-8">
    <div class="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md">
      <div class="flex justify-between items-center">
        <span class="font-light text-gray-600">{{ randomDate().toDateString() }}</span>
        <p class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500">
          {{ state.category?.name }}
        </p>
      </div>
      <div class="mt-2">
        <h1 class="text-2xl text-gray-700 font-bold hover:text-gray-600 mt-5">
          {{ state.post?.title }}
        </h1>
        <p class="mt-5 text-gray-600">
          {{ state.post?.content }}
        </p>
      </div>
      <div class="flex justify-between items-center mt-5">
        <a
          class="text-blue-600 hover:underline"
          href="#"
          @click="state.showComments = !state.showComments"
        >Display Comments</a>
        <div>
          <a
            class="flex items-center"
            href="#"
          >
            <img
              class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
              :src="state.user?.avatar"
              alt="avatar"
            >
            <h1 class="text-gray-700 font-bold">{{ state.user?.username }}</h1>
          </a>
        </div>
      </div>
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
          <span>{{ state.post?.likes }}</span>
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
          <span>{{ state.post?.comments?.length }}</span>
        </div>
      </div>
    </div>
  </div>
  <div
    v-for="comment in state.post.comments"
    :key="comment.id"
    class="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-5 max-w-md md:max-w-2xl"
  >
    <div
      v-if="state.showComments"
      class="flex items-start px-4 py-6"
    >
      <div class="">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900 -mt-1">
            {{ state.comment?.body }}
          </h2>
        </div>
        <div class="mt-3">
          <p class="text-gray-700">
            {{ comment.body }}
          </p>
          <p class="mt-3 text-gray-700 text-sm" />
        </div>
        <div class="mt-4 flex items-center float-right">
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
            <span>{{ comment.likes }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
