import{j as r}from"./jsx-runtime-CB_V9I5Y.js";import{I as f}from"./Icon-w916x_k_.js";import{r as h}from"./index-CTjT7uj6.js";import{f as l,d as m}from"./emotion-styled.browser.esm-DBghOYGd.js";const b=(t,e,o)=>e?`
        border: none;
        background-color: ${o?t.palette.informative.light:t.palette.informative.default};
    `:` 
        border: 1px solid ${t.palette.informative.medium};
        background-color: ${o?t.palette.informative.light:t.palette.surface.contrast};
    `,g=l.label`
  display: flex;
  align-items: center;
  width: 100%;

  ${({theme:t,isChecked:e,isDisabled:o})=>`
    & > div {
      border-radius: ${t.shape.checkbox};
      ${b(t,e,o)}
    }
    cursor: ${o?"not-allowed":"pointer"};

    &:hover > div {
      ${!o&&!e&&`
         border: 1px solid ${t.palette.primary.default};
      `};
     }
  `}
`,$=l.div`
  height: 20px;
  min-height: 20px;
  width: 20px;
  min-width: 20px;
  position: relative;
  display: flex;
`,w=l.input`
  cursor: pointer;
  appearance: none;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;

  &:disabled {
    cursor: not-allowed;
  }
`,v=l.span`
  user-select: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;

  ${({theme:t,isDisabled:e})=>`
    padding-left: ${t.spacing.spacing_30};
    ${t.fontStyles.bodyMdRegular};
    color: ${e?t.palette.content.medium:t.palette.content.default};
  `}
`,I=h.forwardRef(({dataTestId:t="checkbox-id",onChange:e,children:o,isChecked:n=!1,isDisabled:a=!1,style:i,className:p,...c},d)=>{const s=m(),u=x=>{a||e==null||e(x)};return r.jsxs(g,{className:p,"data-testid":t,isChecked:n,isDisabled:a,style:i,children:[r.jsxs($,{children:[r.jsx(w,{checked:n,disabled:a,onChange:u,ref:d,type:"checkbox",...c}),n?r.jsx(f,{code:"check",color:s.palette.content.contrast,size:"medium"}):null]}),o?r.jsx(v,{isChecked:n,isDisabled:a,children:o}):null]})});export{I as C};
