import Head from "next/head";

import * as React from "react";

export default class WebsitePrototypeWrapper extends React.Component {
  static defaultProps = {
    image:
      "https://slate.textile.io/ipfs/bafybeihtmqpx2lnlvaerfhq5imi2y3jzuf4jqspmmqbth3ebim4ebc2lqy",
  };

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>{this.props.title}</title>
          <meta name="title" content={this.props.title} />
          <meta name="description" content={this.props.description} />

          <meta property="og:type" content="website" />
          <meta property="og:url" content={this.props.url} />
          <meta property="og:title" content={this.props.title} />
          <meta property="og:description" content={this.props.description} />
          <meta property="og:image" content={this.props.image} />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={this.props.url} />
          <meta property="twitter:title" content={this.props.title} />
          <meta
            property="twitter:description"
            content={this.props.description}
          />
          <meta property="twitter:image" content={this.props.image} />

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/static/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon-16x16.png"
          />

          <link rel="shortcut icon" href="/static/favicon.ico" />
          <script>
            {`(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-52930282-7', 'auto');
ga('send', 'pageview');`}
          </script>
        </Head>
        {this.props.children}
      </React.Fragment>
    );
  }
}
