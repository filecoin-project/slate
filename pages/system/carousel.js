import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import CodeBlock from "~/components/system/CodeBlock";
import Group from "~/components/system/Group";
import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";

export default class SystemPageCarousel extends React.Component {
  _handleCreate = (detail) => {
    System.dispatchCustomEvent({ name: "create-carousel", detail: detail });
  };

  _handleDelete = () => {
    System.dispatchCustomEvent({ name: "delete-carousel", detail: {} });
  };

  render() {
    return (
      <SystemPage
        title="SDS: Carousel"
        description="..."
        url="https://slate.host/system/carousel"
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
import { GlobalCarousel, dispatchCustomEvent } from "slate-react-system";`}
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
        <System.ButtonSecondary
          full
          onClick={() =>
            this._handleCreate({
              slides: [
                {
                  src:
                    "https://images.unsplash.com/photo-1428765048792-aa4bdde46fea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80",
                  alt: "photo of grey and black ferris wheel during daytime",
                },
                {
                  src:
                    "https://images.unsplash.com/photo-1503914068268-5413b35b45ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
                  alt: "pink road bike",
                },
              ].map((props) => (
                <img {...props} style={{ maxHeight: "80vh" }} />
              )),
            })
          }
        >
          Open carousel
        </System.ButtonSecondary>
        <br />
        <System.P>
          While the Carousel component is always present, a carousel will only
          appear once you trigger it by creating a custom event with the title{" "}
          <System.CodeText>"create-carousel"</System.CodeText>. It can be
          removed with a custom event entitled{" "}
          <System.CodeText>"delete-carousel"</System.CodeText>.
        </System.P>
        <br />
        <CodeBlock>
          {`class ExampleOne extends React.Component {
  _handleCreate = (detail) => {
    dispatchCustomEvent({ name: "create-carousel", detail: detail });
  };
  _handleDelete = () => {
    dispatchCustomEvent({ name: "delete-carousel", detail: {} });
  };

  render() {
    let carouselContent = [
      {
        src:
          "https://images.unsplash.com/photo-1428765048792-aa4bdde46fea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80",
        alt: "photo of grey and black ferris wheel during daytime",
      },
      {
        src:
          "https://images.unsplash.com/photo-1503914068268-5413b35b45ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        alt: "pink road bike",
      },
    ].map((props) => <img {...props} style={{ maxHeight: "80vh" }} />);

    return (
      <ButtonSecondary
        full
        onClick={() => this._handleCreate({ slides: carouselContent })}
      >
        Open Carousel
      </ButtonSecondary>
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
                { key: "b", name: "Type", width: "88px", type: "OBJECT_TYPE" },
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
                { key: "b", name: "Type", width: "88px", type: "OBJECT_TYPE" },
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
                      currentSlide
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
