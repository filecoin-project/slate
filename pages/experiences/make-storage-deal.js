import * as React from 'react';
import * as System from '~/components/system';

import SystemPage from '~/components/system/SystemPage';
import ViewSourceLink from '~/components/system/ViewSourceLink';

export default class SystemPageMakeStorageDeal extends React.Component {
  render() {
    return (
      <SystemPage
        title="SDS: Make a Storage Deal"
        description="..."
        url="https://fps.onrender.com/experiences/make-storage-deal">
        <System.H1>
          Make a Storage Deal <ViewSourceLink file="experiences/make-storage-deal.js" />
        </System.H1>
        <br />
        <br />
        <System.P>...</System.P>
      </SystemPage>
    );
  }
}
