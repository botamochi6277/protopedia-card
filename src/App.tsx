import { Component } from 'react'

import { Container } from '@mui/material'

import PrototypeCard from './PrototypeCard'


class App extends Component {

  // initial state
  state = {
    name: "Long Tail Whale",
    developing_status: 2,
    images: ["https://protopedia.net/pic/9eabe827-d5dd-4297-bb5b-504f81722725.png"],
    summary: "Long Tail Whale Robot with M5Atom inspired Qoobo.ユカイ工学のQooboに触発されて開発したしっぽロボットのクジラ版",
    developer: "botamochi6277",
    team: "BotaLab",
    materials: ["M5Stack"],
    tags: ["tail", "doll"],
    prototype_id: 2385
  }

  handleStateChange = (data: {
    image1: string,
    image2: string,
    image3: string,
    image4: string,
    image5: string,
    prototypeNm: string,
    status: number,
    summary: string,
    userNm: string,
    teamNm: string,
    materialNm: string,
    tags: string,
    id: number
  }) => {
    const images_ref = [
      data.image1, data.image2, data.image3, data.image4, data.image5
    ]

    const images = images_ref.filter((im) => im); // remove null

    this.setState({
      name: data.prototypeNm,
      developing_status: data.status,
      images: images,
      summary: data.summary,
      developer: data.userNm,
      team: data.teamNm,
      materials: data.materialNm.split(','),
      tags: data.tags.split(','),
      prototype_id: data.id
    })
  }

  render() {
    return (
      <>
        <Container maxWidth="sm">
          <PrototypeCard
            name={this.state.name}
            developing_status={this.state.developing_status}
            images={this.state.images}
            summary={this.state.summary}
            developer={this.state.developer}
            team={this.state.team}
            materials={this.state.materials}
            tags={this.state.tags}
            prototype_id={this.state.prototype_id}
            fetchHandle={this.handleStateChange}
          />
        </Container>
      </>
    )
  }
}

export default App
