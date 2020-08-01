import * as React from "react";
import * as System from "~/components/system";

import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";
import CodeBlock from "~/components/system/CodeBlock";

const EXAMPLE_CODE = `import * as React from "react";
import { FriendsList } from "slate-react-system";

const friendsList = {
  requests: [
    {
      id: 72572959238,
      user: "@martina",
      img:
        "https://hub.textile.io/ipfs/bafybeiguo2uhd63reslbqkkgsqedgeikhtuwn5lzqpnqzluoaa3rnkfcvi",
    },
    {
      id: 2572952030,
      user: "@jim",
      img:
        "https://hub.textile.io/ipfs/bafybeicuz5wrxonu7ud6eskrnshxb66ksg3ncu3ie776xuiydlxrkfuvmu",
    },
  ],
  friends: [
    {
      id: 64783925020,
      user: "@haris",
      img: null,
      info: {
        chainHead:
          "t3solnyrrblqlmvi6gmzewzvu62vs7uqvkl22yemzr63bcylbaaqsg44mnipepuafg7efzzx4zwcsi66jgze3q",
        height: 8273,
        location: "United States",
        upload: 40092,
        download: 83900,
      },
    },
    {
      id: 637838385993,
      user: "@aaron",
      img:
        "https://hub.textile.io/ipfs/bafkreicb2lookm56omsfjwuwuziwftizmdsj4oneveuqiqlu6k5hc7j5nq",
      info: {
        chainHead:
          "bafyl5q5qo5wolfxsui4ciujfucqwf6gqso4lettcjwl2tyismgol7c4tngvoono5rmytuqotye7oosfjv6g7a",
        height: 4728,
        location: "United Kingdom",
        upload: 28725802,
        download: 2088774,
      },
    },
    {
      id: 982799203032,
      user: "@colin",
      img:
        "https://hub.textile.io/ipfs/bafybeigxb4arecl6iwsvjnwzi2lqpmmif6l2kgwptac7q3tzqmsimci2yq",
      info: {
        chainHead:
          "t3ual5q5qo5wolfxsui4ciujfucqwf6gqso4lettcjwl2tyismgol7c4tngvoono5rmytuqotye7oosfjv6g7a",
        height: 9223,
        location: "Netherlands",
        upload: 7692,
        download: 110,
      },
    },
    {
      id: 673883729083,
      user: "@jason",
      img:
        "https://hub.textile.io/ipfs/bafybeicp3x3poprnrsxhnqscsiuobxejxsbcsu2t4yhte6qmcofjvjqbn4",
      info: {
        chainHead:
          "t3solnyrrblqlmvi6gmzewzvu62vs7uqvkl22yemzr63bcylbaaqsg44mnipepuafg7efzzx4zwcsi66jgze3q",
        height: 1938,
        location: "Albania",
        upload: 82802020,
        download: 37792,
      },
    },
  ],
};

class Example extends React.Component {
  render() {
    return <FriendsList data={friendsList} />;
  }
}
`;

export default class SystemPagePeersList extends React.Component {
  render() {
    const friendsList = {
      requests: [
        {
          id: 72572959238,
          user: "@martina",
          img:
            "https://hub.textile.io/ipfs/bafybeiguo2uhd63reslbqkkgsqedgeikhtuwn5lzqpnqzluoaa3rnkfcvi",
        },
        {
          id: 2572952030,
          user: "@jim",
          img:
            "https://hub.textile.io/ipfs/bafybeicuz5wrxonu7ud6eskrnshxb66ksg3ncu3ie776xuiydlxrkfuvmu",
        },
      ],
      friends: [
        {
          id: 64783925020,
          user: "@haris",
          img: null,
          info: {
            chainHead:
              "t3solnyrrblqlmvi6gmzewzvu62vs7uqvkl22yemzr63bcylbaaqsg44mnipepuafg7efzzx4zwcsi66jgze3q",
            height: 8273,
            location: "United States",
            upload: 40092,
            download: 83900,
          },
        },
        {
          id: 637838385993,
          user: "@aaron",
          img:
            "https://hub.textile.io/ipfs/bafkreicb2lookm56omsfjwuwuziwftizmdsj4oneveuqiqlu6k5hc7j5nq",
          info: {
            chainHead:
              "bafyl5q5qo5wolfxsui4ciujfucqwf6gqso4lettcjwl2tyismgol7c4tngvoono5rmytuqotye7oosfjv6g7a",
            height: 4728,
            location: "United Kingdom",
            upload: 28725802,
            download: 2088774,
          },
        },
        {
          id: 982799203032,
          user: "@colin",
          img:
            "https://hub.textile.io/ipfs/bafybeigxb4arecl6iwsvjnwzi2lqpmmif6l2kgwptac7q3tzqmsimci2yq",
          info: {
            chainHead:
              "t3ual5q5qo5wolfxsui4ciujfucqwf6gqso4lettcjwl2tyismgol7c4tngvoono5rmytuqotye7oosfjv6g7a",
            height: 9223,
            location: "Netherlands",
            upload: 7692,
            download: 110,
          },
        },
        {
          id: 673883729083,
          user: "@jason",
          img:
            "https://hub.textile.io/ipfs/bafybeicp3x3poprnrsxhnqscsiuobxejxsbcsu2t4yhte6qmcofjvjqbn4",
          info: {
            chainHead:
              "t3solnyrrblqlmvi6gmzewzvu62vs7uqvkl22yemzr63bcylbaaqsg44mnipepuafg7efzzx4zwcsi66jgze3q",
            height: 1938,
            location: "Albania",
            upload: 82802020,
            download: 37792,
          },
        },
      ],
    };

    return (
      <SystemPage
        title="SDS: Friends List"
        description="..."
        url="https://slate.host/experiences/friends-list"
      >
        <System.H1>
          Friends List <ViewSourceLink file="experiences/friends-list.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          Here is an example of an experience for getting friends.
        </System.P>
        <br />
        <br />
        <System.FriendsList data={friendsList} />
        <br />
        <br />
        <br />
        <System.H2>Code</System.H2>
        <hr />
        <br />
        <CodeBlock>{EXAMPLE_CODE}</CodeBlock>
      </SystemPage>
    );
  }
}
