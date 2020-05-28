import axiosInstance from "./axiosInstance";

export const followUserApi = (user_id) => {
	return axiosInstance.post(`/api/follows/users/${user_id}?api_token=${localStorage.getItem("api_token")}`);
};

export const unFollowUserApi = (user_id) => {
	return axiosInstance.post(`/api/follows/users/${user_id}/unfollow?api_token=${localStorage.getItem("api_token")}`);
};
