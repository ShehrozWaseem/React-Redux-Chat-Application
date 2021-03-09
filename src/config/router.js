import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../containers/Home";
import Chat from "../containers/Chat";
import App from "../App";

export default class AppRouter extends React.Component {
    render(){
        return(
            <Router>
                <Route exact path="/" component={Home} />
                {/* <Route exact path="/home" component={App} /> */}
                <Route exact path="/chat" component={Chat} />
            </Router>
        )
    }
}