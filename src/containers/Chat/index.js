import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { get_user } from '../../store/action'
import firebase from "../../config/firebase"

class Chat extends React.Component{
    constructor(){
        super()
        this.state={
            chat_user:{},
            chats:[],
            message: ""
        }
    }
    chat = (userKaData) =>{
        // console.log(userKaData)
        this.setState({
            chat_user:userKaData
        })
        let user_1 = this.props.current_user;
        let merge_uid = this.uid_merge(user_1.uid,userKaData.uid)
        console.log(user_1.uid,userKaData.uid)
        this.get_message(merge_uid);
    }

    componentDidMount(){
        this.props.get_users()
    }

    get_message = (uid) =>{
        firebase.database().ref('/').child(`chats/${uid}`).on('child_added',(message)=>{
            this.state.chats.push(message.val())
            console.log("mssgs-->",message.val())
            console.log('test')
            this.setState({
                chats:this.state.chats
            })
        })
    }

    uid_merge = (uid1,uid2) =>{
            if (uid1 < uid2){
                return uid1 + uid2
            }else{
                return uid2 + uid1
            }
    }
    send_msg = () => {
        let user_1 = this.props.current_user;
        let chat_user = this.state.chat_user;
        let merge_uid = this.uid_merge(user_1.uid,chat_user.uid)

        // console.log(this.uid_merge(user_1.uid,chat_user.uid))

        firebase.database().ref('/').child(`chats/${merge_uid}`).push({
            message: this.state.message,
            name: user_1.name,
            uid: user_1.uid
        })



        // this.state.chats.push({message: this.state.message});
        this.setState({
            // chats: this.state.chats,
            message:""
        })
        // console.log("message -->",this.state.message)
    }

    render(){
        // console.log("current user-->",this.props.current_user)
        let Curruser = this.props.current_user;
        // console.log("firebase data ka usersss-->",this.props.users)
    return(
        <div>
            <h1>chat app</h1>
            <Link to="/">Go to home</Link>
            <h3>Welcome {Curruser.name}</h3>
            <img src={Curruser.photo} alt="logo"/>
            <h5>Email: {Curruser.email}</h5>
        <div style={{display:"flex"}}>
            <div style={{backgroundColor:"lightcoral"}}>
                <h2>
                    Available users to chat:</h2>
                    <ul>
                        {this.props.users.map((usersValue,i) => {
                            return usersValue.uid !== Curruser.uid &&  <li key={i}>
                             <img src={usersValue.photo} alt="logo" width="20"/> 
                            {" "+usersValue.name}<button onClick={()=>{this.chat(usersValue)}}>Chat</button>
                            </li>
                        })}
                    </ul>
                
            </div>
            <div style={{width:400,backgroundColor:"lightpink"}}>
                <h3>Chat:</h3>
                {Object.keys(this.state.chat_user).length ?
                <div>
                 <h3><img src={this.state.chat_user.photo} alt="logo" width="20"/>
                 {" "+this.state.chat_user.name}</h3>   

                <input value={this.state.message} 
                onChange={(e)=>this.setState({message: e.target.value})} 
                type="text" placeholder="enter your message"/>

                <button onClick={()=>this.send_msg()}>send message</button>
                <ul>
                    {
                        this.state.chats.map((v,i)=>{
                            return <li key={i} style={{color: v.uid===Curruser.uid ? "red" : "green"}}>{v.message}</li>
                        })
                    }
                </ul>
                </div>
                
                : 
                <h4>No User Available to chat with</h4> }

            </div>
        </div>
        </div>
    )
}
}

const mapStateToProp = (state) =>({
    current_user: state.current_user,
    users: state.users
  })
  
  const mapDispatchToProps = (dispatch) =>({
    get_users:() => dispatch(get_user())
  })
  export default connect(mapStateToProp,mapDispatchToProps) (Chat);