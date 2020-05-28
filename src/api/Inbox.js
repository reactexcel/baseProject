import axiosInstance from "./axiosInstance";

export const getInboxDrafts = api_token => {
  return axiosInstance.get(`/api/inbox/drafts?api_token=${api_token}`);
};

export const getInboxSaves = api_token => {
  return axiosInstance.get(`/api/inbox/saves?api_token=${api_token}`);
};

export const getInboxArhives = api_token => {
  return axiosInstance.get(`/api/inbox/archives?api_token=${api_token}`);
};
