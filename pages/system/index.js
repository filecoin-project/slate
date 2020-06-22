import * as React from 'react';
import * as System from '~/components/system';

import SystemPage from '~/components/system/SystemPage';
import ViewSourceLink from '~/components/system/ViewSourceLink';

export default class SystemPageRoot extends React.Component {
  render() {
    return (
      <SystemPage
        title="FCDS 1.1"
        description="This is an early preview of the Filecoin Client Design System (FCDS)."
        url="https://fps.onrender.com/system">
        <System.H1>Welcome</System.H1>
        <br />
        <System.P>
          This is an early preview of the <strong>Filecoin Client Design System (FCDS 1.1)</strong> and{' '}
          <strong>Build your own client tutorials</strong>. We are developing our philosophy, principles and practices
          out in the open.
        </System.P>
        <br /> <br />
        <System.H2>Tutorials</System.H2>
        <br />
        <System.P>A walkthrough on how to use the design system and create your own Filecoin Client.</System.P>
        <br /> <br />
        <System.H2>Introduction</System.H2>
        <br />
        <System.P>
          Components here are free for you to use in any of your projects. The components will serve as common use cases
          of the Filecoin Network, making it easier to integrate the Filecoin Network into your own applications.
        </System.P>
        <br /> <br />
        <System.H2>License</System.H2>
        <br />
        <System.P>
          Copyright &copy; 2020 Protocol Labs
          <br />
          <br />
          Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
          documentation files (the "Software"), to deal in the Software without restriction, including without
          limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
          Software, and to permit persons to whom the Software is furnished to do so, subject to the following
          conditions:
          <br />
          <br />
          The above copyright notice and this permission notice shall be included in all copies or substantial portions
          of the Software.
          <br />
          <br />
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
          TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
          THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
          CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
          DEALINGS IN THE SOFTWARE.
        </System.P>
      </SystemPage>
    );
  }
}
