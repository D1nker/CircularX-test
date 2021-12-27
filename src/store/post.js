import { defineStore, acceptHMRUpdate } from 'pinia'
import { PostRepository } from '../repositories/PostRepository';

export const usePostStore = defineStore({
  id: 'posts',
  state: () => ({
    posts:
      [{
        title: '',
        content: '',
        category: null,
        user: null,
        id: 1
      },
      {
        title: '',
        content: '',
        category: null,
        user: null,
        id: 2
      }]
  }),
  actions: {
    async post() {
      const response = (await PostRepository.create()).data;
      // const { title, content, category, user } = response;
      // could be done like this or using destructing
      this.$patch({
        ...response
      })
      // we could do other stuff like redirecting the user
    },
    async edit(payload, id) {
     // find the matching post in the state
     // update & return it to user
      const matchingPost = this.posts;
      console.log(matchingPost);
      await PostRepository.update(payload, id);
      //
      this.$patch({

      })
      // we could do other stuff like redirecting the user
    },
    async delete(postId) {
      await PostRepository.delete(postId);
      this.$patch({
        name: '',
        isAdmin: false,
      })
      // we could do other stuff like redirecting the user
    },
    test() {
      console.log(this);
      console.log(this.posts.find(p => p.id === 1))
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot))
}
