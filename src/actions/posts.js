import * as api from '../api';
import {FETCH_ALL, FETCH_POST, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, COMMENT} from '../constants/actionTypes';

//Action Creators
export const getPosts = (page) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING})
		const { data } = await api.fetchPosts(page);
		dispatch({ type: FETCH_ALL, payload: data });
		dispatch({ type: END_LOADING})
	} catch (error) {
		console.log('FETCH_ALL : ', error.message);
	}
};

export const getPost = (id) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING})
		const { data } = await api.fetchPost(id);
		dispatch({ type: FETCH_POST, payload: data });
		dispatch({ type: END_LOADING})
	} catch (error) {
		console.log('FETCH_POST : ', error.message);
	}
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING})
		const { data :{data}} = await api.fetchPostsBySearch(searchQuery);
		dispatch({ type: FETCH_BY_SEARCH, payload: data });
		dispatch({ type: END_LOADING})
	} catch (error) {
		console.log('FETCH_BY_SEARCH : ', error.message);
	}
};

export const createPost = (post, history) => async (dispatch) => {
	try {
		const { data } = await api.createPost(post);
		dispatch({ type: CREATE, payload: data });
		history(`/posts/${data._id}`)
	} catch (error) {
		console.log('CREATE : ', error.message);
	}
};

export const updatePost = (id , post) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, post);
		dispatch({ type: UPDATE, payload: data });
	} catch (error) {
		console.log('UPDATE : ', error.message);
	}
};

export const deletePost = (id) => async (dispatch) => {
	try {
		await api.deletePost(id);
		dispatch({ type: DELETE, payload: id });
	} catch (error) {
		console.log('DELETE : ', error.message);
	}
};

export const likePost = (id) => async (dispatch) => {
	try {
		const { data } = await api.likePost(id);
		dispatch({ type: UPDATE, payload: data });
	} catch (error) {
		console.log('LIKE : ', error.message);
	}
};


export const commentPost = (value,id) => async (dispatch) => {
	try {
		const {data} = await api.commentPost(value,id);
		dispatch({ type: COMMENT, payload: data });
		return data?.comments ?? [];
	} catch (error) {
		console.log('COMMENT : ', error.message);
	}
};