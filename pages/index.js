import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVGLogo from "~/common/logo";
import * as SVG from "~/common/svg";
import * as System from "~/components/system";
import * as Validations from "~/common/validations";
import * as Strings from "~/common/strings";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsiteHeader from "~/components/core/WebsiteHeader";
import WebsiteFooter from "~/components/core/WebsiteFooter";
import Field from "~/components/core/Field";

import { css } from "@emotion/react";
import { useForm } from "~/common/hooks";
import { motion, AnimateSharedLayout } from "framer-motion";

const INTEGRATION = [
  {
    title: "Chrome",
    body: "Connect to your browser history and bookmarks.",
    logo: "https://slate.textile.io/ipfs/bafkreiamdcnqxcga7dj4fur7nqd57pbey7s6znnj4o2zpbkmsydp6rspdy",
  },
  {
    title: "Twitter",
    body: "Search your twitter bookmarks.",
    logo: "https://slate.textile.io/ipfs/bafkreihtujowfnffw5jxvdo7gqazo4oy3q3q4u4z2jflx5ygmpaj7pgtnu",
  },
  {
    title: "MetaMask",
    body: "Keep all of your NFTs in one place.",
    logo: "https://slate.textile.io/ipfs/bafkreiecbn5pjuebdelsehul6sqmxs5kk74mijmo6ybts3hfg5tr2p4rti",
  },
  {
    title: "And more later",
    last: true,
  },
];

const WEB3 = [
  {
    logo: <SVGLogo.PLHorizontal height="48px" />,
    text: "Textile is a set of open-source tools to help developers use the Filecoin network. That includes high-throughput storage APIs, permissionless storage bridges to Layer 1 blockchains, and more.",
    link: "https://www.textile.io/",
    action: "Learn more",
  },
  {
    logo: <SVGLogo.PLHorizontal height="48px" />,
    text: "Filecoin and IPFS are complementary protocols for storing and sharing data in the distributed web. Both systems are free, open-source, and share many building blocks, including data representation formats (IPLD) and network communication protocols (libp2p).",
    link: "https://docs.filecoin.io/about-filecoin/ipfs-and-filecoin/",
    action: "Learn more",
  },
  {
    logo: <SVGLogo.PLHorizontal height="48px" />,
    text: "Estuary is a decentralized data storage service built on key d-web protocols that allow you to Store and retrieve content quickly using IPFS. It allows you to Store content on Filecoin with proposition and succesful deal receipts.",
    link: "https://estuary.tech/",
    action: "Learn more",
  },
];

const FAQ = [
  {
    title: "How is Slate different from a file storage service or bookmarking tool?",
    text: "Slate is your personal, all in one database optimized for search and recall.",
  },
  {
    title: "How does Slate handle data privacy?",
    text: "We won’t monetize your data. It’s a pay subscription service. You should hold on to your sentitive data until we have an encryption solution.",
  },
  {
    title: "How much does Slate cost?",
    text: "30GB for free, with a competitive pricing plan coming soon.",
  },
];

