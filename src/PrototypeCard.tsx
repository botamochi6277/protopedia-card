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

function MyImageList(props: { images: string[] }) {
    const images: string[] = props.images;

    if (images.length <= 1) {
        return (<></>)
    }

    const imageTitle = (name: string) => {
        const s = name.split('/');
        return s[s.length - 1]

    }

    const image_items = images.map(
        (img) => {
            return { img: img, title: imageTitle(img) }
        }
    )

    return (
        <Stack direction="row" spacing={1} justifyContent="center">
            {image_items.map((item) => (
                <ImageListItem
                    sx={{
                        height: 128,
                    }}>
                    <img
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </Stack>
    );
}


function PrototypeCard(props: {
    name: string,
    summary: string,
    developing_status: number,
    images: string[],
    developer: string,
    team: string,
    tags: string[],
    materials: string[],
    prototype_id: number,
    fetchHandle: (data: any) => void
}) {
    const name: string = props.name; //prototypeNm
    const summary: string = props.summary;
    const developing_status: number = props.developing_status;
    const images: string[] = props.images;
    const developer: string = props.developer;
    const team: string = props.team;
    const tags: string[] = props.tags;
    const materials: string[] = props.materials;
    const prototype_id = props.prototype_id;

    const fetchHandle = props.fetchHandle;
    const material_chips = materials.map((material) => <Chip label={material} color="info" key={`material-${material}`} />)
    const tag_chips = tags.map((tag) => <Chip label={tag} key={`tag-${tag}`} />)

    const url = `https://protopedia.net/prototype/${prototype_id}`;
    return (
        <Card variant="outlined">
            {/* <MyForm fetchHandle={fetchHandle} /> */}
            <MyAppBar fetchDataHandle={fetchHandle} />

            <CardMedia
                component="img"
                image={images[0]}
                title="featured image"
            />
            <CardContent>

                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="h5" component="div">
                        {name}</Typography>
                    <DevelopingStatusChip status={developing_status}></DevelopingStatusChip>
                </Stack>


                <Typography gutterBottom variant="subtitle1" color="text.secondary">
                    {team}/{developer}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {summary}
                </Typography>
            </CardContent>

            <CardContent>
                <MyImageList images={images.slice(1, 5)} />
            </CardContent>

            <CardContent>
                <Stack alignItems="center" spacing={2}>
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?data=https://protopedia.net/prototype/${prototype_id}&size=128x128&format=svg`} alt="QR code" />
                    <Typography sx={{ fontFamily: 'monospace' }}>
                        <Link href={url}>
                            {url}
                        </Link>
                    </Typography>
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