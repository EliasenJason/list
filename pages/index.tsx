import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase/firebaseconfig'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Banner from '../components/banner'

const MainContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 2em;
`;

const FormContainer = styled.div`
  background-color: #fff;
  border: 2px solid #ffcc99;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  padding: 3em 2em;
  max-width: 600px;
  max-height: 600px;
  margin-top: 50px;

  .active {
    background-color: #ffa64d;
  }

  div {
    display: flex;
    background-color: #ffcc99;
    align-items: center;
    margin-bottom: 2em;
  }

  h2 {
    display: block;
    font-size: 25px;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    padding: .2em;
    &:hover {
      cursor: pointer;
    }
  }

  label {
    font-size: 18px;
    margin-bottom: 5px;
  }

  input[type="password"],
  input[type="email"],
  input[type="username"] {
    display: block;
    width: 100%;
    margin-bottom: 20px;
    padding: 10px;
    font-size: 18px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  input[type="submit"] {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #ffcc99;
    color: #333;
    font-size: 18px;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #ffa64d;
    }
  }

  p {
    display: inline;
  }

  .button {
    color: blue;
    font-weight: bold;
    text-decoration: underline;
  }
`;

const Features = styled.div`
  h3 {
    font-size: 24px;
    margin-top: 50px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    margin-top: 20px;

    li {
      font-size: 18px;
      margin-bottom: 10px;
    }
  }
`;

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setusername] = useState('')
  const [user, setUser] = useState({})
  const [showlogin, setShowLogin] = useState(true)
  const router = useRouter()

  const handleSignUp = (event) => {
    event.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential && auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: username
          })
        }
        console.log('signedUp')
        console.log(userCredential.user)
      })
      .catch((error) => {
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
      })
  }
  const handleLogin = (event) => {
    event.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential)
        console.log('logged in')
        console.log(userCredential.user)
      })
      .catch((error) => {
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
      })
  }
  const handleLogOut = () => {
    auth.signOut()
  }
  useEffect(() => {
    auth.onAuthStateChanged( (firebaseuser) => {
      if (firebaseuser) {
        console.log(firebaseuser)
        console.log('user is signed in')
        router.push("/logged_in")
      } else {
        console.log('user is logged out')
      }
    })
  , []})
  

  return (
    <>
    <Head>
      <title>To-Do App</title>
      <meta name="description" content="List App" />
    </Head>
    <Banner />
    <MainContainer>
    {showlogin ? 
      <FormContainer>
          <div><h2 onClick={() => showlogin === true ? setShowLogin(false): setShowLogin(true)}>Log In</h2><h2 className='active'>Sign Up</h2></div>
          <form onSubmit={handleSignUp}>
            
            <label>Username</label>
            <input 
              type='username'
              placeholder='Username'
              onChange={(event) => setusername(event.target.value)}
            />
            <label>Email</label>
            <input
              type='email'
              placeholder='E-Mail'
              onChange={(event) => setEmail(event.target.value)}
              />
              <label>Password</label>
            <input
              type='password'
              placeholder='Password'
              onChange={(event) => setPassword(event.target.value)}
              />
            <input
              type='submit'
              />
          </form>
        </FormContainer>
        :
        <FormContainer>
          <div><h2 className='active'>Log In</h2><h2 onClick={() => showlogin === true ? setShowLogin(false): setShowLogin(true)}>Sign Up</h2></div>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type='email'
            placeholder='E-Mail'
            onChange={(event) => setEmail(event.target.value)}
            />
            <label>Password</label>
          <input
            type='password'
            placeholder='Password'
            onChange={(event) => setPassword(event.target.value)}
            />
          <input
            type='submit'
            />
        </form>
      </FormContainer>
    }
    
    <Features>
      <h3>Key Features</h3>
      <ul>
        <li>Create and organize tasks</li>
        <li>Set reminders and due dates</li>
        <li>Collaborate with friends and colleagues</li>
      </ul>
    </Features>
    </MainContainer>
    </>
  )
}