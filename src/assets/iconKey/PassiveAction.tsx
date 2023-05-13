import * as React from "react";
import { SVGProps } from "react";
const PassiveAction = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 73 73"
    aria-label="Passive Action"
    {...props}
  >
    <path d="M0 36.5V73h73V0H55.4C41.7 0 38 .3 38.6 1.2c.6 1 .5 1-.7.1-1.2-1-1.8-1-2.9 0-1 .9-1.1.9-.6-.1C35 .3 31.3 0 17.6 0H0v36.5zm8-8.2c0 .2-1.7 1.9-3.7 3.8L.5 35.5l3.4-3.8C7.2 28.3 8 27.5 8 28.3zm61 3.2c1.9 1.9 3.2 3.5 2.9 3.5-.3 0-2-1.6-3.9-3.5S64.8 28 65.1 28c.3 0 2 1.6 3.9 3.5zm-50 23C28.6 64.1 36.3 72 36 72c-.3 0-8.4-7.9-18-17.5S.7 37 1 37c.3 0 8.4 7.9 18 17.5zm53-17.2c0 .1-8 8.1-17.7 17.7L36.5 72.5 54 54.7c16.2-16.4 18-18.2 18-17.4z" />
  </svg>
);
export default PassiveAction;
