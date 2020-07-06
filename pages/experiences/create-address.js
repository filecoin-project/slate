import * as React from 'react';
import * as System from '~/components/system';

import SystemPage from '~/components/system/SystemPage';
import ViewSourceLink from '~/components/system/ViewSourceLink';

export default class SystemPageCreateAddress extends React.Component {
  render() {
    return (
      <SystemPage
        title="SDS: Create Address"
        description="..."
        url="https://fps.onrender.com/experiences/create-address">
        <System.H1>
          Create a Filecoin Address <ViewSourceLink file="experiences/create-address.js" />
        </System.H1>
        <br />
        <br />
        <System.P>...</System.P>
      </SystemPage>
    );
  }
}
