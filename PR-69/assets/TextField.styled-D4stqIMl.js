import{I as p}from"./IconButton-C_mszqXk.js";import{f as l}from"./emotion-styled.browser.esm-DBghOYGd.js";const s=(t,e)=>({default:e.palette.surface.default,contrast:e.palette.surface.contrast,light:e.palette.surface.light})[t]||e.palette.surface.default,f=l.div`
  ${({theme:t,isFloatingLabel:e=!0,hasPrefix:o=!1,hasError:r=!1})=>`
    display: flex;
    flex-direction: column;
    gap: ${t.spacing.spacing_20};
    width: 100%;
    position: relative;
    
    ${o?`
    label {
      left: 0;
      padding-left: ${e?t.spacing.l:""};
    }
    `:""}

    :has(input[disabled]) {
      i, label > span {
        color: ${t.palette.content.light};
      }
    }

    &:not(:focus-within):not(input[disabled] {
      ${!e&&`
          label {
            color: ${r?t.palette.error.default:t.palette.content.default};
          }
        `}
    }

    &:has(input[readonly]:not(input[disabled])) {
      i, label, label > span {
        color: ${t.palette.content.medium};
      }

      ${!e&&`
          &:has(input:focus) {
            label {
              color: ${t.palette.informative.default};
            }
          }
        `}
    }
  `}

  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    display: none;
  }
`,$=l.div`
  ${({theme:t,isFloatingLabel:e})=>`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${e?"0":t.spacing.spacing_30};
  `}
`,b=l.input`
  ${({theme:t,isFloatingLabel:e})=>`
    ${t.fontStyles.bodyMdRegular}
    border: 0;
    outline: 0;
    width: 100%;
    background-color: inherit;
  
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
      color: ${e?"transparent":t.palette.content.medium};
    }

    &:focus::placeholder {
      color: ${t.palette.content.medium}; 
    }

    &:disabled {
      color: ${t.palette.content.light};
    }

    color: ${t.palette.content.default};

    ${e?"padding-top: 18px;":null}

  `}
`,x=l.div`
  ${({theme:t,onClick:e})=>{const o=!!e;return`
    display: flex;
    cursor: ${o?"pointer":"default"};

    &:focus-visible {
      outline: 2px solid ${t.palette.border.dark};
      outline-offset: 1px;
    }

    ${o&&`
        &:hover > i  {
          color: ${t.palette.content.dark};
        }
      `}
  
  `}}
`,g=l.div`
  ${({theme:t,onClick:e})=>{const o=!!e;return`
    display: flex;
    cursor: ${o?"pointer":"default"};

    &:focus-visible {
      outline: 2px solid ${t.palette.border.dark};
      outline-offset: 1px;
    }

    ${o&&`
        &:hover > i  {
          color: ${t.palette.primary.default};
        }
      `}
  `}}
`,y=l.div`
  padding-left: ${({theme:t})=>t.spacing.spacing_40};
`,v=l(p)`
  ${({theme:t})=>`
    cursor: pointer;
    display: flex;

    :hover > i {
      color: ${t.palette.content.dark}
    }
  `}
`,k=l.div`
  ${({theme:t,isFloatingLabel:e,variant:o,backgroundFill:r,hasError:i,scale:n})=>{const a=i?t.palette.error.default:t.palette.border.medium,d=i?t.palette.error.default:t.palette.informative.default;return`
    display:flex;
    flex-direction: row;
    align-items: center;
    min-width: 198px;
    width: 100%;
    color: ${t.palette.content.default};
    gap: ${t.spacing.spacing_30};
    background-color: ${s(r,t)};
    
    padding-inline: ${t.spacing.spacing_40};

    ${e?`padding-block: ${n==="compact"?"4px":"10px"};
          `:`
           padding-block: ${n==="compact"?"13px":"19px"};
          `};

    ${o==="outlined"?`border-radius: ${t.shape.formField};
        border: 1px solid ${a};

        &:focus-within,
        &:hover:not([disabled]) { 
          border: 1px solid ${d};
        }

        &:hover:([disabled]) { 
          border: 1px solid ${a};
        }
      `:`border-radius: ${t.shape.formField} ${t.shape.formField} 0 0;
        border-bottom: 1px solid ${a};
        
        &:focus-within,
        &:hover:not([disabled]) { 
          border-bottom: 1px solid  ${d};
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
      background-color: ${t.palette.surface.contrast};

      &:hover {
        border-color: ${a};
      }

      input::placeholder {
        color: ${e?"transparent":t.palette.content.light};
      }
    }
  `}}
`;export{$ as I,v as R,f as T,k as a,x as b,b as c,g as d,y as e};
