import * as React from "react";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import { css } from "@emotion/react";

import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";

const data = {
  peers: [
    {
      username: "jim",
      data: {
        photo: "https://slate.host/static/a1.jpg",
      },
    },
    {
      data: {
        photo: "https://slate.host/static/a1.jpg",
      },
      slates: [
        {
          id: "8d319e2d-f22f-4a7c-a977-924583521936",
          created_at: "2020-08-11T03:14:31.983Z",
          updated_at: "2020-08-11T23:14:08.568Z",
          published_at: null,
          slatename: "meta",
          data: {
            name: "meta",
            public: true,
            objects: [
              {
                id: "data-09772be3-ce84-4fe2-a180-aa80ef7f5130",
                url:
                  "https://hub.textile.io/ipfs/bafybeig3gcirazf2hgzlkg7uvhbw6wu52hlnf5mrgpltf2ldscopoejzqq",
                name: "data-7d02c494-d727-43ad-b5dd-91826b76cb97",
                type: "image/jpeg",
                ownerId: "be6d00ba-678c-48c3-a975-a2440cea4578",
              },
              {
                id: "data-70be7af7-a6f0-4462-8796-ca0ec1220b62",
                url:
                  "https://hub.textile.io/ipfs/bafybeibldkar7jxigru6fuwerro3sqxyh7afivp4vdthgjc52h4dxvn3my",
                name: "data-f64e3605-c96e-4193-80c8-0fa84994433d",
                type: "image/jpeg",
                ownerId: "be6d00ba-678c-48c3-a975-a2440cea4578",
              },
              {
                id: "data-5f7e777d-0ed3-4438-abd3-60d151c7e3c4",
                url:
                  "https://hub.textile.io/ipfs/bafkreihbqztfcwyt34kzrwzgb5ftmtucbjspeox4qeqh4ei5kg4sf5kliu",
                name: "data-43e74437-1352-4fb8-886a-930e8decf514",
                type: "image/png",
                ownerId: "be6d00ba-678c-48c3-a975-a2440cea4578",
              },
              {
                id: "data-721c5149-b246-4bdb-adf6-0ba248639eae",
                url:
                  "https://hub.textile.io/ipfs/bafkreicfa4kqxgfvijlbjglojd4wkxr2gkalcacbshvos4ivj3eauqhwz4",
                name: "data-3d94c57c-3beb-4849-96ee-a7521d3b4a3d",
                type: "image/png",
                ownerId: "be6d00ba-678c-48c3-a975-a2440cea4578",
              },
              {
                id: "data-91227202-6825-46e6-ad8e-476a2118be9b",
                url:
                  "https://hub.textile.io/ipfs/bafkreifjyqhlajkgckesqskpkn5ssxmlhkepw7rggfo7cdc2ibd2mc4pgi",
                name: "data-682e2ea9-e59a-4daf-964b-16a175332260",
                type: "image/png",
                ownerId: "be6d00ba-678c-48c3-a975-a2440cea4578",
              },
              {
                id: "data-25cfb6d7-3153-4260-8de3-02a6f42681bb",
                url:
                  "https://hub.textile.io/ipfs/bafkreiax3b4qkzyvsvl7vslvytlgnl2zlzcg4dsglq7wn7ue22kko32czu",
                name: "data-fa1bd28e-604b-4e06-aff8-76d99611e5b4",
                type: "image/png",
                ownerId: "be6d00ba-678c-48c3-a975-a2440cea4578",
              },
            ],
            ownerId: "be6d00ba-678c-48c3-a975-a2440cea4578",
          },
        },
        {
          id: "81e98c01-0850-4852-8000-0ab079ed224f",
          created_at: "2020-08-12T00:15:25.177Z",
          updated_at: "2020-08-18T18:35:21.099Z",
          published_at: null,
          slatename: "35mm",
          data: {
            name: "35mm",
            public: true,
            objects: [
              {
                id: "data-53f9a725-6ac7-45de-9bc4-88d6a018aebe",
                url:
                  "https://hub.textile.io/ipfs/bafybeifjb4ux4zc7lm5h3rkgxbwcuq6nfwrkw2obwwlfpxfkxw7f5mmx6e",
                name: "DSC03120.JPG",
                type: "image/jpeg",
                ownerId: "be6d00ba-678c-48c3-a975-a2440cea4578",
              },
            ],
            ownerId: "be6d00ba-678c-48c3-a975-a2440cea4578",
          },
        },
        {
          id: "d8a44698-940b-4052-ab15-278f0f7dd993",
          created_at: "2020-08-04T06:10:28.178Z",
          updated_at: "2020-08-12T00:13:41.879Z",
          published_at: null,
          slatename: "archive",
          data: {
            name: "archive",
            public: true,
            objects: [
              {
                id: "data-a25153c3-863d-4afd-af6c-cac509392362",
                url:
                  "https://hub.textile.io/ipfs/bafkreiecr4wiopl5eqbyln5iofsbyunvneujyyghttvrliaey5c5ucyyqa",
                name: "data-68b594bb-f7c8-43da-bf33-13de4a4cf691",
                type: "image/jpeg",
                ownerId: "be6d00ba-678c-48c3-a975-a2440cea4578",
              },
              {
                id: "data-edb98c33-babc-457f-918d-4f3e9b776b2d",
                url:
                  "https://hub.textile.io/ipfs/bafkreignpmkbjncqcsweweu7tmxj3ho6yrxo2bmuoct7sphfvwqstqymne",
                name: "data-78fb339b-0a78-41c1-8a37-e5643487095f",
                type: "image/jpeg",
                ownerId: "be6d00ba-678c-48c3-a975-a2440cea4578",
              },
              {
                id: "data-4cfa36e0-de70-4624-9875-d540fe1d708a",
                url:
                  "https://hub.textile.io/ipfs/bafkreialhhjsq42fozgwhmyflqzfq6i4pycyrokui5jibbu3mjxor77vfq",
                name: "data-daeb66cd-75bb-46e3-a3a7-dc8ef4702823",
                type: "image/jpeg",
                ownerId: "be6d00ba-678c-48c3-a975-a2440cea4578",
              },
              {
                id: "data-58914320-612b-4f5d-b201-a55bb17bb0a4",
                url:
                  "https://hub.textile.io/ipfs/bafkreiaxuexrd4ku4oj42bqz4l2snejdz7vkhpmrb3alhrdzjfbvr7yiiq",
                name: "data-3c072d3e-941e-4d2e-8782-53ee63ffb962",
                type: "image/jpeg",
                ownerId: "be6d00ba-678c-48c3-a975-a2440cea4578",
              },
              {
                id: "data-c02cba5f-d9d0-4865-853c-a75397fb9cd5",
                url:
                  "https://hub.textile.io/ipfs/bafkreicfd4dpa5dpakhdjklmuihfitztloahibevcnbci4bpwwfnoclepq",
                name: "data-08c98676-0082-49e2-9e69-fa87c6936e03",
                type: "image/jpeg",
                ownerId: "be6d00ba-678c-48c3-a975-a2440cea4578",
              },
            ],
            ownerId: "be6d00ba-678c-48c3-a975-a2440cea4578",
          },
        },
      ],
      username: "haris",
    },
    {
      username: "gndclouds",
      data: {
        photo: "https://slate.host/static/a1.jpg",
      },
    },
    {
      username: "martina",
      data: {
        photo: "https://slate.host/static/a1.jpg",
      },
    },
  ],
  following: [
    {
      username: "aaron",
      data: {
        photo: "https://slate.host/static/a1.jpg",
      },
    },
    {
      username: "jasonleyser",
      data: {
        photo: "https://slate.host/static/a1.jpg",
      },
    },
  ],
  followers: [
    {
      username: "taralin",
      data: {
        photo: "https://slate.host/static/a1.jpg",
      },
    },
    {
      username: "willfelker",
      data: {
        photo: "https://slate.host/static/a1.jpg",
      },
    },
  ],
};

