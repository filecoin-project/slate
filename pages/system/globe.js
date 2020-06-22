import * as React from 'react';
import * as System from '~/components/system';

import GLRenderer from '~/components/three/GLRenderer';
import SystemPage from '~/components/system/SystemPage';
import ViewSourceLink from '~/components/system/ViewSourceLink';

export default class SystemPageGlobe extends React.Component {
  render() {
    return (
      <SystemPage title="FCDS: Globe" description="Lorem Ipsum." url="https://fps.onrender.com/system/globe">
        <System.H1>
          Globe <ViewSourceLink file="globe.js" />
        </System.H1>
        <br />
        <br />
        <System.P>An example of a globe that will be used for showing peers and file transfers.</System.P>
        <br />
        <br />

        <GLRenderer width={768} height={480} />
      </SystemPage>
    );
  }
}
