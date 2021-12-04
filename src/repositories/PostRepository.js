import api from '../utils/api/api.js';
const resource = '/posts';

export const PostRepository = {
    getPosts() {
      return api.get(`${resource}?_page=1&_limit=10`);
    },
    getPost(id) {
        return api.get(`${resource}/${id}`);
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
