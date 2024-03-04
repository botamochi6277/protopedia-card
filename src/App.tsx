import { Container } from '@mui/material';
import * as React from 'react';

import PrototypeCard from './PrototypeCard';


const App = () => {
  const [max_width, setMaxWidth] = React.useState("sm");
  const [prototype_data, setPrototypeData] = React.useState({
    name: "ｽﾀﾝﾃﾞｨﾝｸﾞ ｽﾀｯｸﾁｬﾝ",
    developing_status: 3,
    images: ["https://protopedia.net/pic/d20b6eb0-de41-494e-b54a-983691e9957b.png"],
    summary: "飛べる！踊れる！ｽﾀｯｸﾁｬﾝ!! なｽﾀｯｸﾁｬﾝのフィギュアです. The action figure of stackchan can pose flying, dancing, etc.",
    developer: "botamochi6277",
    team: "BotaLab",
    materials: ["M5Stack Core 2"],
    tags: ["3D Printer", "action figure"],
    prototype_id: 4203
  });

  const handleStateChange = (data: PrototypeRawData[]) => {
    if (data.length == 0) {
      return;
    }
    const data0 = data[0];
    const images_ref = [
      data0.image1, data0.image2, data0.image3, data0.image4, data0.image5
    ]
    // material list with removing overlap values
    const mat = data.map(d => d.materialNm).filter((elem, index, self) => self.indexOf(elem) === index);
    const images = images_ref.filter((im) => (im)); // remove null
    const proto: PrototypeData = {
      name: data0.prototypeNm ?? "Awesome Prototype",
      developing_status: data0.status ?? 0,
      images: images,
      summary: data0.summary ?? "",
      developer: data0.userNm ?? "HIRAGA Gennai",
      team: data0.teamNm ?? "",
      materials: mat ?? [],
      tags: data0.tags ? data0.tags.split(',') : [],
      prototype_id: data0.id
    }
    setPrototypeData(proto);
  }

  return (
    <Container maxWidth="sm" >
      <PrototypeCard
        prototypeData={prototype_data}
        fetchHandle={handleStateChange}
      />
    </Container>
  )

}

export default App
