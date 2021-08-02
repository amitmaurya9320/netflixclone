//get users

export const getUsersStart = () => {
  return {
    type: "GET_USERS_START",
  };
};

export const getUserSuccess = (users) => {
  return {
    type: "GET_USERS_SUCCESS",
    payload: users,
  };
};

export const getUsersFailure = () => {
  return {
    type: "GET_USERS_FAILURE",
  };
};

//delete users

export const deleteUsersStart = () => {
  return {
    type: "DELETE_USER_START",
  };
};

export const deleteUserSuccess = (id) => {
  return {
    type: "DELETE_USER_SUCCESS",
    payload: id,
  };
};

export const deleteUsersFailure = () => {
  return {
    type: "DELETE_USER_FAILURE",
  };
};

//create User

export const createUsersStart = () => {
  return {
    type: "CREATE_USER_START",
  };
};

export const createUserSuccess = (user) => {
  return {
    type: "CREATE_USER_SUCCESS",
    payload: user,
  };
};

export const createUsersFailure = () => {
  return {
    type: "CREATE_USER_FAILURE",
  };
};

//update User

export const updateUserStart = () => {
  return {
    type: "UPDATE_USER_START",
  };
};

export const updateUserSuccess = (user) => {
  return {
    type: "UPDATE_USER_SUCCESS",
    payload: user,
  };
};

export const updateUserFailure = () => {
  return {
    type: "UPDATE_USER_FAILURE",
  };
};
