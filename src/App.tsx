import * as React from "react";
import { Breakpoint, Container, Box } from "@mui/material";

import PrototypeCard from "./PrototypeCard";
import SystemStructureCard from "./SystemStructureCard";
import StoryCard from "./StoryCard";
import MyDrawerMenu from "./MyDrawerMenu";
import theme from "./theme";

const App = () => {
  // params
  const [drawerIsOpened, setDrawerIsOpened] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<Breakpoint>("sm");

  const [pageNumber, setPageNumber] = React.useState(1);
  const [notification, setNotification] = React.useState<NotificationItem>({
    status: 0,
    msg: "",
  });

  const [featuredImgVisibility, setFeaturedImgVisibility] =
    React.useState(true); // default show
  const [viewCounterVisibility, setViewCounterVisibility] =
    React.useState(true); // default show
  const [goodCounterVisibility, setGoodCounterVisibility] =
    React.useState(true); // default show

  const [footerVisibility, setFooterVisibility] = React.useState(false);

  const [prototypeData, setPrototypeData] = React.useState({
    name: "ｽﾀﾝﾃﾞｨﾝｸﾞ ｽﾀｯｸﾁｬﾝ",
    developing_status: 3,
    images: [
      "https://protopedia.net/pic/d20b6eb0-de41-494e-b54a-983691e9957b.png",
      "https://protopedia.net/pic/8728a2f6-8ec8-45af-8887-068d49b7d2f1.png",
    ],
    summary:
      "飛べる！踊れる！ｽﾀｯｸﾁｬﾝ!! なｽﾀｯｸﾁｬﾝのフィギュアです. The action figure of stackchan can pose flying, dancing, etc.",
    developer: "botamochi6277",
    team: "BotaLab",
    materials: ["M5Stack Core 2"],
    tags: ["3D Printer", "action figure"],
    prototype_id: 4203,
    main_img:
      "https://protopedia.net/pic/d20b6eb0-de41-494e-b54a-983691e9957b.png",
    create_at: "2023-10-21T19:33:48+09:00",
    release_at: "2023-10-21T19:33:48+09:00",
    update_at: "2023-10-21T19:33:48+09:00",
    free_comment: "hogehoge",
    system_description: "hogehoge",
    system_image: "",
    good_count: 5,
    view_count: 50,
  });

  const [imgsVisibility, setImgsVisibility] = React.useState(
    prototypeData.images.map((img) => (img ? true : false))
  );

  const [imgRowHeight, setImgRowHeight] = React.useState(200);

  const [mainImageIdx, setMainImageIdx] = React.useState(0);

  React.useEffect(() => {
    setImgsVisibility(prototypeData.images.map((img) => (img ? true : false)));
  }, [prototypeData]);

  const parseProtoTypeRawData = (data: PrototypeRawData[]) => {
    if (data.length == 0) {
      return;
    }
    const data0 = data[0];
    const images_ref = [
      data0.image1,
      data0.image2,
      data0.image3,
      data0.image4,
      data0.image5,
      data0.systemImage,
    ];
    // material list with removing overlap values
    const mat = data
      .map((d) => d.materialNm)
      .filter((elem, index, self) => self.indexOf(elem) === index);
    const images = images_ref.filter((im) => im); // remove null
    const proto: PrototypeData = {
      name: data0.prototypeNm ?? "Awesome Prototype",
      developing_status: data0.status ?? 0,
      images: images,
      summary: data0.summary ?? "",
      developer: data0.userNm ?? "HIRAGA Gennai",
      team: data0.teamNm ?? "",
      materials: mat ?? [],
      tags: data0.tags ? data0.tags.split("|") : [],
      prototype_id: data0.id,
      main_img: data0.mainUrl
        ? `https://protopedia.net/pic/${data0.mainUrl}`
        : "",
      create_at: data0.createAt,
      release_at: data0.releaseAt,
      update_at: data0.updateAt,
      free_comment: data0.freeComment ?? "",
      system_description: data0.systemDescription ?? "",
      system_image: data0.systemImage ?? "",
      good_count: data0.goodCount,
      view_count: data0.viewCount,
    };
    setPrototypeData(proto);
  };

  const drawerWidth = 400;

  return (
    <Box sx={{ display: "flex" }}>
      <MyDrawerMenu
        drawerWidth={drawerWidth}
        theme={theme}
        open={drawerIsOpened}
        setOpen={setDrawerIsOpened}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        notification={notification}
        setNotification={setNotification}
        setPrototypeData={parseProtoTypeRawData}
        containerWidth={maxWidth}
        setContainerWidth={setMaxWidth}
        featuredImgVisibility={featuredImgVisibility}
        setFeaturedImgVisibility={setFeaturedImgVisibility}
        viewCounterVisibility={viewCounterVisibility}
        setViewCounterVisibility={setViewCounterVisibility}
        goodCounterVisibility={goodCounterVisibility}
        setGoodCounterVisibility={setGoodCounterVisibility}
        imgsVisibility={imgsVisibility}
        setImgsVisibility={(v: boolean[]) => {
          setImgsVisibility(v);
        }}
        imgRowHeight={imgRowHeight}
        setImgRowHeight={setImgRowHeight}
        footerVisibility={footerVisibility}
        setFooterVisibility={(v: boolean) => setFooterVisibility(v)}
        mainImageIdx={mainImageIdx}
        setMainImageIdx={setMainImageIdx}
      />

      <Container maxWidth={maxWidth}>
        <Box component="main" sx={{ flexGrow: 1 }}>
          {pageNumber === 1 ? (
            <PrototypeCard
              prototypeData={prototypeData}
              featuredImgVisibility={featuredImgVisibility}
              viewCounterVisibility={viewCounterVisibility}
              goodCounterVisibility={goodCounterVisibility}
              imgsVisibility={imgsVisibility}
              imgRowHeight={imgRowHeight}
              footerVisibility={footerVisibility}
              mainImageIdx={mainImageIdx}
            />
          ) : null}
          {pageNumber === 2 ? (
            <SystemStructureCard prototypeData={prototypeData} />
          ) : null}
          {pageNumber === 3 ? (
            <StoryCard prototypeData={prototypeData} />
          ) : null}
        </Box>
      </Container>
    </Box>
  );
};

export default App;
