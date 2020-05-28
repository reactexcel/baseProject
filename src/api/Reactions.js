import axiosInstance from "./axiosInstance";

export const postUpvote = (api_token, activity_id) => {
	return axiosInstance.post(`api/reactions/upvote?api_token=${api_token}&activity_id=${activity_id}`);
};