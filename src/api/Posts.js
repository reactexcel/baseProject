import axiosInstance from "./axiosInstance";

export const getPosts = () => {
	return axiosInstance.get(`api/posts?api_token=${localStorage.getItem("api_token")}`).then(res => res.data);
};

export const getPostsById = id => {
	return axiosInstance.get(`api/posts/${id}?api_token=${localStorage.getItem("api_token")}`);
};

export const postPosts = data => {
	return axiosInstance.post(`api/posts?api_token=${localStorage.getItem("api_token")}`, data).then(res => res.data);
};

export const putPosts = (id, data) => {
	return axiosInstance.put(`api/posts/${id}?api_token=${localStorage.getItem("api_token")}`, data)
};

export const deletePosts = id => {
	return axiosInstance.delete(`api/posts/${id}?api_token=${localStorage.getItem("api_token")}`).then(res => res.data);
};