const BANNER = [
  {
    link: "https://slate.host/tara/neon-genesis-evangelion?cid=bafybeib2zzeknjmih25wivzogzupd7atrdbaxpvmsxfgutrqymlyfc2dvi",
    name: "@tara",
    img: "https://slate.textile.io/ipfs/bafybeib2zzeknjmih25wivzogzupd7atrdbaxpvmsxfgutrqymlyfc2dvi",
  },
  {
    link: "https://slate.host/biodivlibrary/the-mushroom-book?cid=bafybeigph7tfup3wb3truahl7sycaywx3unwa365jk4assrjjlzv6d7x3a",
    name: "@biodivlibrary",
    img: "https://slate.textile.io/ipfs/bafybeigph7tfup3wb3truahl7sycaywx3unwa365jk4assrjjlzv6d7x3a",
  },
  {
    link: "https://slate.host/jin/cryptovoxels-history?cid=bafybeiafrj3erh3rfqux4zqc7u2px3veqdppbtizq26p443utxunrkgonu",
    name: "@jin",
    img: "https://slate.textile.io/ipfs/bafybeiafrj3erh3rfqux4zqc7u2px3veqdppbtizq26p443utxunrkgonu",
  },
  {
    link: "https://slate.host/ng/numero?cid=bafybeibhhfgc4amvymoblaxcoe6glyyvaxhylzisl4ib2itcbhn3mrviou",
    name: "@ng",
    img: "https://slate.textile.io/ipfs/bafybeibhhfgc4amvymoblaxcoe6glyyvaxhylzisl4ib2itcbhn3mrviou",
  },
  {
    link: "https://slate.host/thesimpsons/clips?cid=bafybeigce5klzr3vgzmlathvepuzhzhmwjc6bbvmsmcvu5eyisy6mnkx34",
    name: "@thesimpsons",
    img: "https://slate.textile.io/ipfs/bafybeigce5klzr3vgzmlathvepuzhzhmwjc6bbvmsmcvu5eyisy6mnkx34",
  },

  {
    link: "https://slate.host/bitgraves/september?cid=bafybeiclkru6hwzw2ghvsyrbnaf67taxxhq2hbpcia2oqj5ufdggwhcbti",
    name: "@bitgraves",
    img: "https://slate.textile.io/ipfs/bafybeiclkru6hwzw2ghvsyrbnaf67taxxhq2hbpcia2oqj5ufdggwhcbti",
  },
  {
    link: "https://slate.host/nypl/japan-kimbei-kusakabe?cid=bafkreidqz6imwffq5hpkacmxnrffagzxx5usybpitt42yuzthe6uf4idlm",
    name: "@nypl",
    img: "https://slate.textile.io/ipfs/bafkreidqz6imwffq5hpkacmxnrffagzxx5usybpitt42yuzthe6uf4idlm",
  },
  {
    link: "https://slate.host/atlas/cartography?cid=bafybeid2n55qb4thosrxlszhzi3nwiorswv7xi2d5ykbudp3ph5hc54baa",
    name: "@atlas",
    img: "https://slate.textile.io/ipfs/bafybeid2n55qb4thosrxlszhzi3nwiorswv7xi2d5ykbudp3ph5hc54baa",
  },
  {
    link: "https://slate.host/museosabiertos/palais-de-glace-fotografia?cid=bafybeigrznzuqymmfligf6mhc7adh6r7iw5gotbrzstcqeyyybaklfguki",
    name: "@museosabiertos",
    img: "https://slate.textile.io/ipfs/bafybeigrznzuqymmfligf6mhc7adh6r7iw5gotbrzstcqeyyybaklfguki",
  },
  {
    link: "https://slate.host/gndclouds/animation?cid=bafybeigh44l3uzsgv4hslpruxrr5s43olpj5llptmsafkemxbwlu4fbdc4",
    name: "@gndclouds",
    img: "https://slate.textile.io/ipfs/bafybeigh44l3uzsgv4hslpruxrr5s43olpj5llptmsafkemxbwlu4fbdc4",
  },

  {
    link: "https://slate.host/cindy/sw-sans?cid=bafkreihazsjq7hlho6ab6k7tise6ufv2ccat5gv5f3fz7yy4cluz3e356e",
    name: "@cindy",
    img: "https://slate.textile.io/ipfs/bafkreihazsjq7hlho6ab6k7tise6ufv2ccat5gv5f3fz7yy4cluz3e356e",
  },
  {
    link: "https://slate.host/haris/archive?cid=bafkreigcdnhxnh4fp7g2xy2gp43umhjrqyzz2a2t3ovnmcabepwusx5ldi",
    name: "@haris",
    img: "https://slate.textile.io/ipfs/bafkreigcdnhxnh4fp7g2xy2gp43umhjrqyzz2a2t3ovnmcabepwusx5ldi",
  },
  {
    link: "https://slate.host/guji/%E5%8C%97%E4%BA%AC%E7%9A%87%E5%9F%8E%E5%BB%BA%E7%AD%91%E8%A3%85%E9%A5%B0?cid=bafybeiceh32ka3l6nlxniziefaxqs44ib4i47pohdftjzvlbsoem3qk6ly",
    name: "@guji",
    img: "https://slate.textile.io/ipfs/bafybeiceh32ka3l6nlxniziefaxqs44ib4i47pohdftjzvlbsoem3qk6ly",
  },
  {
    link: "https://slate.host/martina/reaction-gifs?cid=bafybeif344hukksxizwk2dhmp6xjybnbw6x62r23m6wju2btxpsk4yluki",
    name: "@martina",
    img: "https://slate.textile.io/ipfs/bafybeif344hukksxizwk2dhmp6xjybnbw6x62r23m6wju2btxpsk4yluki",
  },
];

const DATAMETER = [
  { label: "Links", color: Constants.system.pink, radius: "8px 0 0 8px" },
  { label: "Docs", color: Constants.system.yellow },
  { label: "Books", color: Constants.system.teal },
  { label: "Audios", color: Constants.system.orange },
  { label: "Videos", color: Constants.system.purple },
  { label: "Images", color: Constants.system.green },
  { label: "30GB free storage", color: Constants.semantic.bgGrayLight4, width: "17%" },
  { label: "Unlimited data plan", color: Constants.semantic.bgGrayLight },
];

