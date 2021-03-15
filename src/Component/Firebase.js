// import React, { useState } from 'react';
// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import firebaseConfig from "../Firebase.config"

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig)
//   }

// const Firebase = () => {

//     const [newUser, setNewUser] = useState(false)
//     const [user, setUser] = useState({
//         isLogedIn : false,
//         name: '',
//         email: '',
//         password: '',
//         photo: '',
//         error : '',
//         succes: false
//     })

//     const provider = new firebase.auth.GoogleAuthProvider();

//    const handleSignIn = () => {
//     firebase.auth().signInWithPopup(provider)
//     .then(res => {
//         const {displayName, email, photoURL} = res.user
//         setUser({
//             isLogedIn: true,
//             name: displayName,
//             email: email,
//             photo: photoURL
//         })
//     }).catch((error) => {
//         console.log(error.message)
//     });
//    }
    
//    const handleSignOut = () => {
//     firebase.auth().signOut().then(() => {
//         setUser({
//             isLogedIn: false,
//             email: '',
//             name: '',
//             photo: ''
//         })
//       }).catch((error) => {
//         console.log(error.message)
//       });
//    }

//    const handleChange = (e) => {
//        let isFormValid = true
//        if(e.target.name === 'email') {
//         isFormValid =  /\S+@\S+\.\S+/.test(e.target.value)
//        }
//        if(e.target.name === 'password') {
//         const isPasswordValid = e.target.value.length > 6
//         const PasswordRegex = /\d{1}/.test(e.target.value);
//         isFormValid = isPasswordValid && PasswordRegex
//        }

//        if(isFormValid) {
//         const newUserInfo = {...user}
//         newUserInfo[e.target.name] = e.target.value
//         setUser(newUserInfo)
//        }

//     }

   
//   const shubmitHandler = (e) => {


//     if (newUser && user.email && user.password) {
//       firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//         .then((res) => {
//           const newUserInfo = { ...user }
//           newUserInfo.error = ''
//           newUserInfo.succes = true
//           setUser(newUserInfo)
//         //   updateUserName(user.name)
//         })
//         .catch((error) => {
//           const newUserInfo = { ...user }
//           newUserInfo.error = error.message
//           newUserInfo.succes = false

//           setUser(newUserInfo)
//         })
//     }

//     if (!newUser && user.email && user.password) {
//       firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//         .then((res) => {
//           const newUserInfo = { ...user }
//           newUserInfo.error = ''
//           newUserInfo.succes = true
//           setUser(newUserInfo)
//           console.log(res.user)
//         })
//         .catch((error) => {
//           const newUserInfo = { ...user }
//           newUserInfo.error = error.message
//           newUserInfo.succes = false

//           setUser(newUserInfo)
//         })
//     }
//     e.preventDefault()
//   }

//     return (
//         <div className="container">
//             {
//                 user.isLogedIn ? <button onClick={handleSignOut}>sign out</button> : <button onClick={handleSignIn}>sign in</button>
//             }
//             {
//                 user.isLogedIn && <div>
//                     <p>{user.name}</p>
//                     <p>{user.email}</p>
//                     <img src={user.photo} alt=""/>
//                 </div>
//             }

//             <form onSubmit= {shubmitHandler}>
//                 <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} />
//                 <label htmlFor="newUser"> checkFor new user</label> <br/>
//                 {
//                     newUser && <input type="text" name="name" onBlur={handleChange} placeholder='your name' />
//                 } <br />
//                 <input type="text" name="email" onBlur= {handleChange} placeholder="enter your email" /> <br/>
//                 <input type="password" name="passsword" onBlur= {handleChange} placeholder="enter your password" /> <br/>
//                 <input type="submit" value="submit" />
//             </form>
//             <p style={{color: 'red'}}>{user.error}</p>
//             {
//                 user.succes && <p style={{color: 'green'}}>user created succesfully</p>
//             }

//         </div>
//     );
// };

// export default Firebase;