import{f as o}from"./emotion-styled.browser.esm-DBghOYGd.js";const d=(e,r)=>({default:r.palette.surface.default,contrast:r.palette.surface.contrast,light:r.palette.surface.light})[e]||r.palette.surface.default,s=o.div`
  ${({theme:e})=>`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: relative;
    width: 100%;
    
    border-style: solid;
    border-width: 0;
    border-color: ${e.palette.border.dark};
  `}
`,n=o.div`
  ${({theme:e})=>`padding-left: ${e.spacing.spacing_50}`};
`,p=o.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
`,c=o.textarea`
  ${({theme:e,enableResize:r=!1,backgroundFill:t})=>`
    ${e.fontStyles.bodyLgRegular}

    background-color: ${d(t,e)};

    border-style: none;
    width: 100%;
    color: ${e.palette.content.dark};
    resize: ${r?"vertical":"none"};
    outline: none;
    padding-right: 10px;
  `}
`,f=o.div`
  ${({theme:e,variant:r,hasError:t=!1,backgroundFill:l})=>{const a=t?e.palette.error.default:e.palette.primary.default;return`
    background-color: ${d(l,e)};
    position: relative;
    padding: 25px 0px 0px 10px;
    width: 100%;

    ${r==="outlined"?`border-radius: ${e.shape.formField};
            border: 1px solid ${t?e.palette.error.default:e.palette.border.default};
            &:focus-within, 
            &:hover { 
              border: 1px solid ${a};
            }
          `:`border-radius: ${e.shape.formField} ${e.shape.formField} 0 0;
            border-bottom: 1px solid ${t?e.palette.error.default:e.palette.border.default};
            &:focus-within, 
            &:hover { 
              border-bottom: 1px solid  ${a};
            }
          `};

    ${r==="outlined"?"border-width: 1px":"border-width: 0 0 1px"};
  `}}
`;export{f as C,s as T,c as a,p as b,n as c};
