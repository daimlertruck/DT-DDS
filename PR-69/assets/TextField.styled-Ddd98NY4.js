import{f as a}from"./emotion-styled.browser.esm-DBghOYGd.js";const s=(t,e)=>({default:e.palette.surface.default,contrast:e.palette.surface.contrast,light:e.palette.surface.light})[t]||e.palette.surface.default,p=a.div`
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

    :has(input[readonly]:not(input[disabled])) {
      i, label, label > span {
        color: ${t.palette.content.medium};
      }
    }

    &:has(input[readonly]:not(input[disabled])) {
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
`,u=a.input`
  ${({theme:t,isFloatingLabel:e,isSearchType:o})=>`
    ${t.fontStyles.bodyMdRegular}
    border: 0;
    outline: 0;
    width: 100%;
    background-color: inherit;
    color: ${t.palette.content.default};
  
    &:read-only {
      color: ${t.palette.content.medium};
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        transition: background-color 5000s ease-in-out 0s;
    }

    &::placeholder {
      color: ${e?"transparent":t.palette.content.medium};
    }

    &:not(:focus)::placeholder {
      color: 'transparent';
    }

    &:focus::placeholder {
      color: ${t.palette.content.medium}; 
    }

    &:disabled {
      color: ${t.palette.content.light};
    }

    padding: ${e&&!o?`${t.spacing.spacing_50} 0 0 0`:""};
  `}
`,f=a.div`
  ${({theme:t,onClick:e})=>{const o=!!e;return`
    display: flex;
    cursor: ${o?"pointer":"default"};

    ${o&&`
        &:hover > i  {
          color: ${t.palette.content.dark};
        }
      `}
  
  `}}
`,$=a.div`
  ${({theme:t,onClick:e})=>{const o=!!e;return`
    display: flex;
    cursor: ${o?"pointer":"default"};

    ${o&&`
        &:hover > i  {
          color: ${t.palette.content.dark};
        }
      `}
  `}}
`,b=a.div`
  padding-left: ${({theme:t})=>t.spacing.spacing_40};
`,g=a.div`
  ${({theme:t})=>`
    cursor: pointer;
    display: flex;

    :hover > i {
      color: ${t.palette.content.dark}
    }
  `}
`,x=a.div`
  ${({theme:t,isFloatingLabel:e,variant:o,backgroundFill:n,hasError:r,scale:d})=>{const l=r?t.palette.error.default:t.palette.border.medium,i=r?t.palette.error.default:t.palette.informative.default;return`
    display:flex;
    flex-direction: row;
    align-items: center;
    min-width: 198px;
    width: 100%;
    height: ${d==="compact"?"44px":"56px"};
    color: ${t.palette.content.default};
    gap: ${t.spacing.spacing_30};
    background-color: ${s(n,t)};
    
    padding-inline: ${t.spacing.spacing_40};

    ${!e&&"margin-top: 8px"};

    ${o==="outlined"?`border-radius: ${t.shape.formField};
        border: 1px solid ${l};

        &:focus-within,
        &:hover:not([disabled]) { 
          border: 1px solid ${i};
        }

        &:hover:([disabled]) { 
          border: 1px solid ${l};
        }
      `:`border-radius: ${t.shape.formField} ${t.shape.formField} 0 0;
        border-bottom: 1px solid ${l};
        
        &:focus-within,
        &:hover:not([disabled]) { 
          border-bottom: 1px solid  ${i};
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
        border-color: ${l};
      }

      input::placeholder {
        color: ${e?"transparent":t.palette.content.light};
      }
    }
  `}}
`;export{x as I,g as R,p as T,f as a,u as b,$ as c,b as d};