const STYLES_TAB = css`
  padding: 8px 8px 8px 0px;
  margin-right: 24px;
  cursor: pointer;
  display: inline-block;
  font-size: ${Constants.typescale.lvl2};

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl1};
    margin-right: 12px;
  }
`;

const STYLES_TAB_GROUP = css`
  border-bottom: 1px solid ${Constants.system.gray};
  margin: 24px 0px 24px 0px;
`;

const STYLES_USER_ENTRY = css`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  font-size: ${Constants.typescale.lvl1};
  cursor: pointer;
`;

const STYLES_ACTION_BUTTON = css`
  padding: 8px;
  cursor: pointer;
  justify-self: end;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_PROFILE_IMAGE = css`
  height: 24px;
  width: 24px;
  margin: 8px 24px 8px 8px;
  border-radius: 50%;
`;

export default class SceneDirectory extends React.Component {
  state = {
    loading: false,
    tab: "peers",
    data: data,
  };

  _handleUnfollow = (e) => {};

  _handleUntrust = (e) => {};

  render() {
    console.log(this.props);
    return (
      <ScenePage>
        <ScenePageHeader title="Directory" />
        <div css={STYLES_TAB_GROUP}>
          <div
            css={STYLES_TAB}
            style={{
              color:
                this.state.tab === "peers"
                  ? Constants.system.pitchBlack
                  : Constants.system.gray,
            }}
            onClick={() => this.setState({ tab: "peers" })}
          >
            Trusted
          </div>
          <div
            css={STYLES_TAB}
            style={{
              color:
                this.state.tab === "following"
                  ? Constants.system.pitchBlack
                  : Constants.system.gray,
            }}
            onClick={() => this.setState({ tab: "following" })}
          >
            Following
          </div>
          <div
            css={STYLES_TAB}
            style={{
              marginRight: "0px",
              color:
                this.state.tab === "followers"
                  ? Constants.system.pitchBlack
                  : Constants.system.gray,
            }}
            onClick={() => this.setState({ tab: "followers" })}
          >
            Followers
          </div>
        </div>
        {this.state.tab === "peers"
          ? this.state.data.peers.map((user) => (
              <div
                key={user.username}
                css={STYLES_USER_ENTRY}
                onClick={() => {
                  this.props.onAction({
                    type: "NAVIGATE",
                    value: this.props.sceneId,
                    scene: "PROFILE",
                    data: user,
                  });
                }}
              >
                <img css={STYLES_PROFILE_IMAGE} src={user.data.photo} alt="" />
                <div>@{user.username}</div>
                <div css={STYLES_ACTION_BUTTON}>Remove</div>
              </div>
            ))
          : null}
        {this.state.tab === "following"
          ? this.state.data.following.map((user) => (
              <div
                key={user.username}
                css={STYLES_USER_ENTRY}
                onClick={() => {
                  this.props.onAction({
                    type: "NAVIGATE",
                    value: this.props.sceneId,
                    scene: "PROFILE",
                    data: user,
                  });
                }}
              >
                <img css={STYLES_PROFILE_IMAGE} src={user.data.photo} alt="" />
                <div>@{user.username}</div>
                <div css={STYLES_ACTION_BUTTON}>Unfollow</div>
              </div>
            ))
          : null}
        {this.state.tab === "followers"
          ? this.state.data.followers.map((user) => (
              <div
                key={user.username}
                css={STYLES_USER_ENTRY}
                onClick={() => {
                  this.props.onAction({
                    type: "NAVIGATE",
                    value: this.props.sceneId,
                    scene: "PROFILE",
                    data: user,
                  });
                }}
              >
                <img css={STYLES_PROFILE_IMAGE} src={user.data.photo} alt="" />
                <div>@{user.username}</div>
              </div>
            ))
          : null}
      </ScenePage>
    );
  }
}
