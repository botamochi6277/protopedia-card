import { Typography, Box } from "@mui/material";

import parse, {
  domToReact,
  attributesToProps,
  Element,
  DOMNode,
} from "html-react-parser";
import { Tweet } from "react-twitter-widgets";

const Demo = (props: { is_replace?: boolean }) => {
  //   const html = `
  //   <p id="main">
  //     <span class="prettify">
  //       keep me and make me pretty!
  //     </span>
  //     <a href="https:google.com">link</a>
  //   </p>
  // `;

  const html = `
    <p>首の部分はｽﾀｯｸﾁｬﾝでお馴染みのパンチルト機構，他の関節はプラモデルでよく使われている3mm軸のピンジョイントになっています．</p>
  <p><a href="https://mermaid.live/edit#pako:eNp1UTtPwzAQ_ivRzc3Ikg0EA1JAFemGkXU4V2I19ll-RKC2_x23JgIlwtPpe9138hEU9wQNfHh0Q9W-CFvlp7cDWyrzX6Sq6_p01z6cgp-ELUxI78X8dNNFVIeCXgg_vWatvKJqQCs78pNW9DZbf1Q5dI9K4yjp03kKQfN_AsUj-yVnOAWS7MhKj1Hzknd5ddRjLDjZflU95GIcfn2Xoiy3t89LaPfY7lYxc35etTCumNlfaNiAIW9Q9_kHjlcc4kCGBDR57NEfBAh7zjpMkbsvq6CJPtEGkusx0r3GfICBZo9joPM3FtySQw"><img src="https://mermaid.ink/img/pako:eNp1UTtPwzAQ_ivRzc3Ikg0EA1JAFemGkXU4V2I19ll-RKC2_x23JgIlwtPpe9138hEU9wQNfHh0Q9W-CFvlp7cDWyrzX6Sq6_p01z6cgp-ELUxI78X8dNNFVIeCXgg_vWatvKJqQCs78pNW9DZbf1Q5dI9K4yjp03kKQfN_AsUj-yVnOAWS7MhKj1Hzknd5ddRjLDjZflU95GIcfn2Xoiy3t89LaPfY7lYxc35etTCumNlfaNiAIW9Q9_kHjlcc4kCGBDR57NEfBAh7zjpMkbsvq6CJPtEGkusx0r3GfICBZo9joPM3FtySQw?type=png" alt=""></a></p>
  <p>BLEで表情やモータへのコマンドを送ることもできます</p>
  <p><a href="https://twitter.com/botamochi6277/status/1685847760116097025">https://twitter.com/botamochi6277/status/1685847760116097025</a></p>
  `;

  const options = {
    replace(node: DOMNode) {
      if (!node || !(node instanceof Element)) {
        return;
      }

      if (node.name === "span") {
        return (
          <Typography sx={{ color: "hotpink" }}>
            {domToReact(node.children as DOMNode[], options)}
          </Typography>
        );
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

      if (node.name === "a" && node.attribs.href) {
        return (
          <a
            {...attributesToProps(node.attribs)}
            target="_blank"
            style={{ color: "green" }}
          >
            {domToReact(node.children as DOMNode[], options)}
          </a>
        );
      }

      if (node.name === "img" && node.attribs.src) {
        return (
          <Box
            component={"img"}
            src={node.attribs.src}
            // alt={atr.alt}
            // width={Number(atr.width)}
            // height={Number(atr.height)}
            sx={{ width: 400 }}
          ></Box>
        );
      }
    },
  };

  const dom = props.is_replace ? parse(html, options) : parse(html);
  //   console.info(dom);

  return dom;
};

export default Demo;
