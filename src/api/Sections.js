import axiosInstance from "./axiosInstance";

export const getSections = id => {
	return axiosInstance.get(`api/posts/${id}/sections?api_token=${localStorage.getItem("api_token")}`).then(res => res.data);
};

export const getSectionsById = id => {
	return axiosInstance.get(`api/sections/${id}?api_token=${localStorage.getItem("api_token")}`).then(res => res.data);
};

export const postSections = data => {
	return axiosInstance.post(`api/sections?api_token=${localStorage.getItem("api_token")}`, data).then(res => res.data);
};

export const putSections = (id, data) => {
	return axiosInstance.put(`api/sections/${id}?api_token=${localStorage.getItem("api_token")}`, data).then(res => res.data);
};

export const deleteSections = id => {
	return axiosInstance.delete(`api/sections/${id}?api_token=${localStorage.getItem("api_token")}`).then(res => res.data);
};
