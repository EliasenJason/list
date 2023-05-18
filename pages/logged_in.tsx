import { auth } from '../firebase/firebaseconfig'
import { useRouter } from 'next/router'
import Banner from '../components/banner'
import styled from 'styled-components'
import { useState } from 'react'

type StyleTypes = {
  userSelected: boolean
}

const FullGrid = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr; 
  grid-template-rows: 0.1fr 1.9fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "list1 list2 list3"
  ;
`
const List1 = styled.div<StyleTypes>`
  grid-area: list1;
  background-color: purple;
  width: 100%;
  height: 100%;
  grid-row-end: ${prop => prop.userSelected ? 3: 2}; //1 and 3
  grid-column-end: ${prop => prop.userSelected ? 4: 1}; // 1 and 4
`
const List2 = styled.div<StyleTypes>`
  grid-area: list2;
  background-color: blue;
  width: 100%;
  height: 100%;
  grid-row-end: ${prop => prop.userSelected ? 3: 2}; //1 and 3
  grid-column-end: ${prop => prop.userSelected ? 4: 1}; // 1 and 4
  z-index: ${prop => prop.userSelected ? 2: 1};
`
const List3 = styled.div`
  grid-area: list3;
  background-color: red;
  width: 100%;
  height: 100%;
`

export default function() {
  const [selected, setSelected] = useState(0)
  const [notes, setnotes] = useState([
    {
      name: 'Grocery List',
      list: [
        {itemName: 'speghetti', status: 'uncomplete', creationDate: new Date(2022,6,4,10,33,0)}, 
        {itemName: 'apples', status: 'uncomplete', creationDate: new Date(2022,6,4,10,33,0)},
        {itemName: 'ground beef', status: 'complete', creationDate: new Date(2022,6,4,10,33,0)}
      ]
    },
    {
      name: 'home todo',
      list: [
        {itemName: 'make cake', status: 'complete', creationDate: new Date(2022,6,4,10,33,0)},
        {itemName: 'clean bathroom', status: 'uncomplete', creationDate: new Date(2022,6,4,10,33,0)},
        {itemName: 'plant garden', status: 'complete', creationDate: new Date(2022,6,4,10,33,0)},
      ]
    }
  ])
  const router = useRouter()
  
  const handleLogOut = () => {
    auth.signOut()
    if (!auth.currentUser) {
      router.push("/")
    }
  }
  const show = () => {
    console.log(auth.currentUser)
  }
  return (
    <>
    <Banner />
    <FullGrid>
      <List1 userSelected={selected === 1} onClick={() => setSelected(1)}/>
      <List2 userSelected={selected === 2} onClick={() => setSelected(2)}/>
    </FullGrid>
    <p onClick={handleLogOut}>logged in page</p>
    <p onClick={show}>who is logged in?</p>
    </>
  )
}