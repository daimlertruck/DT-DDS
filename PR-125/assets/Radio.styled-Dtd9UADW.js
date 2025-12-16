import{f as t}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";const o={large:{outerCircle:24,innerCircle:10},small:{outerCircle:20,innerCircle:8}},l=t.input`
  ${({theme:r,radioSize:e})=>`
    background: ${r.palette.surface.contrast};
    border: 1px solid ${r.palette.informative.default};
    border-radius: 50%;
    width: ${o[e].outerCircle}px;
    height: ${o[e].outerCircle}px;
    appearance: none;
    position: relative;
    cursor: pointer;
    flex-shrink: 0;

    &:disabled + label {
      color: ${r.palette.content.light};
    }

    &:hover {
      background: ${r.palette.informative.light};
    }

    &:checked:not(:disabled):hover {
      background: ${r.palette.informative.dark};
      border-color: ${r.palette.informative.dark};
    }

    &:checked {
      background: ${r.palette.informative.default};
    }

    &:disabled {
      pointer-events: none;
      cursor: not-allowed;
      border-color: ${r.palette.informative.light};
      background-color: ${r.palette.informative.light};
    }

    &:checked:before {
      content: "";
      width: ${o[e].innerCircle}px;
      height: ${o[e].innerCircle}px;
      background: ${r.palette.surface.contrast};
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &[data-error="true"] {
      border-color: ${r.palette.error.default};
    }

    &[data-error="true"]:hover {
      background-color: ${r.palette.error.light};
    }

    &[data-error="true"]:disabled {
      background-color: ${r.palette.error.light};
      border-color: ${r.palette.error.light};
    }

    &[data-error="true"]:checked {
      background-color: ${r.palette.error.default};
    }

    &[data-error="true"]:checked:disabled {
      background-color: ${r.palette.error.light};
      border-color: ${r.palette.error.light};
    }
    
    &[data-error="true"]:checked:not(:disabled):hover {
      background-color: ${r.palette.error.dark};
      border-color: ${r.palette.error.dark};
    }

    &:focus-visible {
      outline: 2px solid ${r.palette.primary.default};
      outline-offset: 2px;
    }
  `}
`;export{l as R};
