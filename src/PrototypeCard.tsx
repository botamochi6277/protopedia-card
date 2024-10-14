import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import ImageListItem from "@mui/material/ImageListItem";

import Footer from "./Footer";
import MyAppBar from "./MyAppBar";

// icons
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import TokenIcon from "@mui/icons-material/Token";

import DevelopingStatusChip from "./DevelopingStatusChip";

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

function PrototypeCard(props: {
  prototype_data: PrototypeData;
  //   visibility
  imgs_visibility: boolean[];
  footer_visibility: boolean;
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
        image={prototype_data.images[0]}
        title="featured image"
        sx={{
          display:
            props.imgs_visibility.length > 0 && props.imgs_visibility[0]
              ? "block"
              : "none",
        }}
      />
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h5" component="div">
            {prototype_data.name}
          </Typography>
          <DevelopingStatusChip
            status={prototype_data.developing_status}
          ></DevelopingStatusChip>
        </Stack>

        <Typography gutterBottom variant="subtitle1" color="text.secondary">
          {prototype_data.team ? `${prototype_data.team}/` : ""}
          {prototype_data.developer}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {prototype_data.summary}
        </Typography>
      </CardContent>

      <CardContent
        sx={{
          display:
            props.imgs_visibility.slice(1, 5).filter((e) => e).length > 0
              ? "block"
              : "none",
        }}
      >
        <MyImageList
          images={prototype_data.images.slice(1, 5)}
          visible={props.imgs_visibility.slice(1, 5)}
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
