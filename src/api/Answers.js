import axiosInstance from "./axiosInstance";

export const getAnswer = () => {
	return axiosInstance.get(`answers?api_token=${localStorage.getItem("api_token")}`).then(res => res.data);
};

export const postAnswer = data => {
	return axiosInstance.post(`/api/answers?api_token=${localStorage.getItem("api_token")}`, data).then(res => res.data);
};

export const putAnswer = (id, data) => {
	return axiosInstance.put(`answers/${id}?api_token=${localStorage.getItem("api_token")}`, data).then(res => res.data);
};

export const deleteAnswer = id => {
	return axiosInstance.delete(`answers/${id}?api_token=${localStorage.getItem("api_token")}`).then(res => res.data);
};
