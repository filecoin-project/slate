import * as React from 'react';
import * as System from '~/components/system';

import SystemPage from '~/components/system/SystemPage';
import ViewSourceLink from '~/components/system/ViewSourceLink';

export default class SystemPagePeersList extends React.Component {
  render() {
    return (
      <SystemPage title="SDS: Peers List" description="..." url="https://fps.onrender.com/experiences/peers-list">
        <System.H1>
          Peers List <ViewSourceLink file="experiences/peers-list.js" />
        </System.H1>
        <br />
        <br />
        <System.P>...</System.P>
      </SystemPage>
    );
  }
}