const OBJECTPREVIEWS = [
  {
    title: "OP-Z Synthesizer",
    link: <SVG.Link height={12} style={{ marginRight: 4 }} />,
    type: "teenage.engineering",
    preview:
      "https://slate.textile.io/ipfs/bafkreifwroxchchkkgdg77uqqj5naycbjm45hnpdesrxw4cczlteye2g74",
    URL: "https://slate.textile.io/ipfs/bafkreifwroxchchkkgdg77uqqj5naycbjm45hnpdesrxw4cczlteye2g74",
  },
  {
    title: "OP-Z Synthesizer",
    type: "PDF",
    preview:
      "https://slate.textile.io/ipfs/bafkreiduzx7g3ujntby42o5wfvpqtelwdhopytqopyho2b6ejfuw4lxlqe",
    URL: "https://slate.textile.io/ipfs/bafkreifwroxchchkkgdg77uqqj5naycbjm45hnpdesrxw4cczlteye2g74",
  },
  {
    title: "OP-Z Synthesizer",
    type: "PNG",
    preview:
      "https://slate.textile.io/ipfs/bafkreifwroxchchkkgdg77uqqj5naycbjm45hnpdesrxw4cczlteye2g74",
    URL: "https://slate.textile.io/ipfs/bafkreifwroxchchkkgdg77uqqj5naycbjm45hnpdesrxw4cczlteye2g74",
  },
  {
    title: "OP-Z Synthesizer",
    type: "MP3",
    preview:
      "https://slate.textile.io/ipfs/bafkreighl64zbil2p2tr35omlvatur4mhrzh22j3gibjikbf5rwhtasu3m",
    URL: "https://slate.textile.io/ipfs/bafkreifwroxchchkkgdg77uqqj5naycbjm45hnpdesrxw4cczlteye2g74",
  },
  {
    title: "OP-Z Synthesizer",
    type: "MP4",
    preview:
      "https://slate.textile.io/ipfs/bafkreifueoo5yk5ukl3ezjp2wwn6dqzjcn7ppv5yaxhni7aykhp76pjzli",
    URL: "https://slate.textile.io/ipfs/bafkreifwroxchchkkgdg77uqqj5naycbjm45hnpdesrxw4cczlteye2g74",
  },
  {
    title: "AUTHENTIC FONT",
    type: "TTF",
    preview:
      "https://slate.textile.io/ipfs/bafkreidqoebuicx7miwrsva2raeeebmcpvavsxzbkfumry32egb47zas3y",
    URL: "https://slate.textile.io/ipfs/bafkreifwroxchchkkgdg77uqqj5naycbjm45hnpdesrxw4cczlteye2g74",
  },
];

const STYLES_ROOT = css`
  width: 100%;
  height: 100%;
  overflow: hidden;
  min-height: 100vh;
  background-color: ${Constants.semantic.bgLight};
  color: ${Constants.semantic.textGrayDark};
`;

const STYLES_CONTAINER = css`
  max-width: 1080px;
  margin: 0 auto;
  padding: 160px 24px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    max-width: 480px;
    padding: 96px 16px;
  }
`;

const STYLES_CONTAINER_FLEX = css`
  ${STYLES_CONTAINER};
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
  }
`;

const STYLES_HERO_TEXT = css`
  display: flex;
  align-items: center;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
  }
`;

const STYLES_TEXT = css`
  max-width: calc(50% - 24px);
  margin: 48px 0;

  @media (max-width: ${Constants.sizes.mobile}px) {
    max-width: 100%;
  }
`;

const STYLES_HEADING = css`
  font-family: ${Constants.font.semiBold};
  flex-shrink: 0;
  color: ${Constants.semantic.textBlack};
  flex-shrink: 0;
  min-width: 50%;
  max-width: 100%;
`;

const STYLES_HEADING1 = css`
  ${STYLES_HEADING};
  font-size: 84px;
  line-height: 88px;
  letter-spacing: -0.05em;
  display: flex;
  align-items: baseline;

  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: 64px;
    line-height: 68px;
    letter-spacing: -0.04em;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 48px;
    line-height: 52px;
    letter-spacing: -0.04em;
  }
`;

const STYLES_HEADING2 = css`
  ${STYLES_HEADING};
  font-size: 56px;
  line-height: 64px;
  letter-spacing: -0.035em;
  margin-bottom: 30px;

  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: 48px;
    line-height: 56px;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 40px;
    line-height: 48px;
    margin-bottom: 32px;
  }
`;

const STYLES_HEADING3 = css`
  ${STYLES_HEADING};
  font-family: ${Constants.font.medium};
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.02em;
  margin-bottom: 16px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 18px;
    line-height: 28px;
  }
`;

const STYLES_BODY1 = css`
  font-family: ${Constants.font.text};
  font-size: 24px;
  line-height: 36px;
  letter-spacing: -0.02em;
  margin-bottom: 16px;

  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 20px;
  }
`;

const STYLES_BODY2 = css`
  font-family: ${Constants.font.text};
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.01em;
  max-width: 100%;
`;

const STYLES_BODY3 = css`
  font-family: ${Constants.font.medium};
  font-size: 12px;
  line-height: 20px;
  letter-spacing: -0.006em;
`;

const STYLES_IMG = css`
  max-width: 100%;
  overflow: hidden;
  box-shadow: 0px 10.8725px 57.9866px rgba(174, 176, 178, 0.3);
  max-width: calc(50% - 24px);
`;

const STYLES_IMG_HERO = css`
  ${STYLES_IMG};
  max-width: 150%;
  border: 12px solid ${Constants.semantic.textBlack};
  border-radius: 40px;

  @media (max-width: ${Constants.sizes.tablet}px) {
    border: 8px solid ${Constants.semantic.textBlack};
    border-radius: 24px;
  }
`;

const STYLES_BUTTON = css`
  cursor: poitner;
  display: inline-flex;
  flex-grow: 0;
  justify-content: center;
  align-items: center;
  box-shadow: ${Constants.shadow.lightMedium};
  text-decoration: none;
  font-family: ${Constants.font.medium};
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.006px;
  cursor: pointer;
`;

