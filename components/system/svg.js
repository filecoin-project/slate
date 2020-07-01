export const Dismiss = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    height={props.height}
    style={props.style}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const Privacy = (props) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    height={props.height}
    style={props.style}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="m22.823 8.611c.570278-.632425.570278-1.59357 0-2.226-2.623-2.885-6.792-5.701-10.823-5.634-4.031-.067-8.2 2.749-10.821 5.634l-.00000003.00000004c-.569817.632603-.569817 1.5934.00000007 2.226 2.563 2.824 6.721 5.706 10.821 5.638" />
      <path d="m15.75 7.5c0 2.07107-1.67893 3.75-3.75 3.75s-3.75-1.67893-3.75-3.75 1.67893-3.75 3.75-3.75h-.00000016c2.07107-.00000009 3.75 1.67893 3.75 3.75z" />
      <path d="m15.75 23.25c-.82842 0-1.5-.67158-1.5-1.5v-4.5c0-.82842.67158-1.5 1.5-1.5h6c.82842 0 1.5.67158 1.5 1.5v4.5c0 .82842-.67158 1.5-1.5 1.5z" />
      <path d="m18.75 11.25h-.00000013c-1.65685.00000007-3 1.34315-3 3v1.5h6v-1.5-.00000013c0-1.65685-1.34315-3-3-3-.00000004 0-.00000009 0-.00000013 0z" />
      <path d="m18.75 19.154h-.00000002c.207107-.00000001.375.167893.375.375.00000001.207107-.167893.375-.375.375-.207107.00000001-.375-.167893-.375-.375v.00000006c-.00000003-.207107.167893-.375.375-.375" />
    </g>
  </svg>
);

export const FileImage = (props) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    height={props.height}
    style={props.style}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.207 4.5-.00000002-.00000002c.187549.187493.292943.441805.293.707v17.293c0 .552285-.447715 1-1 1h-17-.00000004c-.552285-.00000002-1-.447715-1-1v-21 .00000015c-.00000008-.552285.447715-1 1-1h13.293.00000001c.265195.00005664.519507.105451.707.293z" />
      <path d="m12.826 12.366-2.8-3.74.00000001.00000002c-.165798-.22083-.479221-.265442-.700051-.0996437-.0578698.0434484-.105619.0989405-.139949.162644l-3.276 6.074.00000001-.00000002c-.130892.24315-.0398879.546371.203262.677262.0727636.0391698.154101.0596942.236738.0597376h4.181" />
      <path d="m17.3284 13.1716c1.5621 1.5621 1.5621 4.09476 0 5.65685-1.5621 1.5621-4.09476 1.5621-5.65685 0-1.5621-1.5621-1.5621-4.09476 0-5.65685 1.5621-1.5621 4.09476-1.5621 5.65685 0" />
    </g>
  </svg>
);

export const Information = (props) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill="currentColor"
      d="m12 0h-.00000052c-6.62742.00000029-12 5.37258-12 12 .00000029 6.62742 5.37258 12 12 12 6.62742-.00000029 12-5.37258 12-12l-.00000013-.00012266c-.00723277-6.62445-5.37568-11.9928-12.0001-11.9999zm0 19h-.00000007c-.828427-.00000004-1.5-.671573-1.5-1.5.00000004-.828427.671573-1.5 1.5-1.5.828427.00000004 1.5.671573 1.5 1.5v-.00000007c0 .828427-.671573 1.5-1.5 1.5zm1.6-6.08h.00000001c-.364588.159119-.600193.519202-.6.917 0 .552285-.447715 1-1 1s-1-.447715-1-1l-.00000003-.00045412c-.00000018-1.19303.706913-2.27268 1.80042-2.74973l.00000001-.00000001c1.01225-.442058 1.47449-1.62101 1.03243-2.63326-.442058-1.01225-1.62101-1.47449-2.63326-1.03243-.728973.318347-1.19999 1.03843-1.19958 1.83388 0 .552285-.447715 1-1 1s-1-.447715-1-1v-.00005995c-.00000033-2.20914 1.79086-4 4-4 2.20914-.00000033 4 1.79086 4 4 .00000024 1.59051-.942318 3.0299-2.40005 3.66609z"
    />
  </svg>
);

