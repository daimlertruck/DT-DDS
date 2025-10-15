import{f as o}from"./emotion-styled.browser.esm-DBghOYGd.js";const t=o.input`
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
`,d=o.label`
  ${({theme:e})=>`
    ${e.fontStyles.bodyMdRegular};
    color: ${e.palette.content.default};
    cursor: inherit;
  `}
`;export{t as R,d as a};