const STYLES_BUTTON_PRIMARY = css`
  ${STYLES_BUTTON};
  color: ${Constants.semantic.textWhite};
  background-color: ${Constants.system.blue};
`;

const STYLES_BUTTON_PRIMARY_BIG = css`
  ${STYLES_BUTTON_PRIMARY};
  padding: 18px 28px 18px 24px;
  border-radius: 20px;
  font-size: 16px;
  line-height: 24px;
`;

const STYLES_BUTTON_PRIMARY_BIG_HERO = css`
  ${STYLES_BUTTON_PRIMARY_BIG};
  margin-left: 50%;
  margin-bottom: 48px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-left: 0;
    margin-bottom: 32px;
  }
`;

const STYLES_BUTTON_PRIMARY_SMALL = css`
  ${STYLES_BUTTON_PRIMARY};
  padding: 1px 12px 3px;
  border-radius: 8px;
`;

const STYLES_BUTTON_SECONDARY = css`
  ${STYLES_BUTTON};
  color: ${Constants.semantic.textBlack};
  background-color: ${Constants.semantic.bgGrayLight};
`;

const STYLES_BUTTON_SECONDARY_BIG = css`
  ${STYLES_BUTTON_SECONDARY};
  background-color: ${Constants.semantic.bgWhite};
  padding: 18px 24px;
  border: 2px solid ${Constants.semantic.borderGrayLight};
  border-radius: 20px;
  font-size: 16px;
  line-height: 24px;
`;

const STYLES_BUTTON_SECONDARY_SMALL = css`
  ${STYLES_BUTTON_SECONDARY};
  padding: 1px 12px 3px;
  border-radius: 8px;
`;

const STYLES_DATA_METER = css`
  border: 1px solid ${Constants.semantic.borderGrayLight4};
  border-radius: 8px;
  background-color: ${Constants.semantic.bgGrayLight};
  width: 500%;
  height: 24px;
  overflow: hidden;
`;

const STYLES_DATA_USED = css`
  width: 0.5%;
  height: 100%;
  display: inline-block;
`;

const STYLES_DATA_LABEL_GROUP = css`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-top: 12px;
    display: block;
  }
`;

const STYLES_DATA_LABEL = css`
  display: flex;
  align-items: center;
  margin: 16px 24px 0 0;
`;

const STYLES_CARD_GROUP = css`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
  }
`;

const STYLES_CARD = css`
  background-color: ${Constants.semantic.bgWhite};
  border-radius: 24px;
  padding: 21px 20px 20px;
  width: calc(33.3% - 16px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    margin-bottom: 16px;
  }
`;

const STYLES_CURSOR_BLINK = css`
  display: inline-block;
  background-color: ${Constants.semantic.textGrayLight};
  width: 37px;
  height: 61px;
  margin-left: 6px;
  overflow: hidden;
  animation: blink-animation 1s steps(5, start) infinite;
  -webkit-animation: blink-animation 1s steps(5, start) infinite;
  @keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }
  @-webkit-keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }

  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 28.5px;
    height: 47px;
    margin-left: 4px;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 21px;
    height: 35px;
    margin-left: 2px;
  }
`;

const STYLES_CURSOR_BLINK_SMALL = css`
  ${STYLES_CURSOR_BLINK}
  width: 25px;
  height: 41px;
  margin-left: 3px;

  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 21px;
    height: 35px;
    margin-left: 2px;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 17.5px;
    height: 29px;
    margin-left: 2px;
  }
`;

const STYLES_ROTATING_BANNER = css`
  background-color: ${Constants.semantic.bgDark};
  width: 100%;
  overflow: hidden;
  padding: 48px 0 36px 0;
`;

const STYLES_BANNER_ANIMATION = css`
  display: flex;
  position: relative;
  align-items: center;
  animation: moving 240s linear infinite;
  -webkit-animation: moving 240s linear infinite;
  @keyframes moving {
    0% {
      transform: translateX(0px);
    }
    100% {
      transform: translateX(-90%);
    }
  }
  @-webkit-keyframes moving {
    0% {
      transform: translateX(0px);
    }
    100% {
      transform: translateX(-90%);
    }
  }
`;

const STYLES_BANNER_GROUP = css`
  display: flex;
  align-items: center;
`;

const STYLES_BANNER_IMG = css`
  max-width: 200px;
  max-height: 200px;
  box-shadow: ${Constants.shadow.lightMedium};
`;

const STYLES_BANNER_ITEM = css`
  text-decoration: none;
  color: ${Constants.semantic.textGrayLight};
  margin-left: 88px;
  cursor: pointer;
`;

