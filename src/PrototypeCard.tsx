import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
  Box,
  ImageList,
  ImageListItem,
} from "@mui/material";

import Footer from "./Footer";
import MyAppBar from "./MyAppBar";

import craft_materials from "./assets/craft-materials.json";

// icons
import TagIcon from "@mui/icons-material/Tag";

// const CardContentNoPadding = styled(CardContent)(`
//     padding-left: 1;
//     padding-right: 1;
//     padding-top: 0;
//     padding-bottom: 0;
//     &:last-child {
//         padding-bottom: 0;
//     }
// `);

function MyImageList(props: {
  images: string[];
  visible: boolean[];
  rowHeight: number;
}) {
  const images: string[] = props.images;

  if (images.length < 1) {
    return <></>;
  }

  const imageTitle = (name: string) => {
    const s = name.split("/");
    return s[s.length - 1];
  };

  const imageItems = images
    .map((img, i) => {
      return props.visible[i]
        ? { img: img, title: imageTitle(img) }
        : undefined;
    })
    .filter((e) => e);

  const numCols = 2;
  const numRows = Math.ceil(imageItems.length / numCols);
  const listHeight = props.rowHeight * numRows + 10; // 10 is margin
  // const listHeight =

  return (
    <ImageList
      sx={{ height: listHeight }}
      cols={2}
      rowHeight={props.rowHeight}
      variant="quilted"
    >
      {imageItems.map((item, i) => (
        <ImageListItem key={`list-img-item-${i + 1}`}>
          <img src={`${item?.img}`} alt={item?.title} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const DevelopingStatusBadge = (props: { status: number }) => {
  // （1:アイデア, 2:開発中, 3:完成, 4:供養）
  switch (props.status) {
    case 1:
      return (
        <Box
          component="img"
          sx={{
            objectFit: "cover",
          }}
          alt="Badge"
          src={`https://custom-icon-badges.demolab.com/badge/status-idea-0798A2.svg?logo=light-bulb&logoColor=white&style=flat`}
          key={"status badge"}
        />
      );
      break;
    case 2:
      return (
        <Box
          component="img"
          sx={{
            objectFit: "cover",
          }}
          alt="Badge"
          src={`https://custom-icon-badges.demolab.com/badge/status-developing-0798A2.svg?logo=play&logoColor=white&style=flat`}
          key={"status badge"}
        />
      );
    case 3:
      return (
        <Box
          component="img"
          sx={{
            objectFit: "cover",
          }}
          alt="Badge"
          src={`https://custom-icon-badges.demolab.com/badge/status-completed-0798A2.svg?logo=issue-closed&logoColor=white&style=flat`}
          key={"status badge"}
        />
      );
    case 4:
      return (
        <Box
          component="img"
          sx={{
            objectFit: "cover",
          }}
          alt="Badge"
          src={`https://custom-icon-badges.demolab.com/badge/status-memorial-0798A2.svg?logo=archive&logoColor=white&style=flat`}
          key={"status badge"}
        />
      );

    default:
      return (
        <Box
          component="img"
          sx={{
            objectFit: "cover",
          }}
          alt="Badge"
          src={`https://custom-icon-badges.demolab.com/badge/status-error-0798A2.svg?logo=issue-closed&logoColor=white&style=flat`}
          key={"status badge"}
        />
      );
      break;
  }
};

const ViewCountBadge = (props: { count: number }) => {
  return (
    <Box
      component="img"
      sx={{
        objectFit: "cover",
      }}
      alt="Badge"
      src={`https://custom-icon-badges.demolab.com/badge/view-${props.count}-0798A2.svg?logo=eye&logoColor=white&style=flat`}
      key={"view counter"}
    />
  );
};

const GoodCountBadge = (props: { count: number }) => {
  return (
    <Box
      component="img"
      sx={{
        objectFit: "cover",
      }}
      alt="Badge"
      src={`https://custom-icon-badges.demolab.com/badge/good-${props.count}-0798A2.svg?logo=thumbsup&logoColor=white&style=flat`}
      key={"good counter"}
    />
  );
};

const CraftMaterialChip = (props: { material: string }) => {
  const m = craft_materials.craft_materials.find((e) =>
    props.material.includes(e.material)
  );

  // m is undefined -> token icon
  // m.material include .svg -> use it as is
  // else -> use simpleicon
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Conditional_operator

  const avatar =
    m === undefined ? (
      <Avatar>{props.material[0]}</Avatar>
    ) : m.icon.endsWith(".svg") ? (
      <Avatar
        src={m.icon}
        sx={{ width: 20, height: 20, backgroundColor: "#ffffff" }}
      />
    ) : (
      <Avatar sx={{ width: 20, height: 20, backgroundColor: "#ffffff" }}>
        <Box
          component="img"
          sx={{
            padding: 0.4,
          }}
          src={`https://cdn.simpleicons.org/${m.icon}`}
        />
      </Avatar>
    );

  return (
    <Chip
      label={props.material}
      avatar={avatar}
      color="info"
      variant="outlined"
      key={`material-${props.material}`}
    />
  );
};

function PrototypeCard(props: {
  prototypeData: PrototypeData;
  //   visibility
  featuredImgVisibility: boolean;
  imgsVisibility: boolean[];
  viewCounterVisibility?: boolean;
  goodCounterVisibility?: boolean;
  footerVisibility?: boolean;
  // imageList row height
  imgRowHeight: number;
  mainImageIdx: number;
}) {
  // notification card
  const prototypeData = props.prototypeData;

  const material_chips = prototypeData.materials.map((material) => (
    <CraftMaterialChip material={material} key={`material-${material}`} />
  ));
  const tag_chips = prototypeData.tags.map((tag) => (
    <Chip
      label={tag}
      icon={<TagIcon />}
      variant="outlined"
      key={`tag-${tag}`}
    />
  ));

  return (
    <Card variant="outlined" sx={{ alignContent: "end" }}>
      <MyAppBar prototype_id={props.prototypeData.prototype_id} />

      <CardMedia
        component="img"
        image={
          prototypeData.images.length > 0
            ? prototypeData.images[props.mainImageIdx]
            : ""
        }
        title="featured image"
        sx={{
          display:
            0 <= props.mainImageIdx &&
            props.mainImageIdx < props.prototypeData.images.length
              ? "block"
              : "none",
        }}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {prototypeData.name}
        </Typography>
        <Typography gutterBottom variant="subtitle1" color="text.secondary">
          {prototypeData.team ? `${prototypeData.team}/` : ""}
          {prototypeData.developer}
        </Typography>
        <Box sx={{ marginBottom: 1 }}>
          {/* badges */}
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <DevelopingStatusBadge status={prototypeData.developing_status} />
            {props.viewCounterVisibility ? (
              <ViewCountBadge count={props.prototypeData.view_count} />
            ) : null}
            {props.goodCounterVisibility ? (
              <GoodCountBadge count={props.prototypeData.good_count} />
            ) : null}
          </Stack>
        </Box>

        <Typography variant="body2" color="text.secondary">
          {prototypeData.summary}
        </Typography>

        <MyImageList
          images={prototypeData.images}
          visible={props.imgsVisibility}
          rowHeight={props.imgRowHeight}
        />

        <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
          {material_chips}
          {tag_chips}
        </Stack>
      </CardContent>

      {props.footerVisibility ? <Footer /> : null}
    </Card>
  );
}

export default PrototypeCard;
