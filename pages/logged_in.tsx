import { auth } from '../firebase/firebaseconfig'
import { useRouter } from 'next/router'
import Banner from '../components/banner'
import styled from 'styled-components'
import { useEffect, useState } from 'react'

type List = {
  key: number
}
type Grid = {
  columns: number
}

const FullGrid = styled.div<Grid>`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  display: grid; 
  grid-template-columns: repeat(${props => (props.columns)}, 1fr);
  grid-template-rows: .1fr 2fr;
  gap: 0px 0px;
  ;
`
const Headers = styled.div<List>`
  background-color: purple;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function() {
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
  const [columns, setColumns] = useState(0)

  useEffect(() => {
    setColumns(notes.length)
  },[notes])

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
    <FullGrid columns={columns}>
      {
        notes.map((item,index) => (
          <Headers key={index}>
            <p>{item.name} {index} {columns}</p>
          </Headers>
        ))
      }
      <p>this will be a list</p>
    </FullGrid>
    <p onClick={handleLogOut}>logged in page</p>
    <p onClick={show}>who is logged in?</p>
    </>
  )
}