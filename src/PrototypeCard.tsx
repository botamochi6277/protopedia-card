import { Typography, Card, CardContent, CardMedia, Chip, CardActions, Stack } from "@mui/material";


const DevelopingStatusChip = (props) => {
    const status = props.status;

    // （1:アイデア, 2:開発中, 3:完成, 4:供養）
    // const badges = {
    //     1: "https://img.shields.io/badge/status-idea-informational.svg?style=for-the-badge",
    //     2: "https://img.shields.io/badge/status-developing-important.svg?style=for-the-badge"
    // }

    if (status < 1 || 5 < status) {
        return (<Chip label="Error" color="error" />)
    }

    const chips = {
        1: (<Chip label="Idea" color="primary" size="small" />),
        2: (<Chip label="Developing" color="success" size="small" />),
        3: (<Chip label="Completed" color="info" size="small" />),
        4: (<Chip label="Memorial" color="secondary" size="small" />),
    }

    return chips[status];

}


function PrototypeCard(props) {
    const name: String = props.name; //prototypeNm
    const summary: String = props.summary;
    const developing_status: number = props.developing_status;
    const images: String[] = props.images;
    const developer: String = props.developer;
    const team: String = props.team;
    const tags: String[] = props.tags;
    const materials: String[] = props.materials;


    const material_chips = materials.map((material) => <Chip label={material} color="info" key={`material-${material}`} />)
    const tag_chips = tags.map((tag) => <Chip label={tag} key={`tag-${tag}`} />)
    return (
        <Card variant="outlined">
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

            <CardActions>
                {material_chips}
            </CardActions>
            <CardActions>
                {tag_chips}
            </CardActions>
        </Card>
    )
}



export default PrototypeCard;