import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
  Box,
} from "@mui/material";

import ImageListItem from "@mui/material/ImageListItem";

import Footer from "./Footer";
import MyAppBar from "./MyAppBar";

// icons
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import TokenIcon from "@mui/icons-material/Token";

// const CardContentNoPadding = styled(CardContent)(`
//     padding-left: 1;
//     padding-right: 1;
//     padding-top: 0;
//     padding-bottom: 0;
//     &:last-child {
//         padding-bottom: 0;
//     }
// `);

function MyImageList(props: { images: string[]; visible: boolean[] }) {
  const images: string[] = props.images;

  if (images.length < 1) {
    return <></>;
  }

  const imageTitle = (name: string) => {
    const s = name.split("/");
    return s[s.length - 1];
  };

  const image_items = images
    .map((img, i) => {
      return props.visible[i]
        ? { img: img, title: imageTitle(img) }
        : undefined;
    })
    .filter((e) => e);

  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      {image_items.map((item, i) => (
        <ImageListItem
          sx={{
            height: 128,
          }}
          key={`list-img-item-${i + 1}`}
        >
          <img
            src={`${item?.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item?.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item?.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </Stack>
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

function PrototypeCard(props: {
  prototype_data: PrototypeData;
  //   visibility
  featured_img_visibility: boolean;
  imgs_visibility: boolean[];
  view_counter_visibility?: boolean;
  good_counter_visibility?: boolean;
  footer_visibility?: boolean;
}) {
  // notification card
  const prototype_data = props.prototype_data;

  const material_chips = prototype_data.materials.map((material) => (
    <Chip
      label={material}
      icon={<TokenIcon />}
      color="info"
      key={`material-${material}`}
    />
  ));
  const tag_chips = prototype_data.tags.map((tag) => (
    <Chip label={tag} icon={<LocalOfferIcon />} key={`tag-${tag}`} />
  ));

  return (
    <Card variant="outlined" sx={{ alignContent: "end" }}>
      <MyAppBar prototype_id={props.prototype_data.prototype_id} />

      <CardMedia
        component="img"
        image={prototype_data.main_img}
        title="featured image"
        sx={{
          display:
            props.prototype_data.main_img.length > 0 &&
            props.featured_img_visibility
              ? "block"
              : "none",
        }}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {prototype_data.name}
        </Typography>
        <Typography gutterBottom variant="subtitle1" color="text.secondary">
          {prototype_data.team ? `${prototype_data.team}/` : ""}
          {prototype_data.developer}
        </Typography>
        <Box sx={{ marginBottom: 1 }}>
          {/* badges */}
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <DevelopingStatusBadge status={prototype_data.developing_status} />
            {props.view_counter_visibility ? (
              <ViewCountBadge count={props.prototype_data.view_count} />
            ) : null}
            {props.good_counter_visibility ? (
              <GoodCountBadge count={props.prototype_data.good_count} />
            ) : null}
          </Stack>
        </Box>

        <Typography variant="body2" color="text.secondary">
          {prototype_data.summary}
        </Typography>
      </CardContent>

      <CardContent
        sx={{
          display:
            props.imgs_visibility.filter((e) => e).length > 0
              ? "block"
              : "none",
        }}
      >
        <MyImageList
          images={prototype_data.images}
          visible={props.imgs_visibility}
        />
      </CardContent>

      <CardActions>
        <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
          {material_chips}
          {tag_chips}
        </Stack>
      </CardActions>
      {props.footer_visibility ? <Footer /> : null}
    </Card>
  );
}

export default PrototypeCard;
