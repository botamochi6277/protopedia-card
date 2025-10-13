import { Card, CardContent, CardMedia, Typography } from "@mui/material";

import Markdown from "./Markdown";
import MyAppBar from "./MyAppBar";

const SystemStructureCard = (props: { prototype_data: PrototypeData }) => {
  return (
    <Card variant="outlined" sx={{ alignContent: "end" }}>
      <MyAppBar />
      <CardContent>
        {props.prototype_data.system_image.length > 0 ? (
          <CardMedia
            component={"img"}
            image={props.prototype_data.system_image}
          />
        ) : null}
        <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
          システム構成
        </Typography>
        <Markdown md={props.prototype_data.system_description} />
      </CardContent>
    </Card>
  );
};

export default SystemStructureCard;
