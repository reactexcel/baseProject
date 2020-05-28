import axiosInstance from "./axiosInstance";

export const getQA = () => {
	return axiosInstance.get(`api/questions?api_token=${localStorage.getItem("api_token")}`).then(res => res.data);
};

export const postQA = data => {
	return axiosInstance.post(`api/questions?api_token=${localStorage.getItem("api_token")}`, data);
};

export const putQA = (id, data) => {
	return axiosInstance.put(`api/questions/${id}?api_token=${localStorage.getItem("api_token")}`, data).then(res => res.data);
};

export const deleteQA = id => {
	return axiosInstance.delete(`api/questions/${id}?api_token=${localStorage.getItem("api_token")}`).then(res => res.data);
};

export const saveQaApi = id => {
	return axiosInstance.post(`api/questions/${id}/save?api_token=${localStorage.getItem("api_token")}`);
};

export const shareQaApi = id => {
	return axiosInstance.post(`api/questions/${id}/share?api_token=${localStorage.getItem("api_token")}`);
};
