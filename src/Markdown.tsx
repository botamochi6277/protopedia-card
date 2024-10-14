import { CardMedia } from "@mui/material";

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

const Markdown = (props: { md: string }) => {
  // parse md text to html text
  const html_str = marked.parse(props.md) as string;
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

export default Markdown;