const STYLES_AUTH_MODAL = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 36px 32px;
  background: linear-gradient(180deg, #ffffff 0%, #f7f8f9 100%);
  border-radius: 20px;
  max-width: 480px;
  margin: 0 auto;
  width: 100%;
`;

const STYLES_DIVIDER = css`
  height: 1px;
  width: 64px;
  background-color: ${Constants.semantic.textGray};
  margin: 32px auto;
`;

const STYLES_ROADMAP = css`
  display: flex;
  flex-direction: column;
  max-width: calc(50% - 24px);

  @media (max-width: ${Constants.sizes.mobile}px) {
    max-width: 100%;
  }
`;

const STYLES_TOOL_ICON = css`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px;
  background-color: ${Constants.semantic.bgGrayLight};
  border-radius: 12px;
  height: 56px;
  width: 56px;
  margin-right: 20px;
  margin-bottom: 16px;
`;

const STYLES_TOOL = css`
  display: flex;
  width: 100%;
`;

const STYLES_CONNECT_LINE = css`
  background-color: ${Constants.semantic.bgGrayLight4};
  height: 48px;
  width: 2px;
  margin: 0 0 16px 27px;
`;

const STYLES_CONNECT_BAR = css`
  width: 16px;
  height: 6px;
  background-color: ${Constants.semantic.textBlack};
  display: inline-flex;
  margin: 0 -4px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    height: 5px;
  }
`;

const STYLES_STORAGE = css`
  ${STYLES_HEADING2}
  color: ${Constants.semantic.textBlack};
  background-color: ${Constants.semantic.bgGrayLight};
  padding: 7px 16px 9px;
  border-radius: 24px;
  margin-left: 8px;
`;

const STYLES_STORAGE_LINE = css`
  display: flex;
  align-items: flex-end;
`;

const STYLES_WRAPPER = css`
  position: relative;
  background-color: ${Constants.semantic.bgLight};
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  width: 100%;
  border: 1px solid ${Constants.semantic.borderGrayLight};
  color: ${Constants.semantic.textBlack};
  text-decoration: none;

  :hover {
    box-shadow: ${Constants.shadow.card};
    transform: translateY(-4px);
    transition: transform 0.2s ease-in-out;
  }
`;

const STYLES_INNER_WRAPPER = css`
  display: block;
  padding-top: 100%;
`;

const STYLES_DESCRIPTION = css`
  position: absolute;
  bottom: 0;
  border-radius: 0px 0px 16px 16px;
  box-sizing: border-box;
  width: 100%;
  background-color: ${Constants.semantic.bgWhite};
  padding: 9px 16px 10px;
  font-family: ${Constants.font.medium};
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.006px;
`;

const STYLES_PREVIEW = css`
  position: absolute;
  top: 0;
  object-fit: cover;
  width: 100%;
  height: calc(100% - 58px);
  background-color: ${Constants.semantic.bgWhite};
  border-bottom: 1px solid ${Constants.semantic.borderGrayLight};
`;

const STYLES_TYPE = css`
  display: flex;
  padding-top: 3px;
  color: ${Constants.semantic.textGray};
  font-family: ${Constants.font.text};
  font-size: 12px;
  line-height: 16px;
  align-items: center;
`;

const STYLES_OBJECT_GROUP = css`
  display: grid;
  width: calc(50% - 24px);
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
  }
`;

const STYLES_FEATURE_CARD = css`
  width: calc(50% - 12px);
  max-height: 400px;
  background: ${Constants.semantic.bgGrayLight};
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 16px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    max-height: 372px;
  }
`;

const STYLES_ICON_BUTTON = css`
  width: 32px;
  height: 32px;
  display: inline-flex;
  margin-right: 8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${Constants.semantic.bgGrayLight4};
  border: 1px solid ${Constants.semantic.borderGrayLight4};
  box-shadow: 0px 4px 16px ${Constants.shadow.lightSmall};
  border-radius: 8px;
`;

const STYLES_FEATURE_DESCRIPTION = css`
  padding: 21px 20px 19px;
`;

const STYLES_FEATURE_IMG = css`
  display: block;
  margin: 0 20px;
  width: calc(100% - 40px);
  border: ${Constants.semantic.borderGrayLight4};
  border-radius: 16px;
  box-shadow: ${Constants.shadow.darkMedium};
