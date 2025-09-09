import{n as o}from"./emotion-styled.browser.esm-Dv69Fly8.js";const a=(e,t)=>({default:t.palette.surface.default,contrast:t.palette.surface.contrast,light:t.palette.surface.light})[e]||t.palette.surface.default,s=o.div`
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
  ${({theme:e})=>`padding-left: ${e.spacing["2xs"]}`};
`,p=o.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
`,c=o.textarea`
  ${({theme:e,enableResize:t=!1,backgroundFill:r})=>`
    ${e.fontStyles.body1}

    background-color: ${a(r,e)};

    border-style: none;
    width: 100%;
    color: ${e.palette.content.dark};
    resize: ${t?"vertical":"none"};
    outline: none;
    padding-right: 10px;
  `}
`,f=o.div`
  ${({theme:e,variant:t,hasError:r=!1,backgroundFill:l})=>{const d=r?e.palette.error.default:e.palette.primary.default;return`
    background-color: ${a(l,e)};
    position: relative;
    padding: 25px 0px 0px 10px;
    width: 100%;

    ${t==="outlined"?`border-radius: ${e.shape.formField};
            border: 1px solid ${r?e.palette.error.default:e.palette.border.default};
            &:focus-within, &:hover { { border: 1px solid ${d}};
          `:`border-radius: ${e.shape.formField} ${e.shape.formField} 0 0;
            border-bottom: 1px solid ${r?e.palette.error.default:e.palette.border.default};
            &:focus-within, &:hover { { border-bottom: 1px solid  ${d}};
          `};

    ${t==="outlined"?"border-width: 1px":"border-width: 0 0 1px"};
  `}}
`;export{f as C,s as T,c as a,p as b,n as c};
