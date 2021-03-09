import React from 'react';
import './App.css';
import Home from './containers/Home';
import AppRouter from "./config/router";


class App extends React.Component{
  render(){

    return(
      <div>
        <h1>hello world</h1>
        <AppRouter/>
      </div>
    ) 
  }
}

export default App;