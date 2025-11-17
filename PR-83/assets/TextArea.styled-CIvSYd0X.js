import{s as p}from"./emotion-styled.browser.esm-BMKZqQy6.js";const n=(o,r)=>({default:r.palette.surface.default,contrast:r.palette.surface.contrast,light:r.palette.surface.light})[o]||r.palette.surface.default,s=p.textarea`
  ${({theme:o,enableResize:r,backgroundFill:i,variant:d,hasError:t,isFloatingLabel:l,hasLabel:a})=>{const e=t?o.palette.error.default:o.palette.informative.default;return`
    ${o.fontStyles.bodyMdRegular}

    background-color: ${n(i,o)};
    min-height: 100px;
    width: 100%;
    outline: none;
    color: ${o.palette.content.default};
    resize: ${r?"vertical":"none"};
    padding: ${l&&a?"30px 12px 12px 12px":"12px"};
    border: 0;

    ${!l&&a&&"margin-top: 8px"};

    ::placeholder {
      color: ${o.palette.content.medium};
    }

    ${d==="outlined"?`border-radius: ${o.shape.formField};
            border: 1px solid ${t?o.palette.error.default:o.palette.border.medium};

            &:focus-within,
            &:hover:not([disabled]) { 
              border: 1px solid ${e};
            }
          `:`border-radius: ${o.shape.formField} ${o.shape.formField} 0 0;
            border-bottom: 1px solid ${t?o.palette.error.default:o.palette.border.medium};
           
            &:focus-within,
            &:hover:not([disabled]) { 
              border-bottom: 1px solid  ${e};
            }
          `};

    &:read-only:not(:disabled) {
      border-color: ${o.palette.border.default};
      color: ${o.palette.content.medium};
      background-color: ${o.palette.surface.light};

      &:focus-within,
      &:hover { 
       ${d==="outlined"?`border: 1px solid ${e};`:`border-bottom: 1px solid ${e}`}
      }
    }

    &:disabled {
      cursor: not-allowed;
      color: ${o.palette.content.light};
    } 
  `}}
`;export{s as T};
