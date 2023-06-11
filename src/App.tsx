import { Component } from 'react'

import { Container } from '@mui/material'
import MyAppBar from './MyAppBar'
import MyForm from './MyForm'
import PrototypeCard from './PrototypeCard'


class App extends Component {

  // initial state
  state = {
    name: "Long Tail Whale",
    developing_status: 2,
    images: ["https://protopedia.net/pic/9eabe827-d5dd-4297-bb5b-504f81722725.png", "https://protopedia.net/pic/9eabe827-d5dd-4297-bb5b-504f81722725.png"],
    summary: "Long Tail Whale Robot with M5Atom inspired Qoobo.ユカイ工学のQooboに触発されて開発したしっぽロボットのクジラ版",
    developer: "botamochi6277",
    team: "BotaLab",
    materials: ["M5Stack"],
    tags: ["tail", "doll"]
  }

  handleStateChange = (data) => {
    const images = [
      data.image1, data.image2, data.image3, data.image4, data.image5
    ]

    this.setState({
      name: data.prototypeNm,
      developing_status: data.status,
      images: images,
      summary: data.summary,
      developer: data.userNm,
      team: data.teamNm,
      materials: data.materialNm.split(','),
      tags: data.tags.split(',')
    })
  }

  render() {
    return (
      <>
        <Container maxWidth="sm">
          <MyAppBar title="ProtoPedia Card" />
          <MyForm fetchHandle={this.handleStateChange} />
          <PrototypeCard
            name={this.state.name}
            developing_status={this.state.developing_status}
            images={this.state.images}
            summary={this.state.summary}
            developer={this.state.developer}
            team={this.state.team}
            materials={this.state.materials}
            tags={this.state.tags}
          />
        </Container>
      </>
    )
  }
}

export default App
