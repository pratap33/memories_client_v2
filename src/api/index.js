// 'https://memoriesserver.azurewebsites.net/posts';
import axios from 'axios';

const API = axios.create({ baseURL: 'https://memoriesserverv1.azurewebsites.net' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}${searchQuery?.tags?.length ? `&tags=${searchQuery?.tags}`: ''}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const commentPost = (value,id) => API.post(`/posts/${id}/commentPost`, {value});
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);