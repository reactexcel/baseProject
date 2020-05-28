import axiosInstance from "./axiosInstance";

export const getList = () => {
	return axiosInstance.get("api/lists").then(res => res.data);
};

export const postList = data => {
	console.log("data", data)
	return axiosInstance.post(`api/lists?api_token=${localStorage.getItem("api_token")}`, data).then(res => res.data);
};

export const putList = (id, data) => {
	return axiosInstance.put(`api/lists/${id}?api_token=${localStorage.getItem("api_token")}`, data);
};

export const deleteList = id => {
	return axiosInstance.delete(`api/lists/${id}?api_token=${localStorage.getItem("api_token")}`).then(res => res.data);
};

export const shareList = id => {
	return axiosInstance.post(`api/lists/${id}/share?api_token=${localStorage.getItem("api_token")}`);
};

export const saveListApi = id => {
	return axiosInstance.post(`api/lists/${id}/save?api_token=${localStorage.getItem("api_token")}`);
};

export const archiveList = id => {
	return axiosInstance.post(`api/lists/${id}/archive?api_token=${localStorage.getItem("api_token")}`);
};



