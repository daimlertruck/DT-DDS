var s=Object.defineProperty;var r=(t,o)=>s(t,"name",{value:o,configurable:!0});import{f as e}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";const p=r((t,o)=>({default:o.palette.surface.default,contrast:o.palette.surface.contrast,light:o.palette.surface.light})[t]||o.palette.surface.default,"getThemedBackgroundFill"),f=e.div`
  ${({theme:t,isFloatingLabel:o=!0,hasPrefix:a=!1})=>`
    display: flex;
    flex-direction: column;
    gap: ${t.spacing.spacing_20};
    width: 100%;
    position: relative;
    
    ${a?`
    label {
      left: 0;
      padding-left: ${o?t.spacing.l:""};
    }
    `:""}

    :has(input[disabled]) {
      i, label > span {
        color: ${t.palette.content.light};
      }
    }

    &:has(input[readonly]:not(input[disabled])) {
      i, label, label > span {
        color: ${t.palette.content.medium};
      }
    }

    ${!o&&`
        &:has(input[readonly]:not([disabled]):focus) {
          label {
            color: ${t.palette.informative.default};
          }
        }
      `}
  `}

  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    display: none;
  }
`,$=e.div`
  ${({theme:t,isFloatingLabel:o})=>`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${o?"0":t.spacing.spacing_30};
  `}
`,b=e.input`
  ${({theme:t,isFloatingLabel:o,scale:a})=>`
    ${t.fontStyles.bodyMdRegular}
    border: 0;
    outline: 0;
    width: 100%;
    background-color: inherit;

    &:focus {
      outline: none;
    }
  
    &:read-only {
      color: ${t.palette.content.medium};
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    }

    &[readonly]::placeholder,
    &[readonly]:focus::placeholder {
      color: transparent;
    }

    &::placeholder {
      color: ${o?"transparent":t.palette.content.medium};
    }

    &:focus::placeholder {
      color: ${t.palette.content.medium}; 
    }

    &:disabled {
      color: ${t.palette.content.light};
    }

    color: ${t.palette.content.default};

    ${a==="compact"?`
        padding: ${o?`${t.spacing.spacing_60} ${t.spacing.spacing_40} ${t.spacing.spacing_30} ${t.spacing.spacing_40}`:`14px ${t.spacing.spacing_30}`};
      `:`
        padding: ${o?`28px ${t.spacing.spacing_40} ${t.spacing.spacing_40}`:`20px ${t.spacing.spacing_40}`};
      `}
  `}
`,g=e.div`
  ${({theme:t,onClick:o})=>{const a=!!o;return`
    display: flex;
    cursor: ${a?"pointer":"default"};
    padding-left: ${t.spacing.spacing_40}};

    &:focus-visible {
      outline: 2px solid ${t.palette.border.dark};
      outline-offset: 1px;
    }

    ${a&&`
        &:hover > i  {
          color: ${t.palette.content.dark};
        }
      `}
  
  `}}
`,x=e.div`
  ${({theme:t,onClick:o})=>{const a=!!o;return`
    display: flex;
    cursor: ${a?"pointer":"default"};
    margin-right: ${t.spacing.spacing_40}};

    &:focus-visible {
      outline: 2px solid ${t.palette.border.dark};
      outline-offset: 1px;
    }

    ${a&&`
        &:hover > i  {
          color: ${t.palette.primary.default};
        }
      `}
  `}}
`,y=e.div`
  padding-left: ${({theme:t})=>t.spacing.spacing_40};
`,v=e.div`
  ${({theme:t,isFloatingLabel:o,variant:a,backgroundFill:d,hasError:l})=>{const i=l?t.palette.error.default:t.palette.border.medium,n=l?t.palette.error.default:t.palette.informative.default;return`
    display:flex;
    flex-direction: row;
    align-items: center;
    min-width: 198px;
    width: 100%;
    color: ${t.palette.content.default};
    background-color: ${p(d,t)};
  
    ${a==="outlined"?`border-radius: ${t.shape.formField};
        border: 1px solid ${i};

        &:focus-within,
        &:hover:not([disabled]) { 
          border: 1px solid ${n};
        }

        &:hover:([disabled]) { 
          border: 1px solid ${i};
        }
      `:`border-radius: ${t.shape.formField} ${t.shape.formField} 0 0;
        border-bottom: 1px solid ${i};
        
        &:focus-within,
        &:hover:not([disabled]) { 
          border-bottom: 1px solid  ${n};
        }
      `};

    &:has(input[readonly]:not([disabled])) {
      background-color: ${t.palette.surface.light};
      border: 1px solid ${t.palette.surface.default};

      &:focus-within, &:hover { 
          border: 1px solid  ${t.palette.informative.default};
        }
    }

    &:has(input[disabled]), &:has(input[disabled]) > * {
      cursor: not-allowed;

      &:hover {
        border-color: ${i};
      }

      input::placeholder {
        color: ${o?"transparent":t.palette.content.light};
      }
    }
  `}}
`;export{$ as I,f as T,v as a,g as b,b as c,x as d,y as e};
