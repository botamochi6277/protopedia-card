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

import { marked } from "marked";
import parse from "html-react-parser";
// Set options
marked.use({
  async: false,
});

const parseHtmlStr = (html_str: string) => {
  // parse md text to html text
  const md_str = marked.parse(html_str) as string;
  // html text -> html dom
  const dom = parse(md_str);
  // html dom -> mui dom
  console.debug(dom);
  // TODO: image -> card media
  return dom;
};

const DetailCard = (props: { prototype_data: PrototypeData }) => {
  return (
    <Card variant="outlined" sx={{ alignContent: "end" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Story
        </Typography>
        {parseHtmlStr(props.prototype_data.free_comment)}
      </CardContent>

      <CardContent>
        <Typography variant="h5" component="div">
          Architecture
        </Typography>
        {parseHtmlStr(props.prototype_data.system_description)}
      </CardContent>
    </Card>
  );
};

export default DetailCard;
