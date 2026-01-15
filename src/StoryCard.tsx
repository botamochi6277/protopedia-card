import { Card, CardContent, Typography } from "@mui/material";

import Markdown from "./Markdown";
import MyAppBar from "./MyAppBar";

const StoryCard = (props: { prototypeData: PrototypeData }) => {
  return (
    <Card variant="outlined" sx={{ alignContent: "end" }}>
      <MyAppBar />
      <CardContent>
        <Typography variant="h5" component="div">
          ストーリー
        </Typography>
        <Markdown md={props.prototypeData.free_comment} />
      </CardContent>
    </Card>
  );
};

export default StoryCard;
