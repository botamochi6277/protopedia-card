import * as React from "react";
import {
  Breakpoint,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Link,
  Typography,
  Box,
} from "@mui/material";

import { marked } from "marked";
import parse, {
  domToReact,
  DOMNode,
  HTMLReactParserOptions,
  attributesToProps,
  Element,
} from "html-react-parser";

import { Tweet } from "react-twitter-widgets";
// Set options
marked.use({
  async: false,
});

import MyAppBar from "./MyAppBar";

const parseMdStr = (md_str: string) => {
  // parse md text to html text
  const html_str = marked.parse(md_str) as string;
  // html text -> react nodes

  const options: HTMLReactParserOptions = {
    replace(node: DOMNode) {
      if (!node || !(node instanceof Element)) {
        return;
      }

      //   twitter
      if (
        node.attribs.href &&
        typeof node.attribs.href === "string" &&
        (node.attribs?.href.includes("twitter.com") ||
          node.attribs?.href.includes("x.com"))
      ) {
        console.log(`href: ${node.attribs.href}`);
        const ss = node.attribs.href.split("/");
        const tweet_id = ss[ss.length - 1];
        console.log(`tweet_id: ${tweet_id}`);
        return <Tweet tweetId={tweet_id} />;
      }

      // link

      if (node.name === "a" && node.attribs.href) {
        return (
          <a {...attributesToProps(node.attribs)} target="_blank">
            {domToReact(node.children as DOMNode[], options)}
          </a>
        );
      }
      if (node.name === "img" && node.attribs.src) {
        return <CardMedia component="img" image={node.attribs.src} />;
      }
    },
  };

  // console.debug(html_str);
  const dom = parse(html_str, options);
  // console.debug(dom);
  return dom;
};

const DetailCard = (props: { prototype_data: PrototypeData }) => {
  return (
    <Card variant="outlined" sx={{ alignContent: "end" }}>
      <MyAppBar />
      <CardContent>
        <Typography variant="h5" component="div">
          Story
        </Typography>
        {parseMdStr(props.prototype_data.free_comment)}
      </CardContent>

      <CardContent>
        <Typography variant="h5" component="div">
          Architecture
        </Typography>
        {parseMdStr(props.prototype_data.system_description)}
      </CardContent>
    </Card>
  );
};

export default DetailCard;
