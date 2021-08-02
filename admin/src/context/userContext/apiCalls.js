import axios from "axios";
import {
  createUsersFailure,
  createUsersStart,
  createUserSuccess,
  deleteUsersFailure,
  deleteUsersStart,
  deleteUserSuccess,
  getUsersFailure,
  getUsersStart,
  getUserSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "./userAction";

//getUser
export const getUsers = async (dispatch) => {
  dispatch(getUsersStart);
  try {
    const res = await axios.get("/users", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

//delteUser
export const deleteUser = async (dispatch, id) => {
  dispatch(deleteUsersStart());
  try {
    await axios.delete(`/users/${id}`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUsersFailure());
  }
};

//create user

export const createUser = async (dispatch, user) => {
  dispatch(createUsersStart());
  try {
    const res = await axios.post("/auth/register", user);
    dispatch(createUserSuccess(res.data));
  } catch (err) {
    dispatch(createUsersFailure());
  }
};

//update user

export const updateUser = async (dispatch, user, id) => {
  dispatch(updateUserStart());
  try {
    const res = await axios.put(`/users/${id}`, user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};
