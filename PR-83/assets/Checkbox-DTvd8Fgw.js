import{j as r}from"./jsx-runtime-CB_V9I5Y.js";import{I as u}from"./Icon-BebqvW7_.js";import{r as f}from"./index-CTjT7uj6.js";import{s as n,e as h}from"./emotion-styled.browser.esm-BMKZqQy6.js";const b=(t,e,o)=>e?`
        border: none;
        background-color: ${o?t.palette.primary.light:t.palette.accent.default};
    `:` 
        border: 1px solid ${t.palette.border.default};
        background-color: ${t.palette.surface.contrast};
    `,g=n.label`
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
`,$=n.div`
  height: 24px;
  min-height: 24px;
  width: 24px;
  min-width: 24px;
  position: relative;
  display: flex;
`,y=n.input`
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
`,w=n.span`
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
`,S=f.forwardRef(({dataTestId:t="checkbox-id",onChange:e,children:o,isChecked:l=!1,isDisabled:a=!1,style:c,...p},s)=>{const d=h(),i=x=>{a||e==null||e(x)};return r.jsxs(g,{"data-testid":t,isChecked:l,isDisabled:a,style:c,children:[r.jsxs($,{children:[r.jsx(y,{checked:l,disabled:a,onChange:i,ref:s,type:"checkbox",...p}),l?r.jsx(u,{code:"check",color:d.palette.content.contrast}):null]}),o?r.jsx(w,{isChecked:l,isDisabled:a,children:o}):null]})});export{S as C};
