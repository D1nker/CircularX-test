import api from '../utils/api/api.js';

const resource = '/posts';
const params = '?_page=1&_limit=10';

export const PostRepository = {
  // we could use response to set the state with fresh data
  // but we're not using VueX or any State management here
    getAll() {
      return api.get(`${resource}${params}`);
    },
    getOne(id) {
        return api.get(`${resource}/${id}`);
    },
    getUserPosts(id) {
      return api.get(`/users/${id}${resource}`);
    },
    getCategoryPosts(id) {
      return api.get(`/categories/${id}${resource}`);
    },
    create(payload) {
        return api.post(`${resource}`, payload);
    },
    update(payload, id) {
        return api.put(`${resource}/${id}`, payload);
    },
    delete(id) {
        return api.delete(`${resource}/${id}`)
    },
};
