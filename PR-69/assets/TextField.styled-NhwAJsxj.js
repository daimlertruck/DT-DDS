import{I as s}from"./IconButton-C_mszqXk.js";import{f as l}from"./emotion-styled.browser.esm-DBghOYGd.js";const c=(t,e)=>({default:e.palette.surface.default,contrast:e.palette.surface.contrast,light:e.palette.surface.light})[t]||e.palette.surface.default,$=l.div`
  ${({theme:t,isFloatingLabel:e=!0,hasPrefix:o=!1})=>`
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

    &:has(input[readonly]:not(input[disabled])) {
      i, label, label > span {
        color: ${t.palette.content.medium};
      }
        
      &:hover {
        label {
          color: ${e?t.palette.content.medium:t.palette.informative.default};
        }
      }
    }
  `}

  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    display: none;
  }
`,b=l.div`
  ${({theme:t,isFloatingLabel:e})=>`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${e?"0":t.spacing.spacing_30};
  `}
`,g=l.input`
  ${({theme:t,isFloatingLabel:e,isSearchType:o})=>`
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

    ${e&&!o?"padding-top: 18px;":null}

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
`,y=l.div`
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
`,v=l.div`
  padding-left: ${({theme:t})=>t.spacing.spacing_40};
`,k=l(s)`
  ${({theme:t})=>`
    cursor: pointer;
    display: flex;

    :hover > i {
      color: ${t.palette.content.dark}
    }
  `}
`,w=l.div`
  ${({theme:t,isFloatingLabel:e,variant:o,backgroundFill:d,hasError:r,isSearchType:p,scale:i})=>{const a=r?t.palette.error.default:t.palette.border.medium,n=r?t.palette.error.default:t.palette.informative.default;return`
    display:flex;
    flex-direction: row;
    align-items: center;
    min-width: 198px;
    width: 100%;
    color: ${t.palette.content.default};
    gap: ${t.spacing.spacing_30};
    background-color: ${c(d,t)};
    
    padding-inline: ${t.spacing.spacing_40};

    ${e&&!p?`padding-block: ${i==="compact"?"4px":"10px"};
          `:`
           padding-block: ${i==="compact"?"13px":"19px"};
          `};

    ${o==="outlined"?`border-radius: ${t.shape.formField};
        border: 1px solid ${a};

        &:focus-within,
        &:hover:not([disabled]) { 
          border: 1px solid ${n};
        }

        &:hover:([disabled]) { 
          border: 1px solid ${a};
        }
      `:`border-radius: ${t.shape.formField} ${t.shape.formField} 0 0;
        border-bottom: 1px solid ${a};
        
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
      background-color: ${t.palette.surface.contrast};

      &:hover {
        border-color: ${a};
      }

      input::placeholder {
        color: ${e?"transparent":t.palette.content.light};
      }
    }
  `}}
`;export{b as I,k as R,$ as T,w as a,x as b,g as c,y as d,v as e};
