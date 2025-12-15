import{f as o}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";const t={large:{outerCircle:{width:24,height:24},innerCircle:{width:10,height:10}},small:{outerCircle:{width:20,height:20},innerCircle:{width:8,height:8}}},l=o.input`
  ${({theme:r,radioSize:e})=>`
    background: ${r.palette.surface.contrast};
    border: 1px solid ${r.palette.informative.default};
    border-radius: 50%;
    width: ${t[e].outerCircle.width}px;
    height: ${t[e].outerCircle.height}px;
    appearance: none;
    position: relative;
    cursor: pointer;

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
      width: ${t[e].innerCircle.width}px;
      height: ${t[e].innerCircle.height}px;
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
