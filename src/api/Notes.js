import axiosInstance from "./axiosInstance";

export const getNotes = id => {
  return axiosInstance
    .get(
      `api/sections/${id}/notes?api_token=${localStorage.getItem("api_token")}`
    )
    .then(res => res.data);
};

export const postNotes = data => {
  return axiosInstance
    .post(`api/notes?api_token=${localStorage.getItem("api_token")}`, data)
    .then(res => res.data);
};

export const putNotes = (id, data) => {
  return axiosInstance.put(
    `api/notes/${id}?api_token=${localStorage.getItem("api_token")}`,
    data
  );
};

export const deleteNotes = id => {
  return axiosInstance
    .delete(`api/notes/${id}?api_token=${localStorage.getItem("api_token")}`)
    .then(res => res.data);
};

export const saveNoteApi = id => {
  return axiosInstance.post(
    `api/notes/${id}/save?api_token=${localStorage.getItem("api_token")}`
  );
};

export const shareNote = id => {
  return axiosInstance.post(
    `api/notes/${id}/share?api_token=${localStorage.getItem("api_token")}`
  );
};
