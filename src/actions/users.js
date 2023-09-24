import * as api from "../api";

export const getAllUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUsers();
    dispatch({ type: "FETCH_USERS", payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const updateProfile = (id, updateData) => async (dispatch) => {
  try {
    // req to backend
    const { data } = await api.updateProfile(id, updateData);
    // dispatching it to redux toolkit and
    // holding the value to frontend
    dispatch({ type: "UPDATE_CURRENT_USER", payload: data });
  } catch (err) {
    console.log(err);
  }
};
