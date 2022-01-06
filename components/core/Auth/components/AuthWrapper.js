import * as React from "react";
import * as Utilities from "common/utilities";
import * as System from "~/components/system";
import * as Styles from "~/common/styles";

import { css } from "@emotion/react";
import { FullHeightLayout } from "~/components/system/components/FullHeightLayout";

const AUTH_BACKGROUNDS = [
  "https://slate.textile.io/ipfs/bafybeigostprfkuuvuqlehutki32fnvshm2dyy4abqotmlffsca4f7qs7a",
  "https://slate.textile.io/ipfs/bafybeicmokw3bl5six6u7eflbxcdblpgbx3fat24djrqg6n3hmbleidks4",
  "https://slate.textile.io/ipfs/bafybeibkttaavlkjxgtafqndyrbgvwqcng67zvd4v36w7fvpajwmdgmxcu",
  "https://slate.textile.io/ipfs/bafybeicpk7hkbeqdgbwkx3dltlz3akf3qbjpqgfphbnry4b6txnailtlpq",
  "https://slate.textile.io/ipfs/bafybeibb2xknh3iwwetrro73hw3xfzjgwbi4n4c63wqmwt5hvaloqnh33u",
  "https://slate.textile.io/ipfs/bafybeig4mij32vyda2jbh6zua3r2rkdpby6wtvninwgxvsejjdnls4wpc4",
  "https://slate.textile.io/ipfs/bafybeihmoycn4a6zafd2k3fjcadskrxwvri5cwhabatzbyzteouh3s7igi",
  "https://slate.textile.io/ipfs/bafybeigxssjsv3tmdhz4bj6vl2ca5c6rrhdkepw3mifvlllb7orpx5cfou",
];

const backgroundIdx = Utilities.getRandomNumberBetween(0, AUTH_BACKGROUNDS.length - 1);
const backgroundUrl = AUTH_BACKGROUNDS[backgroundIdx];

const STYLES_AUTH_FOOTER = (theme) => css`
  ${Styles.HORIZONTAL_CONTAINER_CENTERED};
  position: fixed;
  justify-content: flex-end;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2px 24px;
  background-color: ${theme.semantic.bgWhite};
  & > * + * {
    margin-left: 24px;
  }

  @media (max-width: ${theme.sizes.mobile}px) {
    padding: 2px 16px;
    justify-content: center;
    & > * + * {
      margin-left: 16px;
    }
  }

  @supports ((-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))) {
    -webkit-backdrop-filter: blur(75px);
    backdrop-filter: blur(75px);
    background-color: ${theme.semantic.bgBlurWhiteTRN};
  }
  a {
    text-decoration: none;
    ${Styles.HOVERABLE};
    color: ${theme.semantic.textBlack};
  }
`;

export default function AuthWrapper({ children, ...props }) {
  return (
    <FullHeightLayout style={{ backgroundImage: `url(${backgroundUrl})` }} {...props}>
      {children}
      <footer css={STYLES_AUTH_FOOTER}>
        <System.H6 as="a" href="/terms">
          Terms of service
        </System.H6>
        <System.H6 as="a" href="/guidelines">
          Community guidelines
        </System.H6>
        {/** TODO(Amine): change discord link  */}
        <System.H6 as="a" href="/">
          Join Discord
        </System.H6>
      </footer>
    </FullHeightLayout>
  );
}
