import { loadStripe } from "@stripe/stripe-js";
import * as api from "../api";
export const makePayment = (product) => async (dispatch) => {
  try {
    const stripe = await loadStripe(
      "pk_test_51Nt6DFSJVmKxXoSYyLXl02SK9WA7DUpQZIOO76bCOgXKrdATOfF8FXoZFo6m8X4vhwVTDEvKhqjwKwFqHNct1ggr00XZoNZtW6"
    );
    const body = { products: product };
    const response = await api.makePayment(JSON.stringify(body));
    // console.log("Response from stripe", response);
    // console.log("Response.data", response.data);
    const session = await response.data.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error);
    }
  } catch (error) {
    console.log(error);
  }
};
