import * as api from "../api";

// create a redux thunk
export const textQueryAction = (text) => async (dispatch) => {
  // save user msg to reducer in this format
  let conversation = {
    who: "user",
    content: {
      text: {
        text: text,
      },
    },
  };
  dispatch({ type: "SAVE_MSG", payload: conversation });

  const textQueryVar = {
    text: text,
  };
  try {
    const { data } = await api.textQuery(textQueryVar);
    for (let content of data.fulfillmentMessages) {
      // save bot msg to reducer
      let conversation = {
        who: "bot",
        content: content,
      };
      // storing it to reducers
      dispatch({ type: "SAVE_MSG", payload: conversation });
    }

    // to show all msgs - dispatch something afterwards
  } catch (err) {
    let conversation = {
      who: "bot",
      content: {
        text: {
          text: " Error just occured, please check the problem",
        },
      },
    };
    // store err msg to reducer
    dispatch({ type: "SAVE_MSG", payload: conversation });
    console.log(err);
  }
};

export const eventQueryAction = (event) => async (dispatch) => {
  const eventQueryVar = {
    event: event,
  };
  try {
    const { data } = await api.eventQuery(eventQueryVar);
    for (let content of data.fulfillmentMessages) {
      let conversation = {
        who: "bot",
        content: content,
      };
      // save bot msg to reducer
      dispatch({ type: "SAVE_MSG", payload: conversation });
    }
  } catch (err) {
    let conversation = {
      who: "bot",
      content: {
        text: {
          text: " Error just occured, please check the problem",
        },
      },
    };
    dispatch({ type: "SAVE_MSG", payload: conversation });
  }
};
