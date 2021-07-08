import React from "react";
import "./App.css";
import firebase from "./firebase/base";
import SignIn from "./pages/SignIn";
import ChatRoom from "./pages/ChatRoom";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Posts from "./pages/Posts";

function App() {
  const auth = firebase.auth();
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  const [user] = useAuthState(auth);

  if (!user) {
    return <SignIn />;
  } else {
    return (
      <>
        <Router>
          <Route exact path={["/", "/chatroom"]} component={ChatRoom} />
          <Route path="/posts" component={Posts} />
        </Router>
      </>
    );
  }
}

export default App;
