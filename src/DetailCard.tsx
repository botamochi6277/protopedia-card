import {
  Breakpoint,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

const DetailCard = (props: { prototype_data: PrototypeData }) => {
  return (
    <Card variant="outlined" sx={{ alignContent: "end" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Story
        </Typography>
        {props.prototype_data.free_comment}
      </CardContent>

      <CardContent>
        <Typography variant="h5" component="div">
          Architecture
        </Typography>
        {props.prototype_data.system_description}
      </CardContent>
    </Card>
  );
};

export default DetailCard;