`;

const ObjectPreview = (props) => {
  return (
    <a css={STYLES_WRAPPER} href={props.URL}>
      <div css={STYLES_INNER_WRAPPER}>
        <img css={STYLES_PREVIEW} src={props.preview} />
        <div css={STYLES_DESCRIPTION}>
          {props.title}
          <div css={STYLES_TYPE}>
            {props.link}
            {props.type}
          </div>
        </div>
      </div>
    </a>
  );
};

const DataMeter = (props) => {
  return (
    <div
      css={STYLES_DATA_USED}
      style={{
        backgroundColor: props.color,
        radius: props.radius,
        width: props.width,
      }}
    />
  );
};

const DataLabel = (props) => {
  return (
    <div css={STYLES_DATA_LABEL}>
      <div
        css={STYLES_DATA_METER}
        style={{ height: 12, width: 12, backgroundColor: props.color, marginRight: 8 }}
      />
      {props.label}
    </div>
  );
};

const Integration = (props) => {
  return (
    <div style={{ width: "100%" }}>
      <div css={STYLES_TOOL}>
        {props.logo ? (
          <img css={STYLES_TOOL_ICON} src={props.logo} />
        ) : (
          <div css={STYLES_TOOL_ICON} />
        )}
        <div>
          <div css={STYLES_HEADING3} style={{ marginBottom: 0 }}>
            {props.title}{" "}
          </div>
          <div css={STYLES_BODY2} style={{ color: Constants.semantic.textGrayDark }}>
            {props.body}
          </div>
        </div>
      </div>
      {!props.last && <div css={STYLES_CONNECT_LINE} />}
    </div>
  );
};

const Card = (props) => {
  return (
    <div css={STYLES_CARD} style={props.style}>
      <div styles={{ height: "100%" }}>
        {!!props.logo ? props.logo : <div css={STYLES_HEADING3}>{props.title}</div>}
        <div css={STYLES_BODY2}>{props.text}</div>
      </div>
      {props.action && (
        <a
          css={STYLES_BUTTON_SECONDARY_SMALL}
          style={{ marginTop: 24 }}
          href={props.link}
          target="_blank"
        >
          {props.action}
        </a>
      )}
    </div>
  );
};

const Banner = (props) => {
  return (
    <a css={STYLES_BANNER_ITEM} href={props.link}>
      <img css={STYLES_BANNER_IMG} src={props.img} />
      <div css={STYLES_BODY3}>{props.name}</div>
    </a>
  );
};

export default function IndexPage() {
  const title = `Slate`;
  const description = "Your personal search engine";
  const url = "https://slate.host/";
  const image =
    "https://slate.textile.io/ipfs/bafkreiddhzzwu5l6i7cikmydvumgnqwoml4rsurzftkopcvgcnwhndo7fa";

  const {
    getFieldProps: getSignupFielProps,
    getFormProps: getSigninFormProps,
    isSubmitting: isCheckingSignupEmail,
  } = useForm({
    validateOnBlur: false,
    initialValues: { email: "" },
    validate: ({ email }, errors) => {
      if (Strings.isEmpty(email)) errors.email = "Please provide an email";
      else if (!Validations.email(email)) errors.email = "Invalid email address";
      return errors;
    },
    onSubmit: async ({ email }) => {
      window.open(`/_/auth?tab=signup&email=${email}`, "_self");
    },
  });

  return (
    <WebsitePrototypeWrapper title={title} description={description} url={url} image={image}>
      <WebsiteHeader />
      <div css={STYLES_ROOT}>
        <div css={STYLES_CONTAINER}>
          <div css={STYLES_HEADING1}>your personal</div>
          <div css={STYLES_HEADING1} style={{ color: Constants.semantic.textGray }}>
            search
            <div css={STYLES_CURSOR_BLINK} />
          </div>
          <div css={STYLES_HERO_TEXT}>
            <div css={STYLES_HEADING1} style={{ marginBottom: 24 }}>
              engine
            </div>
            <div css={STYLES_BODY1}>
              Slate is a search tool for saving all of your files, bookmarks, and links on the web.
            </div>
          </div>
          <a css={STYLES_BUTTON_PRIMARY_BIG_HERO}>
            <img
              src="https://slate.textile.io/ipfs/bafkreifaspqfcywjonh4rnzdxp3gqkgtgl7gxxy274gql34h5v3ow6rqse"
              style={{ height: "24px", width: "24px", marginRight: "12px" }}
            />
            Sign up
          </a>
          <img
            css={STYLES_IMG_HERO}
            src="https://slate.textile.io/ipfs/bafybeiatsp4eyc2dtshzweopxgekrx6ki7no3hzcz475lqq3rroneo3rwm"
          />
        </div>

        <div css={STYLES_CONTAINER_FLEX}>
          <div css={STYLES_OBJECT_GROUP} style={{ marginRight: 48 }}>
            {OBJECTPREVIEWS.map((each) => (
              <ObjectPreview
                title={each.title}
                preview={each.preview}
                type={each.type}
                link={each.link}
                URL={each.URL}
              />
            ))}
          </div>
          <div css={STYLES_TEXT}>
            <div css={STYLES_HEADING2}>
              All of your stuff <br />
              in one place
            </div>
            <div css={STYLES_BODY2}>
              Slate gives you the power to save your bookmarks, files, and data all in one place.
            </div>
          </div>
        </div>

        <div css={STYLES_CONTAINER}>
          <div css={STYLES_TEXT}>
            <div css={STYLES_HEADING2}>
              Instant <span style={{ color: Constants.semantic.textGray }}>search</span>
              <div css={STYLES_CURSOR_BLINK_SMALL} />
              <br />
              from anywhere
            </div>
            <div css={STYLES_BODY2}>
              Your stuff is only as useful as it is accessible. Everything you save to Slate can be
              instantly accessed in the app or from anywhere in the browser with the Slate Chrome
              extension.
            </div>
          </div>
          <div css={STYLES_CONTAINER_FLEX} style={{ padding: 0 }}>
            <div css={STYLES_FEATURE_CARD}>
              <div css={STYLES_FEATURE_DESCRIPTION}>
                <div css={STYLES_HEADING3}>
                  Access Slate anytime, anywhere when you browse the Internet.
                </div>
                <div css={STYLES_ICON_BUTTON}>⌥</div>
                <div css={STYLES_ICON_BUTTON}>S</div>
              </div>
              <img
                css={STYLES_FEATURE_IMG}
                style={{ width: "160%", margin: "0 -30%", border: "6px solid #000000" }}
                src="https://slate.textile.io/ipfs/bafybeihsrxgjk5ax4wzbnfnq2kyg4djylrvpsbzrhitvnmcjixupbk5qjm"
              />
              <img
                css={STYLES_FEATURE_IMG}
                style={{ margin: "-80% auto 48px auto" }}
                src="https://slate.textile.io/ipfs/bafkreidm2ffwdjgk5j5w4ja2p7fjrflfeldyhak2qigkpatvhazc5rsvda"
              />
            </div>
            <div css={STYLES_FEATURE_CARD}>
              <div css={STYLES_FEATURE_DESCRIPTION}>
                <div css={STYLES_HEADING3}>
                  Search for references on your personal database with Slate.
                </div>
                <div style={{ height: 32 }}></div>
              </div>
              <img
                css={STYLES_FEATURE_IMG}
                style={{ margin: "0 0 0 20px", width: "110%" }}
                src="https://slate.textile.io/ipfs/bafkreidm2ffwdjgk5j5w4ja2p7fjrflfeldyhak2qigkpatvhazc5rsvda"
              />
            </div>
          </div>
        </div>

        <div css={STYLES_CONTAINER_FLEX}>
          <div css={STYLES_ROADMAP} style={{ marginRight: 48 }}>
            <div
              css={STYLES_BUTTON_PRIMARY_SMALL}
              style={{
                backgroundColor: Constants.system.orange,
                marginBottom: 16,
                alignSelf: "flex-start",
                cursor: "default",
              }}
            >
              Coming soon
            </div>
            {INTEGRATION.map((each) => (
              <Integration title={each.title} body={each.body} logo={each.logo} last={each.last} />
            ))}
          </div>
          <div css={STYLES_TEXT}>
            <div css={STYLES_HEADING2}>
              Con
              <div css={STYLES_CONNECT_BAR} />
              nect with <br />
              your favorite tools
            </div>
            <div css={STYLES_BODY2}>
              Starting with your browser, Slate integrates seamlessly with all the places you save,
              bookmark, and save things to make them searchable to you in one place.
            </div>
            <a css={STYLES_BUTTON_SECONDARY_BIG} style={{ marginTop: 48 }}>
              <img
                src="https://slate.textile.io/ipfs/bafybeieslchdkdqj2ryh7wwazmsj2iumro7xcawitx2w3rze5glk5py76u"
                style={{ height: "24px", width: "24px", marginRight: "12px" }}
              />
              Join waitlist
            </a>
          </div>
        </div>

        <div css={STYLES_CONTAINER}>
          <div css={STYLES_TEXT}>
            <div css={STYLES_HEADING2}>
              Minimize <br /> organizing effort
            </div>
            <div css={STYLES_BODY2}>
              Use Slate for yourself by creating channels based on filters applied to your files and
              data. You can publish any collection to the web for others to subscribe to and follow.
            </div>
          </div>

          <div css={STYLES_CONTAINER_FLEX} style={{ padding: 0 }}>
            <div css={STYLES_FEATURE_CARD}>
              <div css={STYLES_FEATURE_DESCRIPTION}>
                <div css={STYLES_HEADING3}>
                  No folders,
                  <br />
                  just tags
                </div>
                <div css={STYLES_ICON_BUTTON}>#</div>
              </div>
              <img
                css={STYLES_FEATURE_IMG}
                style={{ border: "6px solid #000000", marginTop: 48 }}
                src="https://slate.textile.io/ipfs/bafybeia7eclwk2zk6jv2agfwjj4fs57yhxz7vgwchaa6w34wf7xwohq7ky"
              />
              <img
                css={STYLES_FEATURE_IMG}
                style={{ width: "75%", margin: "-72% auto 48px auto" }}
                src="https://slate.textile.io/ipfs/bafkreigl7t3sobz5rmgpqoptzh7bozwmygmxzgskpwdovchkvs2yiws2vu"
              />
            </div>
            <div css={STYLES_FEATURE_CARD}>
              <div css={STYLES_FEATURE_DESCRIPTION}>
                <div css={STYLES_HEADING3}>
                  Public tags for sharing,
                  <br />
                  private tags for yourself
                </div>
                <div style={{ height: 32 }}></div>
              </div>
              <img
                css={STYLES_FEATURE_IMG}
                style={{ margin: "0 0 0 20px", width: "110%" }}
                src="https://slate.textile.io/ipfs/bafkreid33v3lktc3xicfqwhx55yssu2vo22dgax4pmax3bpgdfie4upy7e"
              />
            </div>
          </div>
        </div>

        <div css={STYLES_CONTAINER}>
          <div css={STYLES_TEXT}>
            <div css={STYLES_STORAGE_LINE}>
              <div css={STYLES_HEADING2} style={{ marginBottom: 8, minWidth: 0 }}>
                Affordable
              </div>
              <div>
                <div
                  css={STYLES_STORAGE}
                  style={{ marginBottom: 2, color: Constants.semantic.textGrayLight }}
                >
                  storage
                </div>
                <div
                  css={STYLES_STORAGE}
                  style={{ marginBottom: 2, color: Constants.semantic.textGray }}
                >
                  storage
                </div>
                <div css={STYLES_STORAGE} style={{ marginBottom: 0 }}>
                  storage
                </div>
              </div>
            </div>
            <div css={STYLES_HEADING2}>for everyone</div>
            <div css={STYLES_BODY2}>
              With Slate, you never have to worry about storage space again. Every account comes
              with 30GB of storage for free with a paid unlimited data plan coming soon.
            </div>
          </div>
          <div css={STYLES_DATA_METER}>
            {DATAMETER.map((each) => (
              <DataMeter radius={each.radius} width={each.width} color={each.color} />
            ))}
          </div>
          <div css={STYLES_DATA_LABEL_GROUP}>
            {DATAMETER.map((each) => (
              <DataLabel label={each.label} color={each.color} />
            ))}
          </div>
          <a css={STYLES_BUTTON_SECONDARY_BIG} style={{ marginTop: 48 }}>
            <img
              src="https://slate.textile.io/ipfs/bafybeieslchdkdqj2ryh7wwazmsj2iumro7xcawitx2w3rze5glk5py76u"
              style={{ height: "24px", width: "24px", marginRight: "12px" }}
            />
            Join waitlist
          </a>
        </div>

        <div css={STYLES_CONTAINER}>
          <div css={STYLES_TEXT}>
            <div css={STYLES_HEADING2}>Powered by web3</div>
            <div css={STYLES_BODY2}>
              All of Slate is built on lasting new technologies where data storage is designed to
              ensure the privacy, security, and portability of your data.
            </div>
          </div>
          <div css={STYLES_CARD_GROUP}>
            {WEB3.map((each) => (
              <Card logo={each.logo} text={each.text} link={each.link} action={each.action} />
            ))}
          </div>
        </div>
        <div css={STYLES_CONTAINER}>
          <div css={STYLES_TEXT}>
            <div css={STYLES_HEADING2}>FAQs</div>
          </div>
          <div css={STYLES_CARD_GROUP}>
            {FAQ.map((each) => (
              <Card title={each.title} text={each.text} />
            ))}
          </div>
        </div>

        <div css={STYLES_CONTAINER} style={{ paddingBottom: 24 }}>
          <div css={STYLES_TEXT}>
            <div css={STYLES_HEADING2}>Come hang out</div>
            <div css={STYLES_BODY2}>Join our discord channel for questions, discussions.</div>
            <a
              css={STYLES_BUTTON_PRIMARY_BIG}
              style={{ backgroundColor: "#7289d9", marginTop: 24 }}
            >
              <SVGLogo.Discord height="14px" style={{ marginRight: "16px" }} />
              Join Discord channel
            </a>
          </div>
        </div>
        <div css={STYLES_ROTATING_BANNER}>
          <div css={STYLES_BANNER_GROUP}>
            <div css={STYLES_BANNER_ANIMATION}>
              {BANNER.map((each) => (
                <Banner link={each.link} name={each.name} img={each.img} />
              ))}
              {BANNER.map((each) => (
                <Banner link={each.link} name={each.name} img={each.img} />
              ))}
              {BANNER.map((each) => (
                <Banner link={each.link} name={each.name} img={each.img} />
              ))}
              {BANNER.map((each) => (
                <Banner link={each.link} name={each.name} img={each.img} />
              ))}
            </div>
          </div>
        </div>

        <div css={STYLES_CONTAINER}>
          <div css={STYLES_TEXT} style={{ margin: "40px auto", textAlign: "center" }}>
            <div css={STYLES_HEADING2}>Get started for free</div>
            <div css={STYLES_BODY2}>Get 30GB storage for free and claim your user handle.</div>
          </div>
          <div css={STYLES_AUTH_MODAL}>
            <System.ButtonPrimaryFull
              type="link"
              href="/_/auth"
              style={{ backgroundColor: "#1DA1F2" }}
            >
              <SVGLogo.Twitter height="14px" style={{ marginRight: "16px" }} />
              Continue with Twitter
            </System.ButtonPrimaryFull>
            <div css={STYLES_DIVIDER} />
            <form {...getSigninFormProps()} style={{ width: "100%" }}>
              <Field
                {...getSignupFielProps("email")}
                label="Sign up with email"
                placeholder="Email"
                type="text"
                full
                style={{ backgroundColor: "rgba(242,242,247,0.5)" }}
                containerStyle={{ marginTop: "4px" }}
              />
              <AnimateSharedLayout>
                <motion.div layoutId="landing-signup-submit-button">
                  <System.ButtonPrimaryFull
                    loading={isCheckingSignupEmail}
                    type="submit"
                    style={{ marginTop: "16px" }}
                  >
                    Create account
                  </System.ButtonPrimaryFull>
                </motion.div>
              </AnimateSharedLayout>
            </form>
          </div>
        </div>
      </div>
      <AnimateSharedLayout>
        <motion.div layoutId="landing-footer">
          <WebsiteFooter />
        </motion.div>
      </AnimateSharedLayout>
    </WebsitePrototypeWrapper>
  );
}
