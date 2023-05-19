import styled from "styled-components";
import { auth } from '../firebase/firebaseconfig'
import { useEffect, useState } from "react";
import router from "next/router";

const StyledBanner = styled.div`
  background-color: #ffcc99;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  h1 {
    font-size: 48px;
    margin: 0;
    color: #333;
  }

  span {
    color: blue;
    &:hover {
      cursor: pointer;
    }
  }
`;

export default function Banner() {
  const [user, setUser] = useState('')

    useEffect(() => {
      auth.onAuthStateChanged( (firebaseuser) => {
        if (!firebaseuser) {
          router.push("/")
        } else {
          setUser(() => firebaseuser.displayName)
        }
      })
    , []})

    const handleLogOut = () => {
      auth.signOut()
      if (!auth.currentUser) {
        router.push("/")
      }
    }

  return (
    <StyledBanner>
      <h1>To-Do App</h1>
      <div>
        {user && <div>{`Logged in as ${user}`} <span onClick={handleLogOut}>(LogOut)</span></div>}
      </div>
    </StyledBanner>
  )
}