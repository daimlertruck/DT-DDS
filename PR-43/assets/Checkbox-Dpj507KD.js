import{j as r}from"./jsx-runtime-DMAvRu52.js";import{I as u}from"./Icon-87Ryblgq.js";import{r as f}from"./index-Dl6G-zuu.js";import{n as a,d as h}from"./emotion-styled.browser.esm-Dv69Fly8.js";const b=(t,e,o)=>e?`
        border: none;
        background-color: ${o?t.palette.primary.light:t.palette.accent.default};
    `:` 
        border: 1px solid ${t.palette.border.default};
        background-color: ${t.palette.surface.contrast};
    `,g=a.label`
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
         background-color: ${t.palette.primary.light};
         border: 1px solid ${t.palette.primary.default};
      `};
     }
  `}
`,$=a.div`
  height: 24px;
  min-height: 24px;
  width: 24px;
  min-width: 24px;
  position: relative;
  display: flex;
`,w=a.input`
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
`,y=a.span`
  user-select: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;

  ${({theme:t,isDisabled:e})=>`
    padding-left: ${t.spacing.spacing_30};
    ${t.fontStyles.bodyMdRegular};
    color: ${e?t.palette.content.light:t.palette.content.default};
  `}
`,S=f.forwardRef(({dataTestId:t="checkbox-id",onChange:e,children:o,isChecked:n=!1,isDisabled:l=!1,style:c,...p},d)=>{const i=h(),s=x=>{l||e==null||e(x)};return r.jsxs(g,{"data-testid":t,isChecked:n,isDisabled:l,style:c,children:[r.jsxs($,{children:[r.jsx(w,{checked:n,disabled:l,onChange:s,ref:d,type:"checkbox",...p}),n?r.jsx(u,{code:"check",color:i.palette.content.contrast}):null]}),o?r.jsx(y,{isChecked:n,isDisabled:l,children:o}):null]})});export{S as C};
