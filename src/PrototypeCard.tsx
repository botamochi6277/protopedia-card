import { Typography, Card, CardContent, CardMedia, Chip } from "@mui/material";


const DevelopingStatusChip = (props) => {
    const status = props.status;

    // （1:アイデア, 2:開発中, 3:完成, 4:供養）
    // const badges = {
    //     1: "https://img.shields.io/badge/status-idea-informational.svg?style=for-the-badge",
    //     2: "https://img.shields.io/badge/status-developing-important.svg?style=for-the-badge"
    // }

    if (status < 1 || 5 < status) {
        return (<Chip label="Error" color="error" variant="outlined" />)
    }

    const chips = {
        1: (<Chip label="Idea" color="primary" variant="outlined" size="small" />),
        2: (<Chip label="Developing" color="warning" variant="outlined" size="small" />),
        3: (<Chip label="Completed" color="success" variant="outlined" size="small" />),
        4: (<Chip label="Memorial" color="success" variant="outlined" size="small" />),
    }

    return chips[status];

}


function PrototypeCard(props) {
    const name: String = props.name; //prototypeNm
    const summary: String = props.summary;
    const developing_status: number = props.developing_status;
    const images = props.images;
    const developer = props.developer;
    const team_name = props.team_name;
    const tags = props.tags;
    const materials = props.materials;
    return (
        <Card>
            <CardMedia
                component="img"
                image={images[0]}
                title="featured image"
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {name}
                    <DevelopingStatusChip status={developing_status}></DevelopingStatusChip>
                </Typography>
                <Typography gutterBottom variant="subtitle1" color="text.secondary">
                    {developer}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {summary}
                </Typography>
            </CardContent>
        </Card>
    )
}



export default PrototypeCard;