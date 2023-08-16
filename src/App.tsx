import { Component } from 'react'

import { Container } from '@mui/material'

import PrototypeCard from './PrototypeCard'


class App extends Component {

  // initial state
  prototype_data: PrototypeData = {
    name: "ｽﾀﾝﾃﾞｨﾝｸﾞ ｽﾀｯｸﾁｬﾝ",
    developing_status: 3,
    images: ["https://protopedia.net/pic/d20b6eb0-de41-494e-b54a-983691e9957b.png"],
    summary: "飛べる！踊れる！ｽﾀｯｸﾁｬﾝ!! なｽﾀｯｸﾁｬﾝのフィギュアです. The action figure of stackchan can pose flying, dancing, etc.",
    developer: "botamochi6277",
    team: "BotaLab",
    materials: ["M5Stack Core 2"],
    tags: ["3D Printer", "action figure"],
    prototype_id: 4203
  };

  state = {
    prototype_data: this.prototype_data,
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
    const proto: PrototypeData = {
      name: data.prototypeNm,
      developing_status: data.status,
      images: images,
      summary: data.summary,
      developer: data.userNm,
      team: data.teamNm,
      materials: data.materialNm.split(','),
      tags: data.tags.split(','),
      prototype_id: data.id
    }
    this.setState({ prototype_data: proto })
  }

  render() {
    return (
      <>
        <Container maxWidth="sm">
          <PrototypeCard
            prototypeData={this.state.prototype_data}
            fetchHandle={this.handleStateChange}
          />
        </Container>
      </>
    )
  }
}

export default App
