import React from "react";
import Header from "../../components/Header/Header";

const Info = () => {
  return (
    <>
    <Header/>
      <div style={{paddingTop:"80px",width:"100vw",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div>
            <h1>Workings of the website</h1>
            <div>
                <ul>
                    <li>"baseURL/" - Url to homepage</li>
                    <li>"baseURL/chatbot" - Url to chatbot/interact with AI btn</li>
                    <li>"baseURL/Questions" - Url to view all the questions</li>
                    <li>"baseURL/AskQuestion" - Url to ask a question</li>
                    <li>"baseURL/checkout" - Url to purchase offers to stackoverflow</li>
                    <li>"baseURL/checkout/success" - Url to checkout success page</li>
                    <li>"baseURL/checkout/cancel" - Url to checkout cancel page</li>
                    <li>"baseURL/Users/:id" - Url to User Profile</li>
                    <li>"baseURL/info" - Url to this page</li>
                    <hr />
                    <li>"React-toastify" - For instructions to the user</li>
                    <li>"Email and OTP login" - Not checking if the users email is correct on registering</li>
                    <li>"Score" - earned on votes to asked questions and answer to question</li>
                    <li>"Title/badge" - Newbie to just registered users</li>
                    <li>"Title/badge" - Pro to answersGiven&gt;=5</li>
                    <li>"Title/badge" - Expert to answersGiven&gt;=20</li>
                    <li>"Title/badge" - Master to answersGiven&gt;=50</li>
                    <li>"Title/badge" - God to answersGiven&gt;=100</li>
                    <li>"Title/badge" - Additional points on each title</li>
                    <hr/>
                    <li>"Restrictions" - On some of the actions</li>
                    <li>"Can not delete a question" - However easily implementable actions</li>
                    <li><h6>"Changes" - Made else it would be a clone of stackOverflow clone</h6></li>
                    <hr />
                    <li><h6>"Responsive" - Healthy for &gt;360px width and &gt;550px height</h6></li>
                </ul>
            </div>
        </div>
      </div>
    </>
  );
};

export default Info;
