export const currentUserReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "FETCH_CURRENT_USER":
      return action.payload;
    default:
      return state;
  }
};
