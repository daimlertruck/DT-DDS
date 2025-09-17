import{n as a}from"./emotion-styled.browser.esm-Dv69Fly8.js";const d=(t,e)=>({default:e.palette.surface.default,contrast:e.palette.surface.contrast,light:e.palette.surface.light})[t]||e.palette.surface.default,c=a.div`
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

    i {
      color: ${t.palette.content.medium};
    }

    :has(input[disabled]) {
      i, label > span {
        color: ${t.palette.content.light};
      }
    }

    :has(input[readonly]:not(input[disabled])) {
      label, label > span {
        color: ${e?t.palette.content.medium:t.palette.content.default};
        }
      }
  `}

  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    display: none;
  }
`,p=a.input`
  ${({theme:t,isFloatingLabel:e,isSearchType:o})=>`
    ${t.fontStyles.bodyMdRegular}
    border: 0;
    outline: 0;
    width: 100%;
    background-color: inherit;
    


    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        transition: background-color 5000s ease-in-out 0s;
    }

    &::placeholder {
      color: ${e?"transparent":t.palette.content.medium};
    }

    padding: ${e&&!o?`${t.spacing.xs} 0 ${t.spacing.spacing_30} 0`:""};

  `}
`,u=a.div`
  ${({theme:t,onClick:e})=>{const o=!!e;return`
    display: flex;
    cursor: ${o?"pointer":"default"};

    ${o&&`
        &:hover > i  {
          color: ${t.palette.content.dark};
        }
      `}
  
  `}}
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
  padding-left: ${({theme:t})=>t.spacing.spacing_50};
`,b=a.div`
  ${({theme:t})=>`
    cursor: pointer;
    display: flex;

    :hover > i {
      color: ${t.palette.content.dark}
    }
  `}
`,g=a.div`
  ${({theme:t,isFloatingLabel:e,variant:o,backgroundFill:n,hasError:l})=>{const r=l?t.palette.error.default:t.palette.border.medium,i=l?t.palette.error.default:t.palette.border.dark;return`
    display:flex;
    flex-direction: row;
    align-items: center;
    min-width: 198px;
    width: 100%;
    height: 54px;
    color: ${t.palette.content.default};
    gap: ${t.spacing.spacing_30};
    background-color: ${d(n,t)};
    
    padding-inline: ${t.spacing.spacing_40};

    ${o==="outlined"?`border-radius: ${t.shape.formField};
            border: 1px solid ${r};
            &:focus-within, &:hover { { border: 1px solid ${i}};
          `:`border-radius: ${t.shape.formField} ${t.shape.formField} 0 0;
            border-bottom: 1px solid ${r};
            &:focus-within, &:hover { { border-bottom: 1px solid  ${i}};
          `};

    &:has(input[readonly]:not([disabled])) {
      background-color: ${t.palette.surface.default};
      color: ${t.palette.content.medium};
    }

    &:has(input[disabled]), &:has(input[disabled]) > * {
      color: ${t.palette.content.light};
      background-color: ${t.palette.surface.light};
      border-color: ${t.palette.border.default};
      cursor: not-allowed;

      input::placeholder {
        color: ${e?"transparent":t.palette.content.light};
      }
    }
  `}}
`;export{g as I,b as R,c as T,u as a,p as b,f as c,$ as d};
