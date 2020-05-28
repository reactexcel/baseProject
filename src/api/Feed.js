import axiosInstance from "./axiosInstance";

export const getFeedDataApi = api_token => {
  return axiosInstance.get(`/api/feed?api_token=${api_token}`);
};

export const getFeedTimeLineApi = api_token => {
  return axiosInstance.get(`/api/feed/timeline?api_token=${api_token}`);
};

export const getFeedAggregaterApi = api_token => {
  return axiosInstance.get(`/api/feed/aggregated?api_token=${api_token}`);
};
