import styled from "styled-components";
import { auth } from '../firebase/firebaseconfig'
import { useEffect, useState } from "react";

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

  p {
    
  }
`;

export default function Banner() {
  const [user, setUser] = useState({name: 'test'})
  useEffect(() => {
    setUser((oldUser) => ({
      ...oldUser,
      name: auth.currentUser.displayName
      }))
    },[])

  return (
    <StyledBanner>
      <h1>To-Do App</h1>
      <div>
        <p>{`Logged in as ${user.name}`}</p>
      </div>
    </StyledBanner>
  )
}