export const Plus = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const Logo = (props) => (
  <svg
    viewBox="0 0 127 127"
    height={props.height}
    style={props.style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m71.4 57.6c-.7 3.3-1.3 6.4-2 9.8 5.9.9 11.7 1.7 17.7 2.6-.5 1.6-.9 3.1-1.4 4.8-5.8-.8-11.5-1.7-17.3-2.5-1.1 4.2-2 8.3-3.3 12.2-1.4 4.4-3 8.7-5 12.9-2.6 5.2-6.8 8.9-12.7 10.1-3.5.7-7 .4-10-1.9-.9-.7-1.8-1.8-1.9-2.8-.1-1.1.5-2.7 1.4-3.3.6-.5 2.3-.1 3.1.5 1.1.8 1.8 2.1 2.6 3.3 1.8 2.5 4.4 2.9 6.8.8 2.9-2.5 4.4-5.8 5.3-9.3 1.9-7.3 3.6-14.8 5.3-22.2.1-.3 0-.7 0-1.3-5.4-.8-10.8-1.7-16.5-2.5.2-1.6.4-3 .6-4.8 5.6.8 11.1 1.6 17 2.4.8-3.2 1.5-6.4 2.3-9.7-6-.9-11.7-1.8-17.8-2.7.2-1.6.4-3.2.6-4.8 6.1.9 12 1.7 18.2 2.6.5-1.8.9-3.5 1.4-5.1 1.7-5.6 3.2-11.3 6.8-16.2s8.1-8.1 14.5-7.8c2.8.1 5.5.9 7.5 3.2.4.5 1 1.1 1 1.6-.1 1.2 0 2.9-.8 3.6-1.1 1.1-2.8.5-4-.6-.9-.9-1.6-1.9-2.3-2.9-1.8-2.4-4.7-2.9-6.8-.7-1.6 1.7-3.2 3.7-3.9 5.9-2.1 6.6-3.8 13.2-5.8 20.2 5.9.9 11.4 1.7 17.1 2.5-.5 1.6-.9 3.1-1.3 4.7-5.5-1.1-10.9-1.9-16.4-2.6z"
      fill="currentColor"
    />
  </svg>
);

export const ChevronDown = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
};

export const CheckBox = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};

export const CopyAndPaste = (props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9.5 21.5h-8-.00000004c-.552285-.00000002-1-.447715-1-1v-16 .00000015c-.00000008-.552285.447715-1 1-1h2" />
        <path d="m13.5 3.5h2-.00000004c.552285-.00000002 1 .447715 1 1v3.5" />
        <path d="m9.56066.93834c.585786.585786.585786 1.53553 0 2.12132-.585786.585786-1.53553.585786-2.12132 0-.585786-.585786-.585786-1.53553 0-2.12132.585786-.585786 1.53553-.585786 2.12132 0" />
        <path d="m9.915 2.5h2.585-.00000004c.552285-.00000002 1 .447715 1 1v1c0 .552285-.447715 1-1 1h-8-.00000004c-.552285-.00000002-1-.447715-1-1v-1 .00000015c-.00000008-.552285.447715-1 1-1h2.585" />
        <path d="m22.5 22.5c0 .552285-.447715 1-1 1h-9-.00000004c-.552285-.00000002-1-.447715-1-1v-11.5.00000015c-.00000008-.552285.447715-1 1-1h7.086.00000001c.265195.00005664.519507.105451.707.293l1.914 1.914-.00000002-.00000002c.187549.187493.292943.441805.293.707z" />
        <path d="m14.5 14.5h5" />
        <path d="m14.5 17.5h5" />
      </g>
    </svg>
  );
};

export const BandwidthDown = (props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="m20.25 17.25h-.00000013c1.65685-.00000007 3 1.34315 3 3 .00000007 1.65685-1.34315 3-3 3h-16.5-.00000013c-1.65685-.00000007-3-1.34315-3-3 .00000007-1.65685 1.34315-3 3-3z" />
        <path d="m7.5 6.751h-1.356-.00000002c-1.39991-.00004099-2.61375.968129-2.925 2.333l-2.394 10.499" />
        <path d="m23.175 19.583-2.394-10.5.00000014.0000006c-.311246-1.36487-1.52509-2.33304-2.925-2.333h-1.356" />
        <path d="m19.125 19.875h-.00000002c-.207107.00000001-.375.167893-.375.375.00000001.207107.167893.375.375.375.207107-.00000001.375-.167893.375-.375 0-.207107-.167893-.375-.375-.375" />
        <path d="m9.75 20.25h-5.25" />
        <path d="m9 9.75 3 3 3-3" />
        <path d="m12 12.75v-12" />
      </g>
    </svg>
  );
};

export const BandwidthUp = (props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="m20.25 17.25h-.00000013c1.65685-.00000007 3 1.34315 3 3 .00000007 1.65685-1.34315 3-3 3h-16.5-.00000013c-1.65685-.00000007-3-1.34315-3-3 .00000007-1.65685 1.34315-3 3-3z" />
        <path d="m7.5 6.751h-1.356-.00000002c-1.39991-.00004099-2.61375.968129-2.925 2.333l-2.394 10.499" />
        <path d="m23.175 19.583-2.394-10.5.00000014.0000006c-.311246-1.36487-1.52509-2.33304-2.925-2.333h-1.356" />
        <path d="m19.125 19.875h-.00000002c-.207107.00000001-.375.167893-.375.375.00000001.207107.167893.375.375.375.207107-.00000001.375-.167893.375-.375 0-.207107-.167893-.375-.375-.375" />
        <path d="m9.75 20.25h-5.25" />
        <path d="m15 3.75-3-3-3 3" />
        <path d="m12 .75v12" />
      </g>
    </svg>
  );
};

export const CheckCircle = (props) => {
  return (
    <svg viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/>
        <path d="M16.6666 8.5L10.25 14.9167L7.33331 12"/>
      </g>
    </svg>
  )
}

export const InfoCircle = (props) => {
  return (
    <svg viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </g>
    </svg>
  )
}

export const AlertCircle = (props) => {
  return (
    <svg viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </g>
    </svg>
  )
}

export const XCircle = (props) => {
  return (
    <svg viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </g>
    </svg>
  )
}

export const X = (props) => {
  return (
    <svg viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </g>
    </svg>
  )
}

