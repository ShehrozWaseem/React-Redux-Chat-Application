import React from 'react';
import './style.css';
import { connect } from "react-redux";
import {setData, fb_login} from '../../store/action'
import { Link } from "react-router-dom";

class Home extends React.Component{
  render(){
    let user={
      name:"xyz",
      email:"xyz@gmail.com"
    }
    console.log("updated-->",this.props);
    return(
      <div>
        <button onClick={() => this.props.setData(user)}>set data</button>
        <button onClick={()=>this.props.fb_login(this.props.history)}>Facebook Login</button>
        <Link to="/chat">Go to chat</Link>
      </div>
    ) 
  }
}
const mapStateToProp = (state) =>({
  users: state.users
})

const mapDispatchToProps = (dispatch) =>({
  setData: (data)=> dispatch(setData(data)),
  fb_login:(history)=> dispatch(fb_login(history))
})
export default connect(mapStateToProp,mapDispatchToProps) (Home);