import { Breakpoint, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography } from "@mui/material";
import * as React from 'react';

import ImageListItem from '@mui/material/ImageListItem';
import { styled } from '@mui/system';
import MyAppBar from "./MyAppBar";

import DoNotTouchImgUrl from "/do-not-touch.svg";
import NoPhotographyImgUrl from "/no-photography.svg";
import PhotographyImgUrl from "/photography.svg";
// icons
import ArchiveIcon from '@mui/icons-material/Archive';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ConstructionIcon from '@mui/icons-material/Construction';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TokenIcon from '@mui/icons-material/Token';

const DevelopingStatusChip = (props: { status: number }) => {
    const status = props.status - 1;

    // （1:アイデア, 2:開発中, 3:完成, 4:供養）
    const chips = [
        (<Chip label="Idea" icon={<EmojiObjectsIcon />} color="primary" size="small" />),
        (<Chip label="Developing" icon={<ConstructionIcon />} color="success" size="small" />),
        (<Chip label="Completed" icon={<CheckCircleIcon />} color="info" size="small" />),
        (<Chip label="Memorial" icon={<ArchiveIcon />} color="secondary" size="small" />),
    ]

    return chips[status];
}


const CardContentNoPadding = styled(CardContent)(`
    padding-left: 1;
    padding-right: 1;  
    padding-top: 0;
    padding-bottom: 0;
    &:last-child {
        padding-bottom: 0;
    }
`);

function MyImageList(props: { images: string[], visible: boolean[] }) {
    const images: string[] = props.images;

    if (images.length < 1) {
        return (<></>)
    }

    const imageTitle = (name: string) => {
        const s = name.split('/');
        return s[s.length - 1]
    };

    const image_items = images.map(
        (img, i) => {
            return props.visible[i] ? { img: img, title: imageTitle(img) } : undefined;
        }
    ).filter(e => e);

    return (
        <Stack direction="row" spacing={1} justifyContent="center">
            {image_items.map((item, i) => (
                <ImageListItem
                    sx={{
                        height: 128,
                    }}
                    key={`list-img-item-${i + 1}`}>
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
    prototypeData: PrototypeData,
    fetchHandle: (data: any) => void,
    container_width: Breakpoint,
    setContainerWidth: (bp: Breakpoint) => void
}) {
    // notification card
    const [qrcode_visibility, setQRcodeVisibility] = React.useState(true);// default show
    const [photo_sign_visibility, setPhotoSignVisibility] = React.useState(false);
    const [no_photo_sign_visibility, setNoPhotoSignVisibility] = React.useState(false);
    const [dont_tough_sign_visibility, setDontTouchSignVisibility] = React.useState(false);

    const prototype_data = props.prototypeData;
    const [imgs_visibility, setImgsVisibility] = React.useState(
        prototype_data.images.map((img) => img ? true : false)
    );

    React.useEffect(() => {
        setImgsVisibility(
            prototype_data.images.map((img) => img ? true : false)
        );
    }, [props.prototypeData]);

    const fetchHandle = props.fetchHandle;
    const material_chips = prototype_data.materials.map((material) => <Chip label={material} icon={<TokenIcon />} color="info" key={`material-${material}`} />)
    const tag_chips = prototype_data.tags.map((tag) => <Chip label={tag} icon={<LocalOfferIcon />} key={`tag-${tag}`} />)


    const sign_items = [
        {
            name: "qrcode",
            image: `https://api.qrserver.com/v1/create-qr-code/?data=https://protopedia.net/prototype/${prototype_data.prototype_id}&size=128x128&format=svg&color=1e1e1e&qzone=2`,
            text: "Read More",
            visible: qrcode_visibility
        },
        {
            name: "welcome-to-taking-photo",
            image: PhotographyImgUrl,
            text: "Cameras Allowed",
            visible: photo_sign_visibility
        },
        {
            name: "no-photography",
            image: NoPhotographyImgUrl,
            text: "No Photography",
            visible: no_photo_sign_visibility
        },
        {
            name: "do-not-touch",
            image: DoNotTouchImgUrl,
            text: "Do Not Touch",
            visible: dont_tough_sign_visibility
        },
    ]

    return (
        <Card variant="outlined">
            <MyAppBar
                fetchDataHandle={fetchHandle}
                container_width={props.container_width}
                setContainerWidth={props.setContainerWidth}
                imgs_visibility={imgs_visibility}
                imgVisibilityHandle={(v: boolean[]) => { setImgsVisibility(v); }}
                qrcode_visibility={qrcode_visibility}
                qrcodeHandle={(v: boolean) => { setQRcodeVisibility(v); }}
                photo_sign_visibility={photo_sign_visibility}
                photoSignHandle={(v: boolean) => { setPhotoSignVisibility(v); }}
                no_photo_sign_visibility={no_photo_sign_visibility}
                noPhotoSignHandle={(v: boolean) => { setNoPhotoSignVisibility(v); }}
                dont_touch_visibility={dont_tough_sign_visibility}
                dontTouchHandle={(v: boolean) => { setDontTouchSignVisibility(v); }}
            />

            <CardMedia
                component="img"
                image={prototype_data.images[0]}
                title="featured image"
                sx={{ display: (imgs_visibility.length > 0 && imgs_visibility[0]) ? 'block' : "none" }}
            />
            <CardContent>

                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="h5" component="div">
                        {prototype_data.name}</Typography>
                    <DevelopingStatusChip status={prototype_data.developing_status}></DevelopingStatusChip>
                </Stack>

                <Typography gutterBottom variant="subtitle1" color="text.secondary">
                    {prototype_data.team ? `${prototype_data.team}/` : ""}{prototype_data.developer}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {prototype_data.summary}
                </Typography>
            </CardContent>

            <CardContent sx={{
                display: imgs_visibility.slice(1, 5).filter((e) => e).length > 0 ? 'block' : "none"
            }}>
                <MyImageList images={prototype_data.images.slice(1, 5)}
                    visible={imgs_visibility.slice(1, 5)} />
            </CardContent>

            <CardContent sx={{ maxHeight: 600 }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent={"space-evenly"} spacing={1} useFlexGap flexWrap="wrap">
                    {sign_items.map((item) => {

                        return (
                            <Card variant='outlined'
                                sx={{ display: item.visible ? 'block' : "none" }}
                                key={item.name}
                            >
                                <CardMedia
                                    component="img"
                                    image={item.image}
                                    height="128"
                                />
                                <CardContentNoPadding>
                                    <Typography textAlign={"center"} variant="body2" color="text.secondary">
                                        {item.text}
                                    </Typography>
                                </CardContentNoPadding>
                            </Card>)
                    })}
                </Stack>
            </CardContent>

            <CardActions>
                <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
                    {material_chips}
                    {tag_chips}
                </Stack>
            </CardActions>
        </Card>
    )
}



export default PrototypeCard;