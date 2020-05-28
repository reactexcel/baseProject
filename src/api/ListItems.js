import axiosInstance from "./axiosInstance";

export const getList = id => {
	return axiosInstance.get(`api/lists/${id}/items?api_token=${localStorage.getItem("api_token")}`).then(res => res.data);
};

export const postList = data => {
	return axiosInstance.post(`api/list-items?api_token=${localStorage.getItem("api_token")}`, data).then(res => res.data);
};

export const putListItems = (id, data) => {
	return axiosInstance.put(`api/list-items/${id}?api_token=${localStorage.getItem("api_token")}`, data);
};

export const deleteList = id => {
	return axiosInstance.delete(`api/list-items/${id}?api_token=${localStorage.getItem("api_token")}`).then(res => res.data);
};

export const postListItems = data => {
	return axiosInstance.post(`api/list-items?api_token=${localStorage.getItem("api_token")}`, data).then(res => res.data);
};