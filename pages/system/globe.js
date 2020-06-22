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
        <System.P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </System.P>
        <br />
        <br />

        <GLRenderer width={768} height={480} />
      </SystemPage>
    );
  }
}
