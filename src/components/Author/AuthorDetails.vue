<script setup>
import { CategoryRepository, CommentRepository, PostRepository, UserRepository } from '../../repositories';

const props = defineProps({
  authorId: {
    type: String,
    required: true
  }
});

const state = reactive({
  posts: [],
  comments: [],
  user: {}
});

onMounted(async () => {
  state.posts = (await PostRepository.getUserPosts(props.authorId)).data;
  state.comments = (await CommentRepository.getUserComments(props.authorId)).data;
  state.user = (await UserRepository.getOne(props.authorId)).data;
  const categories = (await CategoryRepository.getUserCategories(props.authorId)).data;

  state.posts.map(async (post) => {
    const matchtingCategory = categories.filter((category) => post.categoryId === category.id);
    post.category = matchtingCategory[0]?.name;
    post.showComments = false;
  });

  state.comments.map(async (comment) => {
    const matchtingPost = state.posts.filter((post) => post.id === comment.postId);
    comment.post = matchtingPost[0]?.name;
  });
});
</script>

<template>
  <section id="profil">
    <div class="h-screen bg-gray-100 dark:bg-gray-800 flex flex-wrap items-center justify-center">
      <div class="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 bg-white shadow-lg transform duration-200 easy-in-out">
        <div class="flex justify-center px-5-mt-14">
          <img
            class="h-32 w-32 bg-white p-2 rounded-full mt-2"
            :src="state.user.avatar"
            alt="avatar"
          >
        </div>
        <div class=" ">
          <div class="text-center px-14">
            <h2 class="text-gray-800 text-3xl font-bold capitalize">
              {{ state.user.lastName }} {{ state.user.firstName }}
            </h2>
            <p class="text-gray-400 mt-2">
              @{{ state.user.username }}
            </p>
            <p class="mt-2 text-gray-600">
              {{ state.user.address?.house }} - {{ state.user.address?.street }} - {{ state.user.address?.city }} - {{ state.user.address?.zipcode }} - {{ state.user.address?.country }}
            </p>
          </div>
          <hr class="mt-6">
          <div class="flex bg-gray-50 ">
            <div class="text-center w-1/2 p-4 hover:bg-gray-100">
              <p><span class="font-semibold">{{ state.posts.length }} </span> Posts</p>
            </div>
            <div class="border" />
            <div class="text-center w-1/2 p-4 hover:bg-gray-100">
              <p> <span class="font-semibold">{{ state.comments.length }}</span> Comments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="posts-list">
    <h1 class="text-center text-2xl text-gray-700 font-bold mt-5">
      Post List
    </h1>
    <div
      v-for="post in state.posts"
      :key="post.id"
      class="flex justify-center mt-8"
    >
      <div class="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md">
        <div class="flex justify-between">
          <p class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500">
            {{ post.category }}
          </p>
        </div>
        <div class="mt-2">
          <h1 class="text-2xl text-gray-700 font-bold hover:text-gray-600 mt-5">
            {{ post.title }}
          </h1>
          <p class="mt-5 text-gray-600">
            {{ post.content }}
          </p>
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
            <span>{{ post.likes }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="comments-list">
    <div class="bg-gray-100">
      <h1 class="text-center text-2xl text-gray-700 font-bold mt-10">
        Comments List
      </h1>
      <div
        v-for="comment in state.comments"
        :key="comment.id"
        class="flex justify-center mt-8"
      >
        <div class="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md">
          <div class="mt-2">
            <h1 class="text-2xl text-gray-700 font-bold hover:text-gray-600 mt-5 hover:underline">
              <router-link :to="{ name: 'PostDetails', params: { postId: comment.id } }">
                Read Article
              </router-link>
            </h1>
            <p class="mt-5 text-gray-600">
              {{ comment.body }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
