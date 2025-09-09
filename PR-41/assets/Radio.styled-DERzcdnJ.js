import{n as t}from"./emotion-styled.browser.esm-Dv69Fly8.js";const r=t.input`
  ${({theme:e})=>`
    background: ${e.palette.surface.contrast};
    border: 1px solid ${e.palette.border.default};
    border-radius: 50%;
    width: 24px;
    height: 24px;
    appearance: none;
    
    &:disabled {
      pointer-events: none;
      cursor: not-allowed;
    }

    &:disabled + label {
      color: ${e.palette.content.light};
    }

    &:checked {
      border-width: 7px;
      border-color: ${e.palette.primary.default};
    }

    &:checked:disabled {
      border-color: ${e.palette.primary.medium};
    }

    &:checked:before {
      content: '';
      height: 10px;
      width: 10px;
      border-radius: 50%;
      display: block;
    }
  `}
`,d=t.label`
  ${({theme:e})=>`
    ${e.fontStyles.p};
    color: ${e.palette.content.default};
    cursor: inherit;
  `}
`;export{r as R,d as a};
