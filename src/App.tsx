import * as React from "react";
import { Breakpoint, Container, Box } from "@mui/material";

import PrototypeCard from "./PrototypeCard";
import SystemStructureCard from "./SystemStructureCard";
import StoryCard from "./StoryCard";
import MyDrawerMenu from "./MyDrawerMenu";
import theme from "./theme";

const App = () => {
  // params
  const [drawer_is_opened, setDrawerIsOpened] = React.useState(true);
  const [max_width, setMaxWidth] = React.useState<Breakpoint>("sm");

  const [page_number, setPageNumber] = React.useState(1);
  const [notification, setNotification] = React.useState<NotificationItem>({
    status: 0,
    msg: "",
  });

  const [featured_img_visibility, setFeaturedImgVisibility] =
    React.useState(true); // default show
  const [view_counter_visibility, setViewCounterVisibility] =
    React.useState(true); // default show
  const [good_counter_visibility, setGoodCounterVisibility] =
    React.useState(true); // default show

  const [footer_visibility, setFooterVisibility] = React.useState(false);

  const [prototype_data, setPrototypeData] = React.useState({
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

  const [imgs_visibility, setImgsVisibility] = React.useState(
    prototype_data.images.map((img) => (img ? true : false))
  );

  React.useEffect(() => {
    setImgsVisibility(prototype_data.images.map((img) => (img ? true : false)));
  }, [prototype_data]);

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

  const drawer_width = 400;

  return (
    <Box sx={{ display: "flex" }}>
      <MyDrawerMenu
        drawer_width={drawer_width}
        theme={theme}
        open={drawer_is_opened}
        openHandle={setDrawerIsOpened}
        page_number={page_number}
        pageChangeHandle={setPageNumber}
        notification={notification}
        setNotification={setNotification}
        fetchDataHandle={parseProtoTypeRawData}
        container_width={max_width}
        setContainerWidth={setMaxWidth}
        featured_img_visibility={featured_img_visibility}
        featuredImgVisibilityHandle={setFeaturedImgVisibility}
        view_counter_visibility={view_counter_visibility}
        viewCounterVisibilityHandle={setViewCounterVisibility}
        good_counter_visibility={good_counter_visibility}
        goodCounterVisibilityHandle={setGoodCounterVisibility}
        imgs_visibility={imgs_visibility}
        imgVisibilityHandle={(v: boolean[]) => {
          setImgsVisibility(v);
        }}
        footer_visibility={footer_visibility}
        footerVisibilityHandle={(v: boolean) => setFooterVisibility(v)}
      />

      <Container maxWidth={max_width}>
        <Box component="main" sx={{ flexGrow: 1 }}>
          {page_number === 1 ? (
            <PrototypeCard
              prototype_data={prototype_data}
              featured_img_visibility={featured_img_visibility}
              view_counter_visibility={view_counter_visibility}
              good_counter_visibility={good_counter_visibility}
              imgs_visibility={imgs_visibility}
              footer_visibility={footer_visibility}
            />
          ) : null}
          {page_number === 2 ? (
            <SystemStructureCard prototype_data={prototype_data} />
          ) : null}
          {page_number === 3 ? (
            <StoryCard prototype_data={prototype_data} />
          ) : null}
        </Box>
      </Container>
    </Box>
  );
};

export default App;
