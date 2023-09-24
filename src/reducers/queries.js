export default function (state = { messages: [] }, action) {
  switch (action.type) {
    case "SAVE_MSG":
      // saving it to the redux toolkit with the tree format
      // of queriesReducer.messages
      return {
        ...state,
        messages: state.messages.concat(action.payload),
      };
    default:
      return state;
  }
}
