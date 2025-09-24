import{f as p}from"./emotion-styled.browser.esm-DBghOYGd.js";const n=(o,t)=>({default:t.palette.surface.default,contrast:t.palette.surface.contrast,light:t.palette.surface.light})[o]||t.palette.surface.default,u=p.textarea`
  ${({theme:o,enableResize:t,backgroundFill:a,variant:i,hasError:r,isFloatingLabel:e,hasLabel:l})=>{const d=r?o.palette.error.default:o.palette.informative.default;return`
    ${o.fontStyles.bodyMdRegular}

    background-color: ${n(a,o)};
    min-height: 100px;
    width: 100%;
    outline: none;
    color: ${o.palette.content.default};
    resize: ${t?"vertical":"none"};
    padding: ${e&&l?"24px 12px 12px 12px":"12px"};
    border: 0;

    ${!e&&l&&"margin-top: 8px"};

    ${i==="outlined"?`border-radius: ${o.shape.formField};
            border: 1px solid ${r?o.palette.error.default:o.palette.border.medium};

            &:focus-within,
            &:hover:not([disabled]) { 
              border: 1px solid ${d};
            }
          `:`border-radius: ${o.shape.formField} ${o.shape.formField} 0 0;
            border-bottom: 1px solid ${r?o.palette.error.default:o.palette.border.medium};
           
            &:focus-within,
            &:hover:not([disabled]) { 
              border-bottom: 1px solid  ${d};
            }
          `};

    &:read-only {
      color: ${o.palette.content.light};
    }

    &:disabled {
      cursor: not-allowed;
      color: ${o.palette.content.light};
    } 
  `}}
`;export{u as T};
