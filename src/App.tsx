import { useState } from 'react'

import { Container } from '@mui/material'
import MyAppBar from './MyAppBar'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Container>
      <MyAppBar title="ProtoPedia Card"/>
      
    </Container>
    </>
  )
}

export default App
