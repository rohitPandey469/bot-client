import React, { useEffect } from "react";
import AllRoutes from "./AllRoutes";
import { BrowserRouter as Router } from "react-router-dom";
//////////////////styles////////////////////////
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { fetchAllQuestion } from "./actions/question";
import { getAllUsers } from "./actions/users";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  // whenever dispatch get called this useEffect will run
  useEffect(() => {
    dispatch(fetchAllQuestion());
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
