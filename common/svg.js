export const ExpandBox = (props) => (
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
      <path d="m23.251 7.498v-6.75h-6.75" />
      <path d="m23.25.75-15 15" />
      <path d="m11.251 5.248h-9-.00000007c-.828427.00000004-1.5.671573-1.5 1.5v15-.00000023c-.00000013.828427.671573 1.5 1.5 1.5h15-.00000007c.828427.00000004 1.5-.671573 1.5-1.5v-9" />
    </g>
  </svg>
);

export const ExpandArrow = (props) => (
  <svg viewBox="0 0 24 24" height={props.height} style={props.style}>
    <path
      d="m5.5.75 10.72 10.72c.292711.292294.293049.766535.00075431 1.05925-.00025126.00025162-.0005027.00050305-.00075431.00075431l-10.72 10.72"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export const Wallet = (props) => (
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
      <rect height="21" rx="1.5" width="22.5" x=".75" y=".75" />
      <rect height="15" rx="1.5" width="15" x="5.25" y="3.75" />
      <path d="m3.75 21.75v1.5" />
      <path d="m20.25 21.75v1.5" />
      <path d="m3.75 8.25h3" />
      <path d="m3.75 14.25h3" />
      <circle cx="12.75" cy="11.25" r="2.7" />
      <path d="m12.75 8.55v-1.8" />
      <path d="m12.75 15.75v-1.8" />
      <path d="m15.45 11.25h1.8" />
      <path d="m8.25 11.25h1.8" />
      <path d="m9.986 14.432 1.075-1.075" />
      <path d="m9.986 8.068 1.075 1.075" />
      <path d="m15.514 14.432-1.075-1.075" />
      <path d="m15.514 8.068-1.075 1.075" />
    </g>
  </svg>
);

export const NavigationArrow = (props) => (
  <svg viewBox="0 0 24 24" height={props.height} style={props.style}>
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="m.75 12h22.5" />
      <path d="m12.75 22.5 10.5-10.5-10.5-10.5" fillRule="evenodd" />
    </g>
  </svg>
);

export const Home = (props) => (
  <svg viewBox="0 0 24 24" height={props.height} style={props.style}>
    <path
      d="m19.5 8.4v-4.9a.5.5 0 0 0 -.5-.5h-2a.5.5 0 0 0 -.5.5v2.14l-4.162-3.829a.5.5 0 0 0 -.678 0l-11 10.321a.5.5 0 0 0 .34.868h2.5v9.5a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1v-9.5h2.5a.5.5 0 0 0 .339-.868z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Image = (props) => (
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

export const Folder = (props) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    height={props.height}
    style={props.style}
  >
    <path
      d="m11.236 6h.00000005c-.378666-.0002022-.724736-.214271-.894-.553l-.948-1.894.00000002.00000003c-.169264-.338729-.515334-.552798-.894-.553h-6.5-.00000004c-.552285.00000002-1 .447715-1 1v16 .00000015c.00000008.552285.447715 1 1 1h20-.00000004c.552285.00000002 1-.447715 1-1v-13c0-.552285-.447715-1-1-1z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Channels = (props) => (
  <svg viewBox="0 0 24 24" height={props.height} style={props.style}>
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="16.004" cy="8" r="7.5" />
      <path d="m8.53 8.526a7.5 7.5 0 1 0 6.948 6.948" />
      <path d="m7.504 13.5v-1" />
      <path d="m9 13.5h-2.029a1.342 1.342 0 0 0 -.5 2.587l2.064.826a1.342 1.342 0 0 1 -.5 2.587h-2.035" />
      <path d="m7.504 20.5v-1" />
      <path d="m16.004 5v-1" />
      <path d="m17.5 5h-2.029a1.342 1.342 0 0 0 -.5 2.587l2.064.826a1.342 1.342 0 0 1 -.5 2.587h-2.035" />
      <path d="m16.004 12v-1" />
    </g>
  </svg>
);

export const Peers = (props) => (
  <svg viewBox="0 0 24 24" height={props.height} style={props.style}>
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m17 7.02 3.11-3.09" />
      <path d="m22.9142 1.08579c.781049.781049.781049 2.04738 0 2.82843-.781049.781049-2.04738.781049-2.82843 0-.781049-.781049-.781049-2.04738 0-2.82843.781049-.781049 2.04738-.781049 2.82843 0" />
      <path d="m17.96 17.98 2.12 2.13" />
      <path d="m22.9242 20.0858c.781049.781049.781049 2.04738 0 2.82843-.781049.781049-2.04738.781049-2.82843 0-.781049-.781049-.781049-2.04738 0-2.82843.781049-.781049 2.04738-.781049 2.82843 0" />
      <path d="m7 7.02-3.11-3.09" />
      <path d="m3.91421 1.08579c.781049.781049.781049 2.04738 0 2.82843-.781049.781049-2.04738.781049-2.82843 0-.781049-.781049-.781049-2.04738 0-2.82843.781049-.781049 2.04738-.781049 2.82843 0" />
      <path d="m6.04 17.98-2.12 2.13" />
      <path d="m3.90421 20.0858c.781049.781049.781049 2.04738 0 2.82843-.781049.781049-2.04738.781049-2.82843 0-.781049-.781049-.781049-2.04738 0-2.82843.781049-.781049 2.04738-.781049 2.82843 0" />
      <path d="m16.5 11.5h3" />
      <path d="m22.9142 10.0858c.781049.781049.781049 2.04738 0 2.82843-.781049.781049-2.04738.781049-2.82843 0-.781049-.781049-.781049-2.04738 0-2.82843.781049-.781049 2.04738-.781049 2.82843 0" />
      <path d="m7.5 11.5h-3" />
      <path d="m3.91421 10.0858c.781049.781049.781049 2.04738 0 2.82843-.781049.781049-2.04738.781049-2.82843 0-.781049-.781049-.781049-2.04738 0-2.82843.781049-.781049 2.04738-.781049 2.82843 0" />
      <path d="m7.51 16.5v-.00000059c.00000038-2.48528 2.01472-4.5 4.5-4.5 2.48528.00000038 4.5 2.01472 4.5 4.5z" />
      <path d="m13.9545 6.30546c1.07394 1.07394 1.07394 2.81515 0 3.88909s-2.81515 1.07394-3.88909 0-1.07394-2.81515 0-3.88909 2.81515-1.07394 3.88909 0" />
    </g>
  </svg>
);

export const Deals = (props) => (
  <svg viewBox="0 0 24 24" height={props.height} style={props.style}>
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m23.5 22-1-1.934v-4.566c.042-1.778-2.081-3.363-4-5" />
      <path d="m20.019 17.5-2.551-2.607.00000002.00000002c-.476378-.495833-1.26451-.511603-1.76034-.035225-.495833.476378-.511603 1.26451-.035225 1.76034.00382974.00398614.00768599.00794673.0115685.0118815l2.816 2.87v1.5l-.00000021-.0000012c.153133.894577.493939 1.74659 1 2.5" />
      <path d="m.5 2 1 1.934v4.566c-.042 1.778 2.081 3.363 4 5" />
      <path d="m3.981 6.5 2.551 2.607.00000001.00000001c.476378.495833 1.26451.511603 1.76034.035225.495833-.476378.511603-1.26451.035225-1.76034-.00382974-.00398614-.00768599-.00794673-.0115685-.0118815l-2.816-2.87v-1.5l.00000019.00000112c-.153133-.894577-.493939-1.74659-1-2.5" />
      <path d="m5.5 8.052v11.448.00000015c.00000008.552285.447715 1 1 1h9.5" />
      <path d="m18.5 15.948v-11.448c0-.552285-.447715-1-1-1h-10" />
    </g>
  </svg>
);

export const DataTransfer = (props) => (
  <svg viewBox="0 0 24 24" height={props.height} style={props.style}>
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m20.5 14.406a4.311 4.311 0 0 0 2.5-4.049 4.711 4.711 0 0 0 -4.954-4.635 6.706 6.706 0 0 0 -6.046-3.722 6.605 6.605 0 0 0 -6.675 6.109 3.561 3.561 0 0 0 -4.325 3.409 3.186 3.186 0 0 0 2.5 3.282" />
      <path d="m6 19 3 3 3-3" />
      <path d="m9 22v-9" />
      <path d="m12 16 3-3 3 3" />
      <path d="m15 13v9" />
    </g>
  </svg>
);

export const Stats = (props) => (
  <svg viewBox="0 0 24 24" height={props.height} style={props.style}>
    <path
      d="m.5 12.001h6l3-10 3 19 3-14 2 5h6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Logs = (props) => (
  <svg viewBox="0 0 24 24" height={props.height} style={props.style}>
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8.5 20.5h-7a1 1 0 0 1 -1-1v-16a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v5" />
      <path d="m4.5 4.5v-4" />
      <path d="m8.5 4.5v-4" />
      <path d="m12.5 4.5v-4" />
      <path d="m17.5 20.5a.25.25 0 1 1 -.25.25.25.25 0 0 1 .25-.25" />
      <path d="m17.5 18.5v-3" />
      <path d="m18.338 12.5a.95.95 0 0 0 -1.676 0l-5.056 9.635a.923.923 0 0 0 .031.914.948.948 0 0 0 .807.448h10.112a.948.948 0 0 0 .807-.448.923.923 0 0 0 .031-.914z" />
    </g>
  </svg>
);

export const Status = (props) => (
  <svg viewBox="0 0 24 24" height={props.height} style={props.style}>
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m14.061 5.243a1.5 1.5 0 0 1 0 2.121" />
      <path d="m16.182 3.121a4.5 4.5 0 0 1 0 6.364" />
      <path d="m16.182 3.121a4.5 4.5 0 0 1 0 6.364" />
      <path d="m18.3 1a7.5 7.5 0 0 1 0 10.607" />
      <path d="m18.3 1a7.5 7.5 0 0 1 0 10.607" />
      <path d="m9.939 5.243a1.5 1.5 0 0 0 0 2.121" />
      <path d="m7.818 3.121a4.5 4.5 0 0 0 0 6.364" />
      <path d="m7.818 3.121a4.5 4.5 0 0 0 0 6.364" />
      <path d="m5.7 1a7.5 7.5 0 0 0 0 10.607" />
      <path d="m5.7 1a7.5 7.5 0 0 0 0 10.607" />
      <path d="m23.5 19a2 2 0 0 1 -2 2h-19a2 2 0 0 1 -2-2v-2a2 2 0 0 1 2-2h19a2 2 0 0 1 2 2z" />
      <path d="m4.75 17.75a.25.25 0 1 0 .25.25.25.25 0 0 0 -.25-.25z" />
      <path d="m8.25 17.75a.25.25 0 1 0 .25.25.25.25 0 0 0 -.25-.25z" />
      <path d="m12 15v-5" />
      <path d="m4 21-1.5 2" />
      <path d="m20 21 1.5 2" />
    </g>
  </svg>
);

export const Miners = (props) => (
  <svg viewBox="0 0 24 24" height={props.height} style={props.style}>
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m2.561 23.207a1 1 0 0 1 -1.415 0l-.353-.353a1 1 0 0 1 0-1.414l13.016-13.018 1.768 1.768z" />
      <path d="m23.5 16.879a17 17 0 0 0 -16.379-16.379.5.5 0 0 0 -.24.948 33.1 33.1 0 0 1 7.526 4.963l-.951.951a.5.5 0 0 0 0 .707l2.474 2.475a.5.5 0 0 0 .707 0l.952-.951a33.076 33.076 0 0 1 4.962 7.526.5.5 0 0 0 .949-.24z" />
      <path d="m19.383 6.384.79-.79a1 1 0 0 0 0-1.415l-.353-.353a1 1 0 0 0 -1.414 0l-.791.791" />
    </g>
  </svg>
);

export const StorageMarket = (props) => (
  <svg viewBox="0 0 24 24" height={props.height} style={props.style}>
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m23.5 22h-22.5a.5.5 0 0 1 -.5-.5v-19.5" />
      <path d="m12.872 15.523c.182 1 .458 3.477 3.128 3.477" />
      <path d="m3 19a3 3 0 0 0 2.947-2.46l1.2-6.571a2.4 2.4 0 0 1 3.8-1.487" />
      <path d="m8 19a3 3 0 0 0 2.947-2.46l1.2-6.571a2.4 2.4 0 0 1 4.714 0l1.2 6.571a3 3 0 0 0 2.939 2.46" />
    </g>
  </svg>
);

export const PowerButton = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={props.height}
    style={props.style}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
    <line x1="12" y1="2" x2="12" y2="12" />
  </svg>
);

export const Bell = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={props.height}
    style={props.style}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
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
