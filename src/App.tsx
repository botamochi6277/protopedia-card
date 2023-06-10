import { Container } from '@mui/material'
import MyAppBar from './MyAppBar'
import MyForm from './MyForm'



function App() {
  return (
    <>
      <Container maxWidth="sm">
        <MyAppBar title="ProtoPedia Card" />
        <MyForm />

      </Container>
    </>
  )
}

export default App
