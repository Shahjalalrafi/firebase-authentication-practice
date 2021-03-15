import './App.css';
import { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './Firebase.config'
// import Firebase from './Component/Firebase';

firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}


function App() {



  const [user, setUser] = useState({
    isLogedIn: false,
    name: '',
    email: '',
    password: '',
    img: '',
    error: '',
    succes: false
  })

  const [newUser, setNewUser] = useState(false)

  const googleProvider = new firebase.auth.GoogleAuthProvider()
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
        let { displayName, photoURL, email } = res.user

        const signInUser = {
          isLogedIn: true,
          name: displayName,
          email: email,
          img: photoURL
        }
        setUser(signInUser)

        // console.log(displayName, photoURL, email)
      })
      .catch(err => console.log(err))
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signOutUser = {
          isLogedIn: false,
          name: '',
          email: '',
          img: ''
        }
        console.log(res)
        setUser(signOutUser)
      })
      .catch(err => console.log(err))
  }


  // form
  const handleChange = (e) => {
    let isFormValid = true
    if (e.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6
      const reg = /\d{1}/.test(e.target.value);
      isFormValid = reg && isPasswordValid
    }

    if (isFormValid) {
      let newUserInfo = { ...user }
      newUserInfo[e.target.name] = e.target.value
      setUser(newUserInfo)
    }
  }

  const handleFacebook = () => {
    firebase.auth().signInWithPopup(fbProvider)
      .then((user) => {
        /** @type {firebase.auth.OAuthCredential} */
        console.log(user)
      })
      .catch((error) => {
        console.log(error.message)
      });
  }


  const shubmitHandler = (e) => {


    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user }
          newUserInfo.error = ''
          newUserInfo.succes = true
          setUser(newUserInfo)
          updateUserName(user.name)
        })
        .catch((error) => {
          const newUserInfo = { ...user }
          newUserInfo.error = error.message
          newUserInfo.succes = false

          setUser(newUserInfo)
        })
    }

    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user }
          newUserInfo.error = ''
          newUserInfo.succes = true
          setUser(newUserInfo)
          console.log(res.user)
        })
        .catch((error) => {
          const newUserInfo = { ...user }
          newUserInfo.error = error.message
          newUserInfo.succes = false

          setUser(newUserInfo)
        })
    }
    e.preventDefault()
  }

  const updateUserName = (name) => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then((res) => {
      console.log("user name update succesfully")
    }).catch(error => {
      console.log(error)
    });
  }

  return (
    <div className="App">
      {
        user.isLogedIn ? <button onClick={handleSignOut}>sign out</button> :
          <button onClick={handleSignIn}>sign in</button>
      }
      <br />
      <button onClick={handleFacebook}>facebook signIn</button>
      {
        user.isLogedIn && <div>
          <p>name: {user.name}</p>
          <p>email: {user.email}</p>
          <img src={user.img} alt="" />
        </div>
      }

      <h4>Form Authentication</h4>
      <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} />
      <label htmlFor="newUser">check for new user</label>
      <form onSubmit={shubmitHandler}>
        {newUser && <input type="text" name="name" onBlur={handleChange} placeholder='your name' />} <br />
        <input type="text" required name="email" placeholder="enter your email" onBlur={handleChange} /> <br />
        <input type="password" required name="password" placeholder="enter your password" onBlur={handleChange} /> <br />
        <input type="submit" value={newUser ? "sign up" : "sign in"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {
        user.succes && <p style={{ color: "green" }}>Account {newUser ? "created" : "loged In"} succesfully</p>
      }


    </div>




  );
}

export default App;