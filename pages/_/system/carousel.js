import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import CodeBlock from "~/components/system/CodeBlock";
import Group from "~/components/system/Group";
import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";

export default class SystemPageCarousel extends React.Component {
  componentDidMount() {
    const style = { maxHeight: "80%", maxWidth: "80%", display: "block" };

    System.dispatchCustomEvent({
      name: "slate-global-create-carousel",
      detail: {
        slides: [
          <img key="image-1" src="/static/cube_000.jpg" style={style} />,
          <img key="image-2" src="/static/cube_f7f7f7.jpg" style={style} />,
        ],
      },
    });
  }

  _handleOpen = (detail) => {
    System.dispatchCustomEvent({
      name: "slate-global-open-carousel",
      detail: detail,
    });
  };

  _handleClose = () => {
    System.dispatchCustomEvent({
      name: "slate-global-close-carousel",
      detail: {},
    });
  };

  render() {
    return (
      <SystemPage
        title="SDS: Carousel"
        description="..."
        url="https://slate.host/_/system/carousel"
      >
        <System.H1>
          Carousel <ViewSourceLink file="system/carousel.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          The carousel component is used to display multiple images.
        </System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>
          Import React and the Carousel Component, as well as the
          dispatchCustomEvent function.
        </System.P>
        <br />
        <CodeBlock>
          {`import * as React from "react";
import { 
  GlobalCarousel, 
  dispatchCustomEvent 
} from "slate-react-system";`}
        </CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P>
          Declare the component at the root level of your document (e.g. in
          index.js or App.js) so it is accessible throughout and will not get
          buried in the DOM tree.
        </System.P>
        <br />
        <System.P>
          Optionally, use <System.CodeText>style</System.CodeText> to style the
          background.
        </System.P>
        <br />
        <CodeBlock>
          {`class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <GlobalCarousel />
        {this.props.children}
      </React.Fragment>
    );
  }
}`}
        </CodeBlock>
        <System.GlobalCarousel />
        <br />
        <br />
        <br />
        <System.H2>Carousel</System.H2>
        <hr />
        <br />
        <System.ButtonSecondary full onClick={this._handleOpen}>
          Open carousel
        </System.ButtonSecondary>
        <br />
        <CodeBlock>
          {`class ExampleOne extends React.Component {
  componentDidMount() {
    // NOTE(jim):
    // The global carousel component takes an array of JSX elements
    // You can style them however you like.
    const style = { 
      maxHeight: "80%", 
      maxWidth: "80%", 
      display: "block" 
    };
    const slides = [
      <img key="i-1" src="/static/social.png" style={style} />,
      <img key="i-2" src="/static/social.jpg" style={style} />
    ];
    System.dispatchCustomEvent({
      name: "slate-global-create-carousel",
      detail: { slides },
    });
  }
  _handleOpen = () => {
    dispatchCustomEvent({ 
      name: "slate-global-open-carousel"
      detail: { index: 0 } 
    });
  };
  _handleClose = () => {
    dispatchCustomEvent({ name: "slate-global-close-carousel" });
  };
  render() {
    return (
      <System.ButtonSecondary full onClick={this._handleOpen}>
        Open Carousel
      </System.ButtonSecondary>
    );
  }
}`}
        </CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Accepted React Properties</System.H2>
        <hr />
        <br />
        <Group title="Notifications">
          <System.Table
            data={{
              columns: [
                { key: "a", name: "Name", width: "128px" },
                { key: "b", name: "Type", width: "104px", type: "OBJECT_TYPE" },
                { key: "c", name: "Default", width: "88px" },
                { key: "d", name: "Description", width: "100%" },
              ],
              rows: [
                {
                  id: 1,
                  a: "style",
                  b: "Object",
                  c: "{}",
                  d:
                    "Style object used to style the carousel background (color, etc.)",
                },
              ],
            }}
          />
        </Group>
        <br />
        <br />
        <br />
        <System.H2>
          Accepted <i>Create</i> Carousel Properties
        </System.H2>
        <hr />
        <br />
        <System.P>
          Note that these properties are passed through a custom event rather
          than as react properties.
        </System.P>
        <br />
        <Group title="Notifications">
          <System.Table
            data={{
              columns: [
                { key: "a", name: "Name", width: "128px" },
                { key: "b", name: "Type", width: "104px", type: "OBJECT_TYPE" },
                { key: "c", name: "Default", width: "88px" },
                { key: "d", name: "Description", width: "100%" },
              ],
              rows: [
                {
                  id: 1,
                  a: (
                    <span style={{ fontFamily: Constants.font.semiBold }}>
                      slides
                    </span>
                  ),
                  b: ["Component[]", "Component"],
                  c: "null",
                  d: "Components to be rendered inside the carousel",
                },
                {
                  id: 2,
                  a: (
                    <span style={{ fontFamily: Constants.font.semiBold }}>
                      index
                    </span>
                  ),
                  b: ["number"],
                  c: 0,
                  d: "Index of the initial slide",
                },
              ],
            }}
          />
        </Group>
      </SystemPage>
    );
  }
}
