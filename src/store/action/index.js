import firebase  from '../../config/firebase';

const setData = (data) =>{
    return (dispatch)=>{
        console.log(data);
       dispatch({type:"SETUSER",data:data})
    }
}
const fb_login = (history) => {
    return (dispatch)=>{
    console.log("fb connec");
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
  
      // The signed-in user info.
      var user = result.user;
  
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var accessToken = credential.accessToken;
  
      // ...
      console.log("user -->",user);
      let create_user={
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        uid: user.uid
        }

      // console.log("user -->",create_user);
      firebase.database().ref('/').child(`user/${user.uid}`).set(create_user)
      .then(()=>{
        dispatch({type:"SETUSER",data:create_user})
        alert("user login successful")
        history.push('/chat');
      })
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
  
      // ...
    });
  
}
}
const get_user = () =>{
  return(dispatch) =>{
    let users=[];
    firebase.database().ref('/').child('user').on('child_added',(data)=>{
        users.push(data.val());
    })
    dispatch({type:"SETFIREBASEUSER", data:users})    
  }
}
export{
    setData,
    fb_login,
    get_user
}