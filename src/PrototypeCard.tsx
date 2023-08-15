import * as React from 'react'
import { Typography, Card, CardContent, CardMedia, Chip, CardActions, Stack, Link } from "@mui/material";

import ImageListItem from '@mui/material/ImageListItem';

import MyAppBar from "./MyAppBar";



const DevelopingStatusChip = (props: { status: number }) => {
    const status = props.status - 1;

    // （1:アイデア, 2:開発中, 3:完成, 4:供養）
    const chips = [
        (<Chip label="Idea" color="primary" size="small" />),
        (<Chip label="Developing" color="success" size="small" />),
        (<Chip label="Completed" color="info" size="small" />),
        (<Chip label="Memorial" color="secondary" size="small" />),
    ]

    return chips[status];
}

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
    fetchHandle: (data: any) => void
}) {
    const [qrcode_visibility, setQRcodeVisibility] = React.useState(true);// default show

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
    const material_chips = prototype_data.materials.map((material) => <Chip label={material} color="info" key={`material-${material}`} />)
    const tag_chips = prototype_data.tags.map((tag) => <Chip label={tag} key={`tag-${tag}`} />)

    const url = `https://protopedia.net/prototype/${prototype_data.prototype_id}`;

    const QrcodeBlock = () => {
        return (
            <Stack alignItems="center" spacing={2}>
                <img src={`https://api.qrserver.com/v1/create-qr-code/?data=https://protopedia.net/prototype/${prototype_data.prototype_id}&size=128x128&format=svg`} alt="QR code" />
                <Typography sx={{ fontFamily: 'monospace' }}>
                    <Link href={url}>
                        {url}
                    </Link>
                </Typography>
            </Stack>
        );
    }


    return (
        <Card variant="outlined">
            <MyAppBar
                fetchDataHandle={fetchHandle}
                qrcode_visibility={qrcode_visibility}
                qrcodeHandle={(v: boolean) => { setQRcodeVisibility(v); }}
                imgs_visibility={imgs_visibility}
                imgVisibilityHandle={(v: boolean[]) => { setImgsVisibility(v); }}
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

            <CardContent>
                <MyImageList images={prototype_data.images.slice(1, 5)}
                    visible={imgs_visibility.slice(1, 5)} />
            </CardContent>

            <CardContent sx={{ display: qrcode_visibility ? 'block' : "none" }}>
                <QrcodeBlock />
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