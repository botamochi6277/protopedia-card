import { Container } from '@mui/material'
import MyAppBar from './MyAppBar'
import MyForm from './MyForm'
import PrototypeCard from './PrototypeCard'


function App() {
  return (
    <>
      <Container maxWidth="sm">
        <MyAppBar title="ProtoPedia Card" />
        <MyForm />
        <PrototypeCard
          name="Long Tail Whale"
          developing_status={2}
          images={["https://protopedia.net/pic/9eabe827-d5dd-4297-bb5b-504f81722725.png", "https://protopedia.net/pic/9eabe827-d5dd-4297-bb5b-504f81722725.png"]}
          summary="Long Tail Whale Robot with M5Atom inspired Qoobo.ユカイ工学のQooboに触発されて開発したしっぽロボットのクジラ版"
          developer="botamochi"
        />
      </Container>
    </>
  )
}

export default App
