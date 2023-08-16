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

  handleStateChange = (data: PrototypeRawData[]) => {
    if (data.length == 0) {
      return;
    }
    const data0 = data[0];
    const images_ref = [
      data0.image1, data0.image2, data0.image3, data0.image4, data0.image5
    ]
    // material list with removing overlap values
    const mat = data.map(d => d.materialNm).filter((elem, index, self) => self.indexOf(elem) === index);
    const images = images_ref.filter((im) => im); // remove null
    const proto: PrototypeData = {
      name: data0.prototypeNm,
      developing_status: data0.status,
      images: images,
      summary: data0.summary,
      developer: data0.userNm,
      team: data0.teamNm,
      materials: mat,
      tags: data0.tags.split(','),
      prototype_id: data0.id
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